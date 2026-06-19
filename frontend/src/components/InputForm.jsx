import { useState, useRef } from 'react'

export default function InputForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    type: 'text',
    text: '',
    region: 'east-africa',
    language: 'en',
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result.split(',')[1]
      setImageBase64(base64)
      setImagePreview(event.target.result)
      setFormData(prev => ({ ...prev, type: 'mixed', mimeType: file.type }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      image: imageBase64,
    })
  }

  const demoPresets = [
    {
      label: '🌱 Tomato Early Blight (Swahili)',
      data: {
        type: 'mixed',
        text: 'Mazao yangu ya nyanya yana majani manjano na yanaonekana kukauka. Nisaidie kutambua tatizo.',
        region: 'east-africa',
        language: 'sw',
      },
      note: 'Farmer describing yellowing tomato leaves in Swahili',
    },
    {
      label: '🌾 Maize Market Check',
      data: {
        type: 'text',
        text: 'What is the current market price for maize in East Africa? Is it a good time to sell?',
        region: 'east-africa',
        language: 'en',
      },
      note: 'English market price inquiry for maize',
    },
  ]

  const loadDemo = (preset) => {
    setFormData(preset.data)
    setImagePreview(null)
    setImageBase64(null)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quick Demo Buttons */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500 mb-2">⚡ Quick Demo</p>
        <div className="flex flex-wrap gap-2">
          {demoPresets.map((preset, i) => (
            <button
              key={i}
              onClick={() => loadDemo(preset)}
              className="text-left bg-white border border-emerald-200 rounded-xl p-3 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all shadow-sm hover:shadow-md"
            >
              <div className="text-sm font-medium text-gray-800">{preset.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{preset.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 sm:p-8 space-y-6">
        {/* Input Type Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input Method</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'text', label: '📝 Text', desc: 'Type your question' },
              { value: 'mixed', label: '📸 Image', desc: 'Upload crop photo' },
              { value: 'voice', label: '🎤 Voice', desc: 'Record voice note' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setFormData(prev => ({ ...prev, type: opt.value }))}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  formData.type === opt.value
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30'
                }`}
              >
                <div className="text-xl mb-1">{opt.label}</div>
                <div className="text-xs text-gray-500">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload - shown when image type selected */}
        {(formData.type === 'mixed' || formData.type === 'image') && (
          <div className="animate-slide-up">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Crop Photo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-300 rounded-2xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all"
            >
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Crop preview" className="max-h-48 mx-auto rounded-xl shadow-sm" />
                  <p className="text-sm text-emerald-600">Click to change photo</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl">📸</div>
                  <p className="text-sm text-gray-600">Click to upload a photo of your crop</p>
                  <p className="text-xs text-gray-400">JPG, PNG, or WebP</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Text Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {formData.type === 'voice' ? '🎤 Voice Note Transcript (simulated)' : '✏️ Describe Your Crop Issue'}
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none resize-none transition-all text-gray-700"
            placeholder={
              formData.language === 'sw'
                ? 'Eleza tatizo la mazao yako... (Describe your crop problem in Swahili)'
                : formData.language === 'ha'
                ? 'Bayyana matsalar amfanin gonar ku a Hausa...'
                : 'e.g., My tomato leaves are turning yellow and developing spots'
            }
          />
        </div>

        {/* Region and Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Region</label>
            <select
              value={formData.region}
              onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white text-gray-700"
            >
              <option value="east-africa">🌍 East Africa (TZ, KE, UG, RW, BI)</option>
              <option value="west-africa">🌍 West Africa (NG, GH, SN, CI)</option>
              <option value="central-africa">🌍 Central Africa</option>
              <option value="southern-africa">🌍 Southern Africa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">🗣️ Language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white text-gray-700"
            >
              <option value="en">🇬🇧 English</option>
              <option value="sw">🇹🇿 Swahili (Kiswahili)</option>
              <option value="ha">🇳🇬 Hausa</option>
              <option value="yo">🇳🇬 Yoruba</option>
              <option value="rw">🇷🇼 Kinyarwanda</option>
              <option value="lg">🇺🇬 Luganda</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing through 3 agents...
            </span>
          ) : (
            <span>🚀 Diagnose My Crop — 0.75 USDC</span>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-slide-up">
            ❌ {error}
          </div>
        )}

        {/* Pricing note */}
        <p className="text-xs text-gray-400 text-center">
          Powered by CROO Agent Protocol • USDC payments on Solana • 0% gas fee during launch window
        </p>
      </form>
    </div>
  )
}