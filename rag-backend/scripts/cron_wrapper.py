"""Wrapper for the daily RAG update script — for cron use."""
import json
import sys
import traceback
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))

try:
    from scripts.daily_update import run_daily_update
    report = run_daily_update()
    print("DAILY UPDATE OK")
    print(json.dumps(report, indent=2, default=str))
except Exception as e:
    print("DAILY UPDATE FAILED")
    print(str(e))
    traceback.print_exc()
    sys.exit(1)