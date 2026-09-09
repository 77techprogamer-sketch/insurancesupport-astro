# Insurance Support — Monorepo

One repository, two deployables:

```
.
├── src/                 # Astro site (frontend) → Cloudflare Pages
├── functions/           # Cloudflare Pages Functions (lead capture, geo, etc.)
├── public/              # Static assets
├── rag-backend/         # Python RAG chatbot backend (FastAPI + ChromaDB)
│   ├── backend/         #   API, RAG pipeline, vector store, crawlers
│   ├── scripts/         #   daily update, health check, export
│   ├── requirements.txt
│   └── DEPLOYMENT.md
└── wrangler.toml        # Cloudflare Pages config
```

## The two halves can't be one runtime

- The **site** is a static Astro build served by Cloudflare Pages — no Python runtime.
- The **RAG backend** is a Python process (FastAPI + ChromaDB + sentence-transformers) that must run on a host with Python (VPS / Railway / Render / Fly.io) or locally.

They interlink: the site's `Chatbot.astro` widget calls the backend's `/rag_answer` endpoint over HTTPS.

## Deploying the site

```bash
npm install
npm run build        # outputs dist/
wrangler pages deploy dist --project-name insurancesupport-online
```

## Deploying the backend

See `rag-backend/DEPLOYMENT.md`. Quick summary:

1. On a Python host: `pip install -r requirements.txt`
2. Set env: `LLM_BASE_URL` (the LLM gateway, e.g. the Hermes provider on `127.0.0.1:20128`), `RAG_LEAD_SHEET_ID`, `RAG_DRIVE_FOLDER_ID`
3. Run: `uvicorn backend.api:app --host 0.0.0.0 --port 8000`
4. Put HTTPS in front (Caddy auto-TLS or Cloudflare Tunnel)

## Wiring the chatbot to the live API

The chatbot's API endpoint lives in `src/components/Chatbot.astro`:

```js
const API_BASE = "http://127.0.0.1:8000";  // ← replace with your public HTTPS API URL
```

Change it to the deployed backend URL (e.g. `https://rag.yourdomain.com`), rebuild, redeploy.

## What's intentionally NOT in git

- `rag-backend/data/` (ChromaDB + SQLite, ~212 MB) — regenerate with `scripts/daily_update.py`
- `rag-backend/exports/` (model zips, ~246 MB) — backups to Google Drive
- `.venv/`, `node_modules/`, `.env`, service account keys