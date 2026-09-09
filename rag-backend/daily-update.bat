@echo off
echo ========================================
echo  Insurance RAG - Daily Update
echo ========================================
cd /d C:\Users\A\Desktop\insurance-rag
set GOOGLE_SERVICE_ACCOUNT=C:\Users\A\Downloads\daring-solstice-507912-t2-a2752e7844e6.json
set RAG_DRIVE_FOLDER_ID=1ltQR2dRTJt46T39KllElq7Q6KjRfccW5
set RAG_LEAD_SHEET_ID=1oSij00gXhWdErPjUGxj-Pj0Bnl31meHqP0z_Lzf2BUc
set RAG_LEAD_SHEET_NAME=Leads
# Model is stored locally in the repository — no Drive download needed.
# Remove any reference to RAG_MODEL_FROM_DRIVE in the startup scripts.
set RAG_MODEL_FROM_DRIVE=0 # disabled – model kept in repo
python scripts/daily_update.py
echo.
echo Done. Logs in backend/logs/
pause