import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { CONFLICT_SCENARIOS } from '../../data/conflictScenarios'
import { ConflictDiffViewer } from './ConflictDiffViewer'
import { ConflictMarkersGuide } from './ConflictMarkersGuide'
import { GitMerge, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react'

interface ConflictLabViewProps {
  onGainXp: (amount: number) => void
}

export const ConflictLabView: React.FC<ConflictLabViewProps> = ({ onGainXp }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0)
  const currentScenario = CONFLICT_SCENARIOS[selectedScenarioIndex] || CONFLICT_SCENARIOS[0]

  const [selectedChoice, setSelectedChoice] = useState<'current' | 'incoming' | 'both' | 'custom'>('current')
  const [resolvedCode, setResolvedCode] = useState<string>(
    currentScenario.resolutions.acceptCurrent.code
  )
  const [isCommitted, setIsCommitted] = useState(false)

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIndex(idx)
    const nextScenario = CONFLICT_SCENARIOS[idx]
    setSelectedChoice('current')
    setResolvedCode(nextScenario.resolutions.acceptCurrent.code)
    setIsCommitted(false)
  }

  const handleChoice = (choice: 'current' | 'incoming' | 'both') => {
    setSelectedChoice(choice)
    if (choice === 'current') {
      setResolvedCode(currentScenario.resolutions.acceptCurrent.code)
    } else if (choice === 'incoming') {
      setResolvedCode(currentScenario.resolutions.acceptIncoming.code)
    } else if (choice === 'both') {
      setResolvedCode(currentScenario.resolutions.acceptBoth.code)
    }
  }

  const handleFinalizeMerge = () => {
    setIsCommitted(true)
    onGainXp(75)

    // Trigger celebration confetti
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#a855f7'],
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/30 border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <GitMerge className="w-3.5 h-3.5" />
            <span>Interactive 3-Way Merge Resolver</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Merge Conflict Resolution Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Merge conflicts are not bugs—they are just Git asking you to pick which code to keep. Practice choosing and combining changes with instant visual feedback!
          </p>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2">
        {CONFLICT_SCENARIOS.map((sc, idx) => {
          const isSelected = idx === selectedScenarioIndex
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Scenario {idx + 1}: {sc.title}
            </button>
          )
        })}
      </div>

      {/* Active Conflict Overview */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white font-mono">
              CONFLICT in {currentScenario.filename}
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            {currentScenario.plainEnglishExplanation}
          </p>
        </div>

        {/* Commit Action Button */}
        <div>
          {isCommitted ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Merge Commit Created! (+75 XP)</span>
            </div>
          ) : (
            <button
              onClick={handleFinalizeMerge}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Commit Resolution & Merge</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-Way Diff Viewer */}
      <ConflictDiffViewer
        scenario={currentScenario}
        selectedChoice={selectedChoice}
        resolvedCode={resolvedCode}
        onSelectChoice={handleChoice}
        onChangeCustomCode={(c) => {
          setSelectedChoice('custom')
          setResolvedCode(c)
        }}
      />

      {/* Conflict Markers Guide */}
      <ConflictMarkersGuide />
    </div>
  )
}