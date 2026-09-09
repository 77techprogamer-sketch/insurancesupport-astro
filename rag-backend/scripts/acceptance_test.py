"""Acceptance test for the Insurance RAG API.

Covers the required question types:
- product benefits (LIC)
- plan comparison (ICICI)
- waiting periods / exclusions (Care, ICICI)
- motor add-ons (ICICI)
- product list queries (Care)

Usage: python scripts/acceptance_test.py [--api http://127.0.0.1:8000]
"""
import json
import sys
from pathlib import Path

import httpx

API = "http://127.0.0.1:8000"

TESTS = [
    {
        "name": "LIC product benefits",
        "query": "What are the key benefits of LIC Jeevan Anand?",
        "expect": {"insurer": "LIC", "min_sources": 1},
    },
    {
        "name": "ICICI family comparison",
        "query": "Compare ICICI Lombard health insurance plans for a family of 4",
        "expect": {"insurer": "ICICI Lombard", "min_sources": 1},
    },
    {
        "name": "Care PED waiting period",
        "query": "What waiting period applies for pre-existing diseases in Care Health policies?",
        "expect": {"insurer": "Care Health", "min_sources": 1},
    },
    {
        "name": "ICICI zero depreciation",
        "query": "Does ICICI Lombard car insurance cover zero depreciation?",
        "expect": {"insurer": "ICICI Lombard", "min_sources": 1},
    },
    {
        "name": "Care family floater list",
        "query": "List all current Care Health family-floater plans with approximate sum insured options",
        "expect": {"insurer": "Care Health", "min_sources": 1},
    },
    {
        "name": "Signature present",
        "query": "What is LIC Jeevan Umang?",
        "expect": {"signature": True},
    },
]

SIGNATURE_LINES = ["Hari Kotian, Insurance Support", "9986634506"]


def run_test(client, test):
    name = test["name"]
    q = test["query"]
    try:
        r = client.post(f"{API}/rag_answer", json={"query": q, "include_signature": True}, timeout=180)
        r.raise_for_status()
        d = r.json()
    except Exception as e:
        return {"name": name, "pass": False, "error": str(e)}

    fails = []
    answer = d.get("answer", "")
    sources = d.get("sources", [])

    exp = test["expect"]
    if "min_sources" in exp and len(sources) < exp["min_sources"]:
        fails.append(f"expected >= {exp['min_sources']} sources, got {len(sources)}")
    if "insurer" in exp:
        insurers = {s.get("insurer") for s in sources}
        if exp["insurer"] not in insurers:
            fails.append(f"expected sources from {exp['insurer']}, got {insurers}")
    if "signature" in exp and exp["signature"]:
        if not all(s in answer for s in SIGNATURE_LINES):
            fails.append("missing contact signature")

    # Anti-hallucination check: refuse answer should not be the ONLY content when sources exist
    if sources and "could not find a definitive answer" in answer and len(answer) < 200:
        fails.append("refused despite having sources")

    passed = not fails
    return {
        "name": name,
        "query": q,
        "pass": passed,
        "fails": fails,
        "answer_snippet": answer[:220],
        "sources": [s.get("product_name") for s in sources[:4]],
    }


def main():
    global API
    if "--api" in sys.argv:
        API = sys.argv[sys.argv.index("--api") + 1]

    client = httpx.Client(timeout=200)
    results = [run_test(client, t) for t in TESTS]

    passed = sum(1 for r in results if r["pass"])
    print(json.dumps(results, indent=2, default=str))
    print(f"\n{passed}/{len(results)} tests passed")
    sys.exit(0 if passed == len(results) else 1)


if __name__ == "__main__":
    main()