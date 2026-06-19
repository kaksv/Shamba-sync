/**
 * Shamba-Sync - Main Server Entry Point
 * 
 * This server serves as the backend for the Shamba-Sync Agri-Voice Agent.
 * It exposes:
 * 1. REST API for the web frontend
 * 2. CAP protocol endpoints for CROO Agent Store integration
 * 3. WhatsApp webhook for Twilio integration
 * 4. Agent health/status monitoring
 */

import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import ShambaSyncOrchestrator from './orchestrator/orchestrator.js';
import CAPIntegration from './cap/cap-integration.js';

// Initialize
const app = express();
const orchestrator = new ShambaSyncOrchestrator();
const cap = new CAPIntegration(orchestrator);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// =============================================
// HEALTH & STATUS ENDPOINTS
// =============================================

/**
 * GET /health - Health check for CAP monitoring
 */
app.get('/health', (req, res) => {
  res.json(cap.getStatus());
});

/**
 * GET /cap/manifest - Get the CAP agent manifest
 * Other agents use this to discover Shamba-Sync's capabilities
 */
app.get('/cap/manifest', (req, res) => {
  const manifest = cap.buildManifest();
  res.json(manifest);
});

/**
 * POST /cap/register - Register agent on CROO Agent Store
 */
app.post('/cap/register', async (req, res) => {
  try {
    const result = await cap.register();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /cap/status - CAP agent status
 */
app.get('/cap/status', (req, res) => {
  res.json(cap.getStatus());
});

// =============================================
// CORE AGENT API ENDPOINTS
// =============================================

/**
 * POST /api/process - Process a farming query through all 3 agents
 * 
 * Body:
 * {
 *   type: 'text' | 'voice' | 'image' | 'mixed',
 *   text: 'string (optional)',
 *   image: 'base64 string (optional)',
 *   audio: 'base64 string (optional)',
 *   mimeType: 'string (optional)',
 *   region: 'east-africa (default)',
 *   farmerId: 'string (optional)',
 *   language: 'sw | ha | yo | en (optional)'
 * }
 */
app.post('/api/process', async (req, res) => {
  try {
    const { type, text, image, audio, mimeType, region, farmerId, language } = req.body;

    // Validate input
    if (!type) {
      return res.status(400).json({ error: 'Request type is required (text, voice, image, mixed)' });
    }

    // Log the request
    console.log('\n========================================');
    console.log('New Shamba-Sync Query');
    console.log('Type:', type);
    console.log('Region:', region || 'east-africa');
    console.log('Farmer:', farmerId || 'anonymous');
    console.log('========================================\n');

    // Process through orchestration pipeline
    const result = await orchestrator.processFullQuery({
      type,
      text,
      image,
      audio,
      mimeType,
      region: region || 'east-africa',
      farmerId: farmerId || 'web-user-' + Date.now(),
      language: language || 'en',
    });

    // Return the result
    res.json(result);
  } catch (error) {
    console.error('[API] Error processing query:', error);
    res.status(500).json({
      status: 'error',
      error: error.message || 'Internal server error',
    });
  }
});

/**
 * POST /api/process/cap - CAP-compatible endpoint for agent-to-agent calls
 * This is the endpoint that other agents on CROO Agent Store call
 */
app.post('/api/process/cap', async (req, res) => {
  try {
    const result = await cap.handleCAPJobRequest(req.body);
    res.json(result);
  } catch (error) {
    console.error('[CAP] Error handling job request:', error);
    res.status(500).json({
      capVersion: '1.0.0',
      status: 'error',
      error: error.message,
    });
  }
});

/**
 * GET /api/pricing - Get current pricing
 */
app.get('/api/pricing', (req, res) => {
  res.json({
    service: 'shamba-sync-agri-advisory',
    pricing: config.cap.pricing,
    services: [
      {
        name: 'Crop Disease Diagnosis',
        service: 'crop-diagnosis',
        priceUSD: config.cap.pricing.perDiagnosis,
      },
      {
        name: 'Market Price Check',
        service: 'market-price-check',
        priceUSD: config.cap.pricing.perMarketCheck,
      },
      {
        name: 'Full Agri-Advisory',
        service: 'full-agri-advisory',
        priceUSD: config.cap.pricing.perDiagnosis + config.cap.pricing.perMarketCheck,
      },
    ],
  });
});

/**
 * GET /api/jobs/:jobId - Get job status
 */
app.get('/api/jobs/:jobId', (req, res) => {
  const job = orchestrator.getJobStatus(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

/**
 * GET /api/farmers/:farmerId/jobs - Get all jobs for a farmer
 */
app.get('/api/farmers/:farmerId/jobs', (req, res) => {
  const jobs = orchestrator.getFarmerJobs(req.params.farmerId);
  res.json({ farmerId: req.params.farmerId, count: jobs.length, jobs });
});

// =============================================
// WHATSAPP INTEGRATION (Twilio Webhook)
// =============================================

/**
 * POST /whatsapp/webhook - Twilio WhatsApp webhook
 * 
 * When a farmer sends a WhatsApp message (text or voice note or image),
 * Twilio forwards it here. We process it and reply.
 */
app.post('/whatsapp/webhook', async (req, res) => {
  console.log('\n[WhatsApp] Incoming message from Twilio...');
  console.log('[WhatsApp] Body:', JSON.stringify(req.body, null, 2));

  try {
    // Extract WhatsApp message data from Twilio webhook
    const from = req.body.From || req.body.from; // Farmer's WhatsApp number
    const body = req.body.Body || req.body.body; // Text message content
    const mediaUrl = req.body.MediaUrl0; // Voice note or image URL (Twilio hosts media)
    const mediaContentType = req.body.MediaContentType0; // MIME type
    const numMedia = parseInt(req.body.NumMedia || '0');

    // Determine request type
    let requestType = 'text';
    let text = body;
    let image = null;
    let audio = null;
    let mimeType = null;

    if (numMedia > 0 && mediaUrl) {
      if (mediaContentType?.startsWith('image/')) {
        requestType = 'image';
        // In production: download from mediaUrl via Twilio API
        image = mediaUrl;
        mimeType = mediaContentType;
        text = body || ''; // Optional text with image
      } else if (mediaContentType?.startsWith('audio/')) {
        requestType = 'voice';
        // In production: download from mediaUrl via Twilio API
        audio = mediaUrl;
        mimeType = mediaContentType;
      }
    }

    // Auto-detect language from message (in production: use Whisper or lang detect)
    const language = 'sw'; // Default to Swahili for WhatsApp demo

    // Process through the orchestrator
    const result = await orchestrator.processFullQuery({
      type: requestType,
      text,
      image,
      audio,
      mimeType,
      region: 'east-africa',
      farmerId: from || 'whatsapp-user',
      language,
    });

    // Format response for WhatsApp (Twilio expects TwiML)
    let whatsappResponse = '';

    if (result.status === 'completed') {
      // Build a concise WhatsApp-friendly message
      const steps = result.steps;
      const vision = steps.translatorVision?.visionAnalysis;
      const agri = steps.agronomist;
      const market = steps.marketConnector;

      whatsappResponse += `🌿 *Shamba-Sync Report* 🌿\n\n`;

      if (vision) {
        whatsappResponse += `🌱 *Crop*: ${vision.crop}\n`;
        whatsappResponse += `🔍 *Diagnosis*: ${vision.disease}\n`;
        whatsappResponse += `⚠️ *Severity*: ${vision.severity}\n\n`;
      }

      if (agri?.recommendations?.organic?.length > 0) {
        whatsappResponse += `💊 *Top Treatment*: ${agri.recommendations.organic[0].name}\n`;
        whatsappResponse += `   ${agri.recommendations.organic[0].description.substring(0, 100)}...\n\n`;
      }

      if (market?.marketData) {
        whatsappResponse += `💰 *Market Price*: ${market.marketData.currentPrice} ${market.marketData.currency}/${market.marketData.unit}\n`;
        whatsappResponse += `📊 *Advice*: ${market.recommendation?.summary || ''}\n\n`;
      }

      if (result.summary) {
        whatsappResponse += `📋 *Full report*: Visit our web app or send "report ${result.jobId}"\n`;
      }
    } else {
      whatsappResponse = '❌ Sorry, we could not process your request. Please try again with a clear photo or description of your crop.';
    }

    // Send response back to WhatsApp via Twilio
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${whatsappResponse}</Message>
</Response>`;

    res.set('Content-Type', 'text/xml');
    res.send(twimlResponse);

  } catch (error) {
    console.error('[WhatsApp] Error processing message:', error);
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Sorry, there was an error processing your request. Please try again later.</Message>
</Response>`;
    res.set('Content-Type', 'text/xml');
    res.status(200).send(errorTwiml);
  }
});

// =============================================
// SERVER START
// =============================================

const PORT = config.port;

app.listen(PORT, async () => {
  console.log('\n========================================');
  console.log('  🌿 Shamba-Sync Agri-Voice Agent');
  console.log('========================================');
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${config.nodeEnv}`);
  console.log('');
  console.log(' API Endpoints:');
  console.log(`   Health:       http://localhost:${PORT}/health`);
  console.log(`   CAP Manifest: http://localhost:${PORT}/cap/manifest`);
  console.log(`   Process:      POST http://localhost:${PORT}/api/process`);
  console.log(`   CAP Process:  POST http://localhost:${PORT}/api/process/cap`);
  console.log(`   Pricing:      GET  http://localhost:${PORT}/api/pricing`);
  console.log(`   WhatsApp:     POST http://localhost:${PORT}/whatsapp/webhook`);
  console.log('');
  console.log(' CAP Agent:');
  console.log(`   Agent ID:     ${config.cap.agentId}`);
  console.log(`   Name:         ${config.cap.agentName}`);
  console.log(`   Pricing:      ${config.cap.pricing.perDiagnosis} USDC/diagnosis`);
  console.log(`                ${config.cap.pricing.perMarketCheck} USDC/market-check`);
  console.log(`                ${config.cap.pricing.subscriptionMonthly} USDC/month (subscription)`);
  console.log('');

  // Auto-register with CAP on startup
  console.log(' Registering with CROO Agent Protocol...');
  try {
    const regResult = await cap.register();
    console.log(` ✅ ${regResult.message}`);
  } catch (error) {
    console.log(` ⚠️ Registration skipped: ${error.message}`);
  }

  console.log('========================================\n');
});

export default app;