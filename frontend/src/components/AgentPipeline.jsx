export default function AgentPipeline() {
  const agents = [
    {
      id: 1,
      name: 'Translator & Vision Agent',
      icon: '🔬',
      color: 'emerald',
      role: 'Speech-to-Text + Image Analysis',
      description: 'Receives voice notes in Swahili, Hausa, Yoruba, or English and transcribes them. Also analyzes crop photos for disease detection using computer vision.',
      capabilities: [
        'Whisper speech-to-text for African languages',
        'GPT-4o Vision for crop disease diagnosis',
        'Translation between English and 5+ languages',
        'Language detection from voice/text input',
      ],
      processes: 'Audio/Text/Image → Structured Diagnosis',
      output: 'Crop identification, disease name, severity, symptoms, confidence score',
    },
    {
      id: 2,
      name: 'Agronomist Agent',
      icon: '💊',
      color: 'amber',
      role: 'Treatment Recommendation Engine',
      description: 'Cross-references detected diseases with a knowledge base of organic and chemical treatments available in the farmer\'s specific African region.',
      capabilities: [
        'Organic treatment recommendations (neem oil, compost tea, etc.)',
        'Chemical treatment options with dosages',
        'Cultural practices (crop rotation, mulching, pruning)',
        'Region-specific availability and pricing',
        'Preventative measures for future seasons',
      ],
      processes: 'Diagnosis + Region → Treatment Plan',
      output: 'Organic treatments, chemical options, cultural practices, prevention tips',
    },
    {
      id: 3,
      name: 'Market Connector Agent',
      icon: '💰',
      color: 'blue',
      role: 'Price Intelligence + Buyer Network',
      description: 'Queries real-time market data across East and West African markets, provides sell recommendations, and connects farmers directly to buyers.',
      capabilities: [
        'Real-time market price data from multiple markets',
        'Price trend analysis (week/month/year)',
        'Sell/Hold recommendations based on trends',
        'Direct buyer connections to bypass middlemen',
        'Local market supply analysis',
      ],
      processes: 'Crop + Region → Market Intelligence',
      output: 'Current prices, trends, sell recommendation, buyer contacts, tips',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">⚙️ Multi-Agent Pipeline</h2>
        <p className="text-gray-500 mt-2">Three specialized agents working together in sequence</p>
      </div>

      <div className="space-y-0">
        {agents.map((agent, index) => (
          <div key={agent.id}>
            <div className={`bg-white rounded-2xl shadow-lg border border-${agent.color}-100 p-6 transition-all hover:shadow-xl`}>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-${agent.color}-100 flex items-center justify-center text-2xl flex-shrink-0`}>
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">Agent {agent.id}: {agent.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${agent.color}-100 text-${agent.color}-700`}>
                      {agent.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{agent.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Capabilities</h4>
                      <ul className="space-y-1.5">
                        {agent.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-${agent.color}-500 flex-shrink-0`}></span>
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Process</h4>
                        <div className={`bg-${agent.color}-50 rounded-lg px-3 py-2 text-sm font-medium text-${agent.color}-700`}>
                          {agent.processes}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Output</h4>
                        <p className="text-sm text-gray-600">{agent.output}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className={`mt-4 pt-4 border-t border-${agent.color}-100 flex items-center justify-between`}>
                <span className="text-xs text-gray-400">
                  {agent.id === 1 ? 'Input: Voice/Image/Text' :
                   agent.id === 2 ? 'Input: Diagnosis from Agent 1' :
                   'Input: Diagnosis + Treatment Plan'}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${agent.color}-100 text-${agent.color}-700`}>
                  {agent.id === 1 ? '0.50 USDC' :
                   agent.id === 2 ? 'Included in Diagnosis' :
                   '0.25 USDC'}
                </span>
              </div>
            </div>

            {/* Connector arrow between agents */}
            {index < agents.length - 1 && (
              <div className="flex justify-center py-3">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-300 to-amber-300"></div>
                  <div className="text-gray-300 text-sm">⬇ Output → Input</div>
                  <div className="w-0.5 h-4 bg-gradient-to-b from-amber-300 to-blue-300"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Orchestration summary */}
      <div className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">🤖 Multi-Agent Orchestration</h3>
        <p className="text-sm opacity-90">
          The Shamba-Sync Orchestrator coordinates Agent 1 → Agent 2 → Agent 3 sequentially.
          Each agent passes structured data to the next, creating a complete pipeline from raw farmer input
          to actionable diagnosis, treatment plan, and market intelligence. This A2A (Agent-to-Agent)
          composability is powered by the CROO Agent Protocol (CAP).
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">⚡ 3 Agents</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">🔄 Sequential Pipeline</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">💰 0.75 USDC Total</span>
        </div>
      </div>
    </div>
  )
}