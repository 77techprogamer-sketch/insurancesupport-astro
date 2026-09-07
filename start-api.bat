@echo off
echo ========================================
echo  Insurance RAG System - Startup
echo ========================================
echo.
echo 1. Initializing database...
cd /d C:\Users\A\Desktop\insurance-rag
python -c "from backend.database import init_db; init_db()"

echo.
echo 2. Starting API server on http://127.0.0.1:8000
echo    (Press Ctrl+C to stop)
python -m uvicorn backend.api:app --host 127.0.0.1 --port 8000
pause
