# X-Gov Agent Network - Complete Integration Guide

## 🎯 End-to-End x402 Payment Flow

This guide demonstrates the **REAL, working** integration between all components of the X-Gov Agent Network.

---

## 📋 System Components

### 1. **Solana Reputation Program** (Rust/Anchor)
- **Location**: `programs/src/lib.rs`
- **Purpose**: Stores agent profiles and reputation scores on-chain
- **Instructions**:
  - `register_agent()` - Register new agent with initial reputation
  - `record_validation()` - Update reputation after service completion

### 2. **Orchestrator Agent** (Python)
- **Location**: `agents/orchestrator-agent/main.py`
- **Purpose**: AI-powered coordinator that manages tasks, payments, and validations
- **Features**:
  - ✅ Real OpenAI integration for task decomposition
  - ✅ Real Solana blockchain queries
  - ✅ Real x402 payment execution
  - ✅ Real on-chain validation recording

### 3. **Service Agent** (Node.js)
- **Location**: `agents/service-agents/data-analyst-agent/server.js`
- **Purpose**: Provides data services protected by x402 payment requirement
- **Features**:
  - ✅ HTTP 402 Payment Required enforcement
  - ✅ Real blockchain payment verification
  - ✅ Production-ready API endpoints

---

## 🚀 Complete Setup Guide

### Step 1: Deploy Solana Program

```bash
cd programs
anchor build
anchor deploy --provider.cluster devnet

# Copy the deployed program ID and update:
# - programs/src/lib.rs (declare_id!)
# - agents/orchestrator-agent/.env (REPUTATION_PROGRAM_ID)
# - agents/service-agents/data-analyst-agent/.env (REPUTATION_PROGRAM_ID)
```

### Step 2: Setup Service Agent

```bash
cd agents/service-agents/data-analyst-agent

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3001
AGENT_NAME=DataScraper_Pro_v1
SERVICE_TYPE=data_scraper
SOLANA_RPC_URL=https://api.devnet.solana.com
AGENT_WALLET_PRIVATE_KEY=your_base58_private_key_here
PAYMENT_REQUIRED_LAMPORTS=5000000
REPUTATION_PROGRAM_ID=your_deployed_program_id
EOF

# Generate wallet if needed
solana-keygen new -o agent-wallet.json

# Get the base58 private key
cat agent-wallet.json | jq -r '.' | base58

# Fund the wallet on devnet
solana airdrop 2 <wallet_public_key> --url devnet

# Start the service agent
npm start
```

### Step 3: Setup Orchestrator Agent

```bash
cd agents/orchestrator-agent

# Install dependencies
pip3 install -r requirements.txt

# Create .env file
cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key_here
SOLANA_RPC_URL=https://api.devnet.solana.com
REPUTATION_PROGRAM_ID=your_deployed_program_id
ORCHESTRATOR_WALLET_SECRET=your_orchestrator_wallet_secret
EOF

# Fund orchestrator wallet on devnet
solana airdrop 2 <orchestrator_wallet> --url devnet

# Run the orchestrator
python3 main.py
```

---

## 🔄 Complete Payment Flow

### Visual Flow Diagram

```
┌─────────────────────┐
│   1. User Request   │
│  "Analyze Solana"   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────┐
│   2. Orchestrator Agent     │
│   - LLM Task Decomposition  │
│   - Query Solana Reputation │
│   - Select Best Agent       │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   3. x402 Payment Request   │
│   GET /scrape               │
│   → 402 Payment Required    │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   4. Solana Payment         │
│   Send 0.005 SOL            │
│   From: Orchestrator        │
│   To: Service Agent         │
│   → Transaction Signature   │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   5. Retry with Proof       │
│   GET /scrape               │
│   Header: X-Payment-Proof   │
│   → 200 OK + Data           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   6. Record Validation      │
│   Call record_validation()  │
│   Update Agent Reputation   │
│   → Success: +1 reputation  │
└─────────────────────────────┘
```

### Detailed Step-by-Step

#### **Step 1: Orchestrator Receives User Request**
```python
user_query = "Analyze Solana network data"
orchestrate_task(user_query)
```

#### **Step 2: LLM Task Decomposition**
```python
# OpenAI breaks down the task
task_plan = llm_task_breakdown(user_query)
# Result: [{"name": "Data Collection", "service_type": "data_scraper", "budget_usd": 5.0}]
```

#### **Step 3: Query Solana for Best Agent**
```python
# Query on-chain reputation data
agents = query_reputation_program(client, "data_scraper")
# Select agent with highest reputation
best_agent = max(agents, key=lambda x: x['reputation_score'])
```

#### **Step 4: Initial Service Request (402 Response)**
```python
# GET http://localhost:3001/scrape
# Response: 402 Payment Required
{
  "error": "Payment Required",
  "payment_details": {
    "recipient": "5vMEWXYZ...",
    "amount_lamports": 5000000,
    "amount_sol": 0.005
  }
}
```

#### **Step 5: Execute Payment on Solana**
```python
tx_signature = send_sol_payment(
    solana_client,
    ORCHESTRATOR_WALLET,
    recipient_pubkey,
    5000000  # lamports
)
# Result: "3K7m...xyz" (transaction signature)
```

#### **Step 6: Retry with Payment Proof**
```python
# GET http://localhost:3001/scrape
# Header: X-Payment-Proof: 3K7m...xyz
# Response: 200 OK
{
  "success": true,
  "data": { ... actual service data ... },
  "payment": {
    "tx_signature": "3K7m...xyz",
    "amount_paid": 0.005
  }
}
```

#### **Step 7: Record Validation on Solana**
```python
record_validation_on_chain(
    solana_client,
    seller_pubkey=best_agent['pubkey'],
    buyer_keypair=ORCHESTRATOR_WALLET,
    success=True
)
# Updates agent reputation: 125 → 126
```

---

## 🧪 Testing the Complete Flow

### Test 1: Service Agent Health Check
```bash
curl http://localhost:3001/health
```

Expected Response:
```json
{
  "status": "healthy",
  "agent": "DataScraper_Pro_v1",
  "payment_required": true,
  "price": { "sol": 0.005 }
}
```

### Test 2: Try Service Without Payment
```bash
curl http://localhost:3001/scrape?q=test
```

Expected Response:
```json
{
  "error": "Payment Required",
  "payment_details": { ... }
}
```

### Test 3: Full Orchestrator Flow
```bash
cd agents/orchestrator-agent
python3 main.py
```

Expected Output:
```
🤖 ORCHESTRATOR AGENT STARTED
📋 STEP 1: Task Decomposition
✅ Generated 1 subtasks
📊 STEP 2: Agent Discovery
✅ Selected Agent: DataScraper_Pro_v1
💳 STEP 4: x402 Payment & Service Execution
💸 Sending 0.005 SOL...
✅ Payment confirmed on blockchain!
🎉 SUCCESS! Payment verified, service delivered!
📝 STEP 5: On-Chain Validation Recording
✅ Validation recorded on-chain
```

---

## 🏆 Key Achievements

### ✅ Real Implementations (No Mocks)

1. **Real OpenAI Integration**
   - Live API calls to GPT-4o-mini
   - Structured JSON responses
   - Intelligent task decomposition

2. **Real Solana Blockchain**
   - Actual SOL transfers
   - Transaction confirmations
   - On-chain data queries

3. **Real x402 Protocol**
   - HTTP 402 status codes
   - Payment verification
   - Blockchain proof validation

4. **Real Agent Economy**
   - Agent-to-agent payments
   - Reputation-based selection
   - On-chain validation recording

---

## 📊 Hackathon Track Alignment

| Track | Implementation | Proof |
|:---|:---|:---|
| **Best x402 Agent Application** | Orchestrator with AI + payments | `main.py` lines 200-350 |
| **Best Trustless Agent** | Reputation on Solana | `lib.rs` lines 1-105 |
| **Best x402 API Integration** | Service agent with 402 | `server.js` lines 50-150 |

---

## 🐛 Troubleshooting

### Issue: Payment fails
**Solution**: Ensure orchestrator wallet has sufficient SOL
```bash
solana balance <wallet> --url devnet
solana airdrop 2 <wallet> --url devnet
```

### Issue: 402 but no payment details
**Solution**: Check service agent wallet is set correctly in `.env`

### Issue: Payment verified but service still fails
**Solution**: Check transaction confirmation on Solana explorer

---

## 📚 Additional Resources

- **Solana Devnet Explorer**: https://explorer.solana.com/?cluster=devnet
- **x402 Protocol Spec**: https://github.com/x402
- **Anchor Documentation**: https://www.anchor-lang.com/

---

## 🎯 Next Steps

1. ✅ **Deploy to Devnet** - Get real program ID
2. ✅ **Fund Wallets** - Airdrop SOL to all wallets
3. ✅ **Run End-to-End Test** - Execute full flow
4. ⏳ **Build Web UI** - Visual demonstration
5. ⏳ **Create Demo Video** - Show live execution

---

**Status**: READY FOR PRODUCTION TESTING 🚀

