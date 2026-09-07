"""Package the RAG knowledge base for backup/transfer.

Creates a dated, versioned archive (zip) of the retrievable state:
  - data/insurance_metadata.db        (SQLite: products, documents, chunks, crawl_log)
  - data/chroma/                      (ChromaDB vector index)
  - data/fetched/                     (24h fetch cache — optional, small)
  - config/sources.json               (product catalog config)
  - manifest.json                     (counts, schema version, generated-at)

Usage:
  python scripts/export_model.py [--out PATH] [--no-cache]

Output: <project>/exports/insurance-rag-model_YYYYMMDD_HHMMSS.zip
"""

from __future__ import annotations

import json
import sys
import time
import zipfile
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_DIR))

from backend.database import DB_PATH  # noqa: E402

CHROMA_DIR = PROJECT_DIR / "data" / "chroma"
FETCH_DIR = PROJECT_DIR / "data" / "fetched"
CONFIG_FILE = PROJECT_DIR / "config" / "sources.json"
EXPORT_DIR = PROJECT_DIR / "exports"

SCHEMA_VERSION = "1.0"


def _db_counts() -> dict:
    import sqlite3

    conn = sqlite3.connect(str(DB_PATH))
    counts = {}
    for table in ["products", "documents", "chunks", "crawl_log"]:
        try:
            counts[table] = conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
        except Exception:
            counts[table] = 0
    conn.close()
    return counts


def export_model(out_path: str | None = None, include_cache: bool = True) -> Path:
    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    stamp = time.strftime("%Y%m%d_%H%M%S")
    dest = Path(out_path) if out_path else EXPORT_DIR / f"insurance-rag-model_{stamp}.zip"

    manifest = {
        "schema_version": SCHEMA_VERSION,
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "counts": _db_counts(),
        "files": [],
    }

    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as zf:
        # SQLite DB (with WAL checkpointed -> single consistent file)
        if DB_PATH.exists():
            zf.write(DB_PATH, "data/insurance_metadata.db")
            manifest["files"].append("data/insurance_metadata.db")

        # Chroma vector store
        if CHROMA_DIR.exists():
            for p in sorted(CHROMA_DIR.rglob("*")):
                if p.is_file():
                    zf.write(p, p.relative_to(PROJECT_DIR))
                    manifest["files"].append(str(p.relative_to(PROJECT_DIR)))

        # Fetch cache (optional)
        if include_cache and FETCH_DIR.exists():
            for p in sorted(FETCH_DIR.rglob("*")):
                if p.is_file():
                    zf.write(p, p.relative_to(PROJECT_DIR))
                    manifest["files"].append(str(p.relative_to(PROJECT_DIR)))

        # Config
        if CONFIG_FILE.exists():
            zf.write(CONFIG_FILE, "config/sources.json")
            manifest["files"].append("config/sources.json")

        # Manifest last (readers can trust the rest once they see it)
        zf.writestr("manifest.json", json.dumps(manifest, indent=2))

    return dest


if __name__ == "__main__":
    out = None
    include_cache = True
    args = sys.argv[1:]
    if "--out" in args:
        out = args[args.index("--out") + 1]
    if "--no-cache" in args:
        include_cache = False

    path = export_model(out_path=out, include_cache=include_cache)
    size_mb = path.stat().st_size / (1024 * 1024)
    print(f"Exported RAG model -> {path} ({size_mb:.1f} MB)")