import React, { useState } from 'react'
import { Header } from './components/layout/Header'
import { Navigation, TabType } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { Sparkles, Terminal, BookOpen, GitPullRequest, ArrowRight } from 'lucide-react'

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('git-sandbox')
  const [xp] = useState<number>(150)
  const [streak] = useState<number>(3)
  const [unlockedBadgesCount] = useState<number>(1)
  const totalBadgesCount = 3

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-dot-grid">
      {/* Header */}
      <Header
        xp={xp}
        streak={streak}
        unlockedBadgesCount={unlockedBadgesCount}
        totalBadgesCount={totalBadgesCount}
      />

      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'git-sandbox' && (
          <div className="space-y-6">
            {/* Hero Banner for Git Sandbox */}
            <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phase 1 Active: Foundation Shell</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                  See Git. Understand Git. Never Panic.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Type real Git commands or click interactive action pills. Watch your branches, commits, and HEAD pointers update dynamically on an animated vector graph.
                </p>
              </div>
            </div>

            {/* Placeholder Container ready for Phase 2 & 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 min-h-[420px] flex flex-col items-center justify-center text-center border-dashed border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
                  <GitPullRequest className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Visual Graph Canvas Ready</h3>
                <p className="text-xs text-slate-400 max-w-md mb-4">
                  Phase 1 foundation is cleanly wired up. Phase 2 (Git State Machine) and Phase 3 (Animated SVG Graph) will plug right into this viewport.
                </p>
                <div className="flex gap-2 text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">SVG Engine</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">Framer Motion</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">DAG State</span>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 min-h-[420px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-3">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Interactive Command Terminal</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Ready for live command dispatching and branch inspection.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-400 flex items-center justify-between">
                  <span>$ git status</span>
                  <span className="text-emerald-400">Phase 1 Online</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'error-decoder' && (
          <div className="glass-panel rounded-2xl p-8 text-center min-h-[450px] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">16-Error Emergency Rescue Matrix</h3>
            <p className="text-sm text-slate-400 max-w-md mb-6">
              Paste terrifying terminal errors to receive instant, plain-English root causes and 1-click copyable solutions.
            </p>
            <button
              onClick={() => setActiveTab('git-sandbox')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <span>Back to Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {activeTab === 'guided-missions' && (
          <div className="glass-panel rounded-2xl p-8 text-center min-h-[450px] flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-2">3 Guided Beginner Missions</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Interactive quest progression with unlockable badges and confetti rewards.
            </p>
          </div>
        )}

        {activeTab === 'conflict-lab' && (
          <div className="glass-panel rounded-2xl p-8 text-center min-h-[450px] flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-2">Interactive Merge Conflict Sandbox</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Visual 3-way split comparison to master merge conflict resolutions.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
