#!/bin/bash

# Local Development Startup Script (No Docker)

echo "🎵 Starting Radio BOLID Fullstack Application (Local Development)..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Create environment files if they don't exist
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend environment file..."
    cp frontend/env.example frontend/.env
fi

if [ ! -f "backend/config.env" ]; then
    echo "📝 Creating backend environment file..."
    cp backend/config.env.example backend/config.env
    echo "⚠️  Please edit backend/config.env with your SMTP credentials"
fi

# Start backend in background
echo "📦 Starting backend on port 3000..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Start frontend in background
echo "🎨 Starting frontend on port 5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "🎉 Both services started!"
echo ""
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user interrupt
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
