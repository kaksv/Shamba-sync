<p align="center">
  <br>
  <img src="https://img.shields.io/badge/CROO-Agent%20Store-2d6a4f?style=for-the-badge" alt="CROO Agent Store"/>
  <img src="https://img.shields.io/badge/CAP-Protocol-6366f1?style=for-the-badge" alt="CAP Protocol"/>
  <img src="https://img.shields.io/badge/Solana-USDC-9945FF?style=for-the-badge" alt="Solana USDC"/>
</p>

<h1 align="center">🌿 Shamba-Sync: Agri-Voice Agent</h1>

<p align="center">
  <strong>Multi-Agent AI System for African Smallholder Farmers</strong><br>
  Powered by CROO Agent Protocol (CAP) — Decentralized A2A Commerce
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-agents">Agents</a> •
  <a href="#-cap-integration">CAP Integration</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-whatsapp">WhatsApp</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-hackathon">Hackathon</a>
</p>

---

## 📋 Overview

**Shamba-Sync** (from Swahili "Shamba" meaning farm + "Sync") is a multi-agent AI system that brings precision agriculture to Africa's smallholder farmers through voice, image, and text interfaces.

### The Problem
- Agriculture employs **60-70%** of Africa's workforce, but extension workers are scarce
- **1 extension worker per 5,000 farmers** in most regions
- Farmers lack access to crop disease diagnosis, treatment advice, and fair market prices
- Middlemen exploit farmers due to information asymmetry

### The Solution
A three-agent AI pipeline accessible via WhatsApp (voice notes), web, or USSD:

1. **📸 Snap a photo** of a diseased crop → Get instant diagnosis
2. **🎤 Send a voice note** in Swahili/Hausa/Yoruba → Get treatment plan
3. **💰 Ask about prices** → Get market data + direct buyer connections

### Why CROO / CAP?

| Feature | Benefit |
|---------|---------|
| **A2A Composable** | Other agents can hire Shamba-Sync as a dependency — earn from a network |
| **On-chain Payments** | 0.50 USDC per diagnosis, settled on Solana |
| **0% Gas Fee** | During CROO Agent Store launch window |
| **Agent Store Listing** | Discoverable by humans AND other agents |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     CROO Agent Store                          │
│  ┌────────────── CAP Protocol ──────────────────────────┐    │
│  │  Register | Discover | Hire | Pay (USDC on Solana)   │    │
│  └────────────────────┬─────────────────────────────────┘    │
└───────────────────────┼─────────────────────────────────────┘
                        │ A2A / API Calls
┌───────────────────────▼─────────────────────────────────────┐
│                Shamba-Sync Backend (Node.js)                  │
│                                                               │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────────┐  │
│  │  Agent 1    │   │  Agent 2     │   │  Agent 3         │  │
│  │ Translator  │──▶│ Agronomist   │──▶│ Market Connector │  │
│  │ + Vision    │   │              │   │                  │  │
│  └─────────────┘   └──────────────┘   └──────────────────┘  │
│        │                  │                    │              │
│        └──────────────────┴────────────────────┘              │
│                           │                                   │
│                  Multi-Agent Orchestrator                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   Web UI (Vite)    WhatsApp       USSD (future)
   + Tailwind CSS   (Twilio)
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Node.js + Express | API server, agent orchestration |
| **Frontend** | Vite + React + Tailwind CSS | Web user interface |
| **AI/ML** | OpenAI Whisper (speech), GPT-4o Vision (images) | Agent 1 capabilities |
| **Messaging** | Twilio WhatsApp API | Farmer communication channel |
| **Protocol** | CROO Agent Protocol (CAP) v1.0.0 | A2A commerce, discovery, payment |
| **Blockchain** | Solana + USDC | Payment settlement |
| **Language** | ESM Modules | Modern JavaScript |

---

## 🤖 Agents

### Agent 1: Translator & Vision Agent 🎤📸

**Role**: The farmer's first point of contact — converts raw input into structured data.

| Capability | Input | Output | Technology |
|-----------|-------|--------|------------|
| Speech-to-Text | Voice note (Swahili, Hausa, Yoruba, etc.) | Transcribed text | Whisper API |
| Image Analysis | Crop photo (JPG/PNG) | Disease diagnosis | GPT-4o Vision |
| Translation | Any supported language | English text | GPT-4o |
| Text Analysis | Farmer description | Crop + symptom detection | Keyword NLP |

