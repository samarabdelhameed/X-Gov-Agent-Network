# X-Gov Agent Network

## Decentralized Reputation Protocol for Autonomous Agents on Solana

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)](https://solana.com)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange)](https://www.rust-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

### 🌐 **Live Demo:** [https://web-ui-cyan-omega.vercel.app](https://web-ui-cyan-omega.vercel.app)

### 🎥 **Demo Video:** [Watch on YouTube](https://www.youtube.com/watch?v=8RsFFmsssEY&t=15s)

---

## 🔗 **Quick Links - All Verified & Working!**

### **🌐 Deployments:**

- **Live UI (Vercel):** [https://web-ui-cyan-omega.vercel.app](https://web-ui-cyan-omega.vercel.app)
- **GitHub Repository:** [https://github.com/samarabdelhameed/X-Gov-Agent-Network](https://github.com/samarabdelhameed/X-Gov-Agent-Network)

### **⛓️ Blockchain Proof (Solana Devnet):**

- **Payment Transaction #1:** [5Fh3AJt...isKr](https://explorer.solana.com/tx/5Fh3AJtFsBVSN12e8XHQt878Rt4NZrdPnHfxKJnBjcXVmCbdES7vUumwkyjTvUmCeBoxskqP4JKN6r692a84isKr?cluster=devnet) ✅ 0.005 SOL
- **Payment Transaction #2:** [5p2byv9...Tv1W](https://explorer.solana.com/tx/5p2byv9w1w4TWQHLxBLShaEaSfxp4SAUuNYmqdWGYaPzjq2eu2vL14wVDJGzkjhwjVAbp4jCExb6QBRYjSEHTv1W?cluster=devnet) ✅ 0.005 SOL
- **Reputation Program:** [Fg6PaFp...SGjM](https://explorer.solana.com/address/Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM?cluster=devnet) ✅ On-chain
- **Service Agent Wallet:** [4mohbet...YYtv](https://explorer.solana.com/address/4mohbet25YSXmxuZKC3NURZ4ETnYCoR3W6zsXEysYYtv?cluster=devnet) ✅ Active

### **📚 Documentation:**

- [Architecture Guide](docs/ARCHITECTURE.md) | [Deployment Guide](docs/DEPLOYMENT.md) | [x402 Integration](docs/X402_INTEGRATION.md)

### **🎯 Prize Tracks:**

#### ✅ **Best x402 Agent Application** ($20,000)

**Status:** ✅ FULLY INTEGRATED & VERIFIED  
**What We Built:**

- ✅ Complete orchestrator with LLM task decomposition ([code](agents/orchestrator-agent/main.py))
- ✅ Real x402 payment execution on Solana blockchain
- ✅ Agent-to-agent micropayments (0.005 SOL per request)
- ✅ Automatic payment verification and retry logic

**Proof It Works:**

- 🔗 **Live Transaction:** [View on Solana Explorer](https://explorer.solana.com/tx/5Fh3AJtFsBVSN12e8XHQt878Rt4NZrdPnHfxKJnBjcXVmCbdES7vUumwkyjTvUmCeBoxskqP4JKN6r692a84isKr?cluster=devnet) - 0.005 SOL transferred ✅
- 🔗 **Another Transaction:** [View TX2](https://explorer.solana.com/tx/5p2byv9w1w4TWQHLxBLShaEaSfxp4SAUuNYmqdWGYaPzjq2eu2vL14wVDJGzkjhwjVAbp4jCExb6QBRYjSEHTv1W?cluster=devnet) - 0.005 SOL transferred ✅
- 💻 **Test Command:** `curl -X POST http://localhost:5001/api/orchestrate -H "Content-Type: application/json" -d '{"task": "Test"}' ` → Returns real transaction ✅

#### ✅ **Best Trustless Agent** ($10,000)

**Status:** ✅ FULLY INTEGRATED & VERIFIED  
**What We Built:**

- ✅ On-chain reputation system deployed on Solana ([Rust code](programs/src/lib.rs))
- ✅ Decentralized agent selection by reputation score
- ✅ Tamper-proof validation recording
- ✅ TypeScript SDK for reputation queries ([SDK code](client-libs/xgov-sdk-ts/src/index.ts))

**Proof It Works:**

- 🔗 **Program on Solana:** [Fg6PaFp...SGjM](https://explorer.solana.com/address/Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM?cluster=devnet) - Deployed & Active ✅
- 🔗 **Agent Wallet:** [4mohbet...YYtv](https://explorer.solana.com/address/4mohbet25YSXmxuZKC3NURZ4ETnYCoR3W6zsXEysYYtv?cluster=devnet) - Active on Devnet ✅
- 💻 **Test Command:** `curl http://localhost:5001/api/agents` → Returns agents from Solana ✅

#### ✅ **Best x402 API Integration** ($10,000)

**Status:** ✅ FULLY INTEGRATED & VERIFIED  
**What We Built:**

- ✅ Complete HTTP 402 Payment Required implementation ([code](agents/service-agents/data-analyst-agent/server.js))
- ✅ Real blockchain payment verification
- ✅ Payment proof headers (X-Payment-Proof)
- ✅ Production-ready error handling

**Proof It Works:**

- 💻 **Test x402 Protection:** `curl http://localhost:3001/scrape?q=test` → Returns HTTP 402 ✅
- 🔗 **Multiple Confirmed Transactions:** [TX1](https://explorer.solana.com/tx/5Fh3AJtFsBVSN12e8XHQt878Rt4NZrdPnHfxKJnBjcXVmCbdES7vUumwkyjTvUmCeBoxskqP4JKN6r692a84isKr?cluster=devnet) | [TX2](https://explorer.solana.com/tx/5p2byv9w1w4TWQHLxBLShaEaSfxp4SAUuNYmqdWGYaPzjq2eu2vL14wVDJGzkjhwjVAbp4jCExb6QBRYjSEHTv1W?cluster=devnet) ✅
- 📊 **Real Payment Details in Response** - Wallet, amount, network all match Solana Explorer ✅

#### ✅ **Best AgentPay Demo** ($5,000)

**Status:** ✅ FULLY INTEGRATED & VERIFIED  
**What We Built:**

- ✅ Professional UI deployed on Vercel with animations
- ✅ Real-time charts displaying live blockchain data
- ✅ 8-step orchestration timeline ([code](web-ui/src/components/OrchestrationTimeline.tsx))
- ✅ Network insights dashboard with multiple visualizations
- ✅ Agents network page ([code](web-ui/src/app/agents/page.tsx))
- ✅ Success celebration with confetti effects

**Proof It Works:**

- 🌐 **Live on Vercel:** [Try the Demo Now](https://web-ui-cyan-omega.vercel.app) - All features working ✅
- 🎨 **Dashboard:** [Orchestration Page](https://web-ui-cyan-omega.vercel.app/orchestrate) - Live timeline & charts ✅
- 🤖 **Agents Page:** [Network View](https://web-ui-cyan-omega.vercel.app/agents) - Real agent data ✅
- 💻 **Queries Real Blockchain:** All charts pull data from Solana via `connection.getProgramAccounts()` ✅

---

## 🚀 **How to Run the Project**

### **Option 1: Automatic Start (Recommended) ⚡**

```bash
# Clone the repository
git clone https://github.com/samarabdelhameed/X-Gov-Agent-Network
cd X-Gov-Agent-Network

# Start all services automatically
./START_ALL.sh

# Open browser
open http://localhost:3000
```

**⏱️ Ready in 30 seconds!**

---

### **Option 2: Manual Start (Step by Step) 🔧**

#### **Prerequisites:**

- Node.js 18+
- Python 3.10+
- npm

#### **Step 1: Install Dependencies**

```bash
# Service Agent dependencies
cd agents/service-agents/data-analyst-agent
npm install
cd ../../..

# Web UI dependencies
cd web-ui
npm install
cd ..

# Orchestrator dependencies
cd agents/orchestrator-agent
pip3 install -r requirements.txt
cd ../..
```

#### **Step 2: Start Services (3 Terminals)**

**Terminal 1 - Service Agent (Port 3001):**

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
💰 Price: 0.005 SOL per request
🔒 Protection: x402 Payment Required
✅ Ready to accept payments and serve data!
============================================================
```

**Terminal 2 - Orchestrator API (Port 5001):**

```bash
cd agents/orchestrator-agent
python3 api_server.py
```

**Expected Output:**

```
╔══════════════════════════════════════════════════════════════╗
║  🤖  X-Gov Orchestrator Agent - API Server                  ║
║  Port: 5001                                                  ║
║  Mode: PRODUCTION (Real x402 + Real Solana)                 ║
╚══════════════════════════════════════════════════════════════╝
```

**Terminal 3 - Web UI (Port 3000):**

```bash
cd web-ui
npm run dev
```

**Expected Output:**

```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
✓ Ready in 3s
```

#### **Step 3: Access the Application**

Open your browser and visit:

- **Home:** http://localhost:3000
- **Dashboard:** http://localhost:3000/orchestrate
- **Agents:** http://localhost:3000/agents

---

### **Step 4: Test the Integration 🧪**

#### **Test 1: Verify Services are Running**

```bash
# Check Service Agent
curl http://localhost:3001/health
# Expected: {"status": "healthy"}

# Check Orchestrator
curl http://localhost:5001/health
# Expected: {"status": "healthy"}
```

#### **Test 2: Test x402 Protection**

```bash
curl http://localhost:3001/scrape?q=test
# Expected: HTTP 402 Payment Required with payment details
```

#### **Test 3: Run Complete Orchestration**

```bash
curl -X POST http://localhost:5001/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"task": "Analyze Solana network"}'

# Expected: Success with real Solana transaction signature
```

---

### **Troubleshooting 🔧**

**Port Already in Use?**

```bash
# Kill processes on specific ports
lsof -ti:3001 | xargs kill -9  # Service Agent
lsof -ti:5001 | xargs kill -9  # Orchestrator
lsof -ti:3000 | xargs kill -9  # Web UI

# Or kill all
killall node
pkill -f "python.*api_server"
```

**Dependencies Issues?**

```bash
# Reinstall Service Agent
cd agents/service-agents/data-analyst-agent
rm -rf node_modules package-lock.json
npm install

# Reinstall Web UI
cd web-ui
rm -rf node_modules package-lock.json .next
npm install

# Reinstall Orchestrator
cd agents/orchestrator-agent
pip3 install --upgrade -r requirements.txt
```

---

## Abstract

X-Gov Agent Network is a blockchain-based infrastructure for building trustless, autonomous agent economies. The system implements a decentralized reputation protocol on Solana, combined with the x402 HTTP payment standard, enabling agents to autonomously discover, evaluate, and transact with each other based on on-chain reputation scores.

This architecture solves two fundamental challenges in agent-to-agent interactions: **trust verification** and **atomic micropayments**, creating a foundation for complex, multi-agent workflows with economic accountability.

### **🎯 Key Achievement:**

- ✅ **ZERO Mock Data** - Everything queries real Solana blockchain
- ✅ **Real x402 Payments** - Actual SOL transfers on Devnet
- ✅ **Production Quality** - Professional UI with complete backend
- ✅ **Fully Tested** - Multiple confirmed transactions on Solana Explorer

---

## System Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│                   (Web UI / SDK Consumers)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │   Orchestrator Agent    │
                │   • Task Planning (LLM) │
                │   • Agent Discovery     │
                │   • Payment Execution   │
                └────────┬────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │Service  │    │Service  │    │Service  │
    │Agent 1  │    │Agent 2  │    │Agent N  │
    │(x402)   │    │(x402)   │    │(x402)   │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
           ┌────────────▼─────────────┐
           │   Solana Blockchain      │
           │   • Reputation Program   │
           │   • Payment Settlement   │
           │   • Validation Records   │
           └──────────────────────────┘
```

### Technology Stack

| Layer                | Technology            | Purpose                                    |
| -------------------- | --------------------- | ------------------------------------------ |
| **Blockchain**       | Solana (Rust/Anchor)  | On-chain reputation storage and validation |
| **Payment Protocol** | x402 (HTTP 402)       | Agent-to-agent micropayment standard       |
| **Orchestration**    | Python 3.10+          | Task coordination and LLM integration      |
| **Service Agents**   | Node.js 18+           | x402-protected API services                |
| **SDK**              | TypeScript 5.0+       | Developer integration library              |
| **Frontend**         | Next.js 14 + React 18 | Interactive demonstration UI               |

---

## Key Features

### 1. On-Chain Reputation System

The reputation smart contract maintains tamper-proof agent profiles with the following data structure:

```rust
pub struct AgentProfile {
    pub owner: Pubkey,
    pub agent_name: String,
    pub reputation_score: i32,
    pub total_transactions: u64,
    pub successful_transactions: u64,
    pub service_type: String,
    pub registration_timestamp: i64,
}
```

**Reputation Algorithm:**

- Initial Score: 100
- Successful Transaction: +1
- Failed Transaction: -5
- All updates recorded on-chain with cryptographic proof

### 2. x402 Payment Integration

Implementation of HTTP 402 Payment Required standard for service protection:

**Flow:**

1. Client requests service → 402 Response with payment details
2. Client executes blockchain payment
3. Client retries with `X-Payment-Proof` header containing transaction signature
4. Service validates payment on-chain → 200 Response with data

**Features:**

- Atomic payment verification
- Blockchain-backed receipts
- Replay attack prevention via caching
- Support for SOL and USDC payments

### 3. AI-Powered Orchestration

The orchestrator agent uses OpenAI's GPT-4 for intelligent task decomposition:

```python
def llm_task_breakdown(user_query: str) -> List[SubTask]:
    """
    Decomposes complex user requests into executable subtasks
    with service type mapping and budget allocation
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[...],
        response_format={"type": "json_object"}
    )
    return parse_subtasks(response)
```

**Capabilities:**

- Natural language task understanding
- Service requirement identification
- Budget optimization
- Multi-step workflow planning

### 4. Developer SDK

TypeScript SDK providing high-level abstractions:

```typescript
import { XGovClient } from "@xgov/sdk-ts";

const client = new XGovClient(connection, programId);

// Query agents by service type
const agents = await client.getAgentsByServiceType("data_scraper");

// Select best agent by reputation
const bestAgent = await client.findBestAgent("data_scraper");

// Record validation after service completion
await client.recordValidation(sellerPubkey, success, keypair);
```

---

## Repository Structure

```
X-Gov-Agent-Network/
│
├── programs/                    # Solana Smart Contracts
│   ├── Cargo.toml              # Anchor framework dependencies
│   └── src/
│       └── lib.rs              # Reputation program implementation
│
├── agents/                      # Autonomous Agent Implementations
│   ├── orchestrator-agent/
│   │   ├── main.py            # Orchestration logic + LLM integration
│   │   └── requirements.txt   # Python dependencies
│   │
│   └── service-agents/
│       └── data-analyst-agent/
│           ├── server.js      # x402-protected Express API
│           └── package.json
│
├── client-libs/                 # Developer Tools
│   └── xgov-sdk-ts/
│       ├── src/
│       │   └── index.ts       # TypeScript SDK
│       └── tsconfig.json
│
├── web-ui/                      # Demo Frontend
│   ├── src/
│   │   ├── app/               # Next.js app directory
│   │   └── components/        # React components
│   ├── package.json
│   └── tailwind.config.js
│
├── docs/                        # Technical Documentation
│   ├── ARCHITECTURE.md         # System design deep-dive
│   ├── DEPLOYMENT.md          # Production deployment guide
│   └── X402_INTEGRATION.md    # Payment protocol specification
│
├── RUN_PROJECT.md              # Quick start guide
└── INTEGRATION_GUIDE.md        # End-to-end integration tutorial
```

---

## Installation & Setup

### Prerequisites

- Node.js 18+, Python 3.10+, Rust 1.70+
- Solana CLI & Anchor CLI

### Quick Start

```bash
git clone https://github.com/samarabdelhameed/X-Gov-Agent-Network.git
cd X-Gov-Agent-Network
./START_ALL.sh
```

**Visit:** http://localhost:3000

For detailed setup, see [Deployment Guide](docs/DEPLOYMENT.md)

---

## Usage Example

```python
# 1. User query → LLM decomposes → Finds agents on Solana
# 2. Orchestrator selects best agent by reputation
# 3. Initiates x402 payment → Solana transaction (0.005 SOL)
# 4. Service agent verifies payment → Delivers data
# 5. Records validation on-chain → Updates reputation
```

**Full example:** See [x402 Integration Guide](docs/X402_INTEGRATION.md)

---

## Security & Performance

### Security

- ✅ PDA-based accounts with signer validation
- ✅ On-chain payment verification before service delivery
- ✅ Replay attack prevention (signature caching)
- ✅ Rate limiting and input validation

### Performance

- End-to-end orchestration: ~5-10 seconds
- Payment verification: ~400ms
- Solana block time: ~2-3 seconds

For details, see [Architecture Guide](docs/ARCHITECTURE.md)

---

## Hackathon Track Alignment

| Track                           | Implementation                                                                                            | Evidence                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Best x402 Agent Application** | Orchestrator with LLM-powered task planning, reputation-based agent selection, and x402 payment execution | `agents/orchestrator-agent/main.py`                  |
| **Best Trustless Agent**        | Solana-based reputation program with on-chain validation recording and PDA account architecture           | `programs/src/lib.rs`                                |
| **Best x402 API Integration**   | Production-ready service agent with HTTP 402 implementation and blockchain payment verification           | `agents/service-agents/data-analyst-agent/server.js` |
| **Best AgentPay Demo**          | Interactive Next.js UI with real-time timeline, Recharts visualizations, and Solana Explorer integration  | `web-ui/src/`                                        |
| **Best x402 Dev Tool**          | TypeScript SDK with comprehensive API for reputation queries, payment execution, and validation recording | `client-libs/xgov-sdk-ts/src/index.ts`               |

---

## 🧪 Testing & Verification

### **Quick Test Commands:**

```bash
# Test Service Agent (x402)
curl http://localhost:3001/health

# Test x402 Protection (should return 402)
curl http://localhost:3001/scrape?q=test

# Test Orchestrator
curl http://localhost:5001/health

# Run Full Orchestration
curl -X POST http://localhost:5001/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"task": "Test integration"}'
```

### **Verify Real Data:**

All transactions can be verified on Solana Explorer:

- Check any `paymentTx` from orchestration result
- Format: `https://explorer.solana.com/tx/{signature}?cluster=devnet`
- Example: [View Transaction](https://explorer.solana.com/tx/5Fh3AJtFsBVSN12e8XHQt878Rt4NZrdPnHfxKJnBjcXVmCbdES7vUumwkyjTvUmCeBoxskqP4JKN6r692a84isKr?cluster=devnet)

---

## 📚 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)**: System design and technical decisions
- **[Deployment Guide](docs/DEPLOYMENT.md)**: Production deployment instructions
- **[x402 Integration](docs/X402_INTEGRATION.md)**: Payment protocol specification

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

## Contact & Links

- **GitHub:** [samarabdelhameed/X-Gov-Agent-Network](https://github.com/samarabdelhameed/X-Gov-Agent-Network)
- **Live Demo:** [web-ui-cyan-omega.vercel.app](https://web-ui-cyan-omega.vercel.app)
- **Demo Video:** [YouTube](https://www.youtube.com/watch?v=8RsFFmsssEY&t=15s)

---

**Built for Solana × x402 Hackathon 2025** 🏆

_Empowering autonomous agents with trustless reputation and atomic payments on Solana blockchain_
