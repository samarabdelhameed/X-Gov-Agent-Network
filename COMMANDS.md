# 🔧 جميع الأوامر المستخدمة - X-Gov Agent Network

## 🛑 إيقاف المشروع

```bash
# إيقاف جميع عمليات Node.js
killall node

# إيقاف Orchestrator API
pkill -f "python.*api_server"

# أو إيقاف الكل مع بعض
killall node 2>/dev/null; pkill -f "python.*api_server" 2>/dev/null
```

---

## 🚀 تشغيل المشروع

### **الطريقة الأسهل - استخدام السكريبت:**

```bash
cd /Users/s/solana/X-Gov-Agent-Network
chmod +x START_ALL.sh
./START_ALL.sh
```

### **الطريقة اليدوية - ثلاث نوافذ Terminal:**

#### Terminal 1 - Service Agent:
```bash
cd /Users/s/solana/X-Gov-Agent-Network/agents/service-agents/data-analyst-agent
npm start
```

#### Terminal 2 - Orchestrator API:
```bash
cd /Users/s/solana/X-Gov-Agent-Network/agents/orchestrator-agent
python3 api_server.py
```

#### Terminal 3 - Web UI:
```bash
cd /Users/s/solana/X-Gov-Agent-Network/web-ui
npm run dev
```

---

## 🧪 اختبار الخدمات

### **اختبار Service Agent:**

```bash
# Health check
curl http://localhost:3001/health

# مع jq للتنسيق
curl -s http://localhost:3001/health | jq .

# معلومات Agent
curl -s http://localhost:3001/info | jq .

# اختبار x402 Protection (يجب أن يرجع 402)
curl http://localhost:3001/scrape?q=test
```

### **اختبار Orchestrator API:**

```bash
# Health check
curl http://localhost:5001/health

# مع jq
curl -s http://localhost:5001/health | jq .

# قائمة الوكلاء
curl -s http://localhost:5001/api/agents | jq .

# تنفيذ orchestration كامل
curl -X POST http://localhost:5001/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"task": "Analyze SOL price trends and sentiment"}'
```

### **اختبار Web UI:**

```bash
# فحص بسيط
curl -s http://localhost:3000 | head -1

# أو
curl -I http://localhost:3000
```

---

## 📊 فحص حالة العمليات

### **عرض العمليات الشغالة:**

```bash
# كل عمليات Node و Python
ps aux | grep -E "(node|python)" | grep -v grep

# عمليات محددة فقط
ps aux | grep -E "(node.*3001|node.*3000|python.*5001)" | grep -v grep

# PID فقط
ps aux | grep -E "(node server.js|python3 api_server|npm run dev)" | grep -v grep | awk '{print $2}'
```

### **فحص البورتات المستخدمة:**

```bash
# فحص بورت معين
lsof -i :3001
lsof -i :3000
lsof -i :5001

# إيقاف عملية على بورت معين
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

---

## 📝 عرض اللوجات

### **قراءة اللوجات:**

```bash
# Service Agent log
tail -f /tmp/service-agent.log

# أو آخر 50 سطر
tail -50 /tmp/service-agent.log

# Orchestrator API log
tail -f /tmp/orchestrator-api.log
tail -50 /tmp/orchestrator-api.log

# Web UI log
tail -f /tmp/web-ui.log
tail -50 /tmp/web-ui.log

# عرض جميع اللوجات جنب بعض (في نوافذ منفصلة)
tail -f /tmp/service-agent.log &
tail -f /tmp/orchestrator-api.log &
tail -f /tmp/web-ui.log &
```

### **مسح اللوجات:**

```bash
# مسح كل اللوجات
rm /tmp/service-agent.log /tmp/orchestrator-api.log /tmp/web-ui.log

