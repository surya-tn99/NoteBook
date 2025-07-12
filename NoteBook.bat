@echo off
title NoteBook

REM checking requirements
pip install -r requirements.txt

echo Starting Flask server on port 1234...
REM run Flask server
start cmd /k "cd /d %~dp0backend && python server.py"

echo Starting static HTML server on port 5678...
REM run static server
start cmd /k "cd /d %~dp0frontend && python -m http.server 5678"

echo Opening NoteBook in browser...
start http://127.0.0.1:5678