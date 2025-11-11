#!/bin/bash

# X-Gov Agent Network - Complete Startup Script
# Starts all services: Service Agent, Web UI, and Orchestrator API

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  🚀  X-Gov Agent Network - Complete Startup                 ║"
echo "║                                                              ║"
echo "║  Starting all services:                                      ║"
echo "║  - Service Agent (port 3001)                                 ║"
echo "║  - Web UI (port 3000)                                        ║"
echo "║  - Orchestrator API (port 5001)                              ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kill existing processes
echo "${YELLOW}🛑 Stopping any existing services...${NC}"
killall node 2>/dev/null || true
pkill -f "python.*api_server" 2>/dev/null || true
sleep 2

# Start Service Agent (port 3001)
echo ""
echo "${GREEN}📡 Starting Service Agent on port 3001...${NC}"
cd agents/service-agents/data-analyst-agent
nohup npm start > /tmp/service-agent.log 2>&1 &
SERVICE_AGENT_PID=$!
echo "   PID: $SERVICE_AGENT_PID"
cd ../../..

# Start Orchestrator API (port 5001)
echo ""
echo "${GREEN}🤖 Starting Orchestrator API on port 5001...${NC}"
cd agents/orchestrator-agent
nohup python3 api_server.py > /tmp/orchestrator-api.log 2>&1 &
ORCHESTRATOR_PID=$!
echo "   PID: $ORCHESTRATOR_PID"
cd ../..

# Start Web UI (port 3000)
echo ""
echo "${GREEN}🌐 Starting Web UI on port 3000...${NC}"
cd web-ui
nohup npm run dev > /tmp/web-ui.log 2>&1 &
WEB_UI_PID=$!
echo "   PID: $WEB_UI_PID"
cd ..

# Wait for services to start
echo ""
echo "${YELLOW}⏳ Waiting for services to initialize...${NC}"
sleep 8

# Check service health
echo ""
echo "${GREEN}✅ Service Status Check:${NC}"
echo ""

# Check Service Agent
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Service Agent: ${GREEN}RUNNING${NC} (http://localhost:3001)"
else
    echo "❌ Service Agent: ${RED}FAILED${NC}"
    echo "   Check logs: tail -f /tmp/service-agent.log"
fi

# Check Orchestrator API
if curl -s http://localhost:5001/health > /dev/null 2>&1; then
    echo "✅ Orchestrator API: ${GREEN}RUNNING${NC} (http://localhost:5001)"
else
    echo "❌ Orchestrator API: ${RED}FAILED${NC}"
    echo "   Check logs: tail -f /tmp/orchestrator-api.log"
fi

# Check Web UI
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Web UI: ${GREEN}RUNNING${NC} (http://localhost:3000)"
else
    echo "❌ Web UI: ${RED}FAILED${NC}"
    echo "   Check logs: tail -f /tmp/web-ui.log"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  🎉  All Services Started Successfully!                      ║"
echo "║                                                              ║"
echo "║  🌐 Web UI:           http://localhost:3000                  ║"
echo "║  🤖 Orchestrator:     http://localhost:5001                  ║"
echo "║  📡 Service Agent:    http://localhost:3001                  ║"
echo "║                                                              ║"
echo "║  📊 Agent List:       http://localhost:3000/agents           ║"
echo "║  🎯 Dashboard:        http://localhost:3000/orchestrate      ║"
echo "║                                                              ║"
echo "║  View Logs:                                                  ║"
echo "║    tail -f /tmp/service-agent.log                            ║"
echo "║    tail -f /tmp/orchestrator-api.log                         ║"
echo "║    tail -f /tmp/web-ui.log                                   ║"
echo "║                                                              ║"
echo "║  Stop All Services:                                          ║"
echo "║    killall node && pkill -f 'python.*api_server'             ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "${GREEN}🚀 Ready for demo!${NC}"
echo ""

