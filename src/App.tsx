import React, { useState } from 'react'
import { Header } from './components/layout/Header'
import { Navigation, TabType } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { GitGraph } from './components/git-playground/GitGraph'
import { GitTerminal } from './components/git-playground/GitTerminal'
import { GitBranchList } from './components/git-playground/GitBranchList'
import { GitFileTree } from './components/git-playground/GitFileTree'
import { CommitDetailModal } from './components/git-playground/CommitDetailModal'
import { ErrorDecoderView } from './components/error-decoder/ErrorDecoderView'
import { useGitEngine } from './hooks/useGitEngine'
import { GitCommit } from './types/git'
import { Sparkles, RefreshCw, Compass, GitMerge, ArrowRight } from 'lucide-react'

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('git-sandbox')
  const [selectedCommit, setSelectedCommit] = useState<GitCommit | null>(null)

  // Gamification state
  const [xp, setXp] = useState<number>(250)
  const [streak] = useState<number>(4)
  const [unlockedBadgesCount] = useState<number>(1)
  const totalBadgesCount = 3

  // Git State Machine Engine
  const {
    gitState,
    executeCommand,
    loadTemplate,
    createBranch,
    checkout,
    stage,
  } = useGitEngine()

  const handleCommandWithXp = (cmd: string) => {
    const res = executeCommand(cmd)
    if (res.success) {
      setXp((prev) => prev + 10)
    }
    return res
  }

  const handleTryInSandbox = (cmd: string) => {
    setActiveTab('git-sandbox')
    handleCommandWithXp(cmd)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-dot-grid selection:bg-cyan-500/30 selection:text-cyan-200">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-4 space-y-6">
        {activeTab === 'git-sandbox' && (
          <div className="space-y-6">
            {/* Hero Quick Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Sparkles className="w-3 h-3" />
                    Interactive DAG Visualizer
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Branch: <strong className="text-cyan-300">{gitState.currentBranch}</strong>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Visual Git Playground
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-0.5">
                  Click any commit node on the SVG graph to inspect its metadata. Run commands or shortcut pills to see the tree grow in real-time!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadTemplate('starter')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Reset Sandbox</span>
                </button>
              </div>
            </div>

            {/* 1. Animated SVG Git Graph (Primary Visual Stage) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
                <span>Interactive Commit & Branch Graph (Click node for details)</span>
                <span className="font-mono text-[11px] text-cyan-400">
                  {Object.keys(gitState.commits).length} commits • {Object.keys(gitState.branches).length} branches
                </span>
              </div>
              <GitGraph
                gitState={gitState}
                onSelectCommit={(c) => setSelectedCommit(c)}
                selectedCommitId={selectedCommit?.id}
              />
            </div>

            {/* 2. Interactive Terminal & Side Inspector Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Terminal (2 Cols) */}
              <div className="lg:col-span-2">
                <GitTerminal
                  history={gitState.history}
                  currentBranch={gitState.currentBranch}
                  onExecuteCommand={handleCommandWithXp}
                  onLoadTemplate={loadTemplate}
                />
              </div>

              {/* Side Panels: Branches + Staging Area (1 Col) */}
              <div className="space-y-4">
                <GitBranchList
                  branches={gitState.branches}
                  currentBranch={gitState.currentBranch}
                  onSwitchBranch={(b) => checkout(b)}
                  onCreateBranch={(b) => createBranch(b)}
                />

                <GitFileTree
                  stagedFiles={gitState.stagedFiles}
                  unstagedFiles={gitState.unstagedFiles}
                  onStageFile={(f) => stage(f)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'error-decoder' && (
          <ErrorDecoderView onExecuteInSandbox={handleTryInSandbox} />
        )}

        {activeTab === 'guided-missions' && (
          <div className="glass-panel rounded-2xl p-8 text-center min-h-[450px] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3 Guided Beginner Missions</h3>
            <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              Coming up in Phase 5: Step-by-step interactive missions to practice commits, branching, and safe merges with unlockable badges.
            </p>
            <button
              onClick={() => setActiveTab('git-sandbox')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <span>Back to Sandbox</span>
            </button>
          </div>
        )}

        {activeTab === 'conflict-lab' && (
          <div className="glass-panel rounded-2xl p-8 text-center min-h-[450px] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-lg shadow-purple-500/10">
              <GitMerge className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Interactive Merge Conflict Sandbox</h3>
            <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              Coming up in Phase 6: Hands-on 3-way split comparison to master merge conflict resolution visually.
            </p>
            <button
              onClick={() => setActiveTab('git-sandbox')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <span>Back to Sandbox</span>
            </button>
          </div>
        )}
      </main>

      {/* Commit Detail Modal */}
      <CommitDetailModal
        commit={selectedCommit}
        onClose={() => setSelectedCommit(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}