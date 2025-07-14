@REM @echo off
@REM title NoteBook

@REM echo Starting Flask server on port 1234...
@REM REM run Flask server
@REM start cmd /k "cd /d %~dp0backend && python server.py"

@REM echo Starting static HTML server on port 5678...
@REM REM run static server
@REM start cmd /k "cd /d %~dp0frontend && python -m http.server 5678"

@REM echo Opening NoteBook in browser...
@REM start http://127.0.0.1:5678

@echo off
title NoteBook

echo Starting Flask server
cd /d %~dp0backend
start /b python server.py

cd /d %~dp0frontend
echo Starting static HTML server
start /b python -m http.server 5678

echo Opening NoteBook in browser at http://127.0.0.1:5678
start http://127.0.0.1:5678

pause
