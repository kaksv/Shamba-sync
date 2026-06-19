/**
 * CROO Agent Protocol (CAP) Integration
 * 
 * CAP is the decentralized A2A standard for agents to discover, hire, 
 * and pay each other on-chain. This module implements:
 * 
 * 1. Agent Registration - Register Shamba-Sync on CROO Agent Store
 * 2. Service Discovery - Expose capabilities so other agents can find us
 * 3. Job Handler - Accept incoming jobs from other agents/humans
 * 4. Payment Verification - Verify USDC payments before processing
 * 5. Result Callback - Return results to requesting agents
 * 
 * CAP Protocol Flow:
 * ┌──────────┐    1. Register Service     ┌──────────────┐
 * │  CROO    │ ◄────────────────────────── │  Shamba-Sync │
 * │  Agent   │    2. Agents Discover Us    │  CAP Agent   │
 * │  Store   │ ──────────────────────────► │              │
 * │ (CAP)    │    3. Job Request + USDC    │              │
 * │          │ ◄────────────────────────── │              │
 * │  Router  │    4. Result + Receipt      │              │
 * │          │ ──────────────────────────► │              │
 * └──────────┘                             └──────────────┘
 */

import config from '../config/config.js';

class CAPIntegration {
  constructor(orchestrator) {
    this.orchestrator = orchestrator;
    this.agentId = config.cap.agentId;
    this.registered = false;
    this.agentManifest = null;
  }

