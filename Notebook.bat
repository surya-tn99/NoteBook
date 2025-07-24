@echo off
title NoteBook

echo Starting Flask server on port 1234...

start /b cmd /k "cd /d %~dp0backend && python server.py"

timeout /t 2 > nul

echo Opening NoteBook in browser...
start http://127.0.0.1:1234