**Output Format**:
```json
{
  "crop": "tomato",
  "disease": "Early Blight (Alternaria solani)",
  "severity": "medium",
  "symptoms": ["Yellowing of lower leaves", "Dark brown spots"],
  "confidence": 87
}
```

**Pricing**: 0.50 USDC

---

### Agent 2: Agronomist Agent 💊🌾

**Role**: Cross-references diagnoses with a knowledge base of region-specific treatments.

| Capability | Description |
|-----------|-------------|
| 🟢 Organic Treatments | Neem oil, baking soda, compost tea, garlic-chili spray |
| 🔵 Chemical Treatments | Mancozeb, Copper Oxychloride (with safety precautions) |
| 🌾 Cultural Practices | Crop rotation, mulching, pruning, drip irrigation |
| 🛡️ Preventative | Disease-resistant varieties, spacing, monitoring |
| 📍 Region-Specific | Tailored to East/West/Central/Southern Africa |

**Example Output**:
```
🌿 Organic: Neem Oil Spray (~1,500 TZS per application)
   - Mix 100ml neem oil + 10ml soap + 10L water
   - Spray every 7-10 days on all plant surfaces
🧪 Chemical: Mancozeb 80% WP (~5,000 TZS per 500g packet)
   - 2g per liter, foliar spray, 14-day pre-harvest interval
🌾 Cultural: Remove lower leaves, apply mulch, rotate crops
```

**Pricing**: Included in diagnosis (0.50 USDC)

---

### Agent 3: Market Connector Agent 💰📊

**Role**: Provides real-time market intelligence and connects farmers directly to buyers.

| Capability | Description |
|-----------|-------------|
| 💹 Price Data | Current prices from multiple regional markets |
| 📈 Trend Analysis | Week/month/year price trends |
| 🎯 Sell Recommendations | HOLD / SELL / SELL_NOW based on trends |
| 🤝 Buyer Network | Direct connections to cooperatives, schools, collectives |
| ⚠️ Middleman Alerts | Detects price spreads >30% between markets |

**Example Output**:
```
💰 Price: 2,500 TZS/kg (up 25% from last month)
📈 Trend: Rising (moderate)
🏪 Best Market: Kariakoo Market (2,800 TZS/kg)
📊 Advice: Good time to sell within the next week
🤝 Direct Buyers: FreshProduce Co-op, School Feeding Program
```

**Pricing**: 0.25 USDC

---

## 🤝 CAP Integration

### What is CAP?

**CAP (CROO Agent Protocol)** is the decentralized A2A (Agent-to-Agent) standard that lets any agent, in any framework, discover, hire, and pay any other agent on-chain. Think of it as **TCP/IP for Agents**.

### How Shamba-Sync Uses CAP

#### 1. Agent Registration (on startup)
```javascript
// Built automatically in cap-integration.js
const manifest = {
  capVersion: '1.0.0',
  agentId: 'shamba-sync-v1',
  name: 'Shamba-Sync Agri-Voice Agent',
  serviceEndpoint: 'http://localhost:3001',
  wallet: { address: '...', chain: 'solana', tokens: ['USDC'] },
  pricing: [
    { service: 'crop-diagnosis', priceUSD: 0.50 },
    { service: 'market-price-check', priceUSD: 0.25 },
    { service: 'full-agri-advisory', priceUSD: 0.75 },
  ],
  capabilities: [
    'speech-to-text', 'crop-vision-analysis',
    'treatment-recommendation', 'market-price-intelligence',
    'buyer-connection', 'multi-language-translation'
  ],
}
```

#### 2. Service Discovery
Other agents discover Shamba-Sync by querying:
```
GET /cap/manifest
```

#### 3. A2A Job Execution
Agents hire Shamba-Sync by sending CAP-formatted requests:
```
POST /api/process/cap
{
  "service": "crop-diagnosis",
  "text": "Tomato leaves turning yellow",
  "region": "east-africa",
  "payment": { 
    "transactionSignature": "...",
    "amount": 0.50,
    "token": "USDC"
  }
}
```

#### 4. On-chain Settlement
- **Token**: USDC (Solana)
- **Gas Fee**: 0% during launch window 🎯
- **Wallet**: Configure `USDC_WALLET_ADDRESS` env var

### CAP Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/cap/manifest` | GET | Agent capabilities, pricing, schema |
| `/cap/register` | POST | Register on CROO Agent Store |
| `/api/process/cap` | POST | Handle A2A job requests |
| `/health` | GET | Agent health status |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Clone & Install

