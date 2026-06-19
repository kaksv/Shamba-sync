export default function ResultsDashboard({ result }) {
  if (!result) return null

  const { steps, summary } = result
  const vision = steps?.translatorVision?.visionAnalysis
  const agri = steps?.agronomist
  const market = steps?.marketConnector

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-slide-up">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Advisory Report</h2>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg text-[11px] font-medium">
            {result.jobId?.slice(0, 12)}...
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[11px]">Region: {result.region}</span>
          <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md text-[11px]">Farmer: {result.farmerId?.slice(0, 12)}</span>
          <span className={`px-2 py-0.5 rounded-md text-[11px] ${result.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {result.status}
          </span>
        </div>
      </div>

      {/* Agent 1: Diagnosis */}
      {vision && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm">🔬</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Crop Diagnosis</h3>
              <p className="text-[11px] text-gray-400">Agent 1 — Translator & Vision</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Crop</p>
              <p className="text-sm font-semibold text-gray-900 capitalize mt-0.5">{vision.crop}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Disease</p>
              <p className="text-sm font-semibold text-red-600 mt-0.5">{vision.disease?.slice(0, 28)}{vision.disease?.length > 28 ? '...' : ''}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Severity</p>
              <p className={`text-sm font-semibold mt-0.5 ${
                vision.severity === 'high' ? 'text-red-600' :
                vision.severity === 'medium' ? 'text-amber-600' : 'text-emerald-600'
              }`}>{vision.severity}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Confidence</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{vision.confidence}%</p>
            </div>
          </div>

          {vision.symptoms?.length > 0 && (
            <div>
              <p className="text-[11px] font-medium text-gray-500 mb-1.5">Symptoms</p>
              <div className="flex flex-wrap gap-1.5">
                {vision.symptoms.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-[11px]">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Agent 2: Treatment */}
      {agri && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-sm">💊</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Treatment Plan</h3>
              <p className="text-[11px] text-gray-400">Agent 2 — Agronomist</p>
            </div>
          </div>

          {agri.recommendations?.organic?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-emerald-700 mb-2">🌿 Organic — {agri.recommendations.organic.length} options</p>
              <div className="space-y-2">
                {agri.recommendations.organic.slice(0, 2).map((t, i) => (
                  <div key={i} className="border border-emerald-100 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{t.name}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">{t.costEstimate}</span>
                    </div>
                    <p className="text-xs text-gray-500">{t.description?.slice(0, 120)}{t.description?.length > 120 ? '...' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {agri.recommendations?.cultural?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-blue-700 mb-2">🌾 Cultural Practices</p>
              <div className="flex flex-wrap gap-1.5">
                {agri.recommendations.cultural.map((p, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[11px]">{p.practice}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Agent 3: Market */}
      {market && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-sm">💰</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Market Intelligence</h3>
              <p className="text-[11px] text-gray-400">Agent 3 — Market Connector</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase">Price</p>
              <p className="text-lg font-bold text-gray-900">{market.marketData?.currentPrice}</p>
              <p className="text-[10px] text-gray-400">{market.marketData?.currency}/{market.marketData?.unit}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase">Trend</p>
              <p className={`text-lg font-bold ${
                market.marketData?.trend === 'up' ? 'text-emerald-600' :
                market.marketData?.trend === 'down' ? 'text-red-600' : 'text-gray-900'
              }`}>
                {market.marketData?.trend === 'up' ? '📈' : market.marketData?.trend === 'down' ? '📉' : '➡️'} {market.marketData?.trend}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-gray-400 uppercase">Best Market</p>
              <p className="text-xs font-semibold text-gray-900 mt-1">{market.marketData?.markets?.[0]?.name?.split('(')[0] || 'N/A'}</p>
            </div>
          </div>

          {market.recommendation?.summary && (
            <div className={`rounded-lg px-4 py-3 text-sm ${
              market.recommendation.details?.[0]?.urgency === 'high' ? 'bg-red-50 text-red-700' :
              market.recommendation.details?.[0]?.urgency === 'medium' ? 'bg-amber-50 text-amber-700' :
              'bg-emerald-50 text-emerald-700'
            }`}>
              <p className="text-xs font-medium mb-0.5">Recommendation</p>
              <p className="text-[13px]">{market.recommendation.summary}</p>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="bg-emerald-600 rounded-2xl p-5 text-white">
          <h3 className="text-sm font-semibold mb-2 opacity-90">📋 Summary</h3>
          <pre className="text-xs leading-relaxed opacity-90 font-sans whitespace-pre-wrap">{summary}</pre>
        </div>
      )}
    </div>
  )
}