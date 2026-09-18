import React, { useState } from 'react'
import { GitBranch as GitBranchIcon, Plus, Check, Shield } from 'lucide-react'
import { GitBranch } from '../../types/git'

interface GitBranchListProps {
  branches: Record<string, GitBranch>
  currentBranch: string
  onSwitchBranch: (branchName: string) => void
  onCreateBranch: (branchName: string) => void
}

export const GitBranchList: React.FC<GitBranchListProps> = ({
  branches,
  currentBranch,
  onSwitchBranch,
  onCreateBranch,
}) => {
  const [newBranchName, setNewBranchName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBranchName.trim()) return
    onCreateBranch(newBranchName.trim())
    setNewBranchName('')
    setIsCreating(false)
  }

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <GitBranchIcon className="w-4 h-4 text-cyan-400" />
          <span>Active Branches ({Object.keys(branches).length})</span>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            <Plus className="w-3 h-3" />
            <span>New</span>
          </button>
        )}
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="mb-3 flex items-center gap-1.5">
          <input
            type="text"
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            placeholder="e.g. feature/navbar"
            className="flex-1 bg-slate-950 border border-cyan-500/40 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
            autoFocus
          />
          <button
            type="submit"
            className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </form>
      )}

      <div className="space-y-1.5">
        {Object.values(branches).map((branch) => {
          const isActive = branch.name === currentBranch
          return (
            <button
              key={branch.name}
              onClick={() => onSwitchBranch(branch.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                isActive
                  ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-200 shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: branch.color }}
                ></span>
                <span className="truncate font-medium">{branch.name}</span>
                {branch.isProtected && (
                  <span title="Protected main branch">
                    <Shield className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  </span>
                )}
              </div>

              {isActive ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  <Check className="w-3 h-3" />
                  HEAD
                </span>
              ) : (
                <span className="text-[10px] text-slate-600">switch</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}