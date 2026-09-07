"""RAG answering pipeline: query understanding -> retrieval -> grounded answer."""
import json
import re
from pathlib import Path

import httpx

from backend.database import get_db
from backend.vectorstore import search

CONTACT_SIGNATURE = (
    "\n\n---\n"
    "**Name:** Hari Kotian, Insurance Support  \n"
    "**Contact (Call & WhatsApp):** 9986634506  \n"
)

# Local LLM endpoint (same as Hermes default provider)
LLM_BASE_URL = "http://127.0.0.1:20128/v1"
LLM_MODEL = "oc/big-pickle"

INSURER_ALIASES = [
    # Longer/more specific aliases FIRST (avoid substring false positives like "lic" in "policies")
    ("life insurance corporation", "LIC"),
    ("lic of india", "LIC"),
    ("icici lombard", "ICICI Lombard"),
    ("care health", "Care Health"),
    ("care insurance", "Care Health"),
    ("icici", "ICICI Lombard"),
    ("care", "Care Health"),
    ("lic", "LIC"),
]


def normalize_insurer(raw: str) -> str | None:
    if not raw:
        return None
    r = raw.strip().lower()
    for alias, name in INSURER_ALIASES:
        if alias in r:
            return name
    return None


def parse_query(query: str) -> dict:
    """Extract insurer, product hints, and topic from a query."""
    q_lower = query.lower()

    insurer = None
    for alias, name in INSURER_ALIASES:
        if alias in q_lower:
            insurer = name
            break

    # Common product name hints
    product_hints = []
    for prod in ["jeevan anand", "jeevan umang", "jeevan lakshya", "jeevan labh", "jeevan utsav",
                 "amritbaal", "bima shree", "bima jyoti", "new endowment", "new money back",
                 "tech-term", "new jeevan amar", "saral jeevan bima", "bima kavach", "digi term",
                 "jeevan tarun", "nav jeevan shree", "jeevan akshay", "jeevan shanti", "saral pension",
                 "smart pension", "new pension plus", "nivesh plus", "index plus", "siip",
                 "elevate", "maxprotect", "max protect", "health advantedge", "health shield",
                 "activate booster", "health booster", "personal protect",
                 "ultimate care", "care supreme", "supreme enhance", "care advantage", "care classic",
                 "care plus", "care freedom", "care heart", "care senior", "senior health advantage",
                 "saral suraksha", "secure plus", "arogya sanjeevani", "critical mediclaim",
                 "cancer mediclaim", "heart mediclaim", "operation mediclaim", "joy maternity"]:
        if prod in q_lower:
            product_hints.append(prod)
            break  # take the first strong match

    topics = []
    for topic, keywords in {
        "waiting period": ["waiting period", "wait period", "cooling off"],
        "pre-existing": ["pre-existing", "pre existing", "ped", "existing disease"],
        "exclusions": ["exclu", "not covered", "doesn't cover", "does not cover"],
        "eligibility": ["eligib", "age", "who can buy", "entry age", "max age"],
        "premium": ["premium", "cost", "price", "rate", "pay"],
        "claims": ["claim", "cashless", "reimbursement", "settlement"],
        "sum insured": ["sum insured", "coverage", "cover amount", "si"],
        "maternity": ["maternity", "pregnancy", "delivery"],
        "tax": ["tax", "80c", "80d", "deduction"],
        "renewal": ["renew", "lapse", "grace period"],
        "riders": ["rider", "add-on", "add on", "optional cover"],
        "surrender": ["surrender", "cancellation", "withdraw"],
        "bonus": ["bonus", "loyalty", "no claim bonus", "ncb"],
        "comparison": ["compare", "vs", "difference", "which is better"],
    }.items():
        if any(k in q_lower for k in keywords):
            topics.append(topic)
            break  # primary topic only

    return {
        "insurer": insurer,
        "product_hints": product_hints,
        "topic": topics[0] if topics else "general",
        "raw": query,
    }


def resolve_product_name(hint: str, insurer: str = None) -> str | None:
    """Resolve a fuzzy user product hint (lowercase phrase) to the official product name.

    Matches against the products table (case-insensitive substring on name; prefers
    exact-ish matches within the insurer when known).
    """
    import unicodedata

    hint_l = hint.strip().lower()
    # Strip spaces and accents for fuzzy matching (handles "MaxProtect" vs "max protect")
    def _norm(s): return "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c)).lower().replace(" ", "")
    hint_norm = _norm(hint_l)

    from backend.database import get_db
    conn = get_db()
    rows = conn.execute(
        "SELECT DISTINCT product_name FROM products WHERE sales_status != 'withdrawn'"
    ).fetchall()

    candidates = []
    for row in rows:
        name = row["product_name"]
        if hint_norm in _norm(name):
            candidates.append(name)

    if not candidates:
        return None
    if insurer:
        # Prefer the name belonging to the detected insurer
        conn2 = get_db()
        ins_rows = conn2.execute(
            "SELECT product_name FROM products WHERE sales_status != 'withdrawn' AND insurer = ?",
            (insurer,),
        ).fetchall()
        ins_names = {r["product_name"] for r in ins_rows}
        for c in candidates:
            if c in ins_names:
                return c
    return candidates[0]


