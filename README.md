<div align="center">
  <br/>
  <h1>🌿 Shamba-Sync</h1>
  <p><strong>Agri-Voice Agent — Multi-Agent AI System for African Smallholder Farmers</strong></p>
  
  <p>
    <a href="#-overview">Overview</a> •
    <a href="#-the-problem">The Problem</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-agents">Agents</a> •
    <a href="#-cap-integration">CAP Integration</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-hackathon">Hackathon</a>
  </p>

  <br/>
  
  <p>
    <img src="https://img.shields.io/badge/CROO-Agent_Store-2d6a4f?style=flat-square" alt="CROO Agent Store"/>
    <img src="https://img.shields.io/badge/CAP-Protocol-6366f1?style=flat-square" alt="CAP Protocol"/>
    <img src="https://img.shields.io/badge/Solana-USDC-9945FF?style=flat-square" alt="Solana USDC"/>
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License"/>
  </p>

  <br/>
</div>

---

## 📋 Overview

**Shamba-Sync** (from Kiswahili *"Shamba"* meaning farm + *"Sync"* meaning synchronization) is a **multi-agent AI system** that brings precision agriculture to Africa's 33 million smallholder farmers.

Farmers can **send a voice note, type a message, or snap a photo** in Swahili, Hausa, Yoruba, or English, and instantly receive:

1. 🔬 **Crop disease diagnosis** — What's wrong with my plant?
2. 💊 **Treatment recommendations** — How do I fix it organically or chemically?
3. 💰 **Market prices & buyer connections** — Where should I sell and for how much?

All powered by **three coordinated AI agents** on the **CROO Agent Protocol (CAP)** — a decentralized A2A commerce standard that lets agents discover, hire, and pay each other on-chain using USDC on Solana.

> **Built for the CROO Agent Store Hackathon** — Proving how A2A composability and on-chain commerce drive the next generation of autonomous applications.

---

## 🌍 The Problem

### Agriculture in Africa

| Metric | Value |
|--------|-------|
| Percentage of Africa's workforce in agriculture | **60-70%** |
| Smallholder farmers (under 2 hectares) | **33 million** |
| Extension workers per 5,000 farmers | **1** |
| Crop loss due to preventable diseases | **30-40%** |
| Farmers losing income to middlemen exploitation | **Majority** |

### The Gap

Extension workers (government agricultural advisors) are severely scarce — **1 per 5,000 farmers**. This means:

- Farmers don't know what disease is affecting their crops
- They apply wrong treatments, wasting money and time
- They sell at unfair prices because they lack market information
- Language barriers prevent access to global agricultural knowledge

### How Shamba-Sync Solves This

Shamba-Sync acts as a **24/7 AI extension worker** that:
- **Speaks your language** — Swahili, Hausa, Yoruba, Kinyarwanda, Luganda, English
- **Listens to voice notes** — No typing needed for low-literacy users
- **Analyzes photos** — Computer vision identifies diseases instantly
- **Knows local markets** — Regional pricing data across East and West Africa
- **Finds buyers** — Direct connections to bypass middlemen
- **Costs almost nothing** — 0.75 USDC per full diagnosis (≈ $0.75)
- **Works on WhatsApp** — No app download, works on any phone

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CROO Agent Store                            │
│   ┌─────────────── CAP Protocol (A2A Commerce) ─────────────┐   │
│   │  Register → Discover → Hire → Pay (USDC on Solana)      │   │
│   └──────────────────────────┬──────────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────────┘
                               │ API / A2A Calls
┌──────────────────────────────▼──────────────────────────────────┐
│                   Shamba-Sync Backend                            │
│                         (Node.js + Express)                      │
│                                                                  │
│   ┌─────────────────┐    ┌────────────────┐    ┌──────────────┐ │
│   │   🔬 Agent 1    │    │   💊 Agent 2   │    │  💰 Agent 3  │ │
│   │  Translator &   │───▶│   Agronomist   │───▶│   Market     │ │
│   │   Vision        │    │                │    │   Connector  │ │
│   └─────────────────┘    └────────────────┘    └──────────────┘ │
│          │                      │                     │          │
│          └──────────────────────┴─────────────────────┘          │
│                             │                                    │
│                    Multi-Agent Orchestrator                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
     🌐 Web UI           📱 WhatsApp            📞 USSD
  (Vite + React)        (Twilio Webhook)       (Future)

```

### Agent Pipeline Flow

```
👩‍🌾 Farmer sends voice note in Swahili
        │
        ▼
