import React from 'react'
import { GitBranch, Sparkles, Trophy, Flame, ExternalLink, HelpCircle } from 'lucide-react'

interface HeaderProps {
  xp: number
  streak: number
  unlockedBadgesCount: number
  totalBadgesCount: number
  onOpenHelp?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  xp,
  streak,
  unlockedBadgesCount,
  totalBadgesCount,
  onOpenHelp,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white font-bold ring-1 ring-white/20">
            <GitBranch className="w-5 h-5" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                CommitCraft
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 tracking-wide uppercase">
                FirstCommit Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden md:block">
              Interactive Visual Git & Error Rescue for Beginners
            </p>
          </div>
        </div>

        {/* Gamified Stats / Badges */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{xp} XP</span>
          </div>

          {/* Badges Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-inner">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>{unlockedBadgesCount}/{totalBadgesCount} Badges</span>
          </div>

          {/* Streak */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{streak} Streak</span>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>

          {/* Submission Link */}
          <a
            href="https://firstcommit.devpost.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all"
            title="FirstCommit Hackathon"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Devpost Event</span>
          </a>

          {onOpenHelp && (
            <button
              onClick={onOpenHelp}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Help & Shortcuts"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
