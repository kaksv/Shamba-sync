export default function Footer() {
  return (
    <footer className="bg-white border-t border-emerald-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <div>
                <h3 className="font-bold text-emerald-800">Shamba-Sync</h3>
                <p className="text-xs text-emerald-600">Agri-Voice Agent</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Multi-agent AI system for African smallholder farmers. 
              Powered by CROO Agent Protocol — decentralized A2A commerce 
              for the AI Agent economy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">CROO Agent Store</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">CAP Protocol Docs</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">DoraHacks Submission</a></li>
            </ul>
          </div>

          {/* Hackathon */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">🏆 Hackathon</h4>
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm font-medium text-emerald-800">CROO Agent Store Hackathon</p>
              <p className="text-xs text-emerald-600 mt-1">
                Track: Research & Intelligence Agents + Open – Any A2A Agents
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-emerald-700">
                <span>💰 $10.2K Prize Pool</span>
                <span>•</span>
                <span>🎯 0% Gas Fee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Built with ❤️ for African farmers • Open Source (MIT) • A2A Composable
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>3 AI Agents</span>
            <span>•</span>
            <span>5 Languages</span>
            <span>•</span>
            <span>4 Regions</span>
            <span>•</span>
            <span>USDC on Solana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}