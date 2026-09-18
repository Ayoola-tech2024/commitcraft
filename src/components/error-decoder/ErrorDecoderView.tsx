import React, { useState, useMemo } from 'react'
import { ErrorSearchBar } from './ErrorSearchBar'
import { ErrorCategoryFilter } from './ErrorCategoryFilter'
import { ErrorCard } from './ErrorCard'
import { searchErrorDiagnostics, ERROR_CATALOG } from '../../data/errorCatalog'
import { ErrorCategory } from '../../types/errors'
import { BookOpen, ShieldAlert, Sparkles } from 'lucide-react'

interface ErrorDecoderViewProps {
  onExecuteInSandbox?: (cmd: string) => void
}

export const ErrorDecoderView: React.FC<ErrorDecoderViewProps> = ({ onExecuteInSandbox }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ErrorCategory | 'all'>('all')

  const results = useMemo(() => {
    return searchErrorDiagnostics(searchQuery, selectedCategory)
  }, [searchQuery, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ERROR_CATALOG.length }
    ERROR_CATALOG.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>16 Curated Beginner Nightmare Scenarios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Terminal Error Decoder & Emergency Rescue
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Never stare at a cryptic stack trace in panic again. Search below or paste your error message to get an instant plain-English breakdown, root cause, and 1-click copyable fix.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <ErrorSearchBar
          query={searchQuery}
          onChangeQuery={setSearchQuery}
          onSelectSample={(sample) => setSearchQuery(sample)}
        />

        <div className="flex items-center justify-between gap-4">
          <ErrorCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
            Showing <strong>{results.length}</strong> / {ERROR_CATALOG.length} solutions
          </span>
        </div>
      </div>

      {/* Diagnostic Cards List */}
      {results.length === 0 ? (
        <div className="rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 p-12 text-center flex flex-col items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-amber-400/80 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No matching error pattern found</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            Try searching broader keywords like "merge", "port", "undefined", or click "All Errors" to view the full catalog.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((diagnostic) => (
            <ErrorCard
              key={diagnostic.id}
              diagnostic={diagnostic}
              onTryInSandbox={onExecuteInSandbox}
            />
          ))}
        </div>
      )}
    </div>
  )
}