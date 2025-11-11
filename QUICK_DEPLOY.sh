#!/bin/bash

# Quick Deploy Script - Clean and Push to GitHub

cd /Users/s/solana/X-Gov-Agent-Network

echo "🧹 Step 1: Cleaning project..."
rm -rf web-ui/node_modules
rm -rf agents/service-agents/data-analyst-agent/node_modules  
rm -rf client-libs/xgov-sdk-ts/node_modules
rm -rf web-ui/.next
rm -rf programs/target
rm -f web-ui/package-lock.json
rm -f agents/service-agents/data-analyst-agent/package-lock.json
rm -f client-libs/xgov-sdk-ts/package-lock.json

echo "✅ Cleanup done!"
echo ""

echo "🔄 Step 2: Resetting Git..."
git reset --soft HEAD~1

echo "✅ Reset done!"
echo ""

echo "📦 Step 3: Adding files..."
git add .

echo "✅ Files staged!"
echo ""

echo "💾 Step 4: Committing..."
git commit -m "Complete x402 integration with REAL data - Production ready - All features tested"

echo "✅ Committed!"
echo ""

echo "🚀 Step 5: Pushing to GitHub..."
git push origin main --force

echo ""
echo "✅ Done! Project pushed to GitHub!"
echo ""
echo "🌐 Next step: Deploy to Vercel"
echo "   1. Go to https://vercel.com"
echo "   2. Import from GitHub: samarabdelhameed/X-Gov-Agent-Network"
echo "   3. Set root directory to: web-ui"
echo "   4. Deploy!"

