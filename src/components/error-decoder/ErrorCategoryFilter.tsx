import React from 'react'
import { ErrorCategory } from '../../types/errors'

interface ErrorCategoryFilterProps {
  selectedCategory: ErrorCategory | 'all'
  onSelectCategory: (cat: ErrorCategory | 'all') => void
  categoryCounts: Record<string, number>
}

export const ErrorCategoryFilter: React.FC<ErrorCategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const categories: Array<{ id: ErrorCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Errors' },
    { id: 'git', label: 'Git & GitHub' },
    { id: 'npm', label: 'NPM & Packages' },
    { id: 'node', label: 'Node.js & Ports' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'react', label: 'React & Vite' },
    { id: 'network', label: 'Network & CORS' },
  ]

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id
        const count = categoryCounts[cat.id] ?? 0
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}