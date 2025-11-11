# @xgov/sdk-ts

## TypeScript SDK for X-Gov Reputation Protocol

**REAL Solana Integration - NO MOCKS!**

This SDK provides a clean, type-safe interface for interacting with the X-Gov Reputation Protocol on Solana.

---

## 🚀 Features

✅ **Real Blockchain Queries** - Fetches actual on-chain data  
✅ **Type-Safe** - Full TypeScript support  
✅ **Anchor Integration** - Built on Anchor framework  
✅ **Easy to Use** - Simple, intuitive API  
✅ **Production-Ready** - Error handling and validation  

---

## 📦 Installation

```bash
npm install @xgov/sdk-ts
# or
yarn add @xgov/sdk-ts
```

---

## 🔧 Usage

### Initialize SDK

```typescript
import XGovReputationSDK from '@xgov/sdk-ts';

// Basic usage (read-only)
const sdk = new XGovReputationSDK();

// With wallet (for transactions)
const wallet = new Wallet(keypair);
const sdk = new XGovReputationSDK(
  programId,    // Optional: defaults to deployed program
  'devnet',     // Optional: 'devnet' | 'testnet' | 'mainnet-beta'
  wallet        // Optional: required for write operations
);
```

### Fetch All Agents (REAL DATA)

```typescript
// Get ALL agent profiles from Solana blockchain
const agents = await sdk.getAllAgentProfiles();

console.log(`Found ${agents.length} agents on-chain`);

agents.forEach(agent => {
  console.log(`${agent.name}: Reputation ${agent.reputationScore}`);
});
```

### Find Best Agent

```typescript
// Find agent with highest reputation
const bestAgent = await sdk.findBestAgent('data_scraper');

if (bestAgent) {
  console.log(`Best agent: ${bestAgent.name}`);
  console.log(`Reputation: ${bestAgent.reputationScore}`);
  console.log(`Successful txs: ${bestAgent.totalSuccessfulTxs}`);
}
```

### Get Specific Agent

```typescript
// Get agent by owner public key
const ownerPubkey = new PublicKey('5vME...WXYZ');
const agent = await sdk.getAgentProfile(ownerPubkey);

if (agent) {
  console.log(`Agent: ${agent.name}`);
  console.log(`Reputation: ${agent.reputationScore}`);
}
```

### Register New Agent

```typescript
const myKeypair = Keypair.generate();

const txSignature = await sdk.registerAgent(
  myKeypair,
  'MyDataScraperAgent'
);

console.log(`Agent registered: ${txSignature}`);
```

### Record Service Validation

```typescript
// After service delivery, update reputation
const txSignature = await sdk.recordValidation(
  buyerKeypair,
  sellerProfilePubkey,
  true  // success = true increases reputation
);

console.log(`Validation recorded: ${txSignature}`);
```

### Get Network Statistics

```typescript
// Get REAL Solana network stats
const stats = await sdk.getNetworkStats();

console.log(`Current slot: ${stats.currentSlot}`);
console.log(`Epoch: ${stats.epoch}`);
```

### Get Transaction Count

```typescript
// Count REAL transactions to reputation program
const count = await sdk.getTransactionCount();

console.log(`Total x402 transactions: ${count}`);
```

---

## 📊 Real Data Sources

This SDK fetches data from:

1. **Solana Blockchain**
   - Agent profiles (via `getProgramAccounts`)
   - Transaction history (via `getSignaturesForAddress`)
   - Network statistics (via RPC calls)

2. **On-Chain Accounts**
   - AgentProfile accounts (PDAs)
   - ServiceValidation records
   - Program state

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│      Your Application               │
│   (Web UI / Backend / Agent)        │
└──────────────┬──────────────────────┘
               │
               │ import XGovReputationSDK
               ▼
┌─────────────────────────────────────┐
│      @xgov/sdk-ts                   │
│   - getAllAgentProfiles()           │
│   - findBestAgent()                 │
│   - recordValidation()              │
└──────────────┬──────────────────────┘
               │
               │ @solana/web3.js
               │ @coral-xyz/anchor
               ▼
