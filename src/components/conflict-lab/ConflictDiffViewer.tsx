import React from 'react'
import { ConflictScenario } from '../../data/conflictScenarios'
import { Sparkles, ShieldCheck } from 'lucide-react'

interface ConflictDiffViewerProps {
  scenario: ConflictScenario
  selectedChoice: 'current' | 'incoming' | 'both' | 'custom'
  resolvedCode: string
  onSelectChoice: (choice: 'current' | 'incoming' | 'both') => void
  onChangeCustomCode: (code: string) => void
}

export const ConflictDiffViewer: React.FC<ConflictDiffViewerProps> = ({
  scenario,
  selectedChoice,
  resolvedCode,
  onSelectChoice,
  onChangeCustomCode,
}) => {
  return (
    <div className="space-y-4">
      {/* 2-Column Split: Current vs Incoming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Current Branch (HEAD) */}
        <div
          onClick={() => onSelectChoice('current')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedChoice === 'current'
              ? 'bg-cyan-950/20 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/20'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-cyan-400 font-bold font-sans">
              🟦 {scenario.currentChange.label}
            </span>
            <span className="text-[10px] text-slate-500">{scenario.currentChange.author}</span>
          </div>

          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-cyan-300 overflow-x-auto whitespace-pre-wrap">
            {scenario.currentChange.code}
          </pre>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">
              {scenario.resolutions.acceptCurrent.explanation}
            </span>
            <button
              type="button"
              className={`px-2.5 py-1 rounded-lg text-xs font-sans font-bold transition ${
                selectedChoice === 'current'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {selectedChoice === 'current' ? 'Selected ✓' : 'Accept Current'}
            </button>
          </div>
        </div>

        {/* Incoming Branch */}
        <div
          onClick={() => onSelectChoice('incoming')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedChoice === 'incoming'
              ? 'bg-purple-950/20 border-purple-500 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/20'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-purple-400 font-bold font-sans">
              🟪 {scenario.incomingChange.label}
            </span>
            <span className="text-[10px] text-slate-500">{scenario.incomingChange.author}</span>
          </div>

          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-purple-300 overflow-x-auto whitespace-pre-wrap">
            {scenario.incomingChange.code}
          </pre>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-sans">
              {scenario.resolutions.acceptIncoming.explanation}
            </span>
            <button
              type="button"
              className={`px-2.5 py-1 rounded-lg text-xs font-sans font-bold transition ${
                selectedChoice === 'incoming'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {selectedChoice === 'incoming' ? 'Selected ✓' : 'Accept Incoming'}
            </button>
          </div>
        </div>
      </div>

      {/* Accept Both Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onSelectChoice('both')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedChoice === 'both'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Or Choose: Accept Both Changes (Combined)</span>
        </button>
      </div>

      {/* Result Resolution Preview */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Resolved File Preview ({scenario.filename})</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Clean (No conflict markers)</span>
        </div>

        <textarea
          value={resolvedCode}
          onChange={(e) => onChangeCustomCode(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
        />
      </div>
    </div>
  )
}