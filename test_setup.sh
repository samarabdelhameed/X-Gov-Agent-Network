#!/bin/bash

echo "=========================================="
echo "🚀 X-GOV AGENT NETWORK - SYSTEM TEST"
echo "=========================================="
echo ""

echo "📦 Checking installations..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found"
fi

# Check Python
if command -v python3 &> /dev/null; then
    echo "✅ Python: $(python3 --version)"
else
    echo "❌ Python not found"
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm not found"
fi

echo ""
echo "📁 Checking project structure..."
echo ""

# Check key files
if [ -f "agents/service-agents/data-analyst-agent/server.js" ]; then
    echo "✅ Service Agent: Found"
else
    echo "❌ Service Agent: Not found"
fi

if [ -f "agents/orchestrator-agent/main.py" ]; then
    echo "✅ Orchestrator: Found"
else
    echo "❌ Orchestrator: Not found"
fi

if [ -f "web-ui/package.json" ]; then
    echo "✅ Web UI: Found"
else
    echo "❌ Web UI: Not found"
fi

if [ -f "programs/src/lib.rs" ]; then
    echo "✅ Solana Program: Found"
else
    echo "❌ Solana Program: Not found"
fi

echo ""
echo "📊 Project Statistics:"
echo "   - Total commits: $(git rev-list --count HEAD)"
echo "   - Lines of code: $(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.py" -o -name "*.rs" \) | grep -v node_modules | grep -v target | grep -v ".git" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')"
echo ""

echo "=========================================="
echo "✅ SYSTEM CHECK COMPLETE!"
echo "=========================================="
echo ""
echo "🚀 To run the complete system:"
echo ""
echo "Terminal 1 - Service Agent:"
echo "  cd agents/service-agents/data-analyst-agent"
echo "  npm start"
echo ""
echo "Terminal 2 - Web UI:"
echo "  cd web-ui"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
