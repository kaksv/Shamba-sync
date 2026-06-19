export default function WhatsAppSection() {
  const whatsappNumber = '+14155238886'
  const demoMessage = encodeURIComponent('Habari! Mazao yangu ya nyanya yana majani manjano. Nisaidie.')

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">WhatsApp Integration</h2>
        <p className="text-sm text-gray-400 mt-1">Access Shamba-Sync from WhatsApp — no app download needed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="text-center mb-3">
            <span className="text-3xl">💬</span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 text-center mb-3">For Farmers</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            {[
              `Save <strong className="text-emerald-600">${whatsappNumber}</strong> to contacts`,
              'Send a voice note describing your crop problem',
              'Or send a photo of the affected crop',
              'Receive diagnosis + treatment + market prices',
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-xs" dangerouslySetInnerHTML={{ __html: step }} />
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="text-center mb-3">
            <span className="text-3xl">⚙️</span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 text-center mb-3">Setup</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            {[
              'Create a Twilio account, enable WhatsApp Sandbox',
              'Set webhook to POST /whatsapp/webhook',
              'Configure TWILIO_ACCOUNT_SID and AUTH_TOKEN env vars',
              'Messages auto-route through the 3-agent pipeline',
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-xs">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="bg-emerald-600 rounded-2xl p-6 text-white text-center mb-4">
        <div className="text-3xl mb-2">📱</div>
        <h3 className="text-sm font-bold mb-1">Try on WhatsApp</h3>
        <p className="text-xs opacity-80 mb-3">Send a voice note or text to our number</p>
        <a href={`https://wa.me/${whatsappNumber}?text=${demoMessage}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-white text-emerald-700 px-4 py-2 rounded-xl font-medium text-sm hover:bg-emerald-50 transition-colors shadow-sm">
          💬 Send Demo Message
        </a>
        <p className="text-[10px] opacity-60 mt-2">{whatsappNumber} (Twilio Sandbox)</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Message Flow</h3>
        <div className="space-y-1.5">
          {[
            ['👩‍🌾 Farmer', '📱 WhatsApp', 'Sends voice/photo/text'],
            ['📱 WhatsApp', '🌐 Twilio', 'Forwards via webhook'],
            ['🌐 Twilio', '⚙️ Shamba-Sync', 'POST /whatsapp/webhook'],
            ['⚙️ Shamba-Sync', '🤖 Agent 1→2→3', 'Full pipeline'],
            ['🤖 Agent 3', '🌐 Twilio', 'CAP response'],
            ['🌐 Twilio', '👩‍🌾 Farmer', 'Advisory report'],
          ].map(([from, to, action], i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-600 py-1">
              <span className="w-20 text-right text-gray-400">{from}</span>
              <div className="flex-1 flex items-center gap-1.5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-emerald-500">→</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <span className="w-20 text-left text-gray-400">{to}</span>
              <span className="text-gray-600">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}