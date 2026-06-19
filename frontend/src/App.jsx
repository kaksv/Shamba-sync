import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import InputForm from './components/InputForm'
import ResultsDashboard from './components/ResultsDashboard'
import AgentPipeline from './components/AgentPipeline'
import CAPSection from './components/CAPSection'
import WhatsAppSection from './components/WhatsAppSection'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('input')

  const handleProcessQuery = async (formData) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process query')
      }

      setResult(data)
      setActiveTab('results')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'input', label: 'Diagnose Crop', icon: '🔬' },
    { id: 'results', label: 'Results', icon: '📊' },
    { id: 'pipeline', label: 'Agent Pipeline', icon: '⚙️' },
    { id: 'cap', label: 'CAP Protocol', icon: '🤖' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <main className="max-w-5xl mx-auto px-3 sm:px-4 pb-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-1 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1 animate-fade-in">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div key={activeTab} className="tab-enter">
          {activeTab === 'input' && (
            <InputForm onSubmit={handleProcessQuery} loading={loading} error={error} />
          )}

          {activeTab === 'results' && (
            result ? <ResultsDashboard result={result} /> : (
              <div className="text-center py-16 animate-fade-up">
                <div className="text-4xl mb-3 text-gray-300">📋</div>
                <p className="text-base text-gray-400">No results yet</p>
                <p className="text-sm text-gray-300 mt-1">Submit a crop query to see results here</p>
                <button
                  onClick={() => setActiveTab('input')}
                  className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                >
                  Go to Input →
                </button>
              </div>
            )
          )}

          {activeTab === 'pipeline' && <AgentPipeline />}
          {activeTab === 'cap' && <CAPSection />}
          {activeTab === 'whatsapp' && <WhatsAppSection />}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App