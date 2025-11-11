#!/bin/bash

# X-Gov Agent Network - Clean and Deploy Script
# Run these commands to clean and push to GitHub

echo "🧹 Cleaning project..."

# 1. Remove node_modules
rm -rf web-ui/node_modules
rm -rf agents/service-agents/data-analyst-agent/node_modules
rm -rf client-libs/xgov-sdk-ts/node_modules

# 2. Remove build artifacts
rm -rf web-ui/.next
rm -rf programs/target

# 3. Remove package-lock files (will be regenerated)
rm -f web-ui/package-lock.json
rm -f agents/service-agents/data-analyst-agent/package-lock.json
rm -f client-libs/xgov-sdk-ts/package-lock.json

# 4. Remove logs
rm -f /tmp/service-agent.log
rm -f /tmp/orchestrator-api.log
rm -f /tmp/web-ui.log

echo "✅ Cleanup complete!"
echo ""
echo "📝 Now run these Git commands:"
echo ""
echo "git reset --soft HEAD~1"
echo "git add ."
echo "git commit -m \"Complete x402 integration - Production ready\""
echo "git push origin main --force"
echo ""
echo "Or simply run: ./QUICK_DEPLOY.sh"