🔬 Agent 1: Translator & Vision
   ├── Whisper STT: "Mazao yangu ya nyanya yana majani manjano..."
   ├── Translation: "My tomato plants have yellow leaves..."
   └── Vision Analysis: Tomato - Early Blight (87% confidence)
        │
        ▼
💊 Agent 2: Agronomist
   ├── Organic: Neem Oil Spray (1,500 TZS)
   ├── Chemical: Mancozeb 80% WP (5,000 TZS)
   └── Cultural: Prune lower leaves, mulch, rotate crops
        │
        ▼
💰 Agent 3: Market Connector
   ├── Price: 2,500 TZS/kg (up 25% from last month)
   ├── Trend: Rising - sell within the next week
   └── Buyers: FreshProduce Co-op, School Feeding Program
        │
        ▼
👩‍🌾 Farmer receives full advisory report on WhatsApp
```

---

## 🤖 Agents

### Agent 1: Translator & Vision Agent 🔬

The **entry point** for all farmer queries. Converts raw human input into structured data.

| Capability | How It Works | Technology |
|-----------|-------------|------------|
| **Speech-to-Text** | Farmer sends a voice note → gets transcribed | OpenAI Whisper API |
| **Image Analysis** | Farmer snaps a crop photo → disease detected | GPT-4o Vision |
| **Translation** | Swahili/Hausa/Yoruba → English (and reverse) | GPT-4o |
| **Text Analysis** | Farmer types a description → crop + symptoms extracted | Keyword NLP |

**Input**: Voice note, image, or text in any supported language  
**Output**: Structured diagnosis with crop, disease, severity, symptoms, confidence score

```json
{
  "crop": "tomato",
  "disease": "Early Blight (Alternaria solani)",
  "severity": "medium",
  "symptoms": ["Yellowing of lower leaves", "Dark brown spots with concentric rings"],
  "confidence": 87,
  "language": "sw",
  "original_text": "Mazao yangu ya nyanya yana majani manjano..."
}
```

**Pricing**: 0.50 USDC

---

### Agent 2: Agronomist Agent 💊

The **decision engine** that turns a diagnosis into an actionable treatment plan, localized to the farmer's region.

| Treatment Type | Examples | Cost |
|---------------|----------|------|
| 🌿 **Organic** | Neem Oil Spray, Baking Soda Solution, Compost Tea, Garlic-Chili Spray | 200-1,500 TZS |
| 🧪 **Chemical** | Mancozeb 80%, Copper Oxychloride | 4,000-5,000 TZS |
| 🌾 **Cultural** | Crop rotation, mulching, pruning lower leaves, drip irrigation | Free |
| 🛡️ **Preventative** | Disease-resistant varieties, proper spacing, weekly monitoring | Free - low |

**Region-specific**: Treatments are tailored to East Africa, West Africa, Central Africa, or Southern Africa based on local availability.

**Input**: Diagnosis from Agent 1 + farmer's region  
**Output**: Complete treatment plan with ingredients, preparation steps, application methods, costs, and local availability

**Pricing**: Included in diagnosis (0.50 USDC)

---

### Agent 3: Market Connector Agent 💰

The **economic intelligence** that ensures farmers get fair value for their harvest.

| Feature | Description |
|---------|-------------|
| 💹 **Price Data** | Current prices from 4+ regional markets |
| 📈 **Trend Analysis** | Week/month/year price trends with strength indicators |
| 🎯 **Sell Recommendation** | HOLD / SELL_SOON / SELL_NOW / NEUTRAL |
| 🤝 **Buyer Network** | Direct connections to cooperatives, schools, collectives |
| ⚠️ **Middleman Alert** | Detects price spreads >30% that indicate exploitation |
| 🔮 **Forecast** | Next-month price prediction based on seasonality |

**Example Output**:
```
💰 Price: 2,500 TZS/kg (up 25% from last month)
📈 Trend: Rising (moderate)
🏪 Best Market: Kariakoo Market (2,800 TZS/kg)
📊 Advice: Good time to sell within the next week
🤝 Direct Buyers: FreshProduce Co-op, School Feeding Program
```

**Input**: Crop type + region  
**Output**: Market prices, trends, sell recommendation, buyer contacts, tips

**Pricing**: 0.25 USDC

---

## 🤝 CAP Integration

### What is CAP?

**CAP (CROO Agent Protocol)** is a decentralized A2A (Agent-to-Agent) standard that lets any agent, in any framework, discover, hire, and pay any other agent on-chain. Think of it as **TCP/IP for AI Agents**.

### How Shamba-Sync Uses CAP

#### 1️⃣ Agent Registration

On startup, Shamba-Sync builds and registers a **CAP Agent Manifest**:

```javascript
{
  capVersion: '1.0.0',
  agentId: 'shamba-sync-v1',
  name: 'Shamba-Sync Agri-Voice Agent',
  wallet: { address: '0x...', chain: 'solana', tokens: ['USDC'] },
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
  supportedRegions: ['east-africa', 'west-africa', 'central-africa', 'southern-africa'],
}
```

This manifest is discoverable by the **CROO Agent Store**, allowing:
- **Humans** to find and pay for Shamba-Sync's services
- **Other agents** to discover and hire Shamba-Sync as a dependency

#### 2️⃣ A2A Discovery

Other agents discover Shamba-Sync by querying:

```
GET /cap/manifest
```

This returns the full manifest with capabilities, pricing, and input/output schemas.

#### 3️⃣ A2A Job Execution

When another agent wants to hire Shamba-Sync, it sends a CAP-formatted job request:

```json
POST /api/process/cap
{
  "capVersion": "1.0.0",
  "service": "crop-diagnosis",
  "requesterAgentId": "my-blockchain-monitor-agent-v1",
  "parameters": {
    "text": "Tomato leaves turning yellow with dark spots",
    "region": "east-africa"
  },
  "payment": {
    "transactionSignature": "5Kt...",
    "amount": 0.50,
    "token": "USDC"
  }
}
```

#### 4️⃣ On-Chain Settlement

- **Token**: USDC (Solana)
- **Gas Fee**: **0%** during CROO Agent Store launch window 🎯
- **Wallet**: The `USDC_WALLET_ADDRESS` in your `.env` file receives payments
- **Receipt**: Every job returns a signed receipt with transaction details

### CAP Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/cap/manifest` | GET | Return agent capabilities for discovery |
| `/cap/register` | POST | Register agent on CROO Agent Store |
| `/api/process/cap` | POST | Handle A2A job requests from other agents |
| `/api/pricing` | GET | Return current service pricing |
| `/health` | GET | Return agent health status for CAP monitoring |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (v24 recommended)
- npm v9+

