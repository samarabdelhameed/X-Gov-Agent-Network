#!/bin/bash

echo "=========================================="
echo "🚀 Opening X-Gov Agent Network..."
echo "=========================================="
echo ""
echo "Starting frontend server..."
echo ""

cd web-ui
npm run dev &
DEV_PID=$!

echo "⏳ Waiting for server to start (15 seconds)..."
sleep 15

echo ""
echo "Opening browser..."
open http://localhost:3000

echo ""
echo "=========================================="
echo "✅ Browser opened!"
echo "=========================================="
echo ""
echo "If the page doesn't load:"
echo "  1. Wait a few more seconds"
echo "  2. Refresh the page (Cmd+R)"
echo "  3. Check terminal for 'Ready' message"
echo ""
echo "To stop the server: Press Ctrl+C"
echo ""
