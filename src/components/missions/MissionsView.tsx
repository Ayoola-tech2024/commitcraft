import React, { useState, useMemo } from 'react'
import { MISSIONS_DATA } from '../../data/missionsData'
import { Mission, MissionStep } from '../../types/missions'
import { BadgeGallery } from './BadgeGallery'
import { BadgeModal } from './BadgeModal'
import { Compass, CheckCircle2, Circle, HelpCircle, Terminal, Sparkles, ArrowRight, CornerDownLeft, RefreshCw, Trophy } from 'lucide-react'
import { CommandResult } from '../../types/git'

interface MissionsViewProps {
  unlockedBadgeIds: string[]
  completedMissionIds: string[]
  completedStepIds: string[]
  onCompleteStep: (stepId: string) => void
  onCompleteMission: (missionId: string, badgeId?: string, rewardXp?: number) => void
  onExecuteCommand: (command: string) => CommandResult
  currentBranch: string
  history: string[]
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  unlockedBadgeIds,
  completedMissionIds,
  completedStepIds,
  onCompleteStep,
  onCompleteMission,
  onExecuteCommand,
  currentBranch,
  history,
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(MISSIONS_DATA[0].id)
  const [activeBadgeModal, setActiveBadgeModal] = useState<{
    badge: { id: string; title: string; icon: string; description: string }
    xp: number
  } | null>(null)
  const [showHintForStep, setShowHintForStep] = useState<string | null>(null)
  const [cliInput, setCliInput] = useState('')
  const [validationFeedback, setValidationFeedback] = useState<string | null>(null)

  const activeMission = useMemo(() => {
    return MISSIONS_DATA.find((m) => m.id === selectedMissionId) || MISSIONS_DATA[0]
  }, [selectedMissionId])

  // Compute active step inside this mission
  const activeStepIndex = useMemo(() => {
    const idx = activeMission.steps.findIndex((s) => !completedStepIds.includes(s.id))
    return idx === -1 ? activeMission.steps.length - 1 : idx
  }, [activeMission, completedStepIds])

  const isMissionFullyCompleted = useMemo(() => {
    return activeMission.steps.every((s) => completedStepIds.includes(s.id))
  }, [activeMission, completedStepIds])

  const handleRunStepCommand = (cmd: string) => {
    const cleanCmd = cmd.trim()
    if (!cleanCmd) return

    const res = onExecuteCommand(cleanCmd)
    const currentStep = activeMission.steps[activeStepIndex]

    if (currentStep) {
      const regex = new RegExp(currentStep.expectedCommandPattern, 'i')
      if (regex.test(cleanCmd)) {
        onCompleteStep(currentStep.id)
        setValidationFeedback(`✅ Step complete! Great job.`)

        // Check if this was the last step in the mission
        const remainingSteps = activeMission.steps.filter(
          (s) => s.id !== currentStep.id && !completedStepIds.includes(s.id)
        )

        if (remainingSteps.length === 0) {
          onCompleteMission(activeMission.id, activeMission.badge.id, activeMission.xpReward)
          setActiveBadgeModal({ badge: activeMission.badge, xp: activeMission.xpReward })
        }
      } else {
        setValidationFeedback(`Command executed, but didn't match the step goal. Tip: check the hint!`)
      }
    }
    setCliInput('')
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/30 border border-slate-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Guided Quests</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            FirstCommit Guided Missions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Follow step-by-step interactive missions to build muscle memory. Execute the requested commands in the quest terminal to unlock badges, earn XP, and level up!
          </p>
        </div>
      </div>

      {/* Trophy Showcase */}
      <BadgeGallery unlockedBadgeIds={unlockedBadgeIds} />

      {/* Mission Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MISSIONS_DATA.map((mission) => {
          const isSelected = mission.id === selectedMissionId
          const isCompleted = completedMissionIds.includes(mission.id)
          const completedStepsCount = mission.steps.filter((s) => completedStepIds.includes(s.id)).length

          return (
            <button
              key={mission.id}
              onClick={() => setSelectedMissionId(mission.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/50 ring-1 ring-cyan-500/20 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-2xl select-none">{mission.badge.icon}</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-amber-400 border border-amber-500/20">
                    +{mission.xpReward} XP
                  </span>
                  {isCompleted && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      COMPLETED
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">
                Mission {mission.number}: {mission.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                {mission.subtitle}
              </p>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Progress</span>
                  <span>{completedStepsCount}/{mission.steps.length} Steps</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                    style={{
                      width: `${(completedStepsCount / mission.steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Mission Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Step Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Mission Steps ({activeMission.title})
            </h3>
            {isMissionFullyCompleted && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Mission Accomplished!
              </span>
            )}
          </div>

          <div className="space-y-3">
            {activeMission.steps.map((step, idx) => {
              const isDone = completedStepIds.includes(step.id)
              const isCurrent = idx === activeStepIndex && !isDone
              const showHint = showHintForStep === step.id

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-emerald-950/15 border-emerald-500/30 text-slate-300'
                      : isCurrent
                      ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      )}
                      <h4 className="text-sm font-bold text-white">
                        {step.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => setShowHintForStep(showHint ? null : step.id)}
                      className="text-slate-400 hover:text-cyan-400 p-1"
                      title="Show Hint"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 ml-7 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Why It Matters */}
                  <div className="ml-7 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-300 block mb-0.5">💡 Why this matters:</strong>
                    {step.whyItMatters}
                  </div>

                  {/* Hint Box (Collapsible) */}
                  {showHint && (
                    <div className="ml-7 mt-2 p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-[11px] text-cyan-200">
                      <strong>Hint:</strong> {step.hint}
                    </div>
                  )}

                  {/* Quick-fill Button for Active Step */}
                  {isCurrent && (
                    <div className="ml-7 mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          const sampleCmd = step.hint.match(/`([^`]+)`/)?.[1]
                          if (sampleCmd) {
                            handleRunStepCommand(sampleCmd)
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run Suggested Command</span>
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Quest Interactive CLI */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between shadow-xl min-h-[400px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>Quest Runner ({currentBranch})</span>
              </div>
              <span className="text-slate-500">Live Validator Active</span>
            </div>

            {/* Validation toast */}
            {validationFeedback && (
              <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 animate-in fade-in">
                {validationFeedback}
              </div>
            )}

            {/* Stream */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1.5 max-h-[260px] overflow-y-auto">
              <div className="text-slate-500 text-[11px]">
                Quest Terminal Ready. Type command for Step {activeStepIndex + 1} below:
              </div>
              {history.slice(-6).map((h, i) => (
                <div key={i} className="leading-relaxed text-slate-300">
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400">
              quest$
            </span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && cliInput.trim()) {
                  handleRunStepCommand(cliInput.trim())
                }
              }}
              placeholder="e.g. git commit -m 'feat: my first commit'"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => {
                if (cliInput.trim()) {
                  handleRunStepCommand(cliInput.trim())
                }
              }}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Badge Unlock Celebration Modal */}
      <BadgeModal
        badge={activeBadgeModal?.badge || null}
        xpGained={activeBadgeModal?.xp || 0}
        onClose={() => setActiveBadgeModal(null)}
      />
    </div>
  )
}