# Test script for the Risk Scoring Assessment Backend

Write-Host "Testing Backend Connection..." -ForegroundColor Green

# Wait for backend to start
Start-Sleep -Seconds 10

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

Write-Host "`nTesting Real-time Risk Data..." -ForegroundColor Green

# Test real-time risk data endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/real-time/risk-data" -Method GET
    Write-Host "✅ Real-time risk data endpoint working!" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Real-time risk data failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nSystem Test Complete!" -ForegroundColor Green
Write-Host "Frontend should be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend API available at: http://localhost:8080/api" -ForegroundColor Cyan 