import { useState, useEffect, useCallback } from 'react'
import { UserProgressState } from '../types/missions'

const STORAGE_KEY = 'commitcraft_progress_v1'

const DEFAULT_PROGRESS: UserProgressState = {
  xp: 100,
  level: 1,
  unlockedBadgeIds: [],
  completedMissionIds: [],
  completedStepIds: [],
  commandStreak: 1,
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_PROGRESS
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // ignore storage quota error
    }
  }, [progress])

  const calculateLevel = (currentXp: number) => {
    return Math.floor(currentXp / 150) + 1
  }

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount
      const newLevel = calculateLevel(newXp)
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        commandStreak: prev.commandStreak + 1,
      }
    })
  }, [])

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((prev) => {
      if (prev.unlockedBadgeIds.includes(badgeId)) return prev
      return {
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId],
      }
    })
  }, [])

  const completeStep = useCallback((stepId: string) => {
    setProgress((prev) => {
      if (prev.completedStepIds.includes(stepId)) return prev
      return {
        ...prev,
        completedStepIds: [...prev.completedStepIds, stepId],
      }
    })
  }, [])

  const completeMission = useCallback((missionId: string, badgeId?: string, rewardXp: number = 100) => {
    setProgress((prev) => {
      const isAlreadyDone = prev.completedMissionIds.includes(missionId)
      const newMissions = isAlreadyDone ? prev.completedMissionIds : [...prev.completedMissionIds, missionId]
      const newBadges = badgeId && !prev.unlockedBadgeIds.includes(badgeId)
        ? [...prev.unlockedBadgeIds, badgeId]
        : prev.unlockedBadgeIds
      const newXp = isAlreadyDone ? prev.xp : prev.xp + rewardXp

      return {
        ...prev,
        completedMissionIds: newMissions,
        unlockedBadgeIds: newBadges,
        xp: newXp,
        level: calculateLevel(newXp),
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return {
    progress,
    addXp,
    unlockBadge,
    completeStep,
    completeMission,
    resetProgress,
  }
}