# X-Gov Agent Network

## Decentralized Reputation Protocol for Autonomous Agents on Solana

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)](https://solana.com)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange)](https://www.rust-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

---

## Abstract

X-Gov Agent Network is a blockchain-based infrastructure for building trustless, autonomous agent economies. The system implements a decentralized reputation protocol on Solana, combined with the x402 HTTP payment standard, enabling agents to autonomously discover, evaluate, and transact with each other based on on-chain reputation scores.

This architecture solves two fundamental challenges in agent-to-agent interactions: **trust verification** and **atomic micropayments**, creating a foundation for complex, multi-agent workflows with economic accountability.

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

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Blockchain** | Solana (Rust/Anchor) | On-chain reputation storage and validation |
| **Payment Protocol** | x402 (HTTP 402) | Agent-to-agent micropayment standard |
| **Orchestration** | Python 3.10+ | Task coordination and LLM integration |
| **Service Agents** | Node.js 18+ | x402-protected API services |
| **SDK** | TypeScript 5.0+ | Developer integration library |
| **Frontend** | Next.js 14 + React 18 | Interactive demonstration UI |

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
import { XGovClient } from '@xgov/sdk-ts';

const client = new XGovClient(connection, programId);

// Query agents by service type
const agents = await client.getAgentsByServiceType('data_scraper');

// Select best agent by reputation
const bestAgent = await client.findBestAgent('data_scraper');

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

- **Rust** 1.70+ with Anchor CLI 0.29.0
- **Solana CLI** 1.18+
- **Node.js** 18+ with npm
- **Python** 3.10+
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/samarabdelhameed/X-Gov-Agent-Network.git
cd X-Gov-Agent-Network
```

### 2. Deploy Solana Program

```bash
cd programs
anchor build
anchor deploy --provider.cluster devnet

# Update program ID in:
# - programs/src/lib.rs (declare_id! macro)
# - agents/orchestrator-agent/.env (REPUTATION_PROGRAM_ID)
# - agents/service-agents/data-analyst-agent/.env (REPUTATION_PROGRAM_ID)
```

### 3. Configure Service Agent

```bash
cd agents/service-agents/data-analyst-agent
npm install

# Create .env file
cat > .env << EOF
PORT=3001
AGENT_NAME=DataAnalystAgent
SERVICE_TYPE=data_scraper
SOLANA_RPC_URL=https://api.devnet.solana.com
AGENT_WALLET_PRIVATE_KEY=<your_base58_private_key>
PAYMENT_REQUIRED_LAMPORTS=5000000
REPUTATION_PROGRAM_ID=<deployed_program_id>
EOF

# Start service agent
npm start
```

### 4. Configure Orchestrator

```bash
cd agents/orchestrator-agent
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
OPENAI_API_KEY=<your_openai_api_key>
SOLANA_RPC_URL=https://api.devnet.solana.com
REPUTATION_PROGRAM_ID=<deployed_program_id>
ORCHESTRATOR_WALLET_SECRET=<your_wallet_secret>
EOF

# Run orchestrator
python main.py
```

### 5. Launch Web UI

```bash
cd web-ui
npm install
npm run dev

# Open browser: http://localhost:3000
```

---

## Usage Example

### Complete Transaction Flow

```python
# 1. User submits natural language query
query = "Analyze Solana network sentiment from recent news"

# 2. Orchestrator decomposes task using LLM
subtasks = decompose_task(query)
# Output: [{"service_type": "data_scraper", "budget": 5.0}]

# 3. Query Solana for reputation data
agents = get_agents_by_type(solana_client, "data_scraper")
best_agent = max(agents, key=lambda x: x.reputation_score)

# 4. Initiate x402 payment
response = requests.get(best_agent.url + "/scrape?q=solana")
# Response: 402 Payment Required

# 5. Execute blockchain payment
tx_sig = send_payment(
    solana_client,
    orchestrator_wallet,
    best_agent.wallet,
    lamports=5000000
)

# 6. Retry with payment proof
response = requests.get(
    best_agent.url + "/scrape?q=solana",
    headers={"X-Payment-Proof": tx_sig}
)
# Response: 200 OK with data

# 7. Record validation on-chain
record_validation(
    solana_client,
    seller_pubkey=best_agent.pubkey,
    buyer_keypair=orchestrator_wallet,
    success=True
)
# Agent reputation: 125 → 126
```

---

## Security Considerations

### Smart Contract Security

- **PDA-based accounts**: All agent profiles use Program Derived Addresses for deterministic account generation
- **Signer validation**: All state-changing operations require valid keypair signatures
- **Overflow protection**: Reputation score uses checked arithmetic operations
- **Account ownership**: Strict validation of account ownership before updates

### Payment Security

- **On-chain verification**: All payments verified via Solana RPC before service delivery
- **Replay prevention**: Transaction signatures cached with 1-hour TTL
- **Amount validation**: Recipient and amount verified against on-chain transaction data
- **Timeout handling**: Payment proofs expire after 3600 seconds

### API Security

- **Rate limiting**: Service agents implement request throttling
- **Input validation**: All user inputs sanitized and validated
- **Error handling**: Graceful degradation without exposing internal state
- **CORS configuration**: Restricted origins in production deployments

---

## Performance Characteristics

| Metric | Value |
|--------|-------|
| **On-chain Validation Latency** | ~2-3 seconds (Solana block time) |
| **x402 Payment Verification** | ~400ms (RPC call + validation) |
| **Orchestrator Task Planning** | ~1-2 seconds (OpenAI API) |
| **Service Agent Response** | ~200-500ms (after payment) |
| **Total End-to-End Flow** | ~5-10 seconds |

**Scalability:**
- Solana TPS: 65,000 transactions/second theoretical, 2,000+ practical
- Service agents: Horizontally scalable via load balancer
- Reputation lookups: O(n) where n = agents per service type (typically < 100)

---

## Testing

### Run Unit Tests

```bash
# Solana program tests
cd programs
anchor test

# Service agent tests
cd agents/service-agents/data-analyst-agent
npm test

# SDK tests
cd client-libs/xgov-sdk-ts
npm test
```

### Integration Tests

```bash
# Full system test
./test_x402_flow.sh

# Setup verification
./test_setup.sh
```

---

## Hackathon Track Alignment

| Track | Implementation | Evidence |
|-------|---------------|-----------|
| **Best x402 Agent Application** | Orchestrator with LLM-powered task planning, reputation-based agent selection, and x402 payment execution | `agents/orchestrator-agent/main.py` |
| **Best Trustless Agent** | Solana-based reputation program with on-chain validation recording and PDA account architecture | `programs/src/lib.rs` |
| **Best x402 API Integration** | Production-ready service agent with HTTP 402 implementation and blockchain payment verification | `agents/service-agents/data-analyst-agent/server.js` |
| **Best AgentPay Demo** | Interactive Next.js UI with real-time timeline, Recharts visualizations, and Solana Explorer integration | `web-ui/src/` |
| **Best x402 Dev Tool** | TypeScript SDK with comprehensive API for reputation queries, payment execution, and validation recording | `client-libs/xgov-sdk-ts/src/index.ts` |

---

## Roadmap

### Phase 1: Core Infrastructure (Completed)
- [x] Solana reputation smart contract
- [x] x402 payment protocol implementation
- [x] Orchestrator agent with LLM integration
- [x] Service agent reference implementation
- [x] TypeScript SDK
- [x] Web UI demo

### Phase 2: Production Hardening (Q2 2025)
- [ ] Mainnet deployment
- [ ] Multi-token support (SOL, USDC, BONK)
- [ ] Advanced reputation algorithms (decay, stakes)
- [ ] Service agent marketplace
- [ ] SDK plugins for popular frameworks

### Phase 3: Ecosystem Growth (Q3-Q4 2025)
- [ ] Agent registry and discovery protocol
- [ ] Governance mechanism for protocol upgrades
- [ ] Cross-chain bridge for reputation portability
- [ ] Enterprise agent management dashboard
- [ ] Developer grants program

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code Standards:**
- Rust: Follow official Rust style guide, run `cargo fmt` and `cargo clippy`
- TypeScript: ESLint + Prettier configuration provided
- Python: PEP 8 compliance, type hints required
- Documentation: All public APIs must include docstrings/JSDoc

---

## Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)**: System design and technical decisions
- **[Deployment Guide](docs/DEPLOYMENT.md)**: Production deployment instructions
- **[x402 Integration](docs/X402_INTEGRATION.md)**: Payment protocol specification
- **[Integration Guide](INTEGRATION_GUIDE.md)**: End-to-end integration tutorial
- **[Run Project](RUN_PROJECT.md)**: Quick start for local development

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Solana Foundation** for blockchain infrastructure
- **x402 Protocol Team** for payment standard specification
- **Anchor Framework** for Solana program development tools
- **OpenAI** for LLM API access

---

## Contact

- **GitHub**: [github.com/samarabdelhameed/X-Gov-Agent-Network](https://github.com/samarabdelhameed/X-Gov-Agent-Network)
- **Project Lead**: Samar Abdelhameed
- **Email**: contact@xgov.network
- **Discord**: [Join Community](#)

---

## Citation

If you use this work in academic research, please cite:

```bibtex
@software{xgov_agent_network,
  title = {X-Gov Agent Network: Decentralized Reputation Protocol for Autonomous Agents},
  author = {Abdelhameed, Samar},
  year = {2025},
  url = {https://github.com/samarabdelhameed/X-Gov-Agent-Network}
}
```

---

**Built for Solana x x402 Hackathon 2025**

*Empowering autonomous agents with trustless reputation and atomic payments*
