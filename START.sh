#!/bin/bash

clear
echo "=========================================="
echo "🚀 X-GOV AGENT NETWORK"
echo "   Starting Frontend..."
echo "=========================================="
echo ""

cd web-ui

echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting Next.js development server..."
echo ""
echo "⏳ Please wait 10-15 seconds for the server to start..."
echo ""

npm run dev

