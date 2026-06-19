/**
 * Shamba-Sync Configuration
 * 
 * Environment-based configuration for the multi-agent system.
 * All sensitive values should be set via environment variables.
 */

const config = {
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // OpenAI / LLM API
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    whisperModel: 'whisper-1',
    maxTokens: 1024,
    temperature: 0.3,
  },

  // Twilio (WhatsApp integration)
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER || '',
  },

  // CROO Agent Protocol (CAP)
  cap: {
    agentId: process.env.CAP_AGENT_ID || 'shamba-sync-v1',
    agentName: 'Shamba-Sync Agri-Voice Agent',
    agentDescription: 'Multi-agent system for African agriculture - voice/vision crop diagnosis, treatment recommendations, and market price connections.',
    serviceEndpoint: process.env.CAP_SERVICE_ENDPOINT || 'http://localhost:3001',
    capRegistryUrl: process.env.CAP_REGISTRY_URL || 'https://api.croo.io/v1/cap',
    usdcWalletAddress: process.env.USDC_WALLET_ADDRESS || '',
    pricing: {
      perDiagnosis: 0.50, // 0.50 USDC per crop diagnosis
      perMarketCheck: 0.25, // 0.25 USDC per market price check
      subscriptionMonthly: 5.00, // 5 USDC/month for unlimited access
    },
  },

  // Agent-specific settings
  agents: {
    translatorVision: {
      name: 'Translator & Vision Agent',
      supportedLanguages: ['en', 'sw', 'ha', 'yo', 'rw', 'lg'],
      supportedImageFormats: ['image/jpeg', 'image/png', 'image/webp'],
    },
    agronomist: {
      name: 'Agronomist Agent',
      regions: ['east-africa', 'west-africa', 'central-africa', 'southern-africa'],
    },
    marketConnector: {
      name: 'Market Connector Agent',
      updateIntervalMinutes: 60,
      dataSources: ['local-market-boards', 'regional-agri-databases'],
    },
  },

  // Cache
  redis: {
    url: process.env.REDIS_URL || '',
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;