def retrieve_context(parsed: dict, top_k: int = 6) -> list[dict]:
    """Retrieve chunks, expanding filters if initial search is empty."""
    kwargs = {"top_k": top_k}
    if parsed["insurer"]:
        kwargs["insurer"] = parsed["insurer"]
    if parsed["product_hints"]:
        official = resolve_product_name(parsed["product_hints"][0], parsed["insurer"])
        if official:
            kwargs["product"] = official

    results = search(parsed["raw"], **kwargs)

    # Fallback 1: drop product filter
    if not results and parsed["product_hints"] and parsed["insurer"]:
        results = search(parsed["raw"], insurer=parsed["insurer"], top_k=top_k)
    # Fallback 2: drop insurer filter
    if not results and parsed["insurer"]:
        results = search(parsed["raw"], top_k=top_k)
    # Fallback 3: broader query
    if not results:
        results = search(parsed["raw"] + " insurance", top_k=top_k)

    return results


def build_prompt(query: str, parsed: dict, results: list[dict]) -> str:
    """Build the LLM prompt with grounded context."""
    context_blocks = []
    for i, r in enumerate(results[:6], 1):
        m = r["metadata"]
        context_blocks.append(
            f"[{i}] Source: {m.get('product_name', 'Unknown')} "
            f"({m.get('insurer', '')} - {m.get('category', '')})\n"
            f"URL: {m.get('source_url', '')}\n"
            f"Section: {m.get('section_title', '')}\n"
            f"Content: {r['content'][:1200]}"
        )
    context = "\n\n".join(context_blocks)

    return f"""You are an insurance advisor assistant for "Insurance Support" run by Hari Kotian in Bengaluru, India.
You answer questions about LIC, ICICI Lombard, and Care Health Insurance products using ONLY the provided source documents.

STRICT RULES:
1. Answer ONLY from the retrieved context below. Never invent product names, benefits, terms, premiums, or conditions.
2. If the context does not answer the question, say: "Based on available information, I could not find a definitive answer for this. Please get in touch with Insurance Support for exact details." and do NOT guess.
3. Use simple, clear English suitable for Indian customers. Use short paragraphs and bullet points where helpful. Keep answers within 2-6 short paragraphs.
4. Cite sources inline like (Source: <product name>, <insurer>) where possible.
5. Be neutral and polite; never criticize insurers or policies.
6. Do NOT give tax, legal, or medical advice. If tax comes up (e.g. Section 80C/80D), mention it briefly and advise consulting a qualified professional.
7. End every answer with the exact signature block (always appended by the caller).

USER QUESTION: {query}

RETRIEVED CONTEXT:
{context}

Answer concisely and helpfully:"""


def call_llm(prompt: str, max_tokens: int = 700, temperature: float = 0.2) -> str:
    """Call the local OpenAI-compatible LLM."""
    try:
        with httpx.Client(timeout=120.0) as client:
            resp = client.post(
                f"{LLM_BASE_URL}/chat/completions",
                json={
                    "model": LLM_MODEL,
                    "messages": [{"role": "user", "content": prompt}],
                    "max_tokens": max_tokens,
                    "temperature": temperature,
                    "stream": False,
                },
            )
            resp.raise_for_status()
            data = resp.json()
            return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"LLM call failed: {e}")
        return ""


def rag_answer(query: str, include_signature: bool = True) -> dict:
    """Full RAG pipeline. Returns answer + sources + metadata."""
    parsed = parse_query(query)
    results = retrieve_context(parsed)

    if results:
        prompt = build_prompt(query, parsed, results)
        answer = call_llm(prompt)
    else:
        answer = ""

    if not answer:
        answer = (
            "Based on available information, I could not find a definitive answer "
            "for this in the current knowledge base. Please get in touch with "
            "Insurance Support for exact details."
        )

    if include_signature:
        answer += CONTACT_SIGNATURE

    sources = []
    seen = set()
    for r in results[:6]:
        m = r["metadata"]
        key = (m.get("product_name"), m.get("source_url"))
        if key in seen:
            continue
        seen.add(key)
        sources.append({
            "product_name": m.get("product_name"),
            "insurer": m.get("insurer"),
            "category": m.get("category"),
            "url": m.get("source_url"),
            "section": m.get("section_title"),
            "score": round(r["score"], 3),
        })

    return {
        "answer": answer,
        "sources": sources,
        "query": query,
        "parsed": parsed,
    }


def search_products(query: str, insurer: str = None, category: str = None, limit: int = 20) -> list[dict]:
    """Search product metadata table."""
    conn = get_db()
    sql = "SELECT * FROM products WHERE 1=1"
    params = []
    if insurer:
        sql += " AND insurer = ?"
        params.append(insurer)
    if category:
        sql += " AND category = ?"
        params.append(category)
    if query:
        sql += " AND (product_name LIKE ? OR category LIKE ? OR uin LIKE ?)"
        like = f"%{query}%"
        params += [like, like, like]
    sql += " ORDER BY insurer, category, product_name LIMIT ?"
    params.append(limit)

    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_product_details(product_name: str, insurer: str = None) -> dict:
    """Fetch structured metadata + coverage info for a product."""
    conn = get_db()
    sql = "SELECT * FROM products WHERE product_name = ?"
    params = [product_name]
    if insurer:
        sql += " AND insurer = ?"
        params.append(insurer)
    row = conn.execute(sql, params).fetchone()
    if not row:
        conn.close()
        return {"error": f"Product '{product_name}' not found"}

    product_id = row["id"]
    docs = conn.execute(
        "SELECT url, doc_type, title, last_fetched, chunk_count FROM documents WHERE product_id = ?",
        (product_id,),
    ).fetchall()
    conn.close()

    return {
        "product": dict(row),
        "documents": [dict(d) for d in docs],
    }


if __name__ == "__main__":
    import sys
    q = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "What are the key benefits of LIC Jeevan Anand?"
    result = rag_answer(q)
    print(json.dumps(result, indent=2, default=str))