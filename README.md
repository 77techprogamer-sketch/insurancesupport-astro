# Insurance Support — RAG Backend + Chatbot

Retrieval-Augmented Generation backend answering product questions about **LIC, ICICI Lombard, and Care Health Insurance**, with a web chatbot frontend, for Hari Kotian's Insurance Support advisory (Bengaluru).

## Architecture

```
insurance-rag/
├── config/sources.json        # Product catalog: 86 products across 3 insurers
├── backend/
│   ├── database.py            # SQLite metadata (products, documents, chunks, crawl_log)
│   ├── crawlers/crawler.py    # curl_cffi fetchers (browser impersonation), parsers, chunkers
│   ├── vectorstore.py         # ChromaDB persistent store + sentence-transformers embeddings
│   ├── rag.py                 # Query parse → retrieve → LLM ground → signature
│   └── api.py                 # FastAPI: /health /search_products /get_product_details /rag_answer
├── scripts/
│   ├── daily_update.py        # Full refresh: crawl → diff → re-chunk → incremental re-embed → log
│   └── health_check.py        # All-components status
├── frontend/index.html        # Mobile-friendly chatbot SPA
└── data/                      # SQLite DB + Chroma + fetch cache (generated)
```

## Quick Start

```bash
# 1. Install deps
pip install -r requirements.txt

# 2. Init DB (creates products table from sources.json)
python -c "from backend.database import init_db, load_products_from_config; init_db(); load_products_from_config()"

# 3. Initial crawl + index
python -c "from backend.crawlers import crawler; crawler.crawl_all(force=True)"
python -c "from backend.vectorstore import index_all_chunks(); index_all_chunks()"

# 4. Run API
python -m uvicorn backend.api:app --host 127.0.0.1 --port 8000

# 5. Open the chatbot
#    frontend/index.html  (defaults to http://127.0.0.1:8000)
```

## API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/health` | GET | API + vector store status |
| `/search_products` | GET | Product lookup (name/category/insurer) |
| `/get_product_details` | GET | Full product metadata + linked docs |
| `/rag_answer` | POST | Natural-language Q → grounded answer + sources + signature |

### Example

```bash
curl -s http://127.0.0.1:8000/rag_answer \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the pre-existing disease waiting period in Care Health policies?"}'
```

Response includes `answer` (with contact signature) and `sources` (product, insurer, URL, score).

## Daily Auto-Update

- `python scripts/daily_update.py` — crawl → diff content hashes → re-chunk changed docs → incremental re-embed → log.
- Schedule with Windows Task Scheduler:
  ```
  schtasks /Create /TN "InsuranceRAG_Daily" /TR "python C:\Users\A\Desktop\insurance-rag\scripts\daily_update.py" /SC DAILY /ST 04:00
  ```
- Logs: `data/insurance_metadata.db → crawl_log` table + `backend/logs/update_YYYYMMDD.json`.

## Contact Signature (enforced)

Every customer-facing answer ends with exactly:

```
Name: Hari Kotian, Insurance Support
Contact (Call & WhatsApp): 9986634506
```

## Notes & Limitations

- **LLM**: uses the local OpenAI-compatible endpoint (`http://127.0.0.1:20128/v1`, model `oc/big-pickle`). Configure via `backend/rag.py`.
- **Embeddings**: `paraphrase-multilingual-MiniLM-L12-v2` (local, first load downloads from HF Hub).
- **Crawling**: `curl_cffi` Chrome impersonation to pass bot walls; 24h disk cache; conservative delays. No personal data stored.
- **Zero-depreciation / motor add-ons**: covered only where present in fetched ICICI Lombard pages; answers say "not found" otherwise.