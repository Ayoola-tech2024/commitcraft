export interface ParsedGitCommand {
  raw: string
  action: 'init' | 'status' | 'add' | 'commit' | 'branch' | 'checkout' | 'switch' | 'merge' | 'log' | 'reset' | 'clear' | 'help' | 'unknown'
  args: string[]
  flags: Record<string, string | boolean>
  message?: string
}

export function parseGitCommandLine(input: string): ParsedGitCommand {
  const trimmed = input.trim()
  if (!trimmed) {
    return { raw: input, action: 'unknown', args: [], flags: {} }
  }

  if (trimmed === 'clear') {
    return { raw: input, action: 'clear', args: [], flags: {} }
  }

  // Handle standard "git <command> ..." or bare command
  const tokens: string[] = []
  let currentToken = ''
  let inQuotes = false
  let quoteChar = ''

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i]
    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true
      quoteChar = char
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false
      quoteChar = ''
    } else if (char === ' ' && !inQuotes) {
      if (currentToken.length > 0) {
        tokens.push(currentToken)
        currentToken = ''
      }
    } else {
      currentToken += char
    }
  }
  if (currentToken.length > 0) {
    tokens.push(currentToken)
  }

  if (tokens.length === 0) {
    return { raw: input, action: 'unknown', args: [], flags: {} }
  }

  let cmdIndex = 0
  if (tokens[0].toLowerCase() === 'git') {
    cmdIndex = 1
  }

  if (cmdIndex >= tokens.length) {
    return { raw: input, action: 'help', args: [], flags: {} }
  }

  const subCommand = tokens[cmdIndex].toLowerCase()
  const rawArgs = tokens.slice(cmdIndex + 1)
  const flags: Record<string, string | boolean> = {}
  const positionalArgs: string[] = []
  let commitMessage: string | undefined

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i]
    if (arg === '-m' || arg === '--message') {
      if (i + 1 < rawArgs.length) {
        commitMessage = rawArgs[i + 1]
        flags['m'] = commitMessage
        i++
      }
    } else if (arg === '-b') {
      if (i + 1 < rawArgs.length) {
        flags['b'] = rawArgs[i + 1]
        i++
      }
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2)
      flags[key] = true
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1)
      flags[key] = true
    } else {
      positionalArgs.push(arg)
    }
  }

  let action: ParsedGitCommand['action'] = 'unknown'
  switch (subCommand) {
    case 'init':
      action = 'init'
      break
    case 'status':
      action = 'status'
      break
    case 'add':
      action = 'add'
      break
    case 'commit':
      action = 'commit'
      break
    case 'branch':
      action = 'branch'
      break
    case 'checkout':
      action = 'checkout'
      break
    case 'switch':
      action = 'switch'
      break
    case 'merge':
      action = 'merge'
      break
    case 'log':
      action = 'log'
      break
    case 'reset':
      action = 'reset'
      break
    case 'help':
      action = 'help'
      break
    default:
      action = 'unknown'
  }

  return {
    raw: input,
    action,
    args: positionalArgs,
    flags,
    message: commitMessage,
  }
}