import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, RefreshCw, Layers } from 'lucide-react'
import { CommandResult } from '../../types/git'

interface GitTerminalProps {
  history: string[]
  currentBranch: string
  onExecuteCommand: (command: string) => CommandResult
  onLoadTemplate: (template: 'starter' | 'feature' | 'merge-ready') => void
}

export const GitTerminal: React.FC<GitTerminalProps> = ({
  history,
  currentBranch,
  onExecuteCommand,
  onLoadTemplate,
}) => {
  const [inputVal, setInputVal] = useState('')
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!inputVal.trim()) return

      const cmd = inputVal.trim()
      setCommandHistory((prev) => [...prev, cmd])
      setHistoryIndex(-1)
      onExecuteCommand(cmd)
      setInputVal('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIdx)
      setInputVal(commandHistory[nextIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIdx = historyIndex + 1
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1)
        setInputVal('')
      } else {
        setHistoryIndex(nextIdx)
        setInputVal(commandHistory[nextIdx])
      }
    }
  }

  const runQuickCommand = (cmd: string) => {
    setCommandHistory((prev) => [...prev, cmd])
    onExecuteCommand(cmd)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
      {/* Terminal Topbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-mono font-medium">
          <div className="flex gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>bash — commitcraft@sandbox</span>
        </div>

        {/* Template Preloaders */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500 hidden sm:inline">Presets:</span>
          <button
            onClick={() => onLoadTemplate('starter')}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Linear Starter"
          >
            Starter
          </button>
          <button
            onClick={() => onLoadTemplate('feature')}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 transition"
            title="Feature Branch"
          >
            Feature
          </button>
          <button
            onClick={() => onLoadTemplate('merge-ready')}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 transition"
            title="Merge Divergence"
          >
            Merge-Ready
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 min-h-[220px] max-h-[300px] cursor-text bg-slate-950/40"
      >
        <div className="text-slate-500 text-[11px] pb-2 border-b border-slate-800/60">
          💡 Tip: Type standard Git commands or click the shortcut buttons below. Use ↑ / ↓ for history.
        </div>

        {history.map((line, idx) => {
          const isCommand = line.startsWith('$')
          const isError = line.includes('fatal:') || line.includes('error:')
          const isSuccess = line.includes('Merge made') || line.includes('Initialized') || line.includes('Switched to')

          return (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap ${
                isCommand
                  ? 'text-cyan-400 font-semibold pt-1'
                  : isError
                  ? 'text-rose-400 font-medium'
                  : isSuccess
                  ? 'text-emerald-400'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          )
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Shortcut Pills */}
      <div className="p-2.5 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] text-slate-500 font-mono mr-1">Quick:</span>
        <button
          onClick={() => runQuickCommand('git commit -m "feat: awesome update"')}
          className="px-2 py-1 rounded-md text-[11px] font-mono bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition"
        >
          + commit
        </button>
        <button
          onClick={() => runQuickCommand('git checkout -b feature/ui')}
          className="px-2 py-1 rounded-md text-[11px] font-mono bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition"
        >
          + branch (ui)
        </button>
        <button
          onClick={() => runQuickCommand('git checkout main')}
          className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
        >
          checkout main
        </button>
        <button
          onClick={() => runQuickCommand('git merge feature/ui')}
          className="px-2 py-1 rounded-md text-[11px] font-mono bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition"
        >
          merge feature
        </button>
        <button
          onClick={() => runQuickCommand('git reset --hard HEAD~1')}
          className="px-2 py-1 rounded-md text-[11px] font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition"
        >
          reset ~1
        </button>
      </div>

      {/* Terminal Command Input Prompt */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-950 border-t border-slate-800">
        <span className="text-cyan-400 font-mono text-xs font-bold">
          commitcraft ({currentBranch}) $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. git commit -m 'feat: login'"
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
          autoFocus
          spellCheck={false}
        />
        <button
          onClick={() => {
            if (inputVal.trim()) {
              onExecuteCommand(inputVal.trim())
              setInputVal('')
            }
          }}
          className="p-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs transition"
          title="Run command (Enter)"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}