"""Daily auto-update script for the Insurance RAG knowledge base.

Runs: crawl -> detect changes -> re-chunk -> re-embed changed docs -> log.
Designed to be invoked by a scheduler (cron / Hermes gateway) once per day.

Usage: python -m scripts.daily_update [--force]
"""
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database import get_db, init_db, load_products_from_config
from backend.crawlers import crawler
from backend.vectorstore import sync_index


def run_daily_update(force: bool = False) -> dict:
    start = time.time()
    init_db()
    load_products_from_config()  # refresh product metadata (new/removed products)

    stats = crawler.crawl_all(force=force)

    total_fetched = sum(s.get("fetched", 0) for s in stats.values())
    total_updated = sum(s.get("updated", 0) for s in stats.values())
    total_failed = sum(s.get("failed", 0) for s in stats.values())
    total_chunks = sum(s.get("chunks", 0) for s in stats.values())

    # After crawling, export the model and upload to Drive (optional)
    try:
        from scripts.export_model import export_model
        archive_path = export_model()
        print(f"Model exported to {archive_path}")
        # Upload (if user configured a Drive folder or env var)
        from backend.google_integration import upload_file, find_folder
        folder_id = settings.RAG_DRIVE_FOLDER_ID or find_folder('Insurance-RAG-Backups', create_if_missing=True)
        if folder_id:
            result = upload_file(str(archive_path), parent_folder_id=folder_id)
            print(f"Uploaded backup to Drive: {result.get('webViewLink')}")
    except Exception as e:
        print(f"Optional Drive upload failed: {e}")

    duration = time.time() - start
    report = {
        "run_date": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "duration_seconds": round(duration, 1),
        "per_insurer": stats,
        "documents_fetched": total_fetched,
        "documents_updated": total_updated,
        "documents_failed": total_failed,
        "chunks_created": total_chunks,
        "new_chunks_indexed": new_chunks,
        "status": "success" if total_failed <= total_fetched else "partial_failure",
    }

    # Write log entry
    conn = get_db()
    conn.execute("""
        INSERT INTO crawl_log
        (run_date, insurer, status, documents_fetched, documents_updated, documents_failed,
         chunks_created, duration_seconds, error_message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        report["run_date"], "ALL", report["status"], total_fetched, total_updated,
        total_failed, total_chunks, duration, None, time.strftime("%Y-%m-%dT%H:%M:%S"),
    ))
    conn.commit()
    conn.close()

    # Write human-readable report
    report_dir = Path(__file__).parent.parent / "backend" / "logs"
    report_dir.mkdir(parents=True, exist_ok=True)
    report_file = report_dir / f"update_{time.strftime('%Y%m%d')}.json"
    report_file.write_text(json.dumps(report, indent=2, default=str))

    print(json.dumps(report, indent=2))
    return report


if __name__ == "__main__":
    force = "--force" in sys.argv
    run_daily_update(force=force)