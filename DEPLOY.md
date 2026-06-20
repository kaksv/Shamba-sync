# 🚀 Shamba-Sync Deployment Guide

Deploy backend to Render.com and frontend to Vercel, then connect them.

---

## Architecture After Deployment

```
┌──────────────────┐       ┌──────────────────┐
│   Frontend       │       │   Backend        │
│   (Vercel)       │ ────▶ │   (Render)       │
│   shamba-sync    │  API  │   shamba-sync    │
│   .vercel.app    │ calls │   .onrender.com  │
└──────────────────┘       └──────────────────┘
```

---

## Step 1: Push Your Code to GitHub

```bash
# From the shamba-sync folder
cd /Users/kakooza/Documents/buidl/CROO-Project/shamba-sync

# Initialize git
git init
git add .
git commit -m "Initial commit - Shamba-Sync Agri-Voice Agent"

# Go to https://github.com/new and create a repo called "shamba-sync"
# Then:
git remote add origin https://github.com/YOUR_USERNAME/shamba-sync.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2a. Go to Render
- Open **https://dashboard.render.com**
- Click **"New +"** → **"Web Service"**
- Click **"Connect your GitHub"** if not already connected
- Select the `shamba-sync` repository

### 2b. Configure the Web Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `shamba-sync-backend` |
| **Region** | Frankfurt (EU) or Oregon (US) — pick closest to users |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Root Directory** | `backend` (IMPORTANT — this tells Render to look in the backend folder) |
| **Build Command** | `npm install` |
| **Start Command** | `node src/index.js` |
| **Plan** | **Free** ($0/month) |

### 2c. Add Environment Variables

Scroll down to **"Environment Variables"** and add these:

| Key | Value | Why |
|-----|-------|-----|
| `NODE_ENV` | `production` | Tells Express to run in production mode |
| `OPENAI_API_KEY` | *(your key if you have one)* | For real AI features (optional) |
| `USDC_WALLET_ADDRESS` | `9cE6uKBovLwS7fmBJY9B1kjAnidyKSCmUFyv1TV4L8Dw` | Your Solana wallet |

### 2d. Deploy

Click **"Create Web Service"** at the bottom.

Wait **2-3 minutes** for the build. Once done, Render gives you a URL like:
```
https://shamba-sync-backend.onrender.com
```

**Copy this URL — you'll need it for the frontend.**

### 2e. Test the backend

```bash
curl https://shamba-sync-backend.onrender.com/health
```

Expected response:
```json
{"agentId":"shamba-sync-v1","status":"online","jobsProcessed":0}
```

---

## Step 3: Update the Frontend for Production

### 3a. Update `vite.config.js`

Open `shamba-sync/frontend/vite.config.js` and replace its content with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/cap': 'http://localhost:3001',
      '/health': 'http://localhost:3001',
    },
  },
})
```

### 3b. Update `App.jsx` to use the backend URL

Open `shamba-sync/frontend/src/App.jsx` and add this at the top (after the imports):

```js
// Backend API URL — uses Render URL in production, localhost in development
const API_URL = import.meta.env.VITE_API_URL || ''
```

Then change the `fetch` call inside `handleProcessQuery` from:

```js
const response = await fetch('/api/process', {
```

to:

```js
const response = await fetch(`${API_URL}/api/process`, {
```

### 3c. Commit these changes and push

```bash
cd /Users/kakooza/Documents/buidl/CROO-Project/shamba-sync
git add .
git commit -m "Update frontend for production API URL"
git push
```

---

## Step 4: Deploy Frontend to Vercel

### 4a. Go to Vercel
- Open **https://vercel.com**
- Click **"Add New"** → **"Project"**
- Import your GitHub repo: `shamba-sync`

### 4b. Configure the project

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` (IMPORTANT!) |
| **Build Command** | `npm run build` (auto-detected) |
| **Output Directory** | `dist` (auto-detected) |

### 4c. Add Environment Variable

Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://shamba-sync-backend.onrender.com` |

**This is the crucial step** — it tells the frontend where to find the backend.

### 4d. Deploy

Click **"Deploy"**.

Wait ~1 minute. Vercel gives you a URL like:
```
https://shamba-sync.vercel.app
```

---

## Step 5: Test Everything

### Test 1: Backend is alive
```bash
curl https://shamba-sync-backend.onrender.com/health
```

### Test 2: Backend CAP manifest
```bash
curl https://shamba-sync-backend.onrender.com/cap/manifest
```

### Test 3: Full pipeline via API
```bash
curl -X POST https://shamba-sync-backend.onrender.com/api/process \
  -H "Content-Type: application/json" \
  -d '{"type":"text","text":"My tomato leaves are turning yellow","region":"east-africa","language":"en"}'
```

### Test 4: Open the website
Open **https://shamba-sync.vercel.app** in your browser.

Click the demo buttons — they should now call your live backend on Render.

---

## What to Do If It Doesn't Work

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Frontend loads but API calls fail | `VITE_API_URL` not set in Vercel | Go to Vercel → Project → Settings → Environment Variables → Add `VITE_API_URL` |
| Backend returns 502/504 on first request | Render free tier cold start | Wait 30 seconds and refresh — it wakes up on first request |
| CORS error in browser console | Render backend blocking Vercel domain | Already handled by `cors()` middleware, but verify it's there |
| Build fails on Render | Root directory not set to `backend` | Go to Render dashboard → Service → Settings → Root Directory → change to `backend` |
| Build fails on Vercel | Root directory not set to `frontend` | Go to Vercel → Project → Settings → General → Root Directory → change to `frontend` |

---

## Keeping the Free Tier Alive

**Render free tier**: Sleeps after 15 minutes of inactivity. First request takes ~30s to wake up.

To prevent this, use **https://uptimerobot.com** (free) to ping your backend every 5 minutes:
- Create a monitor
- URL: `https://shamba-sync-backend.onrender.com/health`
- Interval: 5 minutes

**Vercel free tier**: Always on, no cold starts.

---

## Final URLs (after deployment)

```
Frontend (Vercel):  https://shamba-sync.vercel.app    ← Open this in browser
Backend  (Render):  https://shamba-sync-backend.onrender.com  ← API server
GitHub:             https://github.com/YOUR_USERNAME/shamba-sync
```

---

## Your Turn: Quick Action Steps

1. ❏ Push code to GitHub (`git push`)
2. ❏ Deploy backend on Render (use root dir: `backend`)
3. ❏ Copy Render URL (e.g. `https://shamba-sync-backend.onrender.com`)
4. ❏ Set `VITE_API_URL` in Vercel environment variables
5. ❏ Deploy frontend on Vercel (use root dir: `frontend`)
6. ❏ Open the Vercel URL and test it