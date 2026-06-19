export default function ResultsDashboard({ result }) {
  if (!result) return null;

  const { steps, summary } = result;
  const vision = steps?.translatorVision?.visionAnalysis;
  const agri = steps?.agronomist;
  const market = steps?.marketConnector;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">📊 Advisory Report</h2>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            Job: {result.jobId?.slice(0, 15)}...
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
            Region: {result.region}
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
            Farmer: {result.farmerId}
          </span>
          {result.status && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              result.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {result.status}
            </span>
          )}
        </div>
      </div>

      {/* Step 1: Diagnosis */}
      {vision && (
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg">🔬</span>
            <div>
              <h3 className="font-semibold text-gray-900">Agent 1: Crop Diagnosis</h3>
              <p className="text-xs text-gray-500">Translator & Vision Analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Crop</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{vision.crop}</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Disease</p>
              <p className="text-lg font-semibold text-red-700">{vision.disease}</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Severity</p>
              <p className={`text-lg font-semibold ${
                vision.severity === 'high' ? 'text-red-600' :
                vision.severity === 'medium' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {vision.severity}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Confidence</p>
              <p className="text-lg font-semibold text-gray-900">{vision.confidence}%</p>
            </div>
          </div>

          {vision.symptoms?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Symptoms:</p>
              <ul className="space-y-1">
                {vision.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Treatment Plan */}
      {agri && (
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg">💊</span>
            <div>
              <h3 className="font-semibold text-gray-900">Agent 2: Treatment Plan</h3>
              <p className="text-xs text-gray-500">Agronomist Recommendations</p>
            </div>
          </div>

          {/* Organic Treatments */}
          {agri.recommendations?.organic?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-1">
                🌿 Organic Treatments ({agri.recommendations.organic.length})
              </h4>
              <div className="space-y-3">
                {agri.recommendations.organic.map((treatment, i) => (
                  <div key={i} className="border border-emerald-200 rounded-xl p-4 hover:bg-emerald-50/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{treatment.name}</h5>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                        {treatment.costEstimate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{treatment.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Ingredients:</span>
                        <ul className="list-disc list-inside mt-1">
                          {treatment.ingredients?.map((ing, j) => <li key={j}>{ing}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium">Application:</span>
                        <p className="mt-1">{treatment.applicationMethod}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chemical Treatments */}
          {agri.recommendations?.chemical?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-1">
                🧪 Chemical Treatments ({agri.recommendations.chemical.length})
              </h4>
              <div className="space-y-3">
                {agri.recommendations.chemical.map((treatment, i) => (
                  <div key={i} className="border border-orange-200 rounded-xl p-4">
                    <h5 className="font-medium text-gray-900 mb-1">{treatment.name}</h5>
                    <p className="text-sm text-gray-600 mb-2">{treatment.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div><span className="font-medium">Dosage:</span> {treatment.dosage}</div>
                      <div><span className="font-medium">Cost:</span> {treatment.costEstimate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Practices */}
          {agri.recommendations?.cultural?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-1">
                🌾 Cultural Practices ({agri.recommendations.cultural.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {agri.recommendations.cultural.map((practice, i) => (
                  <div key={i} className="border border-blue-200 rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        practice.difficulty === 'low' ? 'bg-green-100 text-green-700' :
                        practice.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{practice.difficulty}</span>
                      <span className="font-medium">{practice.practice}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{practice.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preventative Measures */}
          {agri.preventativeMeasures?.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">🛡️ Preventative Measures</h4>
              <div className="space-y-2">
                {agri.preventativeMeasures.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-600">{m.measure}</span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      m.cost === 'free' ? 'bg-emerald-100 text-emerald-700' :
                      m.cost === 'low' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>{m.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Market Data */}
      {market && (
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">💰</span>
            <div>
              <h3 className="font-semibold text-gray-900">Agent 3: Market Intelligence</h3>
              <p className="text-xs text-gray-500">Market Connector</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">Current Price</p>
              <p className="text-2xl font-bold text-gray-900">
                {market.marketData?.currentPrice}
                <span className="text-sm font-normal text-gray-500">/{market.marketData?.unit}</span>
              </p>
              <p className="text-xs text-gray-400">{market.marketData?.currency}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">Trend</p>
              <p className={`text-2xl font-bold ${
                market.marketData?.trend === 'up' ? 'text-emerald-600' :
                market.marketData?.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {market.marketData?.trend === 'up' ? '📈' :
                 market.marketData?.trend === 'down' ? '📉' : '➡️'}
                {' '}{market.marketData?.trend}
              </p>
              <p className="text-xs text-gray-400">{market.marketData?.trendStrength}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">Best Market</p>
              <p className="text-lg font-semibold text-gray-900">
                {market.marketData?.markets?.sort((a, b) => b.price - a.price)[0]?.name?.split('(')[0] || 'N/A'}
              </p>
            </div>
          </div>

          {/* Sell Recommendation */}
          {market.recommendation && (
            <div className={`rounded-xl p-4 mb-4 ${
              market.recommendation.details?.[0]?.urgency === 'high' ? 'bg-red-50 border border-red-200' :
              market.recommendation.details?.[0]?.urgency === 'medium' ? 'bg-amber-50 border border-amber-200' :
              'bg-emerald-50 border border-emerald-200'
            }`}>
              <h4 className="text-sm font-semibold mb-1">📊 Recommendation</h4>
              <p className="text-sm text-gray-700">{market.recommendation.summary}</p>
            </div>
          )}

          {/* Market Details */}
          {market.marketData?.markets?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">🏪 Markets</h4>
              <div className="space-y-2">
                {market.marketData.markets.map((m, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                    <span className="text-sm text-gray-700">{m.name}</span>
                    <span className="text-sm font-medium">{m.price} {m.currency || market.marketData.currency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {market.tips?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips</h4>
              <ul className="space-y-1">
                {market.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Full Summary */}
      {summary && (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-2">📋 Summary</h3>
          <pre className="text-sm whitespace-pre-wrap font-sans opacity-90">{summary}</pre>
        </div>
      )}
    </div>
  )
}