```bash
# Navigate to project
cd shamba-sync

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Environment Setup

```bash
cp backend/.env.example backend/.env
# Edit .env with your keys (optional for demo mode)
```

### 3. Run in Demo Mode

**Terminal 1 — Backend:**
```bash
cd shamba-sync/backend
node src/index.js
```

**Terminal 2 — Frontend:**
```bash
cd shamba-sync/frontend
npx vite
```

**Open:** http://localhost:5173 🎉

### 4. Test with curl

```bash
# Swahili tomato query (Text Analysis)
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "text": "Nyanya yangu ina majani manjano na madoa",
    "region": "east-africa",
    "language": "sw"
  }'

# English market query
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "text": "What is the market price for maize?",
    "region": "east-africa",
    "language": "en"
  }'

# CAP manifest
curl http://localhost:3001/cap/manifest | python3 -m json.tool

# Health check
curl http://localhost:3001/health
```

---

## 📡 API Reference

### `POST /api/process`
Process a farming query through all 3 agents.

**Request Body:**
```json
{
  "type": "text | mixed | voice | image",
  "text": "Farmer's description (optional)",
  "image": "base64_encoded_image (optional)",
  "audio": "base64_encoded_audio (optional)",
  "mimeType": "image/jpeg (optional)",
  "region": "east-africa | west-africa | central-africa | southern-africa",
  "farmerId": "unique_farmer_id (optional)",
  "language": "en | sw | ha | yo | rw | lg"
}
```

**Response:**
```json
{
  "jobId": "ss-1234567890-abc123",
  "farmerId": "demo-user",
  "region": "east-africa",
  "status": "completed",
  "steps": {
    "translatorVision": { "... Agent 1 output ..." },
    "agronomist": { "... Agent 2 output ..." },
    "marketConnector": { "... Agent 3 output ..." }
  },
  "summary": "🌱 Crop: tomato\n🔍 Diagnosis: ...\n💊 Treatment: ...\n💰 Market: ...",
  "startedAt": "2026-06-19T08:32:09.357Z",
  "completedAt": "2026-06-19T08:32:09.358Z"
}
```

### `POST /api/process/cap`
CAP-compatible endpoint for Agent-to-Agent calls.

### `GET /cap/manifest`
Returns the full CAP agent manifest for discovery.

### `GET /api/pricing`
Returns current service pricing.

### `GET /api/jobs/:jobId`
Get the status and results of a specific job.

### `GET /health`
Agent health status.

---

## 📱 WhatsApp Integration

### Setup (requires Twilio account)

1. **Create Twilio Account** → Enable WhatsApp Sandbox
2. **Configure Webhook** → Point to `POST /whatsapp/webhook`
3. **Set Environment**:
   ```bash
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_WHATSAPP_NUMBER=+14155238886
   ```
4. **Start chatting!** Send voice notes, photos, or text

### Supported Interactions

| Input Type | Example | What Happens |
|-----------|---------|-------------|
| 📝 **Text** | "Nyanya yangu ina majani manjano" | Translation → Diagnosis → Treatment → Prices |
| 🎤 **Voice Note** | Voice message in Swahili | Whisper transcription → Diagnosis → Treatment → Prices |
| 📸 **Photo** | Image of diseased crop | Vision analysis → Disease ID → Treatment → Prices |
| 📸+📝 **Photo + Text** | Photo + "What should I do?" | Combined analysis → Full pipeline |

### WhatsApp Response Format

```
🌿 *Shamba-Sync Report* 🌿

🌱 *Crop*: tomato
🔍 *Diagnosis*: Early Blight (87% confidence)
💊 *Top Treatment*: Neem Oil Spray
💰 *Market Price*: 2500 TZS/kg
📊 *Advice*: Good time to sell within the next week
```

---

## 🎯 Hackathon Submission

### Tracks Entered
1. **Research & Intelligence Agents** — Paid research with verifiable sources
2. **Open – Any A2A Agents** — Proving A2A composability

### Why Shamba-Sync Wins
| Criteria | How We Deliver |
|----------|---------------|
| **Multimodal AI** | Voice (Whisper) + Vision (GPT-4o) + Text |
| **Real Impact** | Agriculture = 60% of Africa's GDP |
| **A2A Composable** | Fully CAP-integrated, other agents can hire us |
| **On-chain Commerce** | USDC payments on Solana, 0% gas fee |
| **Accessible** | WhatsApp = no app download, USSD for feature phones |
| **Multi-language** | 5 African languages + English |

### Submission Checklist
- [x] Public GitHub repo (MIT license)
- [x] CAP integration complete
- [x] Demo web UI
- [x] WhatsApp integration ready
- [ ] 5-minute demo video (create separately)
- [ ] Deploy to production (see Deployment section)

---

## 🚢 Deployment

### Option 1: Fly.io (Recommended)

```bash
# Install flyctl
brew install flyctl

