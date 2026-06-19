export default function AgentPipeline() {
  const agents = [
    {
      id: 1,
      name: 'Translator & Vision',
      icon: '🔬',
      color: 'emerald',
      role: 'Speech-to-Text + Image Analysis',
      desc: 'Receives voice notes in African languages and transcribes them. Analyzes crop photos for disease detection.',
      caps: ['Whisper speech-to-text', 'GPT-4o Vision analysis', 'Multi-language translation', 'Language detection'],
      input: 'Audio / Image / Text',
      output: 'Structured diagnosis',
    },
    {
      id: 2,
      name: 'Agronomist',
      icon: '💊',
      color: 'amber',
      role: 'Treatment Recommendation Engine',
      desc: 'Cross-references diseases with organic and chemical treatments available in the farmer\'s specific region.',
      caps: ['Organic treatments', 'Chemical options', 'Cultural practices', 'Region-specific advice'],
      input: 'Diagnosis + Region',
      output: 'Treatment plan',
    },
    {
      id: 3,
      name: 'Market Connector',
      icon: '💰',
      color: 'blue',
      role: 'Price Intelligence + Buyer Network',
      desc: 'Real-time market data, sell recommendations, and direct buyer connections to bypass middlemen.',
      caps: ['Market prices', 'Trend analysis', 'Sell/Hold advice', 'Buyer connections'],
      input: 'Crop + Region',
      output: 'Market intelligence',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Agent Pipeline</h2>
        <p className="text-sm text-gray-400 mt-1">Three specialized agents working in sequence</p>
      </div>

      <div className="space-y-0">
        {agents.map((agent, index) => (
          <div key={agent.id}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl bg-${agent.color}-100 flex items-center justify-center text-lg flex-shrink-0`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">Agent {agent.id}: {agent.name}</h3>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded bg-${agent.color}-100 text-${agent.color}-700 whitespace-nowrap`}>
                      {agent.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{agent.desc}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase mb-1.5">Capabilities</p>
                      <ul className="space-y-1">
                        {agent.caps.map((c, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                            <span className={`w-1 h-1 rounded-full bg-${agent.color}-400`}></span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="mb-2">
                        <p className="text-[10px] text-gray-400 uppercase mb-1">Input → Output</p>
                        <div className={`bg-${agent.color}-50 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-${agent.color}-700`}>
                          {agent.input} → {agent.output}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {index < agents.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="text-gray-300 text-[10px]">↓ feeds into ↓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 bg-emerald-600 rounded-2xl p-5 text-white">
        <h3 className="text-sm font-semibold mb-1.5 opacity-90">Multi-Agent Orchestration</h3>
        <p className="text-xs opacity-80 leading-relaxed">
          The Shamba-Sync Orchestrator coordinates Agent 1 → 2 → 3 sequentially.
          Each passes structured data to the next, creating a complete pipeline from raw farmer input
          to diagnosis, treatment, and market intelligence — powered by CROO Agent Protocol (CAP).
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-white/15 px-2 py-0.5 rounded text-[10px]">3 Agents</span>
          <span className="bg-white/15 px-2 py-0.5 rounded text-[10px]">Sequential Pipeline</span>
          <span className="bg-white/15 px-2 py-0.5 rounded text-[10px]">0.75 USDC Total</span>
        </div>
      </div>
    </div>
  )
}