### 1. Clone and Install

```bash
# Navigate to the project
cd shamba-sync

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Environment Setup

```bash
# Copy the example env file
cd ../backend
cp .env.example .env

# Edit .env with your API keys (optional — demo mode works without them)
```

The `.env` file already has sensible defaults for demo mode:

```env
PORT=3001
NODE_ENV=development
CAP_AGENT_ID=shamba-sync-v1
CAP_REGISTRY_URL=https://api.croo.io/v1/cap
```

### 3. Run in Demo Mode

**Terminal 1 — Start the backend (the AI agent server):**

```bash
cd shamba-sync/backend
node src/index.js
```

You'll see:
```
🌿 Shamba-Sync Agri-Voice Agent
Server running on port 3001
✅ Agent "Shamba-Sync Agri-Voice Agent" registered on CROO Agent Store.
```

**Terminal 2 — Start the frontend (the web UI):**

```bash
cd shamba-sync/frontend
npx vite
```

You'll see:
```
VITE v8.0.16  ready in 473 ms
➜  Local:   http://localhost:5173/
```

### 4. Use the Web Interface

1. Open **http://localhost:5173** in your browser
2. Click **"🍅 Tomato issue (Swahili)"** demo button
3. Click **"Diagnose My Crop — 0.75 USDC"**
4. Watch as the 3 agents process your request
5. See the **full advisory report** with diagnosis, treatment, and market data

### 5. Test with curl

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test the full pipeline (English)
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"My tomato leaves are turning yellow with spots","region":"east-africa","language":"en"}'

# Test with Swahili (demonstrates translation)
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"Nyanya yangu ina majani manjano","region":"east-africa","language":"sw"}'

# Get the CAP agent manifest
curl http://localhost:3001/cap/manifest | python3 -m json.tool
```

---

## 📡 API Reference

### `POST /api/process`

Process a farming query through all 3 agents.

**Request Body:**

```json
{
  "type": "text | mixed | voice | image",
  "text": "Farmer's description of the crop problem",
  "image": "base64_encoded_image (optional)",
  "mimeType": "image/jpeg (optional)",
  "region": "east-africa | west-africa | central-africa | southern-africa",
  "farmerId": "unique_id_for_tracking (optional)",
  "language": "en | sw | ha | yo | rw | lg"
}
```

**Response:**