# Launch
cd shamba-sync/backend
fly launch
fly secrets set OPENAI_API_KEY=sk-...
fly secrets set TWILIO_ACCOUNT_SID=...
# etc.
fly deploy
```

### Option 2: Railway

```bash
# Connect GitHub repo → Railway
# Set environment variables
# Deploy
```

### Option 3: VPS (DigitalOcean, Linode)

```bash
# Clone repo, install deps
# Set up PM2 for process management
pm2 start src/index.js --name shamba-sync
pm2 save
pm2 startup
```

### Frontend Deployment (Vercel)

```bash
cd shamba-sync/frontend
npx vercel --prod
```

Don't forget to set the Vite proxy to your deployed backend URL in production.

---

## 🔧 Production Configuration

For production use, you'll need:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes (for real AI) | OpenAI API key for Whisper + GPT-4o |
| `USDC_WALLET_ADDRESS` | Yes (for payments) | Solana wallet to receive USDC |
| `TWILIO_ACCOUNT_SID` | For WhatsApp | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | For WhatsApp | Twilio auth token |
| `TWILIO_WHATSAPP_NUMBER` | For WhatsApp | Twilio WhatsApp number |
| `CAP_REGISTRY_URL` | Optional | CROO CAP registry endpoint |
| `REDIS_URL` | Optional | For caching market data |

---

## 📁 Project Structure

```
shamba-sync/
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   │   ├── agent1-translator-vision.js   # Speech-to-Text + Vision
│   │   │   ├── agent2-agronomist.js          # Treatment recommendations
│   │   │   └── agent3-market-connector.js    # Market intelligence
│   │   ├── cap/
│   │   │   └── cap-integration.js            # CROO Agent Protocol
│   │   ├── config/
│   │   │   └── config.js                     # Environment configuration
│   │   ├── orchestrator/
│   │   │   └── orchestrator.js               # Agent pipeline coordinator
│   │   └── index.js                          # Express server entry point
│   ├── .env.example                          # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                    # Navigation + status
│   │   │   ├── Hero.jsx                      # Landing section
│   │   │   ├── InputForm.jsx                 # Query input with demos
│   │   │   ├── ResultsDashboard.jsx          # Full results display
│   │   │   ├── AgentPipeline.jsx             # Agent architecture explainer
│   │   │   ├── CAPSection.jsx                # CAP protocol details
│   │   │   ├── WhatsAppSection.jsx           # WhatsApp integration guide
│   │   │   └── Footer.jsx                    # Hackathon info
│   │   ├── App.jsx                           # Main app with tabs
│   │   ├── main.jsx                          # Entry point
│   │   └── index.css                         # Tailwind + animations
│   ├── vite.config.js                        # Vite config with proxy
│   └── package.json
│
└── README.md                                 # This file
```

---

## 🧪 Testing

### Backend Test
```bash
cd backend
node src/index.js

# In another terminal:
curl http://localhost:3001/health
curl http://localhost:3001/cap/manifest
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"Test query","region":"east-africa","language":"en"}'
```

### Frontend Build Test
```bash
cd frontend
npx vite build
# Should complete without errors
```

### End-to-End Demo
1. Start backend (`node src/index.js`)
2. Start frontend (`npx vite`)
3. Open http://localhost:5173
4. Click "🌱 Tomato Early Blight (Swahili)" demo button
5. Click "🚀 Diagnose My Crop"
6. View results across all 3 agents

---

## 📜 License

MIT License — Free for open-source use. Commercial use requires attribution.

Built with ❤️ for the **CROO Agent Store Hackathon** — empowering Africa's farmers through decentralized AI.

---

<p align="center">
  <strong>🌿 Shamba-Sync: Your AI Agri-Advisor for African Farmers</strong><br>
  <sub>Powering the future of agriculture, one agent at a time.</sub>
</p>

<p align="center">
  <a href="https://croo.io">CROO</a> •
  <a href="https://dorahacks.io">DoraHacks</a> •
  <a href="https://solana.com">Solana</a>
</p>