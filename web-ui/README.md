# X-Gov Agent Network - Web UI

## 🎨 Interactive AgentPay Demo

A stunning, production-ready web interface showcasing the X-Gov Agent Network's decentralized reputation protocol and x402 payment system on Solana.

### ✨ Features

- **🎯 Animated Welcome Page** - Eye-catching neon green theme with particle effects
- **📊 Live Orchestration Dashboard** - Real-time task execution visualization
- **📈 Network Insights** - Interactive charts showing agent reputation and transaction volume
- **⚡ x402 Payment Flow** - Step-by-step visualization of blockchain payments
- **🔄 Real-Time Updates** - Live data from Solana blockchain and service agents
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🎨 Design

- **Theme**: Black background with neon green accents (#00ff41)
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **Style**: Modern, cyberpunk-inspired with glassmorphism effects

### 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Blockchain**: @solana/web3.js

### 📦 Installation

```bash
# Install dependencies
npm install

# or with yarn
yarn install
```

### 🚀 Running the App

#### Development Mode

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build

```bash
# Build
npm run build

# Start production server
npm start
```

### 📁 Project Structure

```
web-ui/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Welcome page
│   │   ├── orchestrate/
│   │   │   └── page.tsx          # Main orchestration dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   └── components/
│       ├── TaskInput.tsx         # Task submission form
│       ├── OrchestrationTimeline.tsx  # Live execution timeline
│       ├── NetworkInsights.tsx   # Charts and stats
│       └── TaskOutput.tsx        # Result display
├── public/                       # Static assets
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

### 🎯 Key Pages

#### 1. Welcome Page (`/`)

- Animated particle background
- Floating neon effects
- Call-to-action button
- Links to documentation and GitHub

#### 2. Orchestration Dashboard (`/orchestrate`)

**Left Panel:**
- Task input with example prompts
- Live orchestration timeline showing 8 steps:
  1. Task Decomposition (via GPT-4o-mini)
  2. Querying Solana for Agent Reputation
  3. Selecting Best Service Agent
  4. Initiating x402 Payment
  5. Awaiting Payment Verification
  6. Payment Verified! Service Data Received
  7. Recording Validation On-Chain
  8. Task Completed!
- Task output with transaction links

**Right Panel:**
- Network statistics (total agents, reputation, transactions)
- Agent reputation bar chart
- Reputation distribution pie chart
- x402 transaction volume line chart (24h)
- Top agents list

### 🔗 Integration

The UI connects to:

1. **Orchestrator API** (`localhost:5000`)
   - POST `/api/orchestrate` - Submit tasks

2. **Service Agents** (`localhost:3001+`)
   - Real-time status checks
   - Payment verification

3. **Solana Blockchain** (devnet)
   - Transaction verification
   - Reputation queries
   - Links to Solana Explorer

### 🎨 Customization

#### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'neon-green': '#00ff41',  // Main accent color
  'dark-bg': '#0a0e14',     // Background
  'dark-card': '#151a23',   // Card background
}
```

#### Animations

Modify `globals.css` for custom animations:

```css
@keyframes your-animation {
  /* ... */
}
```

### 📊 Data Sources

The UI displays data from:

- **Solana Reputation Program** - Agent profiles and scores
- **Service Agents** - Real-time status and availability
- **Orchestrator** - Task execution logs
- **Mock Data** - For demo purposes when services are offline

### 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

### 🚀 Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 🎥 Demo Features

Perfect for hackathon presentations:

- **Visual Impact**: Neon green theme is memorable
- **Animation**: Smooth transitions keep viewers engaged
- **Live Data**: Real charts update in real-time
- **Transparency**: Links to blockchain explorer for verification
- **Professional**: Production-ready code quality

### 🏆 Hackathon Impact

This UI demonstrates:

1. ✅ **Best AgentPay Demo** - Interactive visualization of x402 payments
2. ✅ **Real-time blockchain integration** - Live Solana data
3. ✅ **Professional design** - Modern, polished interface
4. ✅ **Complete workflow** - End-to-end task orchestration
5. ✅ **Developer-friendly** - Clean, documented code

### 🐛 Troubleshooting

**Charts not displaying:**
- Check console for errors
- Ensure Recharts is properly installed

**Slow animations:**
- Reduce particle count in `page.tsx`
- Disable animations in `framer-motion` config

**API connection errors:**
- Verify orchestrator is running on port 5000
- Check CORS settings

**Build errors:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### 📝 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_ORCHESTRATOR_URL=http://localhost:5000
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_SOLANA_CLUSTER=devnet
```

### 🎬 Recording a Demo

1. Start all services (orchestrator + service agents)
2. Open UI in browser
3. Use example tasks for consistent results
4. Record with OBS or Loom
5. Highlight: animations, charts, blockchain links

### 📞 Support

- **GitHub**: [X-Gov-Agent-Network](https://github.com/samarabdelhameed/X-Gov-Agent-Network)
- **Documentation**: `/docs/X402_INTEGRATION.md`

---

**Built with ❤️ for Solana x x402 Hackathon 2025**

