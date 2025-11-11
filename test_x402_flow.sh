#!/bin/bash

# X-Gov Agent Network - Complete x402 Flow Test
# This script demonstrates the end-to-end payment flow

echo "=========================================="
echo "🚀 X-GOV AGENT NETWORK - x402 FLOW TEST"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Start Service Agent
echo -e "${BLUE}[STEP 1]${NC} Starting Service Agent (x402-protected)..."
echo "----------------------------------------"
cd agents/service-agents/data-analyst-agent

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting service agent on port 3001..."
node server.js &
SERVICE_PID=$!
echo -e "${GREEN}✅ Service Agent started (PID: $SERVICE_PID)${NC}"
echo ""

# Wait for service to be ready
sleep 3

# Step 2: Test 402 Response
echo -e "${BLUE}[STEP 2]${NC} Testing 402 Payment Required Response..."
echo "----------------------------------------"
echo "Requesting service without payment..."
RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:3001/scrape?q=test)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" == "402" ]; then
    echo -e "${GREEN}✅ Received 402 Payment Required (Correct!)${NC}"
    echo "$RESPONSE" | head -n-1 | jq '.'
else
    echo -e "${YELLOW}⚠️  Unexpected response: $HTTP_CODE${NC}"
fi
echo ""

# Step 3: Test Agent Info
echo -e "${BLUE}[STEP 3]${NC} Checking Agent Info..."
echo "----------------------------------------"
curl -s http://localhost:3001/info | jq '.'
echo ""

# Step 4: Run Orchestrator
echo -e "${BLUE}[STEP 4]${NC} Starting Orchestrator Agent..."
echo "----------------------------------------"
cd ../../orchestrator-agent

if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Using environment defaults..."
fi

echo "Running orchestrator with real x402 payment flow..."
python3 main.py

echo ""
echo "=========================================="
echo "✅ x402 FLOW TEST COMPLETED"
echo "=========================================="

# Cleanup
echo ""
echo "Stopping service agent..."
kill $SERVICE_PID
echo "Done!"

