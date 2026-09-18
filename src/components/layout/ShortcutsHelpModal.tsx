import React from 'react'
import { HelpCircle, X, Terminal, GitGraph, BookOpen, Compass, GitMerge, Keyboard } from 'lucide-react'

interface ShortcutsHelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ShortcutsHelpModal: React.FC<ShortcutsHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const shortcuts = [
    { key: 'Enter', description: 'Execute command in active terminal' },
    { key: '↑ / ↓', description: 'Navigate previous command history in terminal' },
    { key: 'Click Node', description: 'Inspect commit metadata on the SVG graph' },
    { key: 'Quick Pills', description: '1-Click execution for common Git actions' },
  ]

  const modules = [
    {
      icon: GitGraph,
      title: 'Visual Git Sandbox',
      desc: 'Interactive DAG showing real-time branch splits, merge commits, and HEAD tracking.',
    },
    {
      icon: BookOpen,
      title: '16-Error Decoder',
      desc: 'Plain-English rescue matrix for terminal stack traces with 1-click copy fixes.',
    },
    {
      icon: Compass,
      title: 'Guided Missions',
      desc: 'Gamified quests with step validation, XP rewards, and trophy badges.',
    },
    {
      icon: GitMerge,
      title: 'Conflict Lab',
      desc: 'Visual 3-way split resolver explaining <<<<<<< HEAD markers and solutions.',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">CommitCraft Guide & Shortcuts</h3>
            <span className="text-xs text-slate-400">Master Git visually with zero fear</span>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <span>Keyboard & Navigation Shortcuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {shortcuts.map((s) => (
              <div
                key={s.key}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2"
              >
                <span className="text-slate-400 font-sans text-[11px]">{s.description}</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 font-bold text-[11px] border border-slate-700 whitespace-nowrap">
                  {s.key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Overview */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Core Modules
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {modules.map((m) => {
              const Icon = m.icon
              return (
                <div key={m.title} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{m.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}