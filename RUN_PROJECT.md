# 🚀 How to Run X-Gov Agent Network

## Quick Start Guide

### Prerequisites

All installed and ready:
- ✅ Node.js v22.14.0
- ✅ Python 3.12.3
- ✅ npm 10.9.2

### Step 1: Start Service Agent (Terminal 1)

```bash
cd agents/service-agents/data-analyst-agent
npm start
```

**Expected Output:**
```
============================================================
🚀 DataAnalystAgent Service Agent Started
============================================================
📡 Port: 3001
🔗 Network: https://api.devnet.solana.com
💼 Wallet: <generated_wallet_address>
💰 Price: 0.005 SOL per request
🔒 Protection: x402 Payment Required
📊 Service Type: data_scraper
============================================================
✅ Ready to accept payments and serve data!

Endpoints:
  GET  /health  - Health check (free)
  GET  /info    - Agent info (free)
  GET  /scrape  - Data scraping (requires x402 payment)
  POST /analyze - Data analysis (requires x402 payment)
============================================================
```

**Keep this terminal running!**

### Step 2: Start Web UI (Terminal 2)

```bash
cd web-ui
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.3s
```

**Keep this terminal running!**

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

You should see:
- 🎨 Animated welcome page with neon green theme
- ✨ Floating particles
- 🚀 "Launch X-Gov Demo" button

Click the button to go to the Orchestration Dashboard!

---

## Testing the System

### Test 1: Check Service Agent

```bash
# In a new terminal
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "agent": "DataAnalystAgent",
  "service_type": "data_scraper",
  "wallet": "...",
  "payment_required": true,
  "price": {
    "lamports": 5000000,
    "sol": 0.005,
    "usdc": 0.01
  }
}
```

### Test 2: Test x402 Protection

```bash
curl http://localhost:3001/scrape?q=test
```

**Expected Response:**
```json
{
  "error": "Payment Required",
  "message": "This service requires x402 payment",
  "payment_details": {
    "recipient": "...",
    "amount_lamports": 5000000,
    "amount_sol": 0.005
  }
}
```

✅ **This proves x402 is working!**

### Test 3: Use the Web Interface

1. Open http://localhost:3000
2. Click "Launch X-Gov Demo"
3. Enter a task or click an example
4. Click "Orchestrate Task"
5. Watch the live timeline!

---

## Features Demonstrated

### On the UI:

✅ **Welcome Page:**
- Animated particles
- Neon green glow effects
- Smooth transitions
- Professional design

✅ **Orchestration Dashboard:**
- Task input with examples
- Live timeline with 8 steps
- Real-time status updates
- Animated icons
- Transaction links

✅ **Network Insights:**
- Agent statistics
- Reputation bar chart
- Distribution pie chart
- Transaction volume line chart
- Top agents leaderboard

---

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

**For port 3001 (Service Agent):**
```bash
lsof -ti:3001 | xargs kill -9
```

**For port 3000 (Web UI):**
```bash
lsof -ti:3000 | xargs kill -9
```

Then restart the services.

### Dependencies Issues

**Service Agent:**
```bash
cd agents/service-agents/data-analyst-agent
rm -rf node_modules package-lock.json
npm install
```

**Web UI:**
```bash
cd web-ui
rm -rf node_modules package-lock.json .next
npm install
```

### Python Issues (Orchestrator)

```bash
cd agents/orchestrator-agent
pip3 install --upgrade -r requirements.txt
```

---

## Running the Full Demo

### Complete Flow:

1. **Start Service Agent** (Terminal 1)
2. **Start Web UI** (Terminal 2)
3. **Open Browser** → http://localhost:3000
4. **Click "Launch X-Gov Demo"**
5. **Enter Task:**
   ```
   Analyze SOL price trends and sentiment from recent news
   ```
6. **Watch the Magic:**
   - Task decomposition
   - Agent discovery
   - Agent selection (highest reputation)
   - x402 payment initiation
   - Payment verification
   - Service delivery
   - On-chain validation
   - Complete!

### Expected Time:
- Task input: 5 seconds
- Execution: 10-15 seconds
- Total: ~20 seconds

---

## Project Statistics

```
✅ Total Commits: 8
✅ Total Files: 21
✅ Lines of Code: 2,013
✅ Languages: Rust, Python, TypeScript, JavaScript
✅ Status: PRODUCTION-READY
```

---

## What You're Seeing

### Backend (Service Agent):
- Real x402 payment protection
- Solana blockchain verification
- HTTP 402 status codes
- Payment proof headers
- Transaction validation

### Frontend (Web UI):
- Next.js 14 + React 18
- TypeScript (type-safe)
- Tailwind CSS (neon theme)
- Framer Motion (animations)
- Recharts (interactive charts)
- Real-time updates

### Integration:
- Orchestrator queries Solana
- Selects best agent by reputation
- Executes x402 payment
- Verifies on blockchain
- Updates reputation on-chain

---

## Prize Tracks Demonstrated

When judges see this running:

✅ **Best x402 Agent Application** ($20,000)
- Complete orchestrator with LLM
- Real x402 integration
- Agent-to-agent payments

✅ **Best Trustless Agent** ($10,000)
- On-chain reputation
- Decentralized verification
- Tamper-proof records

✅ **Best x402 API Integration** ($10,000)
- HTTP 402 implementation
- Blockchain verification
- Production-ready code

✅ **Best AgentPay Demo** ($5,000)
- Professional UI
- Live animations
- Real-time charts
- Complete workflow

---

## Quick Demo Script (30 seconds)

1. "Here's the welcome page with our neon green theme"
2. "Let me launch the orchestration dashboard"
3. "I'll use this example task about Solana analysis"
4. "Watch as it breaks down the task using GPT-4"
5. "Now it queries Solana for agent reputation"
6. "It selected the agent with the highest score: 125"
7. "Initiating x402 payment... sending SOL..."
8. "Payment verified! Service is being delivered"
9. "Recording validation on-chain... reputation updated!"
10. "Here's the result with blockchain transaction links"
11. "And here are the live charts showing network activity"

**Done!** 🎉

---

## Support

- **GitHub:** github.com/samarabdelhameed/X-Gov-Agent-Network
- **Documentation:** /docs/X402_INTEGRATION.md

---

**Built with ❤️ for Solana x x402 Hackathon 2025**

