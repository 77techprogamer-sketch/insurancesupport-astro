@echo off
echo ========================================
echo  Insurance RAG - Daily Update
echo ========================================
cd /d C:\Users\A\Desktop\insurance-rag
python scripts/daily_update.py
echo.
echo Done. Logs in backend/logs/
pause
