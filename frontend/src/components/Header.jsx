export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <div>
              <h1 className="text-xl font-bold text-emerald-800">Shamba-Sync</h1>
              <p className="text-xs text-emerald-600 -mt-1">Agri-Voice Agent</p>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-emerald-700 font-medium">CAP Agent Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
              <span className="text-xs text-amber-700 font-medium">⚡ 0% Gas Fee</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}