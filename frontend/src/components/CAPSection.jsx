export default function CAPSection() {
  const capDetails = {
    name: 'Shamba-Sync Agri-Voice Agent',
    agentId: 'shamba-sync-v1',
    version: '1.0.0',
    protocol: 'CROO Agent Protocol (CAP) v1.0.0',
    chain: 'Solana',
    token: 'USDC',
    wallet: 'Set USDC_WALLET_ADDRESS env var in production',
    gasFee: '0% during launch window',
    pricing: [
      { service: 'crop-diagnosis', price: '0.50 USDC', description: 'Disease diagnosis from images + voice' },
      { service: 'market-price-check', price: '0.25 USDC', description: 'Local market price intelligence' },
      { service: 'full-agri-advisory', price: '0.75 USDC', description: 'Complete pipeline (diagnosis + treatment + market)' },
      { service: 'subscription', price: '5.00 USDC/mo', description: 'Unlimited access for smallholder farmers' },
    ],
    capabilities: [
      'Speech-to-text for African languages (Swahili, Hausa, Yoruba, Kinyarwanda, Luganda)',
      'Crop disease diagnosis via computer vision',
      'Organic & chemical treatment recommendations',
      'Real-time market price intelligence across East/West Africa',
      'Direct buyer connection network',
      'Multi-language translation (5+ African languages)',
    ],
    endpoints: {
      'POST /api/process': 'Process a farming query through all 3 agents',
      'POST /api/process/cap': 'CAP-compatible endpoint for A2A agent calls',
      'GET /cap/manifest': 'Agent manifest for CROO Agent Store discovery',
      'POST /cap/register': 'Register agent on CROO Agent Store',
      'GET /health': 'Agent health status for CAP monitoring',
      'GET /api/pricing': 'Current service pricing',
    },
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">🤖 CROO Agent Protocol (CAP)</h2>
        <p className="text-gray-500 mt-2">Decentralized A2A commerce infrastructure for the AI Agent economy</p>
      </div>

      {/* Agent Identity Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            CAP
          </span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{capDetails.name}</h3>
            <p className="text-sm text-gray-500">
              Agent ID: <code className="bg-gray-100 px-2 py-0.5 rounded text-emerald-700">{capDetails.agentId}</code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Protocol', value: 'CAP v1.0.0' },
            { label: 'Chain', value: 'Solana' },
            { label: 'Token', value: 'USDC' },
            { label: 'Gas Fee', value: '0% 🎯' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-sm font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>⚡ Time-limited benefit:</strong> 0% gas fee during CROO Agent Store launch window.
          Your agent goes live on a marketplace built for humans and other agents — not a sandbox.
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">💰 Pricing — Payable in USDC</h3>
        <div className="space-y-3">
          {capDetails.pricing.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-emerald-50">
              <div>
                <p className="font-medium text-gray-900">{item.service}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-700">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CAP Integration Flow */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">🔄 CAP Integration Flow</h3>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Build Agent', desc: 'Deploy Shamba-Sync backend (Node.js + Express)' },
            { step: '2', title: 'Integrate CAP', desc: 'Register agent manifest, expose CAP endpoints, accept USDC payments' },
            { step: '3', title: 'List on Store', desc: 'Publish to CROO Agent Store for discovery by humans + other agents' },
            { step: '4', title: 'A2A Composable', desc: 'Other agents can hire Shamba-Sync as a dependency — your agent earns from a network' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">🔌 CAP Endpoints</h3>
        <div className="space-y-2">
          {Object.entries(capDetails.endpoints).map(([endpoint, description]) => (
            <div key={endpoint} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
              <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-emerald-700 whitespace-nowrap flex-shrink-0">
                {endpoint}
              </code>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">🎯 Agent Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {capDetails.capabilities.map((cap, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 text-sm text-gray-700">
              <span className="text-emerald-500 mt-0.5">✓</span>
              {cap}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}