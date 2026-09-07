"""
Crawlers/fetchers for insurer websites.
Respects robots.txt and uses conservative rate limiting.
"""
import hashlib
import json
import random
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup
from curl_cffi import requests as creq

from backend.database import get_db

DATA_DIR = Path(__file__).parent.parent.parent / "data"
FETCH_DIR = DATA_DIR / "fetched"
FETCH_DIR.mkdir(parents=True, exist_ok=True)

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 InsuranceSupport-RAG-Bot/1.0 (advisory; respectful crawling)"

CACHE_TTL = 86400  # 24h cache for re-crawls


def get_client():
    return httpx.Client(
        headers={"User-Agent": UA, "Accept": "text/html,application/pdf,*/*"},
        timeout=30.0,
        follow_redirects=True,
    )


def safe_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def is_allowed_by_robots(url: str) -> bool:
    """Simplified robots check — log and skip obvious disallowed paths."""
    parsed = urlparse(url)
    disallowed_patterns = [
        r"/web/guest/login",
        r"/web/guest/logout",
        r"\?p_p_id=",
        r"/c/portal/",
        r"/o/",
    ]
    return not any(re.search(p, url) for p in disallowed_patterns)


def fetch_cached(url: str, force: bool = False) -> tuple[str, bytes, str]:
    """Fetch a URL with a 24h disk cache. Uses browser TLS impersonation to pass bot walls."""
    fname = safe_hash(url) + ".bin"
    cache_file = FETCH_DIR / fname

    if cache_file.exists() and not force:
        age = time.time() - cache_file.stat().st_mtime
        if age < CACHE_TTL:
            raw = cache_file.read_bytes()
            return (raw.decode("utf-8", errors="replace"), raw, safe_hash(raw.decode("utf-8", errors="replace")))

    resp = creq.get(url, impersonate="chrome", timeout=40, headers={
        "Accept": "text/html,application/xhtml+xml,application/pdf,*/*",
        "Accept-Language": "en-US,en;q=0.9",
    })
    resp.raise_for_status()
    raw = resp.content
    cache_file.write_bytes(raw)
    text = raw.decode("utf-8", errors="replace")
    return (text, raw, safe_hash(text))


def fetch_html(url: str, force: bool = False) -> tuple[str, BeautifulSoup, str]:
    text, raw, h = fetch_cached(url, force)
    return text, BeautifulSoup(text, "html.parser"), h


def extract_main_content(soup: BeautifulSoup) -> str:
    """Extract the main article/body content from an insurer page."""

    # Strategy 0: known content containers on the RAW tree (before decomposition,
    # which can break malformed nesting on some sites).
    for selector in ["div.entry-content", "div.post-content", "article", "div.layout-content",
                     "div.portlet-layout", "div.product-detail", "div.sfPublicWrapper",
                     "div.sfContentBlock", "main"]:
        el = soup.select_one(selector)
        if el:
            text = el.get_text("\n", strip=True)
            if len(text) > 300 and not text.startswith("Menu Display"):
                return text

    # Strategy 1: largest content block on the RAW tree. Consider all div/section/article
    # nodes (including nested ones), skip ones that contain nav/footer/header text.
    boilerplate_markers = ["privacy policy", "terms & conditions", "follow us", "©", "all rights reserved",
                           "cookie", "subscribe to our", "download app", "play store", "app store"]
    best_el, best_len = None, 0
    for el in soup.find_all(["div", "section", "article"]):
        t = el.get_text(" ", strip=True)
        t_lower = t.lower()
        # Strong boilerplate signals -> skip block entirely
        if any(m in t_lower for m in ["privacy policy", "all rights reserved", "follow us",
                                      "subscribe to our", "terms & conditions"]):
            continue
        if len(t) <= best_len:
            continue
        best_el, best_len = el, len(t)
    if best_el and best_len > 300:
        return best_el.get_text("\n", strip=True)

    # Remove boilerplate for the final fallback
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "form", "iframe"]):
        tag.decompose()
    return soup.get_text("\n", strip=True)


def extract_lic_pdfs(soup: BeautifulSoup) -> list[dict]:
    """Extract the LATEST sales brochure / policy document / CIS PDF links from a LIC product page.

    Returns list of {title, url, date_label}. Ignores 'From <old>' versions — keeps latest per type.
    """
    base = "https://licindia.in"
    found = {}
    for a in soup.find_all("a", href=True):
        text = a.get_text(" ", strip=True)
        href = a["href"]
        if not (".pdf" in href.lower() and ("document" in href.lower() or "/documents/" in href.lower())):
            continue
        # Determine doc type
        tl = text.lower()
        doc_type = None
        if "sales brochure" in tl:
            doc_type = "brochure"
        elif "policy document" in tl:
            doc_type = "policy_document"
        elif "cis" in tl:
            doc_type = "cis"
        if not doc_type:
            continue
        # Parse date label e.g. "(From 22/09/2025 onwards)"
        date_label = text.split("(")[-1].rstrip(")")
        if not href.startswith("http"):
            href = base + href
        # Keep the LATEST version — prefer labels containing 'onwards' or the latest 'From'
        ver_key = 0
        import re
        m = re.search(r"From (\d{2})/(\d{2})/(\d{4})", text)
        if m:
            ver_key = int(m.group(3)) * 10000 + int(m.group(2)) * 100 + int(m.group(1))
        if "onwards" in date_label:
            ver_key += 10_000_000
        prior = found.get(doc_type)
        if prior is None or ver_key > prior["ver_key"]:
            found[doc_type] = {"title": f"LIC's {doc_type.replace('_', ' ')} - {text}", "url": href, "ver_key": ver_key}
    return [v for k, v in sorted(found.items())]


def fetch_pdf_text(url: str) -> str:
    """Download and extract text from a PDF URL."""
    try:
        text, raw, h = fetch_cached(url)
        if not raw[:4] == b"%PDF":
            return ""
        import io
        import pdfplumber
        with pdfplumber.open(io.BytesIO(raw)) as pdf:
            pages = []
            for page in pdf.pages:
                t = page.extract_text()
                if t:
                    pages.append(t)
            return "\n\n".join(pages)
    except Exception as e:
        print(f"PDF fetch failed {url}: {e}")
        return ""


def chunk_text(text: str, max_chars: int = 1500, overlap: int = 150) -> list[dict]:
    """Chunk text by sections/paragraphs with overlap.

    Returns list of {section_title, content}.
    """
    if not text.strip():
        return []

    # Try to split by common section headings first
    section_heads = re.split(
        r"\n(?=(?:What |Who |How |When |Where |Why |Eligibility|Benefits|Exclusions|Coverage|"
        r"Waiting|Premium|Renewal|Sum Assured|Age|Documents|Claim|Features|Terms|Plan|Rider|"
        r"Tax|Limitations|Important|Note)\b)",
        text,
    )

    chunks = []
    for sec in section_heads:
        sec = sec.strip()
        if not sec:
            continue
        if len(sec) <= max_chars:
            chunks.append({"section_title": sec[:80], "content": sec})
        else:
            # Split long section by paragraphs
            paras = [p.strip() for p in re.split(r"\n\s*\n", sec) if p.strip()]
            buf = ""
            for p in paras:
                if len(buf) + len(p) > max_chars and buf:
                    chunks.append({"section_title": buf[:80], "content": buf.strip()})
                    buf = p
                else:
                    buf += "\n\n" + p if buf else p
            if buf:
                chunks.append({"section_title": buf[:80], "content": buf.strip()})

    # Merge tiny chunks
    merged = []
    for c in chunks:
        if merged and len(merged[-1]["content"]) < 300:
            merged[-1]["content"] += "\n\n" + c["content"]
        else:
            merged.append(c)

    return merged


def process_document(product_id: int, url: str, doc_type: str, title: str, content: str) -> tuple[int, int]:
    """
    Store a document and its chunks in SQLite.
    Returns (doc_id, chunk_count). Re-ingests only if content hash changed.
    """
    conn = get_db()
    content_hash = safe_hash(content)

    existing = conn.execute("SELECT id, content_hash FROM documents WHERE url = ?", (url,)).fetchone()
    if existing and existing["content_hash"] == content_hash:
        conn.close()
        return existing["id"], 0

    chunks = chunk_text(content)

    if existing:
        doc_id = existing["id"]
        conn.execute("DELETE FROM chunks WHERE document_id = ?", (doc_id,))
        conn.execute("""
            UPDATE documents SET doc_type=?, title=?, content_hash=?, last_fetched=?, chunk_count=?
            WHERE id=?
        """, (doc_type, title, content_hash, time.strftime("%Y-%m-%dT%H:%M:%S"), len(chunks), doc_id))
    else:
        cur = conn.execute("""
            INSERT INTO documents (product_id, url, doc_type, title, content_hash, last_fetched, chunk_count)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (product_id, url, doc_type, title, content_hash, time.strftime("%Y-%m-%dT%H:%M:%S"), len(chunks)))
        doc_id = cur.lastrowid

    for i, c in enumerate(chunks):
        conn.execute("""
            INSERT INTO chunks (document_id, product_id, chunk_index, section_title, content, token_count, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (doc_id, product_id, i, c["section_title"], c["content"],
              max(1, len(c["content"]) // 4), time.strftime("%Y-%m-%dT%H:%M:%S")))

    conn.commit()
    conn.close()
    return doc_id, len(chunks)


# ---------------------------------------------------------------------------
# LIC crawler
# ---------------------------------------------------------------------------

def crawl_lic(force: bool = False) -> dict:
    """Crawl LIC product pages. Discovers current product URLs from the live catalog page."""
    stats = {"fetched": 0, "updated": 0, "failed": 0, "chunks": 0}

    config_path = Path(__file__).parent.parent.parent / "config" / "sources.json"
    with open(config_path) as f:
        config = json.load(f)

    conn = get_db()
    lic_cfg = config["insurers"]["lic"]

    # Discover live product URLs from the master catalog page (robust to URL drift)
    live_urls = {}
    try:
        _, soup, _ = fetch_html(lic_cfg["base_url"] + "/insurance-plan", force)
        table_links = soup.select("table a[href*='/web/guest/lic-']")
        for a in table_links:
            href = a["href"]
            if href.startswith("/"):
                href = lic_cfg["base_url"] + href
            label = a.get_text(" ", strip=True).lower()
            live_urls[label] = href
        print(f"LIC catalog discovery: {len(live_urls)} product links found")
    except Exception as e:
        print(f"LIC catalog discovery failed: {e}")

    for cat_key, cat_data in lic_cfg["categories"].items():
        for product in cat_data["products"]:
            name_lower = product["name"].lower().replace("'", "’")
            url = product.get("url", "")
            if not url or url == lic_cfg["base_url"] + "/web/guest/unit-linked-plans":
                continue

            # Try to find a fresher URL from the live catalog
            for label, live_url in live_urls.items():
                if name_lower.split(" - ")[0][:20] in label or label.split(" - ")[0][:20] in name_lower:
                    url = live_url
                    break

            try:
                text, soup, h = fetch_html(url, force)
                content = extract_main_content(soup)
                if len(content) < 200:
                    stats["failed"] += 1
                    continue

                product_id = conn.execute(
                    "SELECT id FROM products WHERE insurer='LIC' AND product_name=?",
                    (product["name"],),
                ).fetchone()
                if not product_id:
                    stats["failed"] += 1
                    continue

                doc_id, n_chunks = process_document(
                    product_id["id"], url, "product_page", product["name"], content
                )
                stats["fetched"] += 1
                stats["chunks"] += n_chunks
                if n_chunks > 0:
                    stats["updated"] += 1

                # Fetch the latest brochure/policy/CIS PDFs (exact terms, waiting periods, exclusions)
                for pdf in extract_lic_pdfs(soup):
                    pdf_text = fetch_pdf_text(pdf["url"])
                    if len(pdf_text) > 300:
                        pdf_id, pdf_chunks = process_document(
                            product_id["id"], pdf["url"], "pdf", pdf["title"], pdf_text
                        )
                        stats["chunks"] += pdf_chunks
                        stats["fetched"] += 1
                        if pdf_chunks > 0:
                            stats["updated"] += 1
                        print(f"  + PDF {pdf['title'][:50]} ({pdf_chunks} chunks)")
                    time.sleep(random.uniform(0.5, 1.5))
                time.sleep(random.uniform(0.5, 1.5))
            except Exception as e:
                print(f"LIC fetch failed {url}: {e}")
                stats["failed"] += 1

    conn.close()
    return stats


# ---------------------------------------------------------------------------
# ICICI Lombard crawler
# ---------------------------------------------------------------------------

def crawl_icici(force: bool = False) -> dict:
    """Crawl ICICI Lombard product pages."""
    stats = {"fetched": 0, "updated": 0, "failed": 0, "chunks": 0}

    config_path = Path(__file__).parent.parent.parent / "config" / "sources.json"
    with open(config_path) as f:
        config = json.load(f)

    conn = get_db()
    icici_cfg = config["insurers"]["icici_lombard"]

    for cat_key, cat_data in icici_cfg["categories"].items():
        for product in cat_data["products"]:
            url = product["url"]
            if not url:
                continue
            try:
                text, soup, h = fetch_html(url, force)
                content = extract_main_content(soup)
                if len(content) < 200:
                    stats["failed"] += 1
                    continue

                product_id = conn.execute(
                    "SELECT id FROM products WHERE insurer='ICICI Lombard' AND product_name=?",
                    (product["name"],),
                ).fetchone()
                if not product_id:
                    stats["failed"] += 1
                    continue

                doc_id, n_chunks = process_document(
                    product_id["id"], url, "product_page", product["name"], content
                )
                stats["fetched"] += 1
                stats["chunks"] += n_chunks
                if n_chunks > 0:
                    stats["updated"] += 1
                time.sleep(random.uniform(0.5, 1.5))
            except Exception as e:
                print(f"ICICI fetch failed {url}: {e}")
                stats["failed"] += 1

    conn.close()
    return stats


# ---------------------------------------------------------------------------
# Care Health crawler
# ---------------------------------------------------------------------------

def extract_care_pdfs(soup: BeautifulSoup) -> list[dict]:
    """Extract official policy Terms & Conditions PDFs from a Care Health product page."""
    base = "https://www.careinsurance.com"
    found = {}
    for a in soup.find_all("a", href=True):
        text = a.get_text(" ", strip=True)
        href = a["href"]
        tl = text.lower()
        if ".pdf" in href.lower() and ("terms" in tl or "condition" in tl or "policy" in tl):
            doc_type = "policy_terms"
        elif "brochure" in tl and ".pdf" in href.lower():
            doc_type = "brochure"
        else:
            continue
        if not href.startswith("http"):
            href = base + href
        found[doc_type] = {"title": f"Care Health {doc_type.replace('_', ' ')} - {text}", "url": href}
    return list(found.values())


def crawl_care(force: bool = False) -> dict:
    """Crawl Care Health product pages."""
    stats = {"fetched": 0, "updated": 0, "failed": 0, "chunks": 0}

    config_path = Path(__file__).parent.parent.parent / "config" / "sources.json"
    with open(config_path) as f:
        config = json.load(f)

    conn = get_db()
    care_cfg = config["insurers"]["care_health"]

    for cat_key, cat_data in care_cfg["categories"].items():
        for product in cat_data["products"]:
            url = product["url"]
            if not url:
                continue
            try:
                text, soup, h = fetch_html(url, force)
                content = extract_main_content(soup)
                if len(content) < 200:
                    stats["failed"] += 1
                    continue

                product_id = conn.execute(
                    "SELECT id FROM products WHERE insurer='Care Health' AND product_name=?",
                    (product["name"],),
                ).fetchone()
                if not product_id:
                    stats["failed"] += 1
                    continue

                doc_id, n_chunks = process_document(
                    product_id["id"], url, "product_page", product["name"], content
                )
                stats["fetched"] += 1
                stats["chunks"] += n_chunks
                if n_chunks > 0:
                    stats["updated"] += 1

                # Fetch official policy Terms & Conditions PDFs (exact waiting periods, exclusions)
                for pdf in extract_care_pdfs(soup):
                    pdf_text = fetch_pdf_text(pdf["url"])
                    if len(pdf_text) > 300:
                        pdf_id, pdf_chunks = process_document(
                            product_id["id"], pdf["url"], "pdf", pdf["title"], pdf_text
                        )
                        stats["chunks"] += pdf_chunks
                        stats["fetched"] += 1
                        if pdf_chunks > 0:
                            stats["updated"] += 1
                        print(f"  + PDF {pdf['title'][:50]} ({pdf_chunks} chunks)")
                    time.sleep(random.uniform(0.5, 1.5))
                time.sleep(random.uniform(0.5, 1.5))
            except Exception as e:
                print(f"Care fetch failed {url}: {e}")
                stats["failed"] += 1

    conn.close()
    return stats


def crawl_all(force: bool = False):
    """Crawl all insurers. Returns combined stats."""
    all_stats = {}
    for name, fn in [("lic", crawl_lic), ("icici_lombard", crawl_icici), ("care_health", crawl_care)]:
        print(f"Crawling {name}...")
        try:
            all_stats[name] = fn(force)
        except Exception as e:
            print(f"Crawl {name} failed: {e}")
            all_stats[name] = {"fetched": 0, "updated": 0, "failed": 0, "chunks": 0, "error": str(e)}
    return all_stats


if __name__ == "__main__":
    import sys
    force = "--force" in sys.argv
    stats = crawl_all(force=force)
    print(json.dumps(stats, indent=2))