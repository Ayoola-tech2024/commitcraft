import React from 'react'
import { FileCode, FilePlus, Plus, Check } from 'lucide-react'

interface GitFileTreeProps {
  stagedFiles: string[]
  unstagedFiles: string[]
  onStageFile: (file: string) => void
}

export const GitFileTree: React.FC<GitFileTreeProps> = ({
  stagedFiles,
  unstagedFiles,
  onStageFile,
}) => {
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span>Working Tree & Staging Area</span>
        </div>
        {unstagedFiles.length > 0 && (
          <button
            onClick={() => onStageFile('.')}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition"
          >
            <Plus className="w-3 h-3" />
            <span>Stage All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Unstaged / Modified Files */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2 pb-1 border-b border-slate-800">
            <span>Unstaged ({unstagedFiles.length})</span>
            <span className="text-[10px] text-amber-400">git add</span>
          </div>
          {unstagedFiles.length === 0 ? (
            <div className="text-[11px] text-slate-600 italic py-2">Working tree clean</div>
          ) : (
            <div className="space-y-1">
              {unstagedFiles.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <FilePlus className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{file}</span>
                  </div>
                  <button
                    onClick={() => onStageFile(file)}
                    className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] transition"
                    title="Stage file"
                  >
                    + stage
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Staged Files */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2 pb-1 border-b border-slate-800">
            <span>Staged ({stagedFiles.length})</span>
            <span className="text-[10px] text-emerald-400">ready to commit</span>
          </div>
          {stagedFiles.length === 0 ? (
            <div className="text-[11px] text-slate-600 italic py-2">No files staged</div>
          ) : (
            <div className="space-y-1">
              {stagedFiles.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{file}</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold">STAGED</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}