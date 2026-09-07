"""Config-driven settings for the Insurance RAG backend."""

from __future__ import annotations

import os
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent.parent

# Where the chatbot captures visitor leads (append-only Google Sheet).
# Provide via env vars or config/.env.  Example:
#   RAG_LEAD_SHEET_ID=1abc...     (the spreadsheet id from its URL)
#   RAG_LEAD_SHEET_NAME=Leads     (existing tab/sheet name, default Sheet1)
LEAD_SHEET_ID = os.environ.get("RAG_LEAD_SHEET_ID", "").strip()
LEAD_SHEET_NAME = os.environ.get("RAG_LEAD_SHEET_NAME", "Sheet1").strip()

# Optional: existing Drive folder id to upload RAG backups into.
# If empty, uploads go to the Drive root.
RAG_DRIVE_FOLDER_ID = os.environ.get("RAG_DRIVE_FOLDER_ID", "").strip() or None

# Lead column headers (first row, written once if the sheet is empty).
LEAD_HEADERS = [
    "timestamp",
    "name",
    "phone",
    "email",
    "city",
    "interested_product",
    "insurer",
    "message",
    "source",
    "page_url",
]


def lead_capture_enabled() -> bool:
    return bool(LEAD_SHEET_ID)
