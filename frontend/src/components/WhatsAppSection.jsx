import { useState } from 'react'

export default function WhatsAppSection() {
  const [simMessage, setSimMessage] = useState('')
  const [simChat, setSimChat] = useState([])
  const [simLoading, setSimLoading] = useState(false)

  // Pre-set demo messages a farmer might send
  const demoMessages = [
    { label: '🎤 Voice: Swahili', text: 'Nyanya yangu ina majani manjano. Nisaidie.' },
    { label: '📸 Image: Tomato leaves', text: 'Sending a photo of my tomato leaves with yellow spots...' },
    { label: '💬 Text: Market check', text: 'What is the maize price in East Africa right now?' },
  ]

  const handleSimSend = async (text) => {
    const messageText = text || simMessage
    if (!messageText.trim()) return

    // Add user message to chat
    setSimChat(prev => [...prev, { role: 'user', text: messageText }])
    setSimMessage('')
    setSimLoading(true)

    try {
      // Call the actual backend API
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'text',
          text: messageText,
          region: 'east-africa',
          language: messageText.toLowerCase().includes('nyanya') || 
                    messageText.toLowerCase().includes('manjano') ||
                    messageText.toLowerCase().includes('nisaidie') ? 'sw' : 'en',
        }),
      })

      const data = await response.json()

      // Format response as WhatsApp message
      let botReply = ''
      if (data.status === 'completed' && data.steps) {
        const vision = data.steps.translatorVision?.visionAnalysis
        const market = data.steps.marketConnector

        botReply += '🌿 *Shamba-Sync Report* 🌿\n\n'
        if (vision) {
          botReply += `🌱 *Crop*: ${vision.crop}\n`
          botReply += `🔍 *Diagnosis*: ${vision.disease?.slice(0, 40)}...\n`
          botReply += `⚠️ *Severity*: ${vision.severity}\n\n`
        }
        if (data.steps.agronomist?.recommendations?.organic?.length > 0) {
          const t = data.steps.agronomist.recommendations.organic[0]
          botReply += `💊 *Treatment*: ${t.name}\n`
          botReply += `   ${t.costEstimate}\n\n`
        }
        if (market?.marketData) {
          botReply += `💰 *Price*: ${market.marketData.currentPrice} ${market.marketData.currency}/${market.marketData.unit}\n`
          botReply += `📊 ${market.recommendation?.summary?.slice(0, 80)}...\n`
        }
      } else {
        botReply = '❌ Sorry, could not process. Please try again with more detail.'
      }

      // Simulate typing delay like WhatsApp
      setTimeout(() => {
        setSimChat(prev => [...prev, { role: 'bot', text: botReply }])
        setSimLoading(false)
      }, 1000)

    } catch {
      setSimChat(prev => [...prev, { role: 'bot', text: '❌ Error: Could not reach the agent server. Make sure the backend is running.' }])
      setSimLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-5 animate-fade-up">
        <h2 className="text-base font-semibold text-gray-900">WhatsApp Integration</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {`Access Shamba-Sync from WhatsApp — or try the simulator below`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 stagger-children">
        {/* For Farmers */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="text-center mb-3">
            <span className="text-3xl">💬</span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 text-center mb-3">For Farmers</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            {[
              'Save the number to your contacts',
              'Send a voice note describing your crop problem',
              'Or send a photo of the affected crop',
              'Receive diagnosis + treatment + market prices',
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-xs">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Setup */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="text-center mb-3">
            <span className="text-3xl">⚙️</span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 text-center mb-3">Setup Steps</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            {[
              'Create a Twilio account at twilio.com',
              'If login fails: try "Forgot Password" or use Google/GitHub login',
              'Go to console → WhatsApp → Sandbox',
              'Set webhook to https://your-domain.com/whatsapp/webhook',
              'Messages auto-route through the 3-agent pipeline',
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  i < 2 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>{i + 1}</span>
                <span className="text-xs">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* WhatsApp Simulator */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4">
        {/* Simulator header */}
        <div className="bg-emerald-600 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">🌿</div>
          <div>
            <p className="text-sm font-semibold text-white">Shamba-Sync</p>
            <p className="text-[10px] text-emerald-100">Online</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#e5ddd5]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4c5b0\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
          {/* Welcome message */}
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-bl-sm px-3 py-2 max-w-[80%] shadow-sm">
              <p className="text-xs text-gray-800">🌿 Hello! I am Shamba-Sync, your AI Agri-Advisor.</p>
              <p className="text-xs text-gray-500 mt-1">Send me a description of your crop problem, and I will diagnose it and check market prices for you.</p>
              <p className="text-[10px] text-gray-400 mt-1.5 text-right">Try a demo message below 👇</p>
            </div>
          </div>

          {/* Chat messages */}
          {simChat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-3 py-2 max-w-[80%] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-emerald-100 rounded-br-sm' 
                  : 'bg-white rounded-bl-sm'
              }`}>
                <p className="text-xs whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {simLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={simMessage}
              onChange={(e) => setSimMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSimSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-400 outline-none text-sm"
              disabled={simLoading}
            />
            <button
              onClick={() => handleSimSend()}
              disabled={simLoading || !simMessage.trim()}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Demo quick-buttons */}
      <div className="mb-4">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Quick demo messages</p>
        <div className="flex flex-wrap gap-1.5">
          {demoMessages.map((demo, i) => (
            <button
              key={i}
              onClick={() => handleSimSend(demo.text)}
              disabled={simLoading}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-xs text-gray-500 shadow-sm disabled:opacity-50"
            >
              {demo.label}
            </button>
          ))}
        </div>
      </div>

      {/* About Twilio login issue */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700 leading-relaxed">
        <strong className="text-sm">⚠️ About Twilio Login</strong>
        <p className="mt-1">
          Twilio login failures are usually one of these:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-0.5">
          <li><strong>Try "Forgot Password"</strong> on the login page — sometimes accounts need a password reset</li>
          <li><strong>Use Google/GitHub login</strong> instead of email/password — often works when normal login doesn't</li>
          <li><strong>Clear cookies/cache</strong> or use an incognito window</li>
          <li>If none of these work, the <strong>simulator above</strong> demonstrates the same functionality without Twilio</li>
        </ul>
      </div>
    </div>
  )
}