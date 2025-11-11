# ⚡ Quick Start - X-Gov Agent Network

## 🚀 Start the Frontend (Simple Steps)

### Step 1: Open Terminal

```bash
cd /Users/s/solana/X-Gov-Agent-Network/web-ui
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Wait & Open Browser

**Wait 10-15 seconds** then open:

👉 **http://localhost:3000**

---

## ✅ What You Should See

1. **Beautiful Welcome Page** with:
   - Animated neon green particles ✨
   - Large title: "X-Gov Agent Network"
   - Green glowing button: "Launch X-Gov Demo"

2. **Click the button** to go to Orchestration Dashboard

3. **Dashboard Features**:
   - Task input box (left side)
   - Live timeline visualization
   - Network insights with charts (right side)

---

## 🎨 The UI Features

### Welcome Page (`/`)
- Animated particle background
- Neon green cyberpunk theme
- Smooth transitions
- Professional design

### Orchestration Page (`/orchestrate`)
- **Left Panel:**
  - Task input with examples
  - Live 8-step timeline
  - Task results

- **Right Panel:**
  - Network statistics
  - Agent reputation chart (bar)
  - Distribution chart (pie)
  - Transaction volume (line chart)
  - Top agents leaderboard

---

## 🔧 If You See Errors

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Try again
npm run dev
```

### Build Errors

```bash
# Clean and reinstall
rm -rf .next node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

---

## 📱 Expected Output in Terminal

```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 3.2s
```

---

## 🎯 Quick Demo

1. Open http://localhost:3000
2. Click "Launch X-Gov Demo"
3. Type or click an example task
4. Click "Orchestrate Task"
5. Watch the animated timeline!

---

## 💡 Tips

- **Be Patient**: First load takes 10-15 seconds
- **Check Terminal**: Look for "Ready in X.Xs"
- **Refresh**: Press Cmd+R if page doesn't load
- **Check Port**: Make sure port 3000 is free

---

## 🎨 Color Theme

- **Background**: Dark (#0a0e14)
- **Cards**: Dark grey (#151a23)  
- **Accent**: Neon green (#00ff41)
- **Text**: Light grey/white

---

## 📊 What the Charts Show

1. **Bar Chart**: Agent reputation scores
2. **Pie Chart**: Reputation distribution
3. **Line Chart**: Transaction volume (24h)
4. **Cards**: Live network statistics

---

## ✨ Animations

- Floating particles
- Smooth page transitions
- Timeline progress indicators
- Hover effects
- Glow effects

---

## 🏆 This Demonstrates

✅ Best AgentPay Demo ($5,000 prize)
- Professional UI
- Real-time updates
- Interactive charts
- Complete workflow

---

## 📞 Need Help?

If the frontend doesn't start:

1. Check you're in the right directory:
   ```bash
   pwd
   # Should show: .../X-Gov-Agent-Network/web-ui
   ```

2. Check Node.js version:
   ```bash
   node --version
   # Should be v18+ or v20+
   ```

3. Try fresh install:
   ```bash
   rm -rf node_modules .next
   npm install --legacy-peer-deps
   npm run dev
   ```

---

## 🎉 Success!

When you see the welcome page with neon green theme and animated particles, **you're ready!**

Click "Launch X-Gov Demo" and enjoy! 🚀

---

**Built with ❤️ for Solana x x402 Hackathon 2025**

