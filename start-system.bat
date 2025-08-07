@echo off
echo Starting Predictive Risk Scoring Assessment System...
echo.

echo Starting Backend Server (Java/Spring Boot)...
cd backend
start "Backend Server" cmd /k "mvn spring-boot:run"
cd ..

echo.
echo Starting Frontend Server (React)...
cd project
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo.
echo System is starting up...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:5173
echo.
echo Press any key to exit this script (servers will continue running)
pause > nul 