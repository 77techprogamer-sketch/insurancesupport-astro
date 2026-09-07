# Deploying the Insurance RAG Chatbot

Two deployment options, depending on where you want the chatbot to live.

## Option A — Local server (quick start, dev/test)

1. Start the API:
   ```
   start-api.bat
   ```
2. Open `frontend/index.html` in a browser (or serve it):
   ```
   python -m http.server 8080 -d frontend
   ```
   → http://127.0.0.1:8080

The chatbot connects to `http://127.0.0.1:8000`. For a visitor-facing site you need HTTPS + a public host (Option B/C).

## Option B — Cloudflare Pages (matches your Astro site at insurancesupport.online)

Deploy the chatbot as a static page:

1. Add a new page or route on insurancesupport.online (Astro project):
   - Copy `frontend/index.html` content into `src/pages/chatbot.astro` (wrap the body content),
   - Or deploy `frontend/` as a separate Cloudflare Pages project (`wrangler pages deploy frontend --project-name insurance-chatbot`).

2. The `API_BASE` in the page must point to the deployed RAG API (see Option C).

3. Cloudflare CORS: the API must allow the page origin. `backend/api.py` currently allows `*`; tighten to your domain in production:
   ```python
   allow_origins=["https://insurancesupport.online"]
   ```

Note: the Astro site is static (no server), so the API cannot run inside it — it needs its own host.

## Option C — Public RAG API host (required for any public chatbot)

The RAG API is a Python process. Recommended minimal host options:

- **VPS** (DigitalOcean / Hetzner / Oracle Free): install Python 3.11, copy `insurance-rag/`, run `start-api.bat` equivalent, reverse-proxy with Caddy/nginx for HTTPS (Caddy auto-TLS).
- **Python PaaS** (Railway / Render / Fly.io): point at `backend/api.py` port 8000; set the LLM base URL env var.
- **Cloudflare Tunnel** (no VPS needed): `cloudflared tunnel --url http://127.0.0.1:8000` gives you a public HTTPS URL to the local FastAPI. Great for a single-visitor test; less robust for production.

Whatever host: expose only `/health`, `/search_products`, `/get_product_details`, `/rag_answer`. Keep the LLM endpoint (`127.0.0.1:20128`) private — never expose it.

## Required secrets/env (never commit)

- `backend/rag.py` → `LLM_BASE_URL` (default local 127.0.0.1:20128) and `LLM_MODEL` (`oc/big-pickle`) — move to env vars on a public host.
- No other credentials are needed (SQLite + local ChromaDB + public web crawling).

## Restart / maintenance

- Restart API: kill uvicorn, run `start-api.bat`.
- Rebuild index after schema changes: `python -c "from backend.vectorstore import index_all_chunks; index_all_chunks()"`.
- Daily update is a Hermes cron job (`Insurance RAG Daily Update`, 4 AM) → `scripts/cron_wrapper.py`; also trigger manually with `python scripts/daily_update.py`.
- Health: `python scripts/health_check.py` (checks API, DB, vector store, LLM).