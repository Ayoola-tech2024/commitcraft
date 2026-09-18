import { useState, useCallback } from 'react'
import { GitState, GitCommit, GitBranch, CommandResult } from '../types/git'
import { STARTER_TEMPLATE, FEATURE_BRANCH_TEMPLATE, MERGE_READY_TEMPLATE, getBranchColor } from '../data/gitTemplates'
import { parseGitCommandLine } from '../utils/gitCommandParser'

export function useGitEngine(initialState: GitState = STARTER_TEMPLATE) {
  const [gitState, setGitState] = useState<GitState>(initialState)
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string>('')

  // Generate next commit ID: c1, c2, c3...
  const getNextCommitId = useCallback((commits: Record<string, GitCommit>) => {
    const keys = Object.keys(commits)
    let maxNum = 0
    keys.forEach((key) => {
      const match = key.match(/^c(\d+)$/)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) maxNum = num
      }
    })
    return `c${maxNum + 1}`
  }, [])

  // 1. Initialize repo
  const init = useCallback(() => {
    setGitState({
      isInitialized: true,
      currentBranch: 'main',
      headCommitId: null,
      commits: {},
      branches: {
        'main': {
          name: 'main',
          commitId: '',
          color: getBranchColor(0),
          isProtected: true,
        },
      },
      stagedFiles: [],
      unstagedFiles: ['index.html', 'src/App.tsx', 'README.md'],
      history: ['Initialized empty Git repository in .git/'],
    })
    return {
      success: true,
      message: 'Initialized empty Git repository in .git/',
      suggestedNextCommand: 'git status',
    }
  }, [])

  // 2. Stage files
  const stage = useCallback((filePattern: string) => {
    setGitState((prev) => {
      if (!prev.isInitialized) return prev
      let newStaged: string[]
      let newUnstaged: string[]

      if (filePattern === '.' || filePattern === '-A' || filePattern === '*') {
        newStaged = Array.from(new Set([...prev.stagedFiles, ...prev.unstagedFiles]))
        newUnstaged = []
      } else {
        const toAdd = prev.unstagedFiles.filter((f) => f.includes(filePattern) || f === filePattern)
        newStaged = Array.from(new Set([...prev.stagedFiles, ...toAdd]))
        newUnstaged = prev.unstagedFiles.filter((f) => !toAdd.includes(f))
      }

      return {
        ...prev,
        stagedFiles: newStaged,
        unstagedFiles: newUnstaged,
        history: [...prev.history, `staged: ${newStaged.length} file(s)`],
      }
    })

    return {
      success: true,
      message: `Changes staged for commit.`,
      suggestedNextCommand: 'git commit -m "feat: your message"',
    }
  }, [])

  // 3. Commit staged changes
  const commit = useCallback((message: string, author: string = 'You') => {
    if (!message || message.trim() === '') {
      return {
        success: false,
        message: 'error: switch `m` requires a value (commit message cannot be empty)',
      }
    }

    let resultMsg = ''
    let newId = ''

    setGitState((prev) => {
      if (!prev.isInitialized) return prev
      newId = getNextCommitId(prev.commits)
      const parentIds = prev.headCommitId ? [prev.headCommitId] : []

      const newCommit: GitCommit = {
        id: newId,
        shortSha: newId,
        message: message.trim(),
        branch: prev.currentBranch,
        parentIds,
        timestamp: Date.now(),
        author,
      }

      const updatedCommits = {
        ...prev.commits,
        [newId]: newCommit,
      }

      const currentBranchObj = prev.branches[prev.currentBranch] || {
        name: prev.currentBranch,
        commitId: newId,
        color: getBranchColor(Object.keys(prev.branches).length),
      }

      const updatedBranches: Record<string, GitBranch> = {
        ...prev.branches,
        [prev.currentBranch]: {
          ...currentBranchObj,
          commitId: newId,
        },
      }

      resultMsg = `[${prev.currentBranch} ${newId}] ${message.trim()}`

      return {
        ...prev,
        commits: updatedCommits,
        branches: updatedBranches,
        headCommitId: newId,
        stagedFiles: [],
        history: [...prev.history, resultMsg],
      }
    })

    return {
      success: true,
      message: resultMsg || `Created commit ${newId}`,
      suggestedNextCommand: 'git branch',
    }
  }, [getNextCommitId])

  // 4. Create branch
  const createBranch = useCallback((branchName: string) => {
    const cleanName = branchName.trim()
    if (!cleanName) {
      return { success: false, message: 'fatal: branch name required' }
    }

    let resultMsg = ''
    let isOk = true

    setGitState((prev) => {
      if (!prev.isInitialized) {
        isOk = false
        resultMsg = 'fatal: not a git repository'
        return prev
      }
      if (prev.branches[cleanName]) {
        isOk = false
        resultMsg = `fatal: A branch named '${cleanName}' already exists.`
        return prev
      }
      if (!prev.headCommitId) {
        isOk = false
        resultMsg = 'fatal: not a valid object name: master (create a commit first)'
        return prev
      }

      const branchCount = Object.keys(prev.branches).length
      const newBranch: GitBranch = {
        name: cleanName,
        commitId: prev.headCommitId,
        color: getBranchColor(branchCount),
      }

      resultMsg = `Created branch '${cleanName}' at ${prev.headCommitId}`

      return {
        ...prev,
        branches: {
          ...prev.branches,
          [cleanName]: newBranch,
        },
        history: [...prev.history, resultMsg],
      }
    })

    return {
      success: isOk,
      message: resultMsg,
      suggestedNextCommand: `git checkout ${cleanName}`,
    }
  }, [])

  // 5. Checkout / Switch branch
  const checkout = useCallback((target: string, createNew: boolean = false) => {
    const cleanTarget = target.trim()
    if (!cleanTarget) {
      return { success: false, message: 'error: you must specify a branch to checkout' }
    }

    let resultMsg = ''
    let isOk = true

    setGitState((prev) => {
      if (!prev.isInitialized) {
        isOk = false
        resultMsg = 'fatal: not a git repository'
        return prev
      }

      // Handle checkout -b <name>
      if (createNew) {
        if (prev.branches[cleanTarget]) {
          isOk = false
          resultMsg = `fatal: A branch named '${cleanTarget}' already exists.`
          return prev
        }
        if (!prev.headCommitId) {
          isOk = false
          resultMsg = 'fatal: cannot create branch before initial commit'
          return prev
        }

        const newBranch: GitBranch = {
          name: cleanTarget,
          commitId: prev.headCommitId,
          color: getBranchColor(Object.keys(prev.branches).length),
        }

        resultMsg = `Switched to a new branch '${cleanTarget}'`

        return {
          ...prev,
          currentBranch: cleanTarget,
          branches: {
            ...prev.branches,
            [cleanTarget]: newBranch,
          },
          history: [...prev.history, resultMsg],
        }
      }

      // Switching to existing branch
      const branch = prev.branches[cleanTarget]
      if (branch) {
        resultMsg = `Switched to branch '${cleanTarget}'`
        return {
          ...prev,
          currentBranch: cleanTarget,
          headCommitId: branch.commitId,
          history: [...prev.history, resultMsg],
        }
      }

      // Checking out specific commit (detached HEAD)
      if (prev.commits[cleanTarget]) {
        resultMsg = `Note: switching to '${cleanTarget}' (detached HEAD)`
        return {
          ...prev,
          headCommitId: cleanTarget,
          history: [...prev.history, resultMsg],
        }
      }

      isOk = false
      resultMsg = `error: pathspec '${cleanTarget}' did not match any file(s) known to git`
      return prev
    })

    return {
      success: isOk,
      message: resultMsg,
      suggestedNextCommand: 'git status',
    }
  }, [])

  // 6. Merge another branch into current branch
  const merge = useCallback((sourceBranch: string, customMessage?: string) => {
    const cleanSource = sourceBranch.trim()
    let resultMsg = ''
    let isOk = true

    setGitState((prev) => {
      if (!prev.isInitialized) {
        isOk = false
        resultMsg = 'fatal: not a git repository'
        return prev
      }

      if (cleanSource === prev.currentBranch) {
        isOk = false
        resultMsg = `Already up to date. (Cannot merge ${cleanSource} into itself)`
        return prev
      }

      const sourceBranchObj = prev.branches[cleanSource]
      if (!sourceBranchObj) {
        isOk = false
        resultMsg = `merge: ${cleanSource} - not something we can merge`
        return prev
      }

      const currentBranchObj = prev.branches[prev.currentBranch]
      if (!currentBranchObj || !prev.headCommitId) {
        isOk = false
        resultMsg = 'fatal: No commits on current branch to merge with'
        return prev
      }

      const sourceCommitId = sourceBranchObj.commitId
      const currentCommitId = prev.headCommitId

      // If source commit is the same
      if (sourceCommitId === currentCommitId) {
        resultMsg = 'Already up to date.'
        return {
          ...prev,
          history: [...prev.history, resultMsg],
        }
      }

      // Create a 3-way Merge Commit linking both parents
      const mergeCommitId = getNextCommitId(prev.commits)
      const mergeMessage = customMessage || `Merge branch '${cleanSource}' into ${prev.currentBranch}`

      const newMergeCommit: GitCommit = {
        id: mergeCommitId,
        shortSha: mergeCommitId,
        message: mergeMessage,
        branch: prev.currentBranch,
        parentIds: [currentCommitId, sourceCommitId],
        timestamp: Date.now(),
        author: 'You',
        tags: ['merge'],
      }

      const updatedCommits = {
        ...prev.commits,
        [mergeCommitId]: newMergeCommit,
      }

      const updatedBranches = {
        ...prev.branches,
        [prev.currentBranch]: {
          ...currentBranchObj,
          commitId: mergeCommitId,
        },
      }

      resultMsg = `Merge made by the 'ort' strategy.\n [${prev.currentBranch} ${mergeCommitId}] ${mergeMessage}`

      return {
        ...prev,
        commits: updatedCommits,
        branches: updatedBranches,
        headCommitId: mergeCommitId,
        history: [...prev.history, resultMsg],
      }
    })

    return {
      success: isOk,
      message: resultMsg,
      suggestedNextCommand: 'git log --oneline --graph',
    }
  }, [getNextCommitId])

  // 7. Reset HEAD
  const reset = useCallback((target: string = 'HEAD~1') => {
    let resultMsg = ''
    let isOk = true

    setGitState((prev) => {
      if (!prev.isInitialized || !prev.headCommitId) {
        isOk = false
        resultMsg = 'fatal: not a git repository or no commits yet'
        return prev
      }

      const currentCommit = prev.commits[prev.headCommitId]
      if (!currentCommit || currentCommit.parentIds.length === 0) {
        isOk = false
        resultMsg = 'fatal: Cannot reset root commit'
        return prev
      }

      const parentId = currentCommit.parentIds[0]
      const currentBranchObj = prev.branches[prev.currentBranch]

      resultMsg = `HEAD is now at ${parentId} ${prev.commits[parentId]?.message || ''}`

      return {
        ...prev,
        headCommitId: parentId,
        branches: {
          ...prev.branches,
          [prev.currentBranch]: {
            ...currentBranchObj,
            commitId: parentId,
          },
        },
        history: [...prev.history, resultMsg],
      }
    })

    return {
      success: isOk,
      message: resultMsg,
    }
  }, [])

  // 8. Load Template
  const loadTemplate = useCallback((templateType: 'starter' | 'feature' | 'merge-ready') => {
    switch (templateType) {
      case 'starter':
        setGitState(STARTER_TEMPLATE)
        break
      case 'feature':
        setGitState(FEATURE_BRANCH_TEMPLATE)
        break
      case 'merge-ready':
        setGitState(MERGE_READY_TEMPLATE)
        break
    }
  }, [])

  // 9. Execute high-level command line input
  const executeCommand = useCallback((commandLine: string): CommandResult => {
    setLastExecutedCommand(commandLine)
    const parsed = parseGitCommandLine(commandLine)

    switch (parsed.action) {
      case 'init':
        return init()

      case 'status': {
        const branch = gitState.currentBranch
        const staged = gitState.stagedFiles
        const unstaged = gitState.unstagedFiles
        const lines = [
          `On branch ${branch}`,
          staged.length > 0 ? `Changes to be committed:\n  ${staged.map((f) => `(staged) ${f}`).join('\n  ')}` : 'No changes staged for commit.',
          unstaged.length > 0 ? `Untracked files:\n  ${unstaged.map((f) => `(untracked) ${f}`).join('\n  ')}` : 'nothing to commit, working tree clean',
        ]
        const msg = lines.join('\n')
        setGitState((p) => ({ ...p, history: [...p.history, `$ git status`, msg] }))
        return { success: true, message: msg, output: lines }
      }

      case 'add': {
        const file = parsed.args[0] || '.'
        return stage(file)
      }

      case 'commit': {
        const message = parsed.message || parsed.args.join(' ')
        if (!message) {
          return {
            success: false,
            message: 'error: switch `m` requires a value (use: git commit -m "your message")',
          }
        }
        return commit(message)
      }

      case 'branch': {
        if (parsed.args.length === 0) {
          const branchList = Object.keys(gitState.branches).map(
            (b) => `${b === gitState.currentBranch ? '* ' : '  '}${b}`
          )
          const msg = branchList.join('\n')
          setGitState((p) => ({ ...p, history: [...p.history, `$ git branch`, msg] }))
          return { success: true, message: msg, output: branchList }
        }
        return createBranch(parsed.args[0])
      }

      case 'checkout':
      case 'switch': {
        const isCreate = Boolean(parsed.flags['b'] || parsed.flags['c'])
        const target = (parsed.flags['b'] as string) || (parsed.flags['c'] as string) || parsed.args[0]
        if (!target) {
          return { success: false, message: 'error: you must specify a branch' }
        }
        return checkout(target, isCreate)
      }

      case 'merge': {
        if (parsed.args.length === 0) {
          return { success: false, message: 'fatal: No source branch specified to merge' }
        }
        return merge(parsed.args[0])
      }

      case 'reset': {
        return reset(parsed.args[0] || 'HEAD~1')
      }

      case 'log': {
        const commits = Object.values(gitState.commits).reverse()
        const logs = commits.map(
          (c) => `* [${c.shortSha}] (${c.branch}) ${c.message} - ${c.author}`
        )
        const msg = logs.length > 0 ? logs.join('\n') : 'No commits yet.'
        setGitState((p) => ({ ...p, history: [...p.history, `$ git log`, msg] }))
        return { success: true, message: msg, output: logs }
      }

      case 'clear': {
        setGitState((p) => ({ ...p, history: [] }))
        return { success: true, message: 'Terminal cleared.' }
      }

      case 'help': {
        const helpText = [
          'Available Git Sandbox Commands:',
          '  git init                     - Initialize repository',
          '  git status                   - Check repo & file status',
          '  git add .                    - Stage modified files',
          '  git commit -m "message"      - Record changes to the repository',
          '  git branch <name>            - Create a new branch',
          '  git checkout <name>          - Switch to branch',
          '  git checkout -b <name>       - Create and switch to new branch',
          '  git merge <branch>           - Merge branch into current branch',
          '  git reset --hard HEAD~1      - Move back 1 commit',
          '  git log                      - View commit history',
          '  clear                        - Clear terminal history',
        ].join('\n')
        setGitState((p) => ({ ...p, history: [...p.history, helpText] }))
        return { success: true, message: helpText }
      }

      default: {
        const errorMsg = `git: '${commandLine}' is not a recognized git command. Type 'git help' for instructions.`
        setGitState((p) => ({ ...p, history: [...p.history, errorMsg] }))
        return { success: false, message: errorMsg }
      }
    }
  }, [gitState, init, stage, commit, createBranch, checkout, merge, reset])

  return {
    gitState,
    setGitState,
    lastExecutedCommand,
    init,
    stage,
    commit,
    createBranch,
    checkout,
    merge,
    reset,
    loadTemplate,
    executeCommand,
  }
}