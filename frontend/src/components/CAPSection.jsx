export default function CAPSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-5 animate-fade-up">
        <h2 className="text-base font-semibold text-gray-900">CROO Agent Protocol (CAP)</h2>
        <p className="text-xs text-gray-400 mt-0.5">Decentralized A2A commerce infrastructure</p>
      </div>

      {/* Agent Identity */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">CAP</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shamba-Sync Agri-Voice Agent</h3>
            <p className="text-xs text-gray-400">
              ID: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-emerald-600">shamba-sync-v1</code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Protocol', value: 'CAP v1.0.0' },
            { label: 'Chain', value: 'Solana' },
            { label: 'Token', value: 'USDC' },
            { label: 'Gas Fee', value: '0% 🎯' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-2.5 text-center">
              <p className="text-[10px] text-gray-400">{item.label}</p>
              <p className="text-xs font-semibold text-gray-800 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5 text-xs text-amber-700">
          <strong>0% gas fee</strong> during CROO Agent Store launch window.
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Pricing — USDC on Solana</h3>
        <div className="space-y-2">
          {[
            { service: 'Crop Diagnosis', desc: 'Image + voice analysis', price: '0.50 USDC' },
            { service: 'Market Price Check', desc: 'Local market intelligence', price: '0.25 USDC' },
            { service: 'Full Agri-Advisory', desc: 'Complete pipeline', price: '0.75 USDC' },
            { service: 'Monthly Subscription', desc: 'Unlimited for smallholders', price: '5.00 USDC' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.service}</p>
                <p className="text-[11px] text-gray-400">{item.desc}</p>
              </div>
              <span className="text-sm font-semibold text-emerald-600">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Flow */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Integration Flow</h3>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Build Agent', desc: 'Deploy Shamba-Sync backend' },
            { step: '2', title: 'Integrate CAP', desc: 'Register manifest, accept USDC' },
            { step: '3', title: 'List on Store', desc: 'Discoverable by humans + agents' },
            { step: '4', title: 'A2A Composable', desc: 'Other agents hire yours — earn from a network' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 flex-shrink-0">{item.step}</div>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Endpoints</h3>
        <div className="space-y-1.5">
          {[
            ['POST /api/process', 'Process a farming query'],
            ['POST /api/process/cap', 'CAP A2A agent calls'],
            ['GET /cap/manifest', 'Agent manifest for discovery'],
            ['POST /cap/register', 'Register on CROO Store'],
            ['GET /health', 'Agent health status'],
          ].map(([ep, desc]) => (
            <div key={ep} className="flex items-start gap-2.5 py-1.5">
              <code className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-emerald-600 whitespace-nowrap">{ep}</code>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}