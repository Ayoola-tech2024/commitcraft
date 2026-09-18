import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Trophy, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react'

interface BadgeModalProps {
  badge: {
    id: string
    title: string
    icon: string
    description: string
  } | null
  xpGained: number
  onClose: () => void
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ badge, xpGained, onClose }) => {
  useEffect(() => {
    if (!badge) return

    // Trigger full screen confetti fireworks
    const duration = 2.5 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, [badge])

  if (!badge) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/50 border-2 border-cyan-500/40 p-8 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Badge Icon with Halo */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-800/80 border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 mb-5">
          <span className="text-5xl select-none animate-bounce">{badge.icon}</span>
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-slate-950 font-bold shadow-md">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Header Text */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Achievement Unlocked!</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-2">
          {badge.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
          {badge.description}
        </p>

        {/* XP Reward Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>+{xpGained} XP Earned!</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Awesome! Continue Quest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}