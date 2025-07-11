@echo off
title Markdown Note App

echo Starting Flask server on port 1234...
REM Change to backend folder and run Flask server
start cmd /k "cd /d %~dp0backend && python server.py"

echo Starting static HTML server on port 5000...
REM Change to frontend folder and run static server
start cmd /k "cd /d %~dp0frontend && python -m http.server 5678"

timeout /t 2 > nul

echo Opening viewNotes.html in browser...
start http://127.0.0.1:5678

echo Servers are running. Close this window if needed.
