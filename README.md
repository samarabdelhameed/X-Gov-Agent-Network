# 🚀 X-Gov Agent Network: Decentralized Reputation Protocol for Agents on Solana

## 💡 Executive Summary

**X-Gov Agent Network** is a revolutionary infrastructure project designed to solve the biggest challenges of the **Agent Economy**: **Trust and Instant Payment**.

We present the first agent ecosystem built on a **Trustless Reputation Protocol** on **Solana**, where agents can autonomously purchase services and evaluate their quality using **instant x402 USDC payments**.

This project transforms agents from mere "software functions" into "economic entities with verifiable reputation," opening the door to unstoppable AI value chains of unprecedented complexity.

---

## 🎯 Hackathon Tracks Coverage & Target Prizes

This project is designed to achieve top scores in these key tracks:

| Target Track | Description in Project | Approximate Prize |
|:---|:---|:---|
| **🥇 Best x402 Agent Application** | **Orchestrator Agent:** An advanced AI agent that uses LLM to break down complex tasks, manage budgets, and pay executors. | **$20,000** |
| **🥈 Best Trustless Agent** | **Reputation Program:** A smart contract on Solana that stores agent identity and reputation scores, updated through decentralized (on-chain) transactions. | **$10,000** |
| **🥉 Best x402 API Integration** | **Service Agents:** Protecting specialized API services with **HTTP-402** protocol, implementing instant **agent-to-agent** payments. | **$10,000** |
| **🏅 Best AgentPay Demo** | **Web UI:** Live demonstration of workflow where the **highest reputation** agent is selected, paid, and success is recorded on-chain. | **$5,000** |
| **Bonus: Best x402 Dev Tool** | **`xgov-sdk-ts`:** Providing a TypeScript library to facilitate integration of new agents into the X-Gov Reputation network. | **$10,000** |

---

## 🔗 Sponsor Integration

| Sponsor | Actual Integration in Project |
|:---|:---|
| **Solana** | **Core Infrastructure:** **Rust/Anchor** programs to store reputation and identity data in a decentralized manner (on-chain). |
| **x402 (HTTP-402)** | **Payment Protocol:** The exclusive payment mechanism in the network, used to execute precise **USDC** micropayments between agents instantly. |

---

## 📈 Core Use Case

### Title: **"The Autonomous Financial Analyst Agent"**

**Scenario:**

1. User requests a complex market analysis from the Orchestrator Agent.
2. The Orchestrator determines the need for **Data Scraping** and **Sentiment Analysis**.
3. **Trust-Based Discovery:** The Orchestrator communicates with the **Reputation Contract on Solana** and selects the **"Data Scraper Agent"** with the **highest reputation score** (proven quality in previous transactions).
4. **Atomic Payment:** The Orchestrator pays the Scraper Agent directly via **x402 USDC**.
5. **Verification & Recording:** After receiving data, the Orchestrator validates data quality, then records a **successful** transaction on the Solana reputation contract, resulting in **increased** reputation for the Scraper Agent.

This ensures that service quality is directly tied to an economic value accumulated on the blockchain.

---

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      User / Developer                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │  Orchestrator Agent    │
                │   (Python + LLM)       │
                │  - Task Planning       │
                │  - Budget Management   │
                └───────┬────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌───────────────┐ ┌──────────────┐ ┌──────────────┐
│ Data Scraper  │ │  Sentiment   │ │   Other      │
│ Service Agent │ │  Analysis    │ │   Service    │
│  (Node.js)    │ │  Agent       │ │   Agents     │
└───────┬───────┘ └──────┬───────┘ └──────┬───────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
            x402 Payment Protocol (USDC)
                         │
                         ▼
        ┌────────────────────────────────┐
        │   Solana Blockchain (Devnet)   │
        │  ┌──────────────────────────┐  │
        │  │ X-Gov Reputation Program │  │
        │  │  - AgentProfile          │  │
        │  │  - ServiceValidation     │  │
        │  │  - register_agent()      │  │
        │  │  - record_validation()   │  │
        │  └──────────────────────────┘  │
        └────────────────────────────────┘
                         │
                         ▼
                ┌────────────────┐
                │   Web UI Demo  │
                │  (React/Vue)   │
                │  - Live Status │
                │  - Reputation  │
                └────────────────┘
