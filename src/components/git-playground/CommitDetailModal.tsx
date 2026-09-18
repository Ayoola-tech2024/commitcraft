import React from 'react'
import { GitCommit } from '../../types/git'
import { User, Clock, GitCommit as CommitIcon, GitBranch, X } from 'lucide-react'

interface CommitDetailModalProps {
  commit: GitCommit | null
  onClose: () => void
}

export const CommitDetailModal: React.FC<CommitDetailModalProps> = ({ commit, onClose }) => {
  if (!commit) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <CommitIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Commit Details</h3>
            <span className="font-mono text-xs text-cyan-400">SHA: {commit.shortSha}</span>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-sans font-semibold mb-1">
              Commit Message
            </span>
            <p className="text-slate-200 font-medium">{commit.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">Branch</span>
                <span className="font-bold text-cyan-300 truncate">{commit.branch}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 block">Author</span>
                <span className="font-bold text-emerald-300 truncate">{commit.author}</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-sans font-semibold mb-1">
              Parent Commits
            </span>
            <div className="flex gap-2">
              {commit.parentIds.length === 0 ? (
                <span className="text-slate-500 italic">None (Root Commit)</span>
              ) : (
                commit.parentIds.map((pId) => (
                  <span key={pId} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {pId}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}