```json
{
  "jobId": "ss-1718691234567-abc123",
  "status": "completed",
  "steps": {
    "translatorVision": { "... Agent 1 full output ..." },
    "agronomist": { "... Agent 2 full output ..." },
    "marketConnector": { "... Agent 3 full output ..." }
  },
  "summary": "🌱 Crop: tomato\n🔍 Diagnosis: Early Blight...\n💊 Treatment: Neem Oil Spray...\n💰 Market: 2,500 TZS/kg..."
}
```

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Agent health and status |
| GET | `/cap/manifest` | Full CAP agent manifest |
| POST | `/cap/register` | Register on CROO Agent Store |
| POST | `/api/process/cap` | CAP-compatible A2A endpoint |
| GET | `/api/pricing` | Current service pricing |
| GET | `/api/jobs/:jobId` | Get status/results of a specific job |
| GET | `/api/farmers/:farmerId/jobs` | Get all jobs for a farmer |
| POST | `/whatsapp/webhook` | Twilio WhatsApp webhook |

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend Framework** | Node.js + Express | API server and agent orchestration |
| **Frontend Framework** | React 19 + Vite 8 | Web user interface |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design |
| **AI Speech** | OpenAI Whisper API | Voice note transcription |
| **AI Vision** | GPT-4o | Crop disease image analysis |
| **AI Text** | GPT-4o | Translation, text analysis, treatment generation |
| **Messaging** | Twilio API | WhatsApp integration |
| **Protocol** | CROO Agent Protocol (CAP) | A2A commerce, discovery, payments |
| **Blockchain** | Solana + USDC | On-chain payment settlement |
| **Language** | JavaScript (ESM) | Modern module-based code |

### Why This Stack?

- **Node.js**: Handles concurrent requests well, excellent for API services
- **Express**: Minimal, well-known, works great for agent endpoints
- **Vite + React**: Fast dev experience, production-optimized builds
- **Tailwind**: Rapid UI development with consistent design system
- **OpenAI**: Best-in-class for both speech recognition and vision analysis
- **CAP Protocol**: The only decentralized A2A standard for agent commerce
- **Solana**: Fast, cheap transactions — perfect for microtransactions (0.50 USDC)

---

## 📁 Project Structure

```
shamba-sync/
│
├── backend/                          # API server & AI agents
│   ├── src/
│   │   ├── agents/
│   │   │   ├── agent1-translator-vision.js    # Speech-to-Text + Vision AI
│   │   │   ├── agent2-agronomist.js           # Treatment recommendations
│   │   │   └── agent3-market-connector.js     # Market intelligence
│   │   ├── cap/
│   │   │   └── cap-integration.js             # CROO Agent Protocol
│   │   ├── config/
│   │   │   └── config.js                      # Environment configuration
│   │   ├── orchestrator/
│   │   │   └── orchestrator.js                # Agent pipeline coordinator
│   │   └── index.js                           # Express server entry point
│   ├── .env.example                           # Environment variables template
│   ├── start.sh                               # Render deployment script
│   └── package.json
│
├── frontend/                         # Web UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                     # Navigation bar
│   │   │   ├── Hero.jsx                       # Landing section
│   │   │   ├── InputForm.jsx                  # Query form with demo presets
│   │   │   ├── ResultsDashboard.jsx           # Full results display
│   │   │   ├── AgentPipeline.jsx              # Agent architecture explainer
│   │   │   ├── CAPSection.jsx                 # CAP protocol details
│   │   │   ├── WhatsAppSection.jsx            # WhatsApp integration guide
│   │   │   └── Footer.jsx                     # Footer with hackathon info
│   │   ├── App.jsx                            # Main app with tab navigation
│   │   ├── main.jsx                           # React entry point
│   │   └── index.css                          # Tailwind + custom animations
│   ├── vite.config.js                         # Vite config with dev proxy
│   └── package.json
│
├── DEPLOY.md                          # Deployment guide (Render + Vercel)
└── README.md                          # This file
```

---

## 📱 WhatsApp Integration

Farmers can access Shamba-Sync directly from WhatsApp — no app download needed.

### How It Works

```
👩‍🌾 Farmer                    📱 WhatsApp                    🌐 Twilio
   │                            │                              │
   ├── Send voice note ────────►│                              │
   │  "Nyanya yangu ina         │                              │
   │   majani manjano..."       │                              │
   │                            ├── Webhook POST ─────────────►│
   │                            │   /whatsapp/webhook          │
   │                            │                              ├──► Shamba-Sync
   │                            │                              │    Agent Pipeline
   │                            │                              │
   │◄── Receive report ────────┤◄── TwiML Response ───────────┤
   │  "🌿 Shamba-Sync Report    │                              │
   │   Crop: Tomato             │                              │
   │   Diagnosis: Early Blight  │                              │
   │   Treatment: Neem Oil..."  │                              │
```

