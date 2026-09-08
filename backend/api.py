"""FastAPI server exposing the RAG backend."""
import time
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.database import get_db, init_db
from backend.rag import rag_answer, search_products, get_product_details
from backend import vectorstore
from backend import settings

app = FastAPI(
    title="Insurance Support RAG API",
    description="RAG backend for LIC, ICICI Lombard, and Care Health product queries.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str = Field(..., min_length=2, description="Natural-language insurance question")
    include_signature: bool = True


class LeadRecord(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    phone: str = Field(..., min_length=7, max_length=20)
    email: str = Field("", max_length=120)
    city: str = Field("", max_length=120)
    interested_product: str = Field("", max_length=200)
    insurer: str = Field("", max_length=120)
    message: str = Field("", max_length=2000)
    source: str = Field("", max_length=120)
    page_url: str = Field("", max_length=500)


@app.on_event("startup")
def startup():
    init_db()
    # Model is stored locally in the repository — no Drive download needed.
    # RAG_MODEL_FROM_DRIVE environment variable is ignored.
    # download_model script is no longer executed.



@app.get("/health")
def health():
    try:
        count = vectorstore.get_collection().count()
        return {"status": "ok", "vector_chunks": count, "time": time.time()}
    except Exception as e:
        return {"status": "degraded", "error": str(e)}


@app.get("/")
def root():
    return {
        "name": "Insurance Support RAG API",
        "endpoints": ["/search_products", "/get_product_details", "/rag_answer", "/health"],
    }


@app.get("/search_products")
def api_search_products(
    query: str = Query("", description="Search term"),
    insurer: str = Query(None, description="LIC / ICICI Lombard / Care Health"),
    category: str = Query(None, description="health, motor, life, travel..."),
    limit: int = Query(20, le=50),
):
    try:
        return {"results": search_products(query, insurer, category, limit)}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.get("/get_product_details")
def api_get_product_details(
    product_name: str = Query(..., description="Exact product name"),
    insurer: str = Query(None, description="Optional insurer filter"),
):
    try:
        return get_product_details(product_name, insurer)
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/rag_answer")
def api_rag_answer(req: QueryRequest):
    try:
        return rag_answer(req.query, include_signature=req.include_signature)
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/lead")
def api_lead_capture(lead: LeadRecord):
    """Capture a visitor lead and APPEND it to the configured Google Sheet.

    Append-only: uses the Sheets values.append API, which always adds a new
    row below existing data — it never overwrites rows and never creates a
    new sheet. Requires RAG_LEAD_SHEET_ID to be configured.
    """
    if not settings.lead_capture_enabled():
        raise HTTPException(
            503, "Lead capture is not configured (set RAG_LEAD_SHEET_ID)."
        )

    from backend.google_integration import append_lead

    row = [
        datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
        lead.name,
        lead.phone,
        lead.email,
        lead.city,
        lead.interested_product,
        lead.insurer,
        lead.message,
        lead.source,
        lead.page_url,
    ]

    # Pass None if sheet name is the default/empty so auto-detect picks the real tab
    sheet_name = settings.LEAD_SHEET_NAME
    if sheet_name in ("Sheet1", ""):
        sheet_name = None

    try:
        result = append_lead(
            settings.LEAD_SHEET_ID,
            row,
            sheet_name=sheet_name,
            headers=settings.LEAD_HEADERS,
            ensure_header=True,
        )
    except Exception as e:
        # Never leak credentials/details; log server-side and return a generic message.
        print(f"LEAD APPEND FAILED: {e}")
        raise HTTPException(502, "Could not save your details. Please try again.")

    return {
        "status": "ok",
        "message": "Thank you! Your details have been saved. We will contact you shortly.",
        "sheet": result.get("spreadsheetId", ""),
        "row_appended": True,
    }


@app.post("/rag_answer_plain")
def api_rag_answer_plain(req: QueryRequest):
    """Single-string response (for simple chatbot integrations)."""
    try:
        result = rag_answer(req.query, include_signature=req.include_signature)
        return {"answer": result["answer"], "sources": result["sources"]}
    except Exception as e:
        raise HTTPException(500, str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=False)