  /**
   * Build the CAP Agent Manifest
   * This is what gets published to the CROO Agent Store so other agents
   * can discover and hire Shamba-Sync.
   */
  buildManifest() {
    this.agentManifest = {
      // CAP Protocol version
      capVersion: '1.0.0',

      // Agent identity
      agentId: this.agentId,
      name: config.cap.agentName,
      description: config.cap.agentDescription,
      version: '1.0.0',

      // Who built it
      developer: {
        name: 'Shamba-Sync Team',
        contact: 'developer@shamba-sync.agri',
      },

      // Service endpoint - where to send job requests
      serviceEndpoint: config.cap.serviceEndpoint,

      // Wallet for receiving USDC payments
      wallet: {
        address: config.cap.usdcWalletAddress,
        chain: 'solana',
        tokens: ['USDC'],
      },

      // Pricing model
      pricing: [
        {
          service: 'crop-diagnosis',
          name: 'Crop Disease Diagnosis',
          description: 'Analyze crop images and voice descriptions to diagnose diseases, pests, and nutrient deficiencies',
          priceUSD: config.cap.pricing.perDiagnosis,
          estimatedTime: '30 seconds',
          inputType: 'image+text',
        },
        {
          service: 'market-price-check',
          name: 'Market Price Check',
          description: 'Get current local market prices and selling recommendations for your crop',
          priceUSD: config.cap.pricing.perMarketCheck,
          estimatedTime: '10 seconds',
          inputType: 'text',
        },
        {
          service: 'full-agri-advisory',
          name: 'Full Agri-Advisory',
          description: 'Complete pipeline: diagnose crop issues, get treatment plans, and market prices',
          priceUSD: config.cap.pricing.perDiagnosis + config.cap.pricing.perMarketCheck,
          estimatedTime: '45 seconds',
          inputType: 'image+voice+text',
        },
      ],

      // Capabilities (for A2A discovery)
      capabilities: [
        {
          name: 'speech-to-text',
          description: 'Transcribe voice notes in Swahili, Hausa, Yoruba, English and other African languages',
        },
        {
          name: 'crop-vision-analysis',
          description: 'Analyze crop images to detect diseases, pests, and nutrient issues',
        },
        {
          name: 'treatment-recommendation',
          description: 'Provide organic and chemical treatment plans adapted to local African regions',
        },
        {
          name: 'market-price-intelligence',
          description: 'Real-time local market prices and selling recommendations',
        },
        {
          name: 'buyer-connection',
          description: 'Connect farmers directly to buyers to bypass middlemen',
        },
        {
          name: 'multi-language-translation',
          description: 'Translate between English and 5+ African languages',
        },
      ],

      // Supported input/output schemas
      schemas: {
        jobRequest: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['voice', 'image', 'text', 'mixed'] },
            text: { type: 'string', description: 'Text input from farmer' },
            imageUrl: { type: 'string', description: 'URL to crop image' },
            audioUrl: { type: 'string', description: 'URL to voice note' },
            region: { type: 'string', description: 'Farmer region' },
            farmerId: { type: 'string', description: 'Farmer identifier' },
            language: { type: 'string', description: 'Input language code' },
          },
          required: ['type'],
        },
        jobResponse: {
          type: 'object',
          properties: {
            jobId: { type: 'string' },
            status: { type: 'string', enum: ['completed', 'failed', 'processing'] },
            summary: { type: 'string' },
            steps: { type: 'object' },
          },
        },
      },

      // SLA
      sla: {
        maxProcessingTime: '60 seconds',
        availability: '99.5%',
        supportedRegions: ['east-africa', 'west-africa', 'central-africa', 'southern-africa'],
      },
    };

    return this.agentManifest;
  }

  /**
   * Register the agent on CROO Agent Store via CAP
   * 
   * CALL THIS ONCE when the agent starts up.
   * In production, this registers the agent on-chain.
   */
  async register() {
    console.log(`\n[CAP] Registering agent: ${this.agentId}...`);
    
    const manifest = this.buildManifest();

    // In production, this would be an on-chain transaction:
    // 1. Sign the manifest with the agent's wallet
    // 2. Submit to CROO CAP registry
    // 3. Pay registration fee (if any)
    // 4. Receive on-chain agent ID
    // 
    // const signature = await signManifest(manifest, wallet);
    // const response = await fetch(config.cap.capRegistryUrl + '/agents/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ manifest, signature }),
    // });
    // const regResult = await response.json();

    // Mock registration for demo
    console.log('[CAP] Agent manifest built successfully');
    console.log(`[CAP] Agent ID: ${manifest.agentId}`);
    console.log(`[CAP] Name: ${manifest.name}`);
    console.log(`[CAP] Services: ${manifest.pricing.map(p => p.service).join(', ')}`);
    console.log(`[CAP] Endpoint: ${manifest.serviceEndpoint}`);
    console.log(`[CAP] Pricing: ${config.cap.pricing.perDiagnosis} USDC/diagnosis, ${config.cap.pricing.perMarketCheck} USDC/market-check`);
    console.log(`[CAP] Wallet: ${config.cap.usdcWalletAddress || 'NOT CONFIGURED - set USDC_WALLET_ADDRESS env var'}`);

    this.registered = true;

    return {
      success: true,
      agentId: this.agentId,
      message: `Agent "${manifest.name}" registered on CROO Agent Store.`,
      manifest: manifest,
      registrationMock: true,
      note: 'In production, this would submit an on-chain transaction to the CROO CAP registry.',
    };
  }

  /**
   * Handle an incoming CAP job request from another agent or human
   * 
   * This is the main entry point for the CROO Agent Store.
   * When another agent or a user wants to hire Shamba-Sync,
   * they send a CAP-formatted job request to our endpoint.
   */
  async handleCAPJobRequest(capRequest) {
    console.log(`\n[CAP] Received job request: ${capRequest.jobId || 'new'}`);
    console.log(`[CAP] From: ${capRequest.requesterAgentId || 'CROO Store User'}`);
    console.log(`[CAP] Service: ${capRequest.service}`);

    // Verify payment (in production, check on-chain USDC transfer)
    const paymentVerified = this._verifyPayment(capRequest);
    if (!paymentVerified) {
      return {
        status: 'error',
        error: 'Payment required. Please send USDC to proceed.',
        requiredAmount: this._getServicePrice(capRequest.service),
        walletAddress: config.cap.usdcWalletAddress,
      };
    }

    // Convert CAP request to internal format
    const internalRequest = this._capToInternalRequest(capRequest);

    // Process through the orchestrator
    const result = await this.orchestrator.processFullQuery(internalRequest);

    // Format result for CAP response
    const capResponse = this._internalToCAPResponse(result, capRequest);

    // In production, also:
    // 1. Emit on-chain event: JobCompleted
    // 2. Release payment to agent wallet
    // 3. Store on-chain receipt

    return capResponse;
  }

  /**
   * Get agent health/status for CAP monitoring
   */
  getStatus() {
    return {
      agentId: this.agentId,
      registered: this.registered,
      status: 'online',
      uptime: process.uptime(),
      jobsProcessed: this.orchestrator.jobs.size,
      lastHealthCheck: new Date().toISOString(),
    };
  }

  /**
   * Verify payment from CAP request
   */
  _verifyPayment(capRequest) {
    // In production, verify on-chain:
    // 1. Check that USDC transfer was made to our wallet
    // 2. Verify transaction signature
    // 3. Confirm amount matches service price
    // 
    // const tx = await connection.getTransaction(capRequest.payment.transactionSignature);
    // const amount = parseFloat(tx.meta.postTokenBalances[0].uiTokenAmount.uiAmountString);
    // return amount >= this._getServicePrice(capRequest.service);

    // For demo/MVP, trust-based (no payment verification)
    console.log('[CAP] Payment verification: MOCKED (accepting without on-chain check for demo)');
    return true;
  }

  /**
   * Get price for a service
   */
  _getServicePrice(service) {
    const servicePrices = {
      'crop-diagnosis': config.cap.pricing.perDiagnosis,
      'market-price-check': config.cap.pricing.perMarketCheck,
      'full-agri-advisory': config.cap.pricing.perDiagnosis + config.cap.pricing.perMarketCheck,
    };
    return servicePrices[service] || servicePrices['full-agri-advisory'];
  }

  /**
   * Convert CAP protocol request to internal orchestrator request
   */
  _capToInternalRequest(capRequest) {
    const request = {
      type: capRequest.type || 'text',
      text: capRequest.text || capRequest.parameters?.text,
      image: capRequest.image || capRequest.parameters?.image,
      audio: capRequest.audio || capRequest.parameters?.audio,
      mimeType: capRequest.mimeType || capRequest.parameters?.mimeType,
      region: capRequest.region || capRequest.parameters?.region || 'east-africa',
      farmerId: capRequest.farmerId || capRequest.requesterAgentId || 'cap-user',
      language: capRequest.language || capRequest.parameters?.language || 'en',
    };

    return request;
  }

  /**
   * Convert internal result to CAP protocol response
   */
  _internalToCAPResponse(internalResult, capRequest) {
    return {
      // CAP protocol fields
      capVersion: '1.0.0',
      jobId: internalResult.jobId,
      requestId: capRequest.jobId || internalResult.jobId,
      
      // Status
      status: internalResult.status === 'completed' ? 'success' : 'error',
      error: internalResult.error || null,

      // Result
      result: {
        summary: internalResult.summary,
        details: internalResult.steps,
      },

      // Timestamps
      startedAt: internalResult.startedAt,
      completedAt: internalResult.completedAt,

      // Payment receipt (in production, on-chain proof)
      receipt: {
        service: capRequest.service || 'full-agri-advisory',
        amountUSD: this._getServicePrice(capRequest.service || 'full-agri-advisory'),
        settled: true,
        settlementMethod: 'USDC (Solana)',
        transactionSignature: 'MOCK_TX_SIG_' + Date.now(),
      },

      // Agent info
      processedBy: this.agentId,
      agentVersion: '1.0.0',
    };
  }
}

export default CAPIntegration;