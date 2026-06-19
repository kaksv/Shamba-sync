/**
 * Shamba-Sync Multi-Agent Orchestrator
 * 
 * Coordinates the pipeline: Agent 1 → Agent 2 → Agent 3
 * Manages job lifecycle, error handling, and result aggregation.
 * This is the main entry point for processing all requests.
 */

import TranslatorVisionAgent from '../agents/agent1-translator-vision.js';
import AgronomistAgent from '../agents/agent2-agronomist.js';
import MarketConnectorAgent from '../agents/agent3-market-connector.js';
import config from '../config/config.js';

class ShambaSyncOrchestrator {
  constructor() {
    this.agent1 = new TranslatorVisionAgent();
    this.agent2 = new AgronomistAgent();
    this.agent3 = new MarketConnectorAgent();
    this.jobs = new Map(); // Track job history
    this.name = 'Shamba-Sync Orchestrator';
  }

  /**
   * Process a complete farming query through all 3 agents
   * 
   * @param {Object} request - The farmer's request
   * @param {string} request.type - 'voice' | 'image' | 'text' | 'mixed'
   * @param {Buffer} [request.audio] - Audio data (for voice type)
   * @param {string} [request.text] - Text input
   * @param {string} [request.image] - Base64 image
   * @param {string} [request.mimeType] - Image MIME type
   * @param {string} [request.language] - Input language code
   * @param {string} request.region - Farmer's region
   * @param {string} request.farmerId - Farmer identifier
   * @returns {Promise<Object>} Complete result from all 3 agents
   */
  async processFullQuery(request) {
    const jobId = this._generateJobId();
    console.log(`\n========== Shamba-Sync Job: ${jobId} ==========`);
    console.log(`Processing request for farmer ${request.farmerId || 'anonymous'} in ${request.region || 'east-africa'}`);

    const result = {
      jobId,
      farmerId: request.farmerId || 'anonymous',
      region: request.region || 'east-africa',
      status: 'processing',
      steps: {},
      startedAt: new Date().toISOString(),
    };

    try {
      // Step 1: Agent 1 - Translate & Analyze (Voice/Image/Text)
      console.log('\n--- Step 1: Translator & Vision Agent ---');
      const agent1Result = await this.agent1.process({
        type: request.type || 'text',
        audio: request.audio,
        text: request.text,
        image: request.image,
        mimeType: request.mimeType,
        language: request.language,
      });
      result.steps.translatorVision = agent1Result;
      console.log(`[Orchestrator] Agent 1 complete. Language: ${agent1Result.language}, Crop: ${agent1Result.visionAnalysis?.crop || 'unknown'}`);

      // Step 2: Agent 2 - Agronomist (Treatment)
      console.log('\n--- Step 2: Agronomist Agent ---');
      const agent2Input = agent1Result.visionAnalysis || {
        crop: 'unknown',
        disease: 'unknown',
        severity: 'unknown',
        symptoms: ['No image provided'],
        confidence: 0,
      };
      const agent2Result = await this.agent2.process(agent2Input, request.region);
      result.steps.agronomist = agent2Result;
      console.log(`[Orchestrator] Agent 2 complete. ${agent2Result.recommendations.organic.length} organic + ${agent2Result.recommendations.chemical.length} chemical treatments found.`);

      // Step 3: Agent 3 - Market Connector
      console.log('\n--- Step 3: Market Connector Agent ---');
      const agent3Result = await this.agent3.process(agent2Input, agent2Result, request.region);
      result.steps.marketConnector = agent3Result;
      console.log(`[Orchestrator] Agent 3 complete. Price: ${agent3Result.marketData?.currentPrice || 'N/A'}`);

      // Compile summary
      result.status = 'completed';
      result.summary = this._generateSummary(result);
      result.completedAt = new Date().toISOString();

    } catch (error) {
      console.error(`[Orchestrator] Error processing job ${jobId}:`, error);
      result.status = 'failed';
      result.error = error.message;
    }

    // Store job history
    this.jobs.set(jobId, result);

    // Log total time
    const duration = new Date(result.completedAt || new Date()) - new Date(result.startedAt);
    console.log(`\n========== Job ${jobId} ${result.status} (${duration}ms) ==========\n`);

    return result;
  }

  /**
   * Get a pricing quote for a request
   */
  getPricing(requestType = 'full') {
    const pricing = config.cap.pricing;
    
    switch (requestType) {
      case 'diagnosis':
        return pricing.perDiagnosis;
      case 'market-check':
        return pricing.perMarketCheck;
      case 'full':
      default:
        return pricing.perDiagnosis + pricing.perMarketCheck;
    }
  }

  /**
   * Get job status by ID
   */
  getJobStatus(jobId) {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Get all jobs for a farmer
   */
  getFarmerJobs(farmerId) {
    const farmerJobs = [];
    for (const [id, job] of this.jobs) {
      if (job.farmerId === farmerId) {
        farmerJobs.push({ id, ...job });
      }
    }
    return farmerJobs;
  }

  /**
   * Generate a human-readable summary of the full result
   */
  _generateSummary(result) {
    const steps = result.steps;
    const vision = steps.translatorVision?.visionAnalysis;
    const agri = steps.agronomist;
    const market = steps.marketConnector;

    let summary = '';

    // Build natural language summary
    if (vision) {
      summary += `🌱 **Crop**: ${vision.crop}\n`;
      summary += `🔍 **Diagnosis**: ${vision.disease} (${vision.confidence}% confidence)\n`;
      summary += `⚠️ **Severity**: ${vision.severity}\n\n`;
    }

    if (agri?.recommendations) {
      const orgCount = agri.recommendations.organic?.length || 0;
      const chemCount = agri.recommendations.chemical?.length || 0;
      const cultCount = agri.recommendations.cultural?.length || 0;
      summary += `💊 **Treatment Options**: ${orgCount} organic, ${chemCount} chemical, ${cultCount} cultural practices\n`;
      if (orgCount > 0) {
        summary += `   → Start with: ${agri.recommendations.organic[0].name}\n`;
      }
      summary += '\n';
    }

    if (market?.marketData) {
      const md = market.marketData;
      summary += `💰 **Market Price**: ${md.currentPrice} ${md.currency}/${md.unit}\n`;
      summary += `📈 **Trend**: ${md.trend} (${md.trendStrength})\n`;
      summary += `🏪 **Best Market**: ${md.markets?.sort((a, b) => b.price - a.price)[0]?.name || 'N/A'}\n`;
      summary += `📊 **Recommendation**: ${market.recommendation?.summary || 'No specific advice'}\n\n`;
    }

    if (market?.localBuyers?.length > 0) {
      summary += `🤝 **Direct Buyers Available**: ${market.localBuyers.map(b => b.name).join(', ')}\n`;
    }

    return summary;
  }

  _generateJobId() {
    return `ss-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  }
}

export default ShambaSyncOrchestrator;