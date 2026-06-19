export default function WhatsAppSection() {
  const whatsappNumber = '+14155238886' // Twilio sandbox number
  const demoMessage = encodeURIComponent('Habari! Mazao yangu ya nyanya yana majani manjano. Nisaidie.')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${demoMessage}`

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">📱 WhatsApp Integration</h2>
        <p className="text-gray-500 mt-2">Access Shamba-Sync directly from WhatsApp — no app download needed</p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <div className="text-center mb-4">
            <span className="text-5xl">💬</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center mb-2">For Farmers</h3>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Save <strong className="text-emerald-700">{whatsappNumber}</strong> to your contacts</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Send a <strong>voice note</strong> describing your crop problem in Swahili, Hausa, Yoruba, or English</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Or send a <strong>photo</strong> of the affected crop</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <span>Receive your personalized <strong>diagnosis + treatment + market prices</strong></span>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <div className="text-center mb-4">
            <span className="text-5xl">⚙️</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Technical Setup</h3>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Create a <strong>Twilio</strong> account and activate WhatsApp Sandbox</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Set webhook URL to <code className="bg-gray-100 px-1 rounded text-xs">POST /whatsapp/webhook</code></span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Configure env vars: <code className="bg-gray-100 px-1 rounded text-xs">TWILIO_ACCOUNT_SID</code>, <code className="bg-gray-100 px-1 rounded text-xs">AUTH_TOKEN</code></span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <span>That's it! WhatsApp messages automatically route through the 3-agent pipeline</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Try it now */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white text-center mb-8">
        <div className="text-5xl mb-4">📱</div>
        <h3 className="text-xl font-bold mb-2">Try Shamba-Sync on WhatsApp</h3>
        <p className="text-sm opacity-90 mb-4">
          Send a voice note or text to our WhatsApp number and see the AI agents in action.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
        >
          <span>💬</span>
          Send Demo Message
        </a>
        <p className="text-xs opacity-75 mt-3">
          Number: {whatsappNumber} (Twilio Sandbox)
        </p>
      </div>

      {/* WhatsApp Flow Diagram */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">🔄 Message Flow</h3>
        <div className="space-y-3">
          {[
            { from: '👩‍🌾 Farmer', to: '📱 WhatsApp', action: 'Sends voice note/photo/text' },
            { from: '📱 WhatsApp', to: '🌐 Twilio', action: 'Forwards via webhook' },
            { from: '🌐 Twilio', to: '⚙️ Shamba-Sync', action: 'POST /whatsapp/webhook' },
            { from: '⚙️ Shamba-Sync', to: '🤖 Agent 1', action: 'Transcribe + Vision Analysis' },
            { from: '🤖 Agent 1', to: '🤖 Agent 2', action: 'Diagnosis → Treatment Plan' },
            { from: '🤖 Agent 2', to: '🤖 Agent 3', action: 'Treatment → Market Prices' },
            { from: '🤖 Agent 3', to: '🌐 Twilio', action: 'CAP Response → TwiML Reply' },
            { from: '🌐 Twilio', to: '📱 WhatsApp', action: 'Diagnosis + Treatment + Prices' },
            { from: '📱 WhatsApp', to: '👩‍🌾 Farmer', action: 'Receives full advisory report' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-24 text-right text-gray-500 text-xs">{step.from}</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-emerald-200"></div>
                <span className="text-emerald-600 font-medium">→</span>
                <div className="flex-1 h-px bg-emerald-200"></div>
              </div>
              <span className="w-24 text-left text-gray-500 text-xs">{step.to}</span>
              <span className="text-gray-700 flex-1">{step.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}