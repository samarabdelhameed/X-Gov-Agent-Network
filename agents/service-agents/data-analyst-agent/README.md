# Data Analyst Service Agent

## Overview

This is a **real x402-protected service agent** that requires payment before serving data. It's built for the X-Gov Agent Network and demonstrates true agent-to-agent economy on Solana.

## Features

✅ **Real x402 Payment Protection** - Enforces HTTP 402 status code  
✅ **Solana Blockchain Verification** - Verifies payments on-chain  
✅ **Automatic Payment Validation** - Checks transaction signatures  
✅ **Production-Ready Code** - No mocks, real implementations  
✅ **RESTful API** - Standard HTTP endpoints  

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file (see `.env.example`):

```env
PORT=3001
AGENT_NAME=DataAnalystAgent
SERVICE_TYPE=data_scraper

SOLANA_RPC_URL=https://api.devnet.solana.com
AGENT_WALLET_PRIVATE_KEY=your_base58_private_key_here

PAYMENT_REQUIRED_LAMPORTS=5000000
REPUTATION_PROGRAM_ID=Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM
```

## Running the Service

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

## API Endpoints

### 1. Health Check (Free)
```bash
GET /health
```

Response:
```json
{
  "status": "healthy",
  "agent": "DataAnalystAgent",
  "wallet": "5vME...WXYZ",
  "payment_required": true,
  "price": {
    "lamports": 5000000,
    "sol": 0.005,
    "usdc": 0.01
  }
}
```

### 2. Agent Info (Free)
```bash
GET /info
```

### 3. Data Scraping (x402 Protected)
```bash
GET /scrape?q=solana

# First request (no payment):
# Returns: 402 Payment Required with payment details

# Second request (with payment proof):
GET /scrape?q=solana
Headers: X-Payment-Proof: <transaction_signature>

# Returns: Actual data
```

### 4. Data Analysis (x402 Protected)
```bash
POST /analyze
Headers: X-Payment-Proof: <transaction_signature>
Body: { "data": "...", "analysis_type": "sentiment" }
```

## x402 Payment Flow

1. **Client makes request without payment**
   - Server returns `402 Payment Required`
   - Response includes payment details

2. **Client sends SOL/USDC payment on Solana**
   - Payment sent to agent's wallet
   - Transaction signature obtained

3. **Client retries request with payment proof**
   - Include `X-Payment-Proof` header with tx signature
   - Server verifies payment on blockchain
   - Service returns actual data

## Payment Verification

The service performs real blockchain verification:

1. ✅ Transaction exists on Solana
2. ✅ Transaction was successful
3. ✅ Payment sent to correct agent wallet
4. ✅ Amount meets minimum requirement
5. ✅ Transaction is confirmed

## Integration with Orchestrator

The orchestrator agent automatically:
1. Queries agent reputation from Solana
2. Selects best agent (highest reputation)
3. Executes x402 payment
4. Receives service result
5. Records validation on-chain

## Example Usage

```javascript
// Step 1: Try to access service
const response1 = await fetch('http://localhost:3001/scrape');
// Returns 402 with payment details

// Step 2: Send payment on Solana
const payment = await sendSolanaPayment({
  to: paymentDetails.recipient,
  amount: paymentDetails.amount_lamports
});

// Step 3: Retry with payment proof
const response2 = await fetch('http://localhost:3001/scrape', {
  headers: {
    'X-Payment-Proof': payment.signature
  }
});
// Returns actual data
```

## Architecture

```
┌─────────────────┐
│  Client/Agent   │
└────────┬────────┘
         │ 1. GET /scrape
         ▼
┌─────────────────┐
│  Service Agent  │
│   (This Server) │
└────────┬────────┘
         │ 2. 402 Payment Required
         ▼
┌─────────────────┐
│ Solana Blockchain│
│  (Payment Tx)   │
└────────┬────────┘
         │ 3. Payment Verified
         ▼
┌─────────────────┐
│  Service Agent  │
│  Returns Data   │
└─────────────────┘
```

## Production Considerations

- [ ] Use environment variables for all secrets
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Use Redis for payment cache instead of in-memory
- [ ] Add HTTPS in production
- [ ] Implement proper error handling
- [ ] Add monitoring and alerts
- [ ] Scale horizontally with load balancer

## License

MIT

