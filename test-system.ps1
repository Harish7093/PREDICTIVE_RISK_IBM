# Test script for the Risk Scoring Assessment System

Write-Host "Testing Backend Connection..." -ForegroundColor Green

# Wait for backend to start
Start-Sleep -Seconds 15

# Test backend health endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/health" -Method GET
    Write-Host "✅ Backend is running successfully!" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Backend connection failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTesting Dashboard Stats..." -ForegroundColor Green

# Test dashboard stats endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/dashboard/stats" -Method GET
    Write-Host "✅ Dashboard stats endpoint working!" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Dashboard stats failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTesting Entities Endpoint..." -ForegroundColor Green

# Test entities endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/entities" -Method GET
    Write-Host "✅ Entities endpoint working!" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Entities endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nSystem Test Complete!" -ForegroundColor Green
Write-Host "Frontend should be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend API available at: http://localhost:8080/api" -ForegroundColor Cyan 