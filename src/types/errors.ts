export type ErrorCategory = 'git' | 'npm' | 'node' | 'javascript' | 'react' | 'network'

export interface ErrorDiagnostic {
  id: string
  category: ErrorCategory
  title: string
  signatureRegex: string
  rawExample: string
  plainEnglishSummary: string
  rootCause: string
  fixCommand: string
  fixCodeSnippet?: string
  fixExplanation: string
  preventativeTip: string
  badgeLabel: string
  badgeColor: string
}

export interface SearchFilterState {
  query: string
  selectedCategory: ErrorCategory | 'all'
}
