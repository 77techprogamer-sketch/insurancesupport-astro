"""Google integration for the Insurance RAG project.

Provides two capabilities required by the master spec:
  1. Append-only capture of chatbot visitor leads -> a Google Sheet
     (uses the Sheets 'values.append' API, which ADDS a row and never
     overwrites or creates a new sheet).
  2. Upload of the packaged RAG model/knowledge-base -> Google Drive
     (backs up data/chroma + DB + manifest as a dated archive).

Credential resolution (in priority order):
  1. Service account key file  -> path in env GOOGLE_SERVICE_ACCOUNT
                                  or <project>/config/service_account.json
     (best for the always-on public chatbot + daily cron: no refresh needed)
  2. OAuth user token  -> ~/.hermes/google_token.json + google_client_secret.json
     (shared with the Hermes google-workspace skill; auto-refreshes)
"""

from __future__ import annotations

import json
import os
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
PROJECT_DIR = Path(__file__).resolve().parent.parent
CONFIG_DIR = PROJECT_DIR / "config"
SERVICE_ACCOUNT_PATH = os.environ.get(
    "GOOGLE_SERVICE_ACCOUNT", str(CONFIG_DIR / "service_account.json")
)

# Shared Hermes OAuth token (set up once via the google-workspace skill)
HERMES_HOME = Path(os.environ.get("HERMES_HOME", Path.home() / ".hermes"))
OAUTH_TOKEN_PATH = HERMES_HOME / "google_token.json"
CLIENT_SECRET_PATH = HERMES_HOME / "google_client_secret.json"

REQUIRED_SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]


def _load_credentials():
    """Return an authenticated google.oauth2 Credentials object."""
    # 1) Service account (recommended for the public site + cron)
    sa = Path(SERVICE_ACCOUNT_PATH)
    if sa.exists():
        from google.oauth2 import service_account

        return service_account.Credentials.from_service_account_file(
            str(sa), scopes=REQUIRED_SCOPES
        )

    # 2) OAuth user token (shared with Hermes google-workspace skill)
    if OAUTH_TOKEN_PATH.exists() and CLIENT_SECRET_PATH.exists():
        from google.auth.transport.requests import Request
        from google.oauth2.credentials import Credentials

        creds = Credentials.from_authorized_user_file(
            str(OAUTH_TOKEN_PATH), scopes=REQUIRED_SCOPES
        )
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            # Persist refreshed token back to disk
            OAUTH_TOKEN_PATH.write_text(creds.to_json())
        return creds

    raise RuntimeError(
        "No Google credentials found. Set up EITHER:\n"
        f"  - a service account key at {SERVICE_ACCOUNT_PATH}\n"
        "  - the Hermes google-workspace OAuth token "
        f"(missing {OAUTH_TOKEN_PATH})"
    )


# ---------------------------------------------------------------------------
# Sheets: append-only lead capture
# ---------------------------------------------------------------------------
def get_sheet_service():
    from googleapiclient.discovery import build

    creds = _load_credentials()
    return build("sheets", "v4", credentials=creds)


def resolve_sheet_name(sheet_id: str, sheet_name: str | None = None) -> str:
    """Return a valid existing tab name for the spreadsheet.

    If sheet_name is given and exists, use it. Otherwise auto-detect the
    first tab of the spreadsheet (so chat leads land in the visible sheet
    even when the tab is not the default 'Sheet1').
    """
    service = get_sheet_service()
    meta = service.spreadsheets().get(spreadsheetId=sheet_id, fields="sheets.properties.title").execute()
    titles = [s["properties"]["title"] for s in meta.get("sheets", [])]

    if sheet_name and sheet_name in titles:
        return sheet_name
    if titles:
        return titles[0]
    raise RuntimeError(f"Spreadsheet {sheet_id} has no visible tabs")


def ensure_headers(sheet_id: str, sheet_name: str, headers: list[str]) -> None:
    """Write the header row only if the sheet's row 1 is empty.

    This is an idempotent guard: it never overwrites existing data and never
    creates a new sheet — the user provides the spreadsheet + sheet up front.
    """
    service = get_sheet_service()
    range_name = sheet_name if "!" in sheet_name else f"{sheet_name}!A1:ZZ1"
    res = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=sheet_id, range=range_name)
        .execute()
    )
    row = res.get("values", [])
    if row and row[0] and any(str(c).strip() for c in row[0]):
        return  # headers already present; do not touch
    service.spreadsheets().values().update(
        spreadsheetId=sheet_id,
        range=range_name,
        valueInputOption="RAW",
        body={"values": [headers]},
    ).execute()


def append_lead(
    sheet_id: str,
    row: list,
    sheet_name: str | None = None,
    headers: list[str] | None = None,
    ensure_header: bool = True,
) -> dict:
    """Append a single row to a Google Sheet.

    Uses the values.append API which always appends below existing data —
    existing rows are never overwritten and no new sheet is created.

    sheet_name may be None -> auto-detected as the spreadsheet's first tab.
    """
    if sheet_name in (None, ""):
        sheet_name = resolve_sheet_name(sheet_id, None)

    if headers and ensure_header:
        ensure_headers(sheet_id, sheet_name, headers)

    service = get_sheet_service()
    range_name = sheet_name if "!" in sheet_name else f"{sheet_name}!A1"
    body = {"values": [row]}
    resp = (
        service.spreadsheets()
        .values()
        .append(
            spreadsheetId=sheet_id,
            range=range_name,
            valueInputOption="RAW",
            insertDataOption="INSERT_ROWS",
            body=body,
        )
        .execute()
    )
    return {"spreadsheetId": sheet_id, "updated": resp.get("updates", {})}


# ---------------------------------------------------------------------------
# Drive: model/knowledge-base upload
# ---------------------------------------------------------------------------
def get_drive_service():
    from googleapiclient.discovery import build

    creds = _load_credentials()
    return build("drive", "v3", credentials=creds)


def find_folder(folder_name: str, create_if_missing: bool = False) -> str | None:
    """Find a Drive folder by name. Returns folder id or None."""
    service = get_drive_service()
    q = (
        f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' "
        "and trashed=false"
    )
    res = service.files().list(q=q, fields="files(id,name)").execute()
    files = res.get("files", [])
    if files:
        return files[0]["id"]
    if create_if_missing:
        meta = {
            "name": folder_name,
            "mimeType": "application/vnd.google-apps.folder",
        }
        folder = service.files().create(body=meta, fields="id").execute()
        return folder["id"]
    return None


def upload_file(
    local_path: str,
    name: str | None = None,
    parent_folder_id: str | None = None,
    mime_type: str = "application/octet-stream",
) -> dict:
    """Upload a file to Google Drive. Returns {id, name, webViewLink}."""
    from googleapiclient.http import MediaFileUpload

    service = get_drive_service()
    path = Path(local_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")

    body = {"name": name or path.name}
    if parent_folder_id:
        body["parents"] = [parent_folder_id]

    media = MediaFileUpload(str(path), mimetype=mime_type, resumable=True)
    file = (
        service.files()
        .create(body=body, media_body=media, fields="id,name,webViewLink")
        .execute()
    )
    return {
        "id": file.get("id"),
        "name": file.get("name"),
        "webViewLink": file.get("webViewLink"),
    }


if __name__ == "__main__":
    import sys

    # sanitize: don't print credentials
    if len(sys.argv) > 1 and sys.argv[1] == "health":
        try:
            _load_credentials()
            print("OK: google credentials verified")
        except Exception as e:
            print(f"ERROR: {e}")
            sys.exit(1)
