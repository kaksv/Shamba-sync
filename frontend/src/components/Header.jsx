export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-float">🌿</span>
            <div>
              <h1 className="text-base font-bold text-gray-900">Shamba-Sync</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">Agri-Voice Agent</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-breathe"></span>
              <span className="text-[10px] text-emerald-700 font-medium">CAP Active</span>
            </div>
            <div className="bg-amber-50 px-2 py-0.5 rounded-lg">
              <span className="text-[10px] text-amber-700 font-medium">0% Gas</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
