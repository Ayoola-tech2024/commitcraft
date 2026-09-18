import React from 'react'
import { Heart, Sparkles } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 px-4 py-6 mt-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>for the <strong className="text-slate-200 font-semibold">FirstCommit Hackathon</strong></span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>100% Client-Side & Offline Ready</span>
          </span>
          <span>•</span>
          <span>No Data Stored Remotely</span>
        </div>
      </div>
    </footer>
  )
}