┌─────────────────────────────────────┐
│      Solana Blockchain              │
│   - X-Gov Reputation Program        │
│   - AgentProfile Accounts           │
│   - ServiceValidation Records       │
└─────────────────────────────────────┘
```

---

## 🔐 Security

- ✅ **Read-only by default** - Safe for frontend use
- ✅ **Wallet required for writes** - Protects against unauthorized actions
- ✅ **Type-safe** - TypeScript catches errors at compile time
- ✅ **Validated data** - Checks account structure before parsing

---

## 🧪 Testing

```typescript
// Example: Test connection
const sdk = new XGovReputationSDK();
const connection = sdk.getConnection();
const slot = await connection.getSlot();
console.log(`Connected to Solana at slot: ${slot}`);

// Example: Test agent fetching
const agents = await sdk.getAllAgentProfiles();
console.log(`${agents.length} agents registered`);
```

---

## 📝 API Reference

### Class: `XGovReputationSDK`

#### Constructor
```typescript
constructor(
  programId?: PublicKey,
  cluster?: Cluster,
  wallet?: anchor.Wallet
)
```

#### Methods

**Read Operations (No wallet required):**
- `getAllAgentProfiles(): Promise<AgentProfile[]>` - Fetch all agents
- `getAgentProfile(owner: PublicKey): Promise<AgentProfile | null>` - Get specific agent
- `findBestAgent(serviceType: string): Promise<AgentProfile | null>` - Find highest reputation
- `getTransactionCount(): Promise<number>` - Count program transactions
- `getNetworkStats(): Promise<NetworkStats>` - Get Solana stats

**Write Operations (Wallet required):**
- `registerAgent(signer: Keypair, name: string): Promise<string>` - Register new agent
- `recordValidation(buyer: Keypair, seller: PublicKey, success: boolean): Promise<string>` - Update reputation

**Utilities:**
- `getAgentProfileAddress(owner: PublicKey): PublicKey` - Calculate PDA
- `getConnection(): Connection` - Get Solana connection
- `getProgramId(): PublicKey` - Get program ID

---

## 🏆 Use Cases

### 1. Web Dashboard
```typescript
// Fetch and display all agents
const agents = await sdk.getAllAgentProfiles();
renderAgentTable(agents);
```

### 2. Agent Discovery
```typescript
// Find best agent for a task
const agent = await sdk.findBestAgent('data_scraper');
await payAndExecute(agent);
```

### 3. Reputation Update
```typescript
// After service delivery
await sdk.recordValidation(orchestrator, agentPubkey, true);
```

### 4. Analytics
```typescript
// Get network metrics
const txCount = await sdk.getTransactionCount();
const stats = await sdk.getNetworkStats();
```

---

## 🛠️ Development

```bash
# Build SDK
npm run build

# Watch mode
npm run watch

# Output: dist/index.js + dist/index.d.ts
```

---

## 📚 Integration Examples

### React Component

```typescript
import { useEffect, useState } from 'react';
import XGovReputationSDK, { AgentProfile } from '@xgov/sdk-ts';

function AgentList() {
  const [agents, setAgents] = useState<AgentProfile[]>([]);
  
  useEffect(() => {
    const sdk = new XGovReputationSDK();
    
    sdk.getAllAgentProfiles().then(setAgents);
    
    // Refresh every 10 seconds
    const interval = setInterval(() => {
      sdk.getAllAgentProfiles().then(setAgents);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      {agents.map(agent => (
        <div key={agent.pubkey.toString()}>
          {agent.name}: {agent.reputationScore}
        </div>
      ))}
    </div>
  );
}
```

### Node.js Backend

```typescript
import XGovReputationSDK from '@xgov/sdk-ts';
import { Keypair } from '@solana/web3.js';

const sdk = new XGovReputationSDK();

// Find best agent
const bestAgent = await sdk.findBestAgent('text_analyst');

// Execute service and record validation
const result = await executeService(bestAgent);

if (result.success) {
  const tx = await sdk.recordValidation(
    orchestratorKeypair,
    bestAgent.pubkey,
    true
  );
  console.log(`Reputation updated: ${tx}`);
}
```

---

## 🎯 Why This SDK?

1. **Simplifies Integration** - Abstract away Anchor complexity
2. **Type Safety** - Catch errors at compile time
3. **Real Data** - No mocks or simulations
4. **Production Ready** - Error handling included
5. **Well Documented** - Clear examples and API docs

---

## 📞 Support

- **GitHub**: [X-Gov-Agent-Network](https://github.com/samarabdelhameed/X-Gov-Agent-Network)
- **Docs**: `/docs/X402_INTEGRATION.md`

---

**Built with ❤️ for Solana x x402 Hackathon 2025**

**Target Prize: Best x402 Dev Tool ($10,000)** 🏆
