import React from 'react'
import { Search, X, Sparkles } from 'lucide-react'

interface ErrorSearchBarProps {
  query: string
  onChangeQuery: (query: string) => void
  onSelectSample: (sampleText: string) => void
}

export const ErrorSearchBar: React.FC<ErrorSearchBarProps> = ({
  query,
  onChangeQuery,
  onSelectSample,
}) => {
  const samplePresets = [
    { label: 'Unrelated histories', text: 'fatal: refusing to merge unrelated histories' },
    { label: 'EADDRINUSE 3000', text: 'Error: listen EADDRINUSE: address already in use :::3000' },
    { label: 'Cannot read undefined', text: "TypeError: Cannot read properties of undefined (reading 'map')" },
    { label: 'CORS policy blocked', text: 'Access to fetch at has been blocked by CORS policy' },
    { label: 'Detached HEAD', text: "You are in 'detached HEAD' state" },
  ]

  return (
    <div className="space-y-3">
      {/* Search Input Box */}
      <div className="relative flex items-center w-full rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all overflow-hidden">
        <div className="pl-4 pr-2 text-cyan-400">
          <Search className="w-5 h-5" />
        </div>
        <textarea
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="Paste scary terminal error or search by keyword (e.g. refusing to merge, ENOENT, undefined)..."
          rows={2}
          className="w-full py-3.5 pr-12 bg-transparent text-slate-100 placeholder:text-slate-500 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
          autoFocus
        />
        {query && (
          <button
            onClick={() => onChangeQuery('')}
            className="absolute right-3 top-3.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Sample Presets */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mr-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Try common error:
        </span>
        {samplePresets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onSelectSample(preset.text)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 font-mono text-[11px] transition shadow-sm"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  )
}