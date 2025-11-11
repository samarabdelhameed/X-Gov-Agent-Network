#!/bin/bash

clear
echo "=========================================="
echo "🚀 X-GOV AGENT NETWORK"
echo "   Starting Frontend..."
echo "=========================================="
echo ""

cd /Users/s/solana/X-Gov-Agent-Network/web-ui

echo "🧹 Cleaning old processes..."
pkill -f "next dev" 2>/dev/null
sleep 2

echo "🔧 Removing cache..."
rm -rf .next

echo ""
echo "🚀 Starting Next.js development server..."
echo ""

npm run dev

echo ""
echo "=========================================="
echo "✅ Frontend is ready!"
echo "=========================================="

