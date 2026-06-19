export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🌿</span>
              <span className="text-sm font-bold text-gray-800">Shamba-Sync</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Multi-agent AI system for African smallholder farmers. Powered by CROO Agent Protocol.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Links</p>
            <ul className="space-y-1">
              {['CROO Agent Store', 'CAP Protocol', 'GitHub', 'DoraHacks'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-gray-400 hover:text-emerald-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 max-w-[220px]">
            <p className="text-xs font-medium text-emerald-800">🏆 CROO Hackathon</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Research & Intelligence + Open A2A</p>
            <div className="flex gap-2 mt-2 text-[10px] text-emerald-700">
              <span>$10.2K Pool</span>
              <span>•</span>
              <span>0% Gas Fee</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-gray-300">MIT License • A2A Composable</p>
          <div className="flex items-center gap-2 text-[10px] text-gray-300">
            <span>3 Agents</span>
            <span>•</span>
            <span>5 Languages</span>
            <span>•</span>
            <span>USDC on Solana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}