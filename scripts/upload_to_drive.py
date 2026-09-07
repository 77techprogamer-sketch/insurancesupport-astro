"""Upload the exported RAG model archive to Google Drive.

Supports two credential paths (in priority order):
  1. Service account key  (best for cron: no refresh needed)
     -> GOOGLE_SERVICE_ACCOUNT env or config/service_account.json
  2. OAuth user token shared with Hermes  (auto-refreshes via client_secret)
     -> ~/.hermes/google_token.json + google_client_secret.json

Usage:
  python scripts/upload_to_drive.py [--file PATH] [--folder FOLDER_NAME]
  python scripts/upload_to_drive.py                       # auto-finds latest export
"""

from __future__ import annotations

import os
import sys
import time
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_DIR))

from backend.settings import RAG_DRIVE_FOLDER_ID  # noqa: E402
from backend.google_integration import (  # noqa: E402
    upload_file,
    find_folder,
    get_drive_service,
)


DEFAULT_FOLDER_NAME = "Insurance-RAG-Backups"


def latest_export() -> Path | None:
    exports_dir = PROJECT_DIR / "exports"
    if not exports_dir.exists():
        return None
    zips = sorted(exports_dir.glob("insurance-rag-model_*.zip"), reverse=True)
    return zips[0] if zips else None


def main(file_path: str | None = None, folder_name: str | None = None):
    # Resolve the file to upload
    if file_path:
        src = Path(file_path)
        if not src.exists():
            print(f"ERROR: File not found: {src}", file=sys.stderr)
            sys.exit(1)
    else:
        src = latest_export()
        if not src:
            print("ERROR: No export found. Run scripts/export_model.py first.", file=sys.stderr)
            sys.exit(1)
    print(f"Uploading: {src} ({src.stat().st_size / (1024*1024):.1f} MB)")

    # Resolve the Drive folder
    parent_id = RAG_DRIVE_FOLDER_ID
    if not parent_id:
        name = folder_name or DEFAULT_FOLDER_NAME
        parent_id = find_folder(name, create_if_missing=True)
        if not parent_id:
            print(f"WARNING: Could not find or create Drive folder '{name}'. Uploading to root.")
    else:
        print(f"Target Drive folder (by id): {parent_id}")

    result = upload_file(str(src), name=src.name, parent_folder_id=parent_id)
    print(f"Uploaded: id={result['id']} name={result['name']}")
    if result.get("webViewLink"):
        print(f"Open in Drive: {result['webViewLink']}")
    return result


if __name__ == "__main__":
    file_arg = None
    folder_arg = None
    args = sys.argv[1:]
    if "--file" in args:
        file_arg = args[args.index("--file") + 1]
    if "--folder" in args:
        folder_arg = args[args.index("--folder") + 1]
    main(file_path=file_arg, folder_name=folder_arg)