export interface MissionStep {
  id: string
  title: string
  description: string
  expectedCommandPattern: string
  hint: string
  whyItMatters: string
  isCompleted: boolean
}

export interface Mission {
  id: string
  number: number
  title: string
  subtitle: string
  difficulty: 'Beginner' | 'Intermediate' | 'Essential'
  estimatedMinutes: number
  xpReward: number
  badge: {
    id: string
    title: string
    icon: string
    description: string
  }
  steps: MissionStep[]
  starterTemplate?: string
}

export interface UserProgressState {
  xp: number
  level: number
  unlockedBadgeIds: string[]
  completedMissionIds: string[]
  completedStepIds: string[]
  commandStreak: number
}
