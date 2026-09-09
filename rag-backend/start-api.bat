@echo off
echo ========================================
echo  Insurance RAG System - Startup
echo ========================================
echo.
:: Model download step removed – model is already in repo.
:: python scripts/download_model.py

echo.
echo 2. Initializing database...
python -c "from backend.database import init_db; init_db()"

echo.
echo 3. Starting API server on http://127.0.0.1:8000
echo    (Press Ctrl+C to stop)
python -m uvicorn backend.api:app --host 127.0.0.1 --port 8000
pause