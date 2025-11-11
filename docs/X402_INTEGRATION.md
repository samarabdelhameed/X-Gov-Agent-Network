# X-Gov Agent Network: Complete x402 Integration Guide

## Overview

This document explains the **complete end-to-end x402 payment integration** in the X-Gov Agent Network. This is the core innovation that enables true agent-to-agent economy on Solana.

---

## 🔄 Complete Payment Flow

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REQUEST                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │   ORCHESTRATOR AGENT           │
         │   (Python)                    │
         │   - Task decomposition (LLM)  │
         │   - Agent discovery (Solana)  │
         │   - Payment execution (x402)  │
         └───────────┬───────────────────┘
                     │
                     │ ① GET /scrape
                     ▼
         ┌───────────────────────────────┐
         │   SERVICE AGENT                │
         │   (Node.js)                   │
         │   - x402 Protection           │
         └───────────┬───────────────────┘
                     │
                     │ ② 402 Payment Required
                     │    {recipient, amount}
                     ▼
         ┌───────────────────────────────┐
         │   ORCHESTRATOR AGENT           │
         │   - Parse payment details     │
         └───────────┬───────────────────┘
                     │
                     │ ③ Send SOL Payment
                     ▼
         ┌───────────────────────────────┐
         │   SOLANA BLOCKCHAIN            │
         │   - Transfer lamports         │
         │   - Return tx signature       │
         └───────────┬───────────────────┘
                     │
                     │ ④ GET /scrape
                     │    X-Payment-Proof: <tx_sig>
                     ▼
         ┌───────────────────────────────┐
         │   SERVICE AGENT                │
         │   - Verify tx on blockchain   │
         │   - Check recipient           │
         │   - Check amount              │
         └───────────┬───────────────────┘
                     │
                     │ ⑤ 200 OK + Service Data
                     ▼
         ┌───────────────────────────────┐
         │   ORCHESTRATOR AGENT           │
         │   - Receive service data      │
         └───────────┬───────────────────┘
                     │
                     │ ⑥ Record validation
                     ▼
         ┌───────────────────────────────┐
         │   SOLANA REPUTATION PROGRAM    │
         │   - Update agent reputation   │
         │   - Record transaction        │
         └───────────────────────────────┘
```

---

## 📝 Detailed Step-by-Step Flow

### Step 1: Initial Service Request (No Payment)

**Orchestrator sends:**
```http
GET http://localhost:3001/scrape?q=solana
```

**Service Agent responds:**
```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "error": "Payment Required",
  "message": "This service requires x402 payment",
  "payment_details": {
    "recipient": "5vMEtWxKn7JQ...XYZ",
    "amount_lamports": 5000000,
    "amount_sol": 0.005,
    "amount_usdc": 0.01,
    "currency": "SOL or USDC",
    "network": "solana-devnet"
  },
  "instructions": "Send payment and include tx signature in X-Payment-Proof header"
}
```

### Step 2: Payment Execution on Solana

**Orchestrator executes:**
```python
# Create transfer instruction
transfer_ix = transfer(
    TransferParams(
        from_pubkey=buyer_keypair.pubkey(),
        to_pubkey=recipient_pubkey,
        lamports=required_lamports
    )
)

# Build and sign transaction
message = Message.new_with_blockhash(
    [transfer_ix],
    buyer_keypair.pubkey(),
    recent_blockhash
)

tx = Transaction([buyer_keypair], message, recent_blockhash)

# Send to Solana
tx_signature = solana_client.send_transaction(tx)
```

**Solana blockchain:**
- Validates transaction
- Transfers lamports from orchestrator to service agent
- Returns transaction signature: `5K7mNpQ8...xyz`

### Step 3: Retry Request with Payment Proof

**Orchestrator sends:**
```http
GET http://localhost:3001/scrape?q=solana
X-Payment-Proof: 5K7mNpQ8...xyz
```

### Step 4: Payment Verification on Blockchain

**Service Agent verifies:**
```javascript
// Fetch transaction from blockchain
const transaction = await connection.getTransaction(txSignature);

// Verify transaction details
if (!transaction || transaction.meta.err) {
  return 400 // Invalid payment
}

// Check recipient
const agentPubkeyIndex = accountKeys.findIndex(
  key => key.toString() === agentWallet.publicKey.toString()
);

