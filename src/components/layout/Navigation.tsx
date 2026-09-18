import React from 'react'
import { GitGraph as GitGraphIcon, AlertCircle, Compass, GitMerge } from 'lucide-react'

export type TabType = 'git-sandbox' | 'error-decoder' | 'guided-missions' | 'conflict-lab'

interface NavigationProps {
  activeTab: TabType
  onSelectTab: (tab: TabType) => void
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'git-sandbox' as TabType,
      label: 'Visual Git Sandbox',
      description: 'Animated Branch & Commit Tree',
      icon: GitGraphIcon,
      badge: 'Interactive',
    },
    {
      id: 'error-decoder' as TabType,
      label: 'Error Decoder',
      description: '16+ Plain-English Fixes',
      icon: AlertCircle,
      badge: 'Emergency Rescue',
    },
    {
      id: 'guided-missions' as TabType,
      label: 'Guided Missions',
      description: 'Earn Badges & XP',
      icon: Compass,
      badge: '3 Quests',
    },
    {
      id: 'conflict-lab' as TabType,
      label: 'Merge Conflict Lab',
      description: 'Hands-on 3-Way Resolver',
      icon: GitMerge,
      badge: 'Visual Solver',
    },
  ]

  return (
    <nav className="max-w-7xl mx-auto px-4 lg:px-8 pt-4 pb-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-gradient-to-r from-slate-800 to-slate-800/80 text-white shadow-lg border border-cyan-500/30 ring-1 ring-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold truncate block">
                    {tab.label}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 truncate hidden sm:block">
                  {tab.description}
                </span>
              </div>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
