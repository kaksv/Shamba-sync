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
    onSubmit({ ...formData, image: imageBase64 })
  }

  const demoPresets = [
    {
      label: '🍅 Tomato issue (Swahili)',
      data: {
        type: 'mixed',
        text: 'Mazao yangu ya nyanya yana majani manjano na yanaonekana kukauka. Nisaidie kutambua tatizo.',
        region: 'east-africa',
        language: 'sw',
      },
    },
    {
      label: '🌽 Maize market check',
      data: {
        type: 'text',
        text: 'What is the current market price for maize in East Africa? Is it a good time to sell?',
        region: 'east-africa',
        language: 'en',
      },
    },
  ]

  const loadDemo = (preset) => {
    setFormData(preset.data)
    setImagePreview(null)
    setImageBase64(null)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quick Demo */}
      <div className="mb-4 animate-fade-up">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">Quick demo</p>
        <div className="flex flex-wrap gap-1.5">
          {demoPresets.map((preset, i) => (
            <button
              key={i}
              onClick={() => loadDemo(preset)}
              className="text-left bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-xs text-gray-500 hover:text-gray-800 shadow-sm"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 space-y-4 stagger-children">
        {/* Input Type */}
        <div>
          <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2.5">Input method</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { value: 'text', label: '📝 Text', desc: 'Type a question' },
              { value: 'mixed', label: '📸 Image', desc: 'Upload a photo' },
              { value: 'voice', label: '🎤 Voice', desc: 'Voice note' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setFormData(prev => ({ ...prev, type: opt.value }))}
                className={`px-3 py-3 rounded-xl border text-center transition-all ${
                  formData.type === opt.value
                    ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg mb-0.5">{opt.label}</div>
                <div className="text-[11px] text-gray-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        {(formData.type === 'mixed' || formData.type === 'image') && (
          <div className="animate-slide-up">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2.5">Crop photo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl py-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
            >
              {imagePreview ? (
                <div className="space-y-2">
                  <img src={imagePreview} alt="Crop" className="h-32 mx-auto rounded-lg shadow-sm object-cover" />
                  <p className="text-xs text-emerald-600 font-medium">Click to change</p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-1">📸</div>
                  <p className="text-sm text-gray-500">Click to upload a photo</p>
                  <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, or WebP</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        )}

        {/* Text Input */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2.5">
            {formData.type === 'voice' ? 'Voice note transcript (simulated)' : 'Describe your crop issue'}
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none resize-none transition-all text-sm text-gray-700 placeholder:text-gray-300"
            placeholder={
              formData.language === 'sw'
                ? 'Eleza tatizo la mazao yako...'
                : formData.language === 'ha'
                ? 'Bayyana matsalar amfanin gonar ku...'
                : 'e.g., My tomato leaves are turning yellow...'
            }
          />
        </div>

        {/* Region + Language */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Region</label>
            <select
              value={formData.region}
              onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none bg-white text-sm text-gray-700"
            >
              <option value="east-africa">🌍 East Africa</option>
              <option value="west-africa">🌍 West Africa</option>
              <option value="central-africa">🌍 Central Africa</option>
              <option value="southern-africa">🌍 Southern Africa</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none bg-white text-sm text-gray-700"
            >
              <option value="en">🇬🇧 English</option>
              <option value="sw">🇹🇿 Swahili</option>
              <option value="ha">🇳🇬 Hausa</option>
              <option value="yo">🇳🇬 Yoruba</option>
              <option value="rw">🇷🇼 Kinyarwanda</option>
              <option value="lg">🇺🇬 Luganda</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing through 3 agents...
            </span>
          ) : (
            <span>Diagnose My Crop — 0.75 USDC</span>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            ❌ {error}
          </div>
        )}

        <p className="text-[11px] text-gray-300 text-center">
          CROO Agent Protocol • USDC on Solana • 0% gas fee
        </p>
      </form>
    </div>
  )
}