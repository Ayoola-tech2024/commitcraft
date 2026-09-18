import React from 'react'
import { Trophy, CheckCircle2, Lock } from 'lucide-react'
import { MISSIONS_DATA } from '../../data/missionsData'

interface BadgeGalleryProps {
  unlockedBadgeIds: string[]
}

export const BadgeGallery: React.FC<BadgeGalleryProps> = ({ unlockedBadgeIds }) => {
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <Trophy className="w-4 h-4 text-emerald-400" />
          <span>Achievement Trophy Showcase</span>
        </div>
        <span className="text-xs font-mono text-cyan-400">
          {unlockedBadgeIds.length} / {MISSIONS_DATA.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MISSIONS_DATA.map((mission) => {
          const isUnlocked = unlockedBadgeIds.includes(mission.badge.id)
          return (
            <div
              key={mission.badge.id}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br from-slate-900 to-cyan-950/30 border-cyan-500/40 text-white shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                  isUnlocked
                    ? 'bg-slate-800 border-cyan-500/50 shadow-inner'
                    : 'bg-slate-900 border-slate-800 grayscale'
                }`}
              >
                {mission.badge.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold truncate text-slate-200">
                    {mission.badge.title}
                  </h4>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {mission.badge.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}