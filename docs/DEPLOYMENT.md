# 🚀 X-Gov Agent Network - Deployment Guide

## Production Deployment

---

## Prerequisites

- Node.js 18+ with npm
- Python 3.10+ with pip
- Solana CLI 1.18+
- Anchor CLI 0.29.0 (for Solana program)
- Git

---

## 1. Deploy Solana Program (Devnet)

### Build and Deploy:

```bash
cd programs
anchor build
anchor deploy --provider.cluster devnet
```

### Update Program ID:

After deployment, update the program ID in these files:
- `programs/src/lib.rs` (declare_id! macro)
- `agents/orchestrator-agent/main.py` (REPUTATION_PROGRAM_ID)
- `agents/service-agents/data-analyst-agent/server.js` (REPUTATION_PROGRAM_ID)
- `web-ui/src/lib/solana.ts` (REPUTATION_PROGRAM_ID)

---

## 2. Deploy Service Agent

### Option A: Railway.app (Recommended)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd agents/service-agents/data-analyst-agent
railway init
railway up
```

**Environment Variables:**
```
PORT=3001
AGENT_NAME=DataAnalystAgent
SERVICE_TYPE=data_scraper
SOLANA_RPC_URL=https://api.devnet.solana.com
AGENT_WALLET_PRIVATE_KEY=<your_base58_key>
PAYMENT_REQUIRED_LAMPORTS=5000000
REPUTATION_PROGRAM_ID=<deployed_program_id>
```

### Option B: Render.com

1. Create new Web Service
2. Connect GitHub repo
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `agents/service-agents/data-analyst-agent`
4. Add environment variables (same as above)

### Option C: Local with Public URL (ngrok)

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from ngrok.com

# Start service agent
cd agents/service-agents/data-analyst-agent
npm start

# In another terminal, expose to internet
ngrok http 3001
```

---

## 3. Deploy Orchestrator API

### Option A: Railway.app

```bash
cd agents/orchestrator-agent
railway init
railway up
```

**Environment Variables:**
```
PORT=5001
OPENAI_API_KEY=<your_openai_key>
SOLANA_RPC_URL=https://api.devnet.solana.com
REPUTATION_PROGRAM_ID=<deployed_program_id>
ORCHESTRATOR_WALLET_SECRET=<your_wallet_secret>
```

### Option B: Render.com

1. Create new Web Service
2. Set:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python api_server.py`
   - **Root Directory:** `agents/orchestrator-agent`
3. Add environment variables

---

## 4. Deploy Frontend (Vercel)

### Automatic Deployment:

1. Go to: https://vercel.com/new
2. Import: `samarabdelhameed/X-Gov-Agent-Network`
3. Configure:
   - **Root Directory:** `web-ui`
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`

4. **Environment Variables:**
   ```
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_REPUTATION_PROGRAM_ID=<program_id>
   NEXT_PUBLIC_SERVICE_AGENT_URL=https://your-service-agent.railway.app
   NEXT_PUBLIC_ORCHESTRATOR_URL=https://your-orchestrator.railway.app
   ```

5. Click **Deploy**

### CLI Deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd web-ui
vercel --prod
```

---

## 5. Verify Deployment

### Test Service Agent:

```bash
curl https://your-service-agent.railway.app/health
# Expected: {"status": "healthy"}

curl https://your-service-agent.railway.app/scrape?q=test
# Expected: HTTP 402 Payment Required
```

### Test Orchestrator:

```bash
curl https://your-orchestrator.railway.app/health
# Expected: {"status": "healthy"}

curl -X POST https://your-orchestrator.railway.app/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"task": "Test deployment"}'
# Expected: Orchestration result with transaction signatures
```

### Test Frontend:

Visit your Vercel URL and verify:
- ✅ Home page loads
- ✅ Dashboard accessible
- ✅ Agents page displays
- ✅ Network insights show data

---

## Configuration

### Service Agent Configuration:

**Required:**
- `PORT` - API port (default: 3001)
- `AGENT_WALLET_PRIVATE_KEY` - Base58 private key
- `SOLANA_RPC_URL` - Solana RPC endpoint
- `REPUTATION_PROGRAM_ID` - Deployed program address

**Optional:**
- `PAYMENT_REQUIRED_LAMPORTS` - Price (default: 5000000 = 0.005 SOL)
- `AGENT_NAME` - Display name
- `SERVICE_TYPE` - Service category

### Orchestrator Configuration:

**Required:**
- `SOLANA_RPC_URL` - Solana RPC endpoint
- `REPUTATION_PROGRAM_ID` - Deployed program address

**Optional:**
- `OPENAI_API_KEY` - For LLM task decomposition (fallback if not provided)
- `ORCHESTRATOR_WALLET_SECRET` - Wallet for payments (auto-generated if not provided)

### Frontend Configuration:

**Required:**
- `NEXT_PUBLIC_SOLANA_RPC_URL` - Solana RPC endpoint
- `NEXT_PUBLIC_REPUTATION_PROGRAM_ID` - Program address

**Optional (for full functionality):**
- `NEXT_PUBLIC_SERVICE_AGENT_URL` - Service agent base URL
- `NEXT_PUBLIC_ORCHESTRATOR_URL` - Orchestrator API URL

---

## Monitoring

### Health Checks:

```bash
# Service Agent
curl https://your-service-agent.railway.app/health

# Orchestrator
curl https://your-orchestrator.railway.app/health

# Frontend
curl https://your-frontend.vercel.app
```

### Logs:

**Railway:**
- View logs in Railway dashboard
- Real-time log streaming: `railway logs`

**Vercel:**
- View logs in Vercel dashboard
- Functions logs for API routes

**Local:**
- Service Agent: `tail -f /tmp/service-agent.log`
- Orchestrator: `tail -f /tmp/orchestrator-api.log`
- Web UI: `tail -f /tmp/web-ui.log`

---

## Cost Estimates

### Solana (Devnet/Mainnet):

- Transaction cost: ~0.000005 SOL (~$0.00025)
- Account rent: ~0.002 SOL per account
- x402 payment: 0.005 SOL (configurable)

### Hosting:

- **Railway:** Free tier (500 hours/month)
- **Vercel:** Free tier (unlimited)
- **Render:** Free tier (750 hours/month)

**Total Monthly Cost (Free Tier):** $0

**Total Monthly Cost (Paid):** ~$10-20

---

## Production Checklist

- [ ] Solana program deployed on Devnet/Mainnet
- [ ] Program ID updated in all configs
- [ ] Service agent deployed with public URL
- [ ] Orchestrator API deployed with public URL
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] Health checks passing
- [ ] x402 protection verified
- [ ] Payment flow tested end-to-end
- [ ] Solana Explorer links working
- [ ] Documentation updated

---

## Rollback Procedure

If deployment fails:

```bash
# 1. Check logs
railway logs  # or Vercel logs

# 2. Verify environment variables
railway variables  # or Vercel dashboard

# 3. Rollback to previous version
railway rollback  # or Vercel dashboard

# 4. Re-deploy from known good commit
git checkout <good_commit>
railway up
```

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/samarabdelhameed/X-Gov-Agent-Network/issues)
- Review logs in platform dashboards
- Verify environment variables
- Test locally first with `./START_ALL.sh`

---

**For local development, simply run:** `./START_ALL.sh`