```

This diagram illustrates the workflow and transaction flow between agents and the smart contract.

---

## 🛠️ Repository Structure

```
X-Gov-Agent-Network/
├── 📂 programs/               # Core Trust Protocol (Solana Rust Programs)
│   ├── Cargo.toml            # Rust dependencies (Anchor 0.29.0)
│   └── src/
│       └── lib.rs            # Reputation smart contract
│
├── 📂 agents/                 # Orchestrator & Service Agents (Python/Node.js)
│   ├── orchestrator-agent/
│   │   └── main.py           # AI-powered task coordinator
│   └── service-agents/
│       └── data-analyst-agent/
│           └── server.js     # x402-protected API service
│
├── 📂 client-libs/            # xgov-sdk-ts (Developer Tooling)
│   └── xgov-sdk-ts/
│       └── src/
│           └── index.ts      # TypeScript SDK for integration
│
├── 📂 web-ui/                 # Live AgentPay Demo (Frontend)
│   └── src/
│       └── index.html        # Interactive reputation dashboard
│
└── 📂 docs/                   # Documentation & Media
    ├── ARCHITECTURE.md       # Technical deep dive
    ├── DEPLOYMENT.md         # Deployment guide
    └── MEDIA/                # Screenshots & diagrams
```

---

## 🔗 Setup & Deployment

### Prerequisites

- **Rust & Anchor CLI** (v0.29.0+)
- **Solana CLI** (v1.18+)
- **Node.js** (v18+)
- **Python** (v3.10+)

### 1. Deploy Solana Program

```bash
# Build the Solana program
cd programs
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Update the program ID in lib.rs with the deployed address
```

### 2. Setup Agents

```bash
# Install Orchestrator dependencies
cd agents/orchestrator-agent
pip install -r requirements.txt

# Install Service Agent dependencies
cd ../service-agents/data-analyst-agent
npm install
```

### 3. Run Agents

```bash
# Terminal 1: Start Service Agents
cd agents/service-agents/data-analyst-agent
npm start

# Terminal 2: Run Orchestrator
cd agents/orchestrator-agent
python main.py
```

### 4. Launch Web UI

```bash
cd web-ui/src
# Open index.html in browser or serve with:
python -m http.server 8000
```

**(Note:** Detailed deployment steps are provided in `docs/DEPLOYMENT.md`.)**

---

## 🌟 Key Features

### ✅ **Trustless Reputation System**
- Each agent has a tamper-proof on-chain identity
- Reputation updates automatically based on transaction success/failure
- Complete transparency in performance records

### ✅ **Agent-to-Agent Economy**
- Precise and instant USDC micropayments via x402
- No intermediaries or bank accounts needed
- True autonomous agent economy

### ✅ **AI-Powered Orchestration**
- Intelligent breakdown of complex tasks
- Reputation-based selection of best agent
- Autonomous budget management

### ✅ **Developer-Friendly SDK**
- Easy-to-use TypeScript library
- Quick integration with new agents
- Comprehensive documentation and examples

---

## 🎥 Demo Video

🎬 [Watch the Demo Video Here](docs/MEDIA/)

The video demonstrates:
- Registering a new agent on Solana
- x402 payment between agents
- Real-time on-chain reputation updates

---

## 🏆 Why This Project Deserves to Win

1. **🎯 Comprehensive Track Coverage**: Uniquely combines Solana + x402 + AI Agents
2. **💎 True Innovation**: First decentralized reputation protocol for agents
3. **🔧 Practical Application**: Real-world, scalable use case
4. **📚 Code Quality**: Professional standards in programming and documentation
5. **🚀 Future Impact**: Paves the way for a global agent economy

---

## 📞 Contact & Support

- **GitHub**: [github.com/samarabdelhameed/X-Gov-Agent-Network](https://github.com/samarabdelhameed/X-Gov-Agent-Network)
- **Twitter**: [@XGovNetwork](#)
- **Discord**: [Join our community](#)

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for Solana x x402 Hackathon 2025**

*By Agents, For Agents, With Agents*

</div>
