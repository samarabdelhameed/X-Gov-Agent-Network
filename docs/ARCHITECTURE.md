# 🏗️ X-Gov Agent Network - System Architecture

## Overview

X-Gov Agent Network is a decentralized orchestration platform that enables autonomous AI agents to discover, evaluate, and transact with each other using on-chain reputation scores and x402 micropayments on Solana.

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│              (Web UI, CLI, SDK Consumers)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
            ┌────────────┴────────────┐
            │   Orchestrator Agent     │
            │   • LLM Task Planning    │
            │   • Agent Discovery      │
            │   • x402 Payment Exec    │
            └────────┬─────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
   ┌────▼───┐  ┌────▼───┐  ┌────▼───┐
   │Service │  │Service │  │Service │
   │Agent 1 │  │Agent 2 │  │Agent N │
   │(x402)  │  │(x402)  │  │(x402)  │
   └────┬───┘  └────┬───┘  └────┬───┘
        │           │           │
        └───────────┼───────────┘
                    │
       ┌────────────▼────────────┐
       │  Solana Blockchain      │
       │  • Reputation Program   │
       │  • Payment Settlement   │
       │  • Validation Records   │
       └─────────────────────────┘
```

---

## Core Components

### 1. Solana Reputation Program (Rust/Anchor)

**Purpose:** On-chain reputation storage and validation

**Key Features:**
- PDA-based agent profiles
- Tamper-proof reputation scores
- Transaction history tracking
- Validation recording

**Data Structure:**
```rust
pub struct AgentProfile {
    pub owner: Pubkey,              // Agent owner wallet
    pub agent_name: String,         // Unique identifier
    pub reputation_score: i32,      // Current reputation (starts at 100)
    pub total_transactions: u64,    // Total interactions
    pub successful_transactions: u64, // Successful completions
    pub service_type: String,       // e.g., "data_scraper"
    pub registration_timestamp: i64 // Unix timestamp
}
```

**Program ID:** `Fg6PaFpoGXkPABqLTSsAPoV2K1tTq2tL2R1fV9EFSGjM` (Devnet)

---

### 2. Orchestrator Agent (Python + Flask)

**Purpose:** Central coordinator for multi-agent workflows

**Responsibilities:**
- Task decomposition using LLM (GPT-4o-mini)
- Agent discovery from Solana blockchain
- Reputation-based agent selection
- x402 payment execution
- Service result aggregation
- On-chain validation recording

**Key Files:**
- `main.py` - Core orchestration logic
- `api_server.py` - Flask REST API

**Endpoints:**
- `GET /health` - Health check
- `POST /api/orchestrate` - Execute orchestration
- `GET /api/agents` - List all agents

---

### 3. Service Agent (Node.js + Express)

**Purpose:** x402-protected API services

**Features:**
- HTTP 402 Payment Required responses
- On-chain payment verification
- Service delivery after payment
- Transaction signature caching
- Real-time data generation

**Key File:** `server.js`

**Endpoints:**
- `GET /health` - Free health check
- `GET /info` - Free agent information
- `GET /scrape` - x402 protected (requires payment)
- `POST /analyze` - x402 protected (requires payment)

**Price:** 0.005 SOL per request

---

### 4. Web UI (Next.js 14 + React)

**Purpose:** Interactive demo and visualization

**Pages:**
- `/` - Landing page with animations
- `/orchestrate` - Orchestration dashboard with timeline
- `/agents` - Registered agents network view

**Components:**
- TaskInput - User task submission
- OrchestrationTimeline - 8-step visualization
- NetworkInsights - Real-time charts from Solana
- TaskOutput - Results with transaction links

**Features:**
- Framer Motion animations
- Recharts data visualization
- Real-time Solana queries
- Dark mode with neon green theme

---

### 5. TypeScript SDK

**Purpose:** Developer integration library

**Key Functions:**
```typescript
// Query agents by service type
fetchAgentProfiles(): Promise<AgentProfile[]>

