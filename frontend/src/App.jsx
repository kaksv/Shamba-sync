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

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: 'input', label: '🔬 Diagnose Crop', icon: '🔬' },
            { id: 'results', label: '📊 Results', icon: '📊' },
            { id: 'pipeline', label: '⚙️ Agent Pipeline', icon: '⚙️' },
            { id: 'cap', label: '🤖 CAP Protocol', icon: '🤖' },
            { id: 'whatsapp', label: '📱 WhatsApp', icon: '📱' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-200'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'input' && (
            <InputForm onSubmit={handleProcessQuery} loading={loading} error={error} />
          )}

          {activeTab === 'results' && (
            result ? <ResultsDashboard result={result} /> : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No results yet. Submit a crop query first!</p>
                <button
                  onClick={() => setActiveTab('input')}
                  className="mt-4 text-emerald-600 hover:text-emerald-800 font-medium"
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