# أو
rm /tmp/*.log
```

---

## 🔄 إعادة تشغيل خدمة معينة

### **إعادة تشغيل Service Agent فقط:**

```bash
# إيقاف
pkill -f "node.*server.js"

# تشغيل
cd /Users/s/solana/X-Gov-Agent-Network/agents/service-agents/data-analyst-agent
nohup npm start > /tmp/service-agent.log 2>&1 &

# أو في الخلفية مع رؤية الناتج
npm start
```

### **إعادة تشغيل Orchestrator API فقط:**

```bash
# إيقاف
pkill -f "python.*api_server"

# تشغيل
cd /Users/s/solana/X-Gov-Agent-Network/agents/orchestrator-agent
nohup python3 api_server.py > /tmp/orchestrator-api.log 2>&1 &

# أو
python3 api_server.py
```

### **إعادة تشغيل Web UI فقط:**

```bash
# إيقاف
pkill -f "npm.*dev"

# تشغيل
cd /Users/s/solana/X-Gov-Agent-Network/web-ui
nohup npm run dev > /tmp/web-ui.log 2>&1 &

# أو
npm run dev
```

---

## 🔍 فحص شامل للنظام

### **كومند واحد يفحص كل حاجة:**

```bash
echo "=== Service Agent ===" && \
curl -s http://localhost:3001/health | jq -r '"\(.status) - \(.agent)"' && \
echo "" && \
echo "=== Orchestrator API ===" && \
curl -s http://localhost:5001/health | jq -r '"\(.status) - \(.service)"' && \
echo "" && \
echo "=== Web UI ===" && \
(curl -s http://localhost:3000 > /dev/null && echo "✅ Running" || echo "❌ Not responding")
```

### **فحص مع عرض التفاصيل:**

```bash
echo "=== 📊 نظرة عامة على النظام ===" && \
echo "" && \
echo "📡 Service Agent (3001):" && \
curl -s http://localhost:3001/info | jq -c '{agent: .agent_id, status: .status, wallet: .wallet, price: .pricing.per_request_sol}' && \
echo "" && \
echo "🤖 Orchestrator API (5001):" && \
curl -s http://localhost:5001/health | jq -c '{status: .status, service: .service, mode: .mode}' && \
echo "" && \
echo "🌐 Web UI (3000):" && \
curl -I -s http://localhost:3000 | head -1 && \
echo "" && \
echo "💻 العمليات الشغالة:" && \
ps aux | grep -E "(node server.js|python3 api_server|npm run dev)" | grep -v grep | awk '{print "PID:", $2, "-", $11, $12, $13}'
```

---

## 📦 تنصيب Dependencies (إذا احتجتي)

### **Service Agent:**

```bash
cd /Users/s/solana/X-Gov-Agent-Network/agents/service-agents/data-analyst-agent
npm install
```

### **Orchestrator Agent:**

```bash
cd /Users/s/solana/X-Gov-Agent-Network/agents/orchestrator-agent
pip3 install -r requirements.txt

# أو تنصيب مكتبات معينة
pip3 install flask flask-cors solana httpx openai python-dotenv
```

### **Web UI:**

```bash
cd /Users/s/solana/X-Gov-Agent-Network/web-ui
npm install

# إذا فيه مشاكل، امسحي node_modules وأعيدي التنصيب
rm -rf node_modules package-lock.json .next
npm install
```

---

## 🧹 تنظيف النظام

### **مسح كل الملفات المؤقتة:**

```bash
# مسح node_modules
rm -rf agents/service-agents/data-analyst-agent/node_modules
rm -rf web-ui/node_modules

# مسح build files
rm -rf web-ui/.next

# مسح logs
rm /tmp/service-agent.log /tmp/orchestrator-api.log /tmp/web-ui.log
```

### **إعادة تشغيل نظيفة:**

```bash
# إيقاف كل حاجة
killall node 2>/dev/null
pkill -f "python.*api_server" 2>/dev/null

# الانتظار قليلاً
sleep 2

# إعادة تشغيل
cd /Users/s/solana/X-Gov-Agent-Network
./START_ALL.sh
```

---

## 🐛 Troubleshooting Commands

### **إذا البورت مشغول:**

```bash
# معرفة مين مستخدم البورت
lsof -i :3001
lsof -i :3000
lsof -i :5001

# إيقاف العملية
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9

# على macOS، إيقاف AirPlay Receiver (يستخدم 5000)
# System Settings > General > AirDrop & Handoff > AirPlay Receiver (OFF)
```

### **إذا npm ما يشتغلش:**

```bash
# تحديث npm
npm install -g npm@latest

# مسح cache
npm cache clean --force

# إعادة تنصيب
rm -rf node_modules package-lock.json
npm install
```

### **إذا Python فيه مشاكل:**

```bash
# التحقق من Python version
python3 --version

# تحديث pip
pip3 install --upgrade pip

# إعادة تنصيب requirements
pip3 install --force-reinstall -r requirements.txt
```

---

## 🎯 الكوماندات الأكثر استخداماً

### **للاستخدام اليومي:**

```bash
# 1. إيقاف كل حاجة
killall node; pkill -f "python.*api_server"

# 2. تشغيل كل حاجة
cd /Users/s/solana/X-Gov-Agent-Network && ./START_ALL.sh

# 3. فحص الحالة
curl -s http://localhost:3001/health | jq .status
curl -s http://localhost:5001/health | jq .status
curl -s http://localhost:3000 > /dev/null && echo "OK" || echo "Failed"

# 4. عرض اللوجات
tail -f /tmp/service-agent.log

# 5. اختبار x402
curl http://localhost:3001/scrape?q=test
```

---

## 📖 أوامر مفيدة إضافية

### **Git Commands:**

```bash
# فحص الحالة
git status

# إضافة كل الملفات
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

### **معلومات النظام:**

```bash
# Node version
node --version

# npm version
npm --version

# Python version
python3 --version

# معلومات النظام
uname -a

# المساحة المتاحة
df -h
```

---

## 🚀 Quick Start One-Liner

**كومند واحد يوقف ويشغل كل حاجة:**

```bash
cd /Users/s/solana/X-Gov-Agent-Network && killall node 2>/dev/null; pkill -f "python.*api_server" 2>/dev/null; sleep 2; ./START_ALL.sh
```

---

## 🎬 Demo Testing Commands

### **اختبار Complete Flow:**

```bash
# 1. التأكد من الخدمات شغالة
curl -s http://localhost:3001/health && echo "✅ Service Agent OK"
curl -s http://localhost:5001/health && echo "✅ Orchestrator OK"
curl -s http://localhost:3000 > /dev/null && echo "✅ Web UI OK"

# 2. اختبار x402 Protection
echo "Testing x402 protection..."
curl http://localhost:3001/scrape?q=solana

# 3. اختبار Orchestration
echo "Testing orchestration..."
curl -X POST http://localhost:5001/api/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"task": "Analyze Solana network activity"}' | jq .
```

---

## 💡 Pro Tips

```bash
# استخدام alias للأوامر المتكررة
alias xgov-start="cd /Users/s/solana/X-Gov-Agent-Network && ./START_ALL.sh"
alias xgov-stop="killall node 2>/dev/null; pkill -f 'python.*api_server' 2>/dev/null"
alias xgov-status="curl -s http://localhost:3001/health && curl -s http://localhost:5001/health"
alias xgov-logs="tail -f /tmp/service-agent.log"

# بعد كده تقدري تستخدمي:
xgov-start
xgov-stop
xgov-status
xgov-logs
```

---

**🎉 كل الأوامر جاهزة للاستخدام! انسخي اللي تحتاجيه! 📋**

