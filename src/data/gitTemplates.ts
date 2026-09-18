import { GitCommit, GitBranch, GitState } from '../types/git'

export const BRANCH_COLORS = [
  '#06b6d4', // cyan (main/master)
  '#10b981', // emerald
  '#a855f7', // purple
  '#f59e0b', // amber
  '#ec4899', // pink
  '#3b82f6', // blue
]

export function getBranchColor(branchIndex: number): string {
  return BRANCH_COLORS[branchIndex % BRANCH_COLORS.length]
}

export const STARTER_TEMPLATE: GitState = {
  isInitialized: true,
  currentBranch: 'main',
  headCommitId: 'c2',
  commits: {
    'c1': {
      id: 'c1',
      shortSha: 'c1',
      message: 'chore: initial project setup',
      branch: 'main',
      parentIds: [],
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      author: 'Beginner Dev',
    },
    'c2': {
      id: 'c2',
      shortSha: 'c2',
      message: 'feat: add home landing layout',
      branch: 'main',
      parentIds: ['c1'],
      timestamp: Date.now() - 1000 * 60 * 30,
      author: 'Beginner Dev',
    },
  },
  branches: {
    'main': {
      name: 'main',
      commitId: 'c2',
      color: '#06b6d4',
      isProtected: true,
    },
  },
  stagedFiles: [],
  unstagedFiles: ['src/App.tsx', 'README.md'],
  history: [
    'Initialized empty Git repository in commitcraft/.git/',
    '[main (root-commit) c1] chore: initial project setup',
    '[main c2] feat: add home landing layout',
  ],
}

export const FEATURE_BRANCH_TEMPLATE: GitState = {
  isInitialized: true,
  currentBranch: 'feature/auth',
  headCommitId: 'c4',
  commits: {
    'c1': {
      id: 'c1',
      shortSha: 'c1',
      message: 'chore: initial setup',
      branch: 'main',
      parentIds: [],
      timestamp: Date.now() - 1000 * 60 * 120,
      author: 'Beginner Dev',
    },
    'c2': {
      id: 'c2',
      shortSha: 'c2',
      message: 'feat: add homepage',
      branch: 'main',
      parentIds: ['c1'],
      timestamp: Date.now() - 1000 * 60 * 90,
      author: 'Beginner Dev',
    },
    'c3': {
      id: 'c3',
      shortSha: 'c3',
      message: 'feat: add login modal component',
      branch: 'feature/auth',
      parentIds: ['c2'],
      timestamp: Date.now() - 1000 * 60 * 45,
      author: 'Beginner Dev',
    },
    'c4': {
      id: 'c4',
      shortSha: 'c4',
      message: 'feat: integrate auth tokens',
      branch: 'feature/auth',
      parentIds: ['c3'],
      timestamp: Date.now() - 1000 * 60 * 10,
      author: 'Beginner Dev',
    },
  },
  branches: {
    'main': {
      name: 'main',
      commitId: 'c2',
      color: '#06b6d4',
      isProtected: true,
    },
    'feature/auth': {
      name: 'feature/auth',
      commitId: 'c4',
      color: '#10b981',
    },
  },
  stagedFiles: [],
  unstagedFiles: [],
  history: [
    'Switched to a new branch "feature/auth"',
    '[feature/auth c3] feat: add login modal component',
    '[feature/auth c4] feat: integrate auth tokens',
  ],
}

export const MERGE_READY_TEMPLATE: GitState = {
  isInitialized: true,
  currentBranch: 'main',
  headCommitId: 'c5',
  commits: {
    'c1': {
      id: 'c1',
      shortSha: 'c1',
      message: 'chore: root init',
      branch: 'main',
      parentIds: [],
      timestamp: Date.now() - 1000 * 60 * 150,
      author: 'Beginner Dev',
    },
    'c2': {
      id: 'c2',
      shortSha: 'c2',
      message: 'feat: header & navigation',
      branch: 'main',
      parentIds: ['c1'],
      timestamp: Date.now() - 1000 * 60 * 120,
      author: 'Beginner Dev',
    },
    'c3': {
      id: 'c3',
      shortSha: 'c3',
      message: 'feat: user profile card',
      branch: 'feature/profile',
      parentIds: ['c2'],
      timestamp: Date.now() - 1000 * 60 * 60,
      author: 'Teammate',
    },
    'c4': {
      id: 'c4',
      shortSha: 'c4',
      message: 'feat: avatar upload support',
      branch: 'feature/profile',
      parentIds: ['c3'],
      timestamp: Date.now() - 1000 * 60 * 30,
      author: 'Teammate',
    },
    'c5': {
      id: 'c5',
      shortSha: 'c5',
      message: 'fix: update api endpoints',
      branch: 'main',
      parentIds: ['c2'],
      timestamp: Date.now() - 1000 * 60 * 15,
      author: 'Beginner Dev',
    },
  },
  branches: {
    'main': {
      name: 'main',
      commitId: 'c5',
      color: '#06b6d4',
      isProtected: true,
    },
    'feature/profile': {
      name: 'feature/profile',
      commitId: 'c4',
      color: '#a855f7',
    },
  },
  stagedFiles: [],
  unstagedFiles: [],
  history: [
    '[main c5] fix: update api endpoints',
    'Ready to merge "feature/profile" into "main"!',
  ],
}