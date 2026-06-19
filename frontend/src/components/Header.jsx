export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌿</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Shamba-Sync</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">Agri-Voice Agent</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] text-emerald-700 font-medium">CAP Active</span>
            </div>
            <div className="bg-amber-50 px-2.5 py-1 rounded-lg">
              <span className="text-[11px] text-amber-700 font-medium">0% Gas</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}