### Setup (requires a Twilio account)

1. Create a [Twilio](https://twilio.com) account
2. Enable the WhatsApp Sandbox
3. Set webhook URL to `POST /whatsapp/webhook`
4. Configure env vars: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER`

The Twilio webhook handler in `src/index.js`:
- Detects whether the message contains text, a voice note, or an image
- Routes through all 3 agents
- Returns a formatted WhatsApp message with the advisory report

---

## 🌍 Supported Languages

| Language | Code | Writing System | Voice Support |
|----------|------|---------------|---------------|
| English | `en` | Latin | ✅ |
| Swahili (Kiswahili) | `sw` | Latin | ✅ |
| Hausa (Hausa) | `ha` | Latin/Ajami | ✅ |
| Yoruba (Yorùbá) | `yo` | Latin | ✅ |
| Kinyarwanda | `rw` | Latin | ✅ |
| Luganda | `lg` | Latin | ✅ |

Translation flow:
1. Farmer sends text/voice in any supported language
2. Agent 1 detects the language and translates to English
3. AI processing happens in English
4. Results are translated back to the farmer's language for the response

---

## 🎯 Hackathon Submission

### Tracks Entered

1. **Research & Intelligence Agents** — Paid research with verifiable sources
2. **Open – Any A2A Agents** — Proving A2A composability

### Why Shamba-Sync Wins

| Criterion | How We Deliver |
|-----------|---------------|
| **Multimodal AI** | Voice (Whisper) + Vision (GPT-4o) + Text |
| **Real World Impact** | Agriculture = 60% of Africa's GDP, 33M smallholder farmers |
| **A2A Composable** | Fully CAP-integrated, other agents can hire us as a dependency |
| **On-Chain Commerce** | USDC payments on Solana, 0% gas fee during launch |
| **Accessible** | WhatsApp = no app download, works on basic phones |
| **Multi-Language** | 5 African languages + English |
| **Region-Specific** | Tailored to East/West/Central/Southern Africa |
| **Open Source** | MIT license, public GitHub repo |

---

## 🧪 Testing

### Run the test suite

```bash
# Start backend
cd backend && node src/index.js

# In another terminal, test endpoints
curl http://localhost:3001/health
curl http://localhost:3001/cap/manifest
curl http://localhost:3001/api/pricing

# Test full pipeline with English query
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"Tomato leaves turning yellow with brown spots","region":"east-africa","language":"en"}'

# Test with Swahili
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"Nyanya yangu ina majani manjano na madoa","region":"east-africa","language":"sw"}'

# Test market query
curl -X POST http://localhost:3001/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"What is the market price for maize in East Africa?","region":"east-africa","language":"en"}'
```

### Frontend test

```bash
cd frontend && npx vite build
# Should complete without errors
```

---

## 🚢 Deployment

See **[DEPLOY.md](./DEPLOY.md)** for the full step-by-step deployment guide.

Quick summary:

| Service | Platform | Cost | URL |
|---------|----------|------|-----|
| **Backend** | Render | Free ($0/mo) | `https://shamba-sync-backend.onrender.com` |
| **Frontend** | Vercel | Free ($0/mo) | `https://shamba-sync.vercel.app` |
| **Database** | None needed | Free | In-memory (add Redis for persistence) |
| **Uptime** | UptimeRobot | Free | Pings backend every 5 min |

---

## 📝 License

MIT License — Free for open-source use. Commercial use requires attribution.

```
Copyright (c) 2026 Shamba-Sync Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 🙏 Acknowledgments

- **CROO** — For building the Agent Protocol and hosting this hackathon
- **OpenAI** — For Whisper and GPT-4o APIs that power the AI capabilities
- **Twilio** — For WhatsApp Business API
- **Solana** — For fast, low-cost blockchain infrastructure
- **DoraHacks** — For hosting the hackathon submission platform

---

<div align="center">
  <br/>
  <p>
    <strong>🌿 Shamba-Sync: Your AI Agri-Advisor for African Farmers</strong>
  </p>
  <p>
    <sub>Powering the future of agriculture, one agent at a time.</sub>
  </p>
  <br/>
  <p>
    <a href="https://croo.io">CROO</a> •
    <a href="https://solana.com">Solana</a> •
    <a href="https://dorahacks.io">DoraHacks</a>
  </p>
  <br/>
</div>
