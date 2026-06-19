export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-100/50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span>🤝</span>
          <span>Powered by CROO Agent Protocol (CAP)</span>
          <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full text-xs">A2A</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Your AI{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Agri-Advisor
          </span>{' '}
          for African Farmers
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Snap a photo or send a voice note in Swahili, Hausa, Yoruba, or English. 
          Get instant crop disease diagnosis, organic treatment plans, and fair market prices — 
          all powered by a multi-agent AI system on CROO's decentralized protocol.
        </p>

        {/* Key metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '3', label: 'AI Agents', sub: 'Coordinated Pipeline' },
            { value: '5+', label: 'Languages', sub: 'Voice & Text' },
            { value: '4', label: 'Regions', sub: 'Across Africa' },
            { value: '0.50', label: 'USDC per Diag', sub: 'Minimal Cost' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-emerald-100">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-700">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-800">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}