// Check amount
const amountReceived = postBalance - preBalance;
if (amountReceived < PAYMENT_AMOUNT_LAMPORTS) {
  return 400 // Insufficient payment
}

// Payment verified!
next(); // Proceed to serve data
```

### Step 5: Service Delivery

**Service Agent responds:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "service": "DataAnalystAgent",
  "data": {
    "source": "Solana Network Data",
    "metrics": { ... },
    "prices": { ... }
  },
  "payment": {
    "tx_signature": "5K7mNpQ8...xyz",
    "amount_paid": 0.005,
    "payer": "7nKF...QRST"
  }
}
```

### Step 6: Reputation Update on Solana

**Orchestrator calls:**
```python
record_validation_on_chain(
    solana_client,
    seller_pubkey="AgentXYZ123...",
    success=True,
    buyer_keypair=ORCHESTRATOR_WALLET
)
```

**Reputation Program executes:**
```rust
pub fn record_validation(ctx: Context<RecordValidation>, success: bool) -> Result<()> {
    let seller_profile = &mut ctx.accounts.seller_profile;
    if success {
        seller_profile.reputation_score += 1;
        seller_profile.total_successful_txs += 1;
    } else {
        seller_profile.reputation_score = seller_profile.reputation_score.saturating_sub(5);
    }
    Ok(())
}
```

---

## 🔧 Implementation Details

### Orchestrator Agent (Python)

**File:** `agents/orchestrator-agent/main.py`

**Key Function:**
```python
async def execute_x402_payment_and_service(
    agent_url: str,
    budget_usd: float,
    buyer_keypair: Keypair,
    solana_client: Client
) -> Dict[str, Any]:
    """
    Complete x402 payment flow implementation
    """
    # 1. Request service (get 402)
    # 2. Parse payment details
    # 3. Execute SOL transfer on Solana
    # 4. Retry with payment proof
    # 5. Return service data
```

**Dependencies:**
- `solana==0.30.0` - Solana Python client
- `openai==1.17.0` - LLM integration
- `httpx` - Async HTTP client

### Service Agent (Node.js)

**File:** `agents/service-agents/data-analyst-agent/server.js`

**Key Middleware:**
```javascript
async function verifyX402Payment(req, res, next) {
    const paymentProof = req.headers['x-payment-proof'];
    
    if (!paymentProof) {
        return res.status(402).json({ /* payment details */ });
    }
    
    // Verify on blockchain
    const transaction = await connection.getTransaction(paymentProof);
    
    // Validate recipient, amount, status
    // ...
    
    next(); // Payment verified, serve content
}
```

**Dependencies:**
- `@solana/web3.js` - Solana JavaScript client
- `express` - HTTP server
- `cors` - CORS support

---

## 🧪 Testing the x402 Flow

### Option 1: Automated Test Script

```bash
./test_x402_flow.sh
```

This script:
1. Starts the service agent
2. Tests 402 response
3. Runs orchestrator with payment
4. Verifies end-to-end flow

### Option 2: Manual Testing

**Terminal 1 - Start Service Agent:**
```bash
cd agents/service-agents/data-analyst-agent
npm install
npm start
```

**Terminal 2 - Test 402 Response:**
```bash
curl http://localhost:3001/scrape?q=test
# Should return 402 with payment details
```

**Terminal 3 - Run Orchestrator:**
```bash
cd agents/orchestrator-agent
pip3 install -r requirements.txt
python3 main.py
```

### Expected Output

```
🤖 ORCHESTRATOR AGENT STARTED
   Mode: PRODUCTION (Real LLM + Real x402 + Real Solana)
============================================================

[STEP 1] Task Decomposition
------------------------------------------------------------
🧠 LLM analyzing request...
✅ LLM generated 2 subtasks

[STEP 2] PROCESSING SUBTASK 1/2
   Task: Data Collection
   Service Type: data_scraper
   Budget: $5.0
============================================================

[STEP 3] Agent Discovery
------------------------------------------------------------
🔗 Querying Solana for 'data_scraper' agents...
📊 Found 2 agents with service type 'data_scraper'

[STEP 4] Agent Selection
------------------------------------------------------------
✅ SELECTED AGENT:
   ID: DataScraper_Pro_v1
   Reputation: 125
   API URL: http://localhost:3001

[STEP 5] Execute x402 Payment & Service
------------------------------------------------------------
[X402] Step 1: Initial request (expecting 402)...
✅ [X402] Received 402 Payment Required

💰 Payment Details:
   Recipient: 5vME...WXYZ
   Amount: 0.005 SOL (5000000 lamports)
   Budget: $5.0

[X402] Step 3: Executing payment on Solana...
[X402] Sending payment transaction...
✅ [X402] Payment sent successfully!
   Transaction signature: 5K7mNpQ8...xyz

[X402] Step 4: Retrying request with payment proof...
🎉 [X402] SUCCESS! Payment verified and service delivered!

[STEP 6] Record Validation On-Chain
------------------------------------------------------------
📝 Recording validation on Solana blockchain...
✅ Validation recorded

✅ ORCHESTRATION COMPLETED
```

---

## 🔐 Security Considerations

### Payment Verification

The service agent performs **comprehensive blockchain verification**:

1. ✅ **Transaction Existence** - Fetches tx from Solana
2. ✅ **Transaction Success** - Checks `meta.err === null`
3. ✅ **Correct Recipient** - Verifies payment went to agent wallet
4. ✅ **Sufficient Amount** - Checks transferred lamports >= required
5. ✅ **Confirmation Status** - Uses 'confirmed' commitment level
6. ✅ **No Replay Attacks** - Caches verified payments (1 hour TTL)

### Best Practices

- **Never trust client data** - Always verify on blockchain
- **Use confirmed commitment** - Wait for transaction confirmation
- **Implement rate limiting** - Prevent DoS attacks
- **Cache verifications** - Avoid redundant blockchain queries
- **Set expiration times** - Invalidate old payment proofs
- **Monitor failed payments** - Alert on suspicious activity

---

## 📊 Performance Metrics

### Typical Flow Timings

| Step | Duration | Notes |
|:---|:---|:---|
| Initial Request | 50-100ms | HTTP request |
| Payment Execution | 2-5s | Solana tx confirmation |
| Payment Verification | 200-500ms | Blockchain query |
| Service Delivery | 100-300ms | Data processing |
| **Total** | **3-6 seconds** | End-to-end |

### Optimization Strategies

1. **Parallel Processing** - Verify payments while processing data
2. **Payment Caching** - Store verified txs in Redis
3. **Batch Verification** - Verify multiple payments at once
4. **Webhook Notifications** - Push payment confirmations
5. **Preflight Checks** - Validate balance before payment

---

## 🚀 Production Deployment

### Environment Variables

**Orchestrator:**
```env
OPENAI_API_KEY=sk-...
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
REPUTATION_PROGRAM_ID=<deployed_program_id>
ORCHESTRATOR_WALLET_SECRET=<base58_private_key>
```

**Service Agent:**
```env
PORT=3001
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
AGENT_WALLET_PRIVATE_KEY=<base58_private_key>
PAYMENT_REQUIRED_LAMPORTS=5000000
REPUTATION_PROGRAM_ID=<deployed_program_id>
```

### Scaling Considerations

- **Load Balancing** - Multiple service agent instances
- **Database** - Replace in-memory cache with Redis
- **Monitoring** - Track payment success rates
- **Alerting** - Notify on verification failures
- **Rate Limiting** - Prevent abuse
- **HTTPS** - Encrypt all communications

---

## 🏆 Hackathon Track Achievements

### ✅ Best x402 Agent Application
- Complete orchestrator with LLM, Solana, and x402 integration
- Real payment execution and verification
- Autonomous agent coordination

### ✅ Best x402 API Integration
- HTTP 402 status code implementation
- Blockchain payment verification
- Production-ready x402 middleware

### ✅ Best Trustless Agent
- On-chain reputation system
- Tamper-proof agent profiles
- Decentralized validation recording

---

## 📚 Additional Resources

- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Solana Python Client](https://michaelhly.github.io/solana-py/)
- [HTTP 402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)
- [Anchor Framework](https://www.anchor-lang.com/)

---

## 🤝 Contributing

To extend the x402 integration:

1. Add USDC payment support (currently SOL only)
2. Implement payment streaming for long-running services
3. Add multi-currency support
4. Create payment escrow for dispute resolution
5. Build payment analytics dashboard

---

**Built with ❤️ for Solana x x402 Hackathon 2025**

