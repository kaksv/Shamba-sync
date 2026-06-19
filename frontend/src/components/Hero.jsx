export default function Hero() {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-3xl mx-auto text-center px-3 sm:px-4">
        <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium mb-5 shadow-sm animate-fade-up">
          <span>🤝</span>
          <span>Powered by</span>
          <span className="font-semibold text-gray-800">CROO Agent Protocol</span>
          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">A2A</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.2] mb-3 animate-fade-up delay-1">
          Your AI Agri-Advisor for{' '}
          <span className="text-emerald-600">African Farmers</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto mb-6 animate-fade-up delay-2">
          Snap a photo or send a voice note in Swahili, Hausa, Yoruba, or English. 
          Get instant crop disease diagnosis, organic treatment plans, and fair market prices.
        </p>

        <div className="flex flex-wrap justify-center gap-2 animate-fade-up delay-3">
          {[
            { value: '3', label: 'AI Agents', sub: 'Coordinated pipeline' },
            { value: '5+', label: 'Languages', sub: 'Voice & text supported' },
            { value: '4', label: 'Regions', sub: 'Across Africa' },
            { value: '0.50', label: 'USDC/diag', sub: 'Minimal cost' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100 min-w-[100px] card-hover">
              <div className="text-lg font-bold text-emerald-600">{stat.value}</div>
              <div className="text-xs font-semibold text-gray-800">{stat.label}</div>
              <div className="text-[10px] text-gray-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