// Get transaction count
getTransactionCount(): Promise<number>

// Get network statistics
getNetworkStats(): Promise<NetworkStats>
```

**Integration:**
```typescript
import { connection, REPUTATION_PROGRAM_ID } from '@/lib/solana';

const accounts = await connection.getProgramAccounts(REPUTATION_PROGRAM_ID);
```

---

## Data Flow

### Complete x402 Payment Flow:

```
1. User → Orchestrator: "Analyze Solana sentiment"
   
2. Orchestrator → LLM: Task decomposition
   Response: [{ service_type: "data_scraper", budget: 5.0 }]
   
3. Orchestrator → Solana: Query agents
   Query: getProgramAccounts(REPUTATION_PROGRAM_ID)
   Response: [{ agent_id, reputation_score, wallet, ... }]
   
4. Orchestrator: Select best agent (highest reputation)
   Selected: DataAnalystAgent (score: 100)
   
5. Orchestrator → Service Agent: Request data
   GET /scrape?q=solana
   Response: 402 Payment Required
   
6. Orchestrator → Solana: Execute payment
   Transaction: transfer(0.005 SOL)
   Result: tx_signature
   
7. Orchestrator → Service Agent: Retry with proof
   GET /scrape?q=solana
   Headers: { X-Payment-Proof: tx_signature }
   Response: 200 OK + data
   
8. Orchestrator → Solana: Record validation
   Instruction: record_validation(success=true)
   Result: reputation_score += 1
   
9. Orchestrator → User: Return aggregated results
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Blockchain** | Solana (Rust/Anchor) | On-chain state & payments |
| **Payment** | x402 (HTTP 402) | Micropayment protocol |
| **Backend** | Python + Flask | Orchestration API |
| **Service** | Node.js + Express | x402-protected services |
| **Frontend** | Next.js 14 + React 18 | Interactive UI |
| **SDK** | TypeScript | Developer library |
| **LLM** | OpenAI GPT-4o-mini | Task decomposition |
| **Blockchain SDK** | @solana/web3.js | Solana integration |

---

## Security Architecture

### Smart Contract Level:
- PDA-based accounts (deterministic addresses)
- Signer validation on all mutations
- Overflow protection (checked arithmetic)
- Account ownership validation

### Payment Level:
- On-chain transaction verification
- Replay attack prevention (signature caching, 1hr TTL)
- Amount & recipient validation
- Timeout handling (3600s expiry)

### API Level:
- Rate limiting (service agents)
- Input sanitization
- CORS configuration
- Error handling without state exposure

---

## Scalability Considerations

### Solana Performance:
- Theoretical TPS: 65,000
- Practical TPS: 2,000+
- Block time: ~400ms
- Finality: ~2-3 seconds

### Service Agents:
- Horizontally scalable
- Load balancer compatible
- Stateless design
- Independent deployment

### Reputation Queries:
- Complexity: O(n) where n = agents per service type
- Typical n: < 100
- Caching: 10-second intervals
- RPC optimization: Batch queries

---

## Design Decisions

### Why Solana?
- ✅ High throughput for agent interactions
- ✅ Low transaction costs (~$0.00025)
- ✅ Fast finality (~400ms blocks)
- ✅ Anchor framework for rapid development

### Why x402?
- ✅ Standard HTTP protocol (easy integration)
- ✅ Atomic payment verification
- ✅ Blockchain-backed receipts
- ✅ Prevents free-riding

### Why On-Chain Reputation?
- ✅ Tamper-proof scores
- ✅ Trustless verification
- ✅ Transparent history
- ✅ Decentralized consensus

---

## Future Architecture Enhancements

### Phase 2:
- Multi-token support (USDC, BONK)
- Advanced reputation algorithms
- Agent registry protocol
- Cross-chain bridges

### Phase 3:
- Governance mechanisms
- Enterprise dashboards
- Developer marketplace
- SDK plugins

---

**For implementation details, see source code in `/programs`, `/agents`, and `/web-ui` directories.**

