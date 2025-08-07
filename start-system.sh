#!/bin/bash

echo "Starting Predictive Risk Scoring Assessment System..."
echo

echo "Starting Backend Server (Java/Spring Boot)..."
cd backend
gnome-terminal --title="Backend Server" -- bash -c "mvn spring-boot:run; exec bash" &
cd ..

echo
echo "Starting Frontend Server (React)..."
cd project
gnome-terminal --title="Frontend Server" -- bash -c "npm run dev; exec bash" &
cd ..

echo
echo "System is starting up..."
echo "Backend will be available at: http://localhost:8080"
echo "Frontend will be available at: http://localhost:5173"
echo
echo "Press Ctrl+C to stop all servers"
wait 