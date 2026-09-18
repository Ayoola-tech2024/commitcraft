export interface GitCommit {
  id: string
  shortSha: string
  message: string
  branch: string
  parentIds: string[]
  timestamp: number
  author: string
  tags?: string[]
}

export interface GitBranch {
  name: string
  commitId: string
  color: string
  isProtected?: boolean
}

export interface GitGraphNode {
  commit: GitCommit
  x: number
  y: number
  branchIndex: number
  color: string
}

export interface GitGraphLink {
  source: GitGraphNode
  target: GitGraphNode
  isMerge: boolean
  path: string
}

export interface GitState {
  isInitialized: boolean
  currentBranch: string
  headCommitId: string | null
  commits: Record<string, GitCommit>
  branches: Record<string, GitBranch>
  stagedFiles: string[]
  unstagedFiles: string[]
  history: string[] // terminal command history log
}

export interface CommandResult {
  success: boolean
  message: string
  output?: string[]
  suggestedNextCommand?: string
}
