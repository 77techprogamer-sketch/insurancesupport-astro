"""Health check + monitoring for the Insurance RAG API.

Usage:
    python scripts/health_check.py            # all checks
    python scripts/health_check.py --api http://127.0.0.1:8000
"""
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

import httpx

API = "http://127.0.0.1:8000"


def check_api(base: str) -> dict:
    out = {"api": {"status": "down"}}
    try:
        r = httpx.get(f"{base}/health", timeout=10)
        out["api"] = r.json()
    except Exception as e:
        out["api"]["error"] = str(e)
    return out


def check_db() -> dict:
    from backend.database import get_db
    conn = get_db()
    out = {"db": {"status": "ok"}}
    try:
        out["db"]["products"] = conn.execute("SELECT COUNT(*) c FROM products").fetchone()["c"]
        out["db"]["documents"] = conn.execute("SELECT COUNT(*) c FROM documents").fetchone()["c"]
        out["db"]["chunks"] = conn.execute("SELECT COUNT(*) c FROM chunks").fetchone()["c"]
        out["db"]["last_crawl"] = conn.execute(
            "SELECT MAX(run_date) d FROM crawl_log WHERE status != 'success'"
        ).fetchone()["d"]
        out["db"]["latest_crawl"] = conn.execute(
            "SELECT run_date, status, documents_fetched, documents_failed FROM crawl_log ORDER BY id DESC LIMIT 1"
        ).fetchone()
        if out["db"]["latest_crawl"]:
            out["db"]["latest_crawl"] = dict(out["db"]["latest_crawl"])
    except Exception as e:
        out["db"]["status"] = "error"
        out["db"]["error"] = str(e)
    finally:
        conn.close()
    return out


def check_vectorstore() -> dict:
    from backend import vectorstore
    out = {"vectorstore": {"status": "ok"}}
    try:
        out["vectorstore"]["chunks"] = vectorstore.get_collection().count()
        out["vectorstore"]["test_search"] = len(vectorstore.search("LIC Jeevan Anand benefits", top_k=3))
    except Exception as e:
        out["vectorstore"]["status"] = "error"
        out["vectorstore"]["error"] = str(e)
    return out


def check_llm() -> dict:
    from backend.rag import LLM_BASE_URL, LLM_MODEL
    out = {"llm": {"status": "down", "endpoint": LLM_BASE_URL, "model": LLM_MODEL}}
    try:
        r = httpx.post(
            f"{LLM_BASE_URL}/chat/completions",
            json={"model": LLM_MODEL, "messages": [{"role": "user", "content": "ping"}],
                  "max_tokens": 5, "stream": False},
            timeout=60,
        )
        r.raise_for_status()
        out["llm"]["status"] = "ok"
    except Exception as e:
        out["llm"]["error"] = str(e)
    return out


def main():
    base = API
    if "--api" in sys.argv:
        base = sys.argv[sys.argv.index("--api") + 1]

    results = {}
    results.update(check_api(base))
    results.update(check_db())
    results.update(check_vectorstore())
    results.update(check_llm())

    print(json.dumps(results, indent=2, default=str))

    # Exit non-zero on any failure
    ok = all(v.get("status") == "ok" for v in results.values())
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()