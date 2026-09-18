import React from 'react'
import { GitMerge } from 'lucide-react'

export const ConflictMarkersGuide: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
        <GitMerge className="w-4 h-4" />
        <span>How to Read Git Conflict Markers (The Cheat Sheet)</span>
      </div>

      <div className="space-y-2 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-2">
          <span className="text-cyan-400 font-bold select-all">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span>
          <span className="text-slate-300 font-sans text-[11px]">
            = Starts the changes on your <strong>current branch</strong> (where you are standing).
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 flex items-start gap-2">
          <span className="text-amber-400 font-bold select-all">=======</span>
          <span className="text-slate-300 font-sans text-[11px]">
            = The <strong>divider line</strong> separating your code from your teammate's code.
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-2">
          <span className="text-purple-400 font-bold select-all">&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch-name</span>
          <span className="text-slate-300 font-sans text-[11px]">
            = Ends the changes from the <strong>incoming branch</strong> you are trying to merge.
          </span>
        </div>
      </div>
    </div>
  )
}