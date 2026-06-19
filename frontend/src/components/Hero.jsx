export default function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium mb-6 shadow-sm">
          <span>🤝</span>
          <span>Powered by</span>
          <span className="font-semibold text-gray-800">CROO Agent Protocol</span>
          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">A2A</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] mb-4">
          Your AI Agri-Advisor for{' '}
          <span className="text-emerald-600">African Farmers</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
          Snap a photo or send a voice note in Swahili, Hausa, Yoruba, or English. 
          Get instant crop disease diagnosis, organic treatment plans, and fair market prices.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { value: '3', label: 'AI Agents', sub: 'Coordinated pipeline' },
            { value: '5+', label: 'Languages', sub: 'Voice & text supported' },
            { value: '4', label: 'Regions', sub: 'Across Africa' },
            { value: '0.50', label: 'USDC/diag', sub: 'Minimal cost' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 min-w-[110px]">
              <div className="text-xl font-bold text-emerald-600">{stat.value}</div>
              <div className="text-xs font-semibold text-gray-800">{stat.label}</div>
              <div className="text-[10px] text-gray-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}