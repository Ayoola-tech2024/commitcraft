export interface ConflictScenario {
  id: string
  title: string
  subtitle: string
  filename: string
  currentBranch: string
  incomingBranch: string
  rawConflictMarkers: string
  currentChange: {
    label: string
    code: string
    author: string
  }
  incomingChange: {
    label: string
    code: string
    author: string
  }
  resolutions: {
    acceptCurrent: {
      label: string
      code: string
      explanation: string
    }
    acceptIncoming: {
      label: string
      code: string
      explanation: string
    }
    acceptBoth: {
      label: string
      code: string
      explanation: string
    }
  }
  plainEnglishExplanation: string
}

export const CONFLICT_SCENARIOS: ConflictScenario[] = [
  {
    id: 'hero-title-clash',
    title: 'Hero Headline Clash',
    subtitle: 'Two teammates edited the main marketing headline on the same line in App.tsx.',
    filename: 'src/components/Hero.tsx',
    currentBranch: 'main',
    incomingBranch: 'feature/branding',
    rawConflictMarkers: `<<<<<<< HEAD
export const Title = () => <h1>Empowering Next-Gen Builders</h1>
=======
export const Title = () => <h1>The Visual Git Compass for Beginners</h1>
>>>>>>> feature/branding`,
    currentChange: {
      label: 'Current Change (HEAD: main)',
      code: 'export const Title = () => <h1>Empowering Next-Gen Builders</h1>',
      author: 'You (Lead Dev)',
    },
    incomingChange: {
      label: 'Incoming Change (feature/branding)',
      code: 'export const Title = () => <h1>The Visual Git Compass for Beginners</h1>',
      author: 'Teammate (Designer)',
    },
    resolutions: {
      acceptCurrent: {
        label: 'Accept Current (HEAD)',
        code: 'export const Title = () => <h1>Empowering Next-Gen Builders</h1>',
        explanation: 'Keeps the headline you committed on main, discarding your teammate\'s change.',
      },
      acceptIncoming: {
        label: 'Accept Incoming',
        code: 'export const Title = () => <h1>The Visual Git Compass for Beginners</h1>',
        explanation: 'Adopts the new headline proposed by the feature branch, overwriting main.',
      },
      acceptBoth: {
        label: 'Accept Both (Combined)',
        code: 'export const Title = () => (\n  <div>\n    <h1>The Visual Git Compass for Beginners</h1>\n    <h2>Empowering Next-Gen Builders</h2>\n  </div>\n)',
        explanation: 'Combines both ideas into a primary title and a secondary subtitle.',
      },
    },
    plainEnglishExplanation: 'Git stopped the merge because you changed line 14 on `main`, while your teammate changed the exact same line 14 on `feature/branding`. Git does not guess which text is better—it asks you to choose.',
  },
  {
    id: 'api-port-collision',
    title: 'Server Port Configuration',
    subtitle: 'One branch configured port 8080 while another configured port 3000 with environment variable fallback.',
    filename: 'src/config/server.ts',
    currentBranch: 'main',
    incomingBranch: 'feature/env-ports',
    rawConflictMarkers: `<<<<<<< HEAD
const PORT = 8080
=======
const PORT = process.env.PORT || 3000
>>>>>>> feature/env-ports`,
    currentChange: {
      label: 'Current Change (HEAD: main)',
      code: 'const PORT = 8080',
      author: 'You',
    },
    incomingChange: {
      label: 'Incoming Change (feature/env-ports)',
      code: 'const PORT = process.env.PORT || 3000',
      author: 'Backend Teammate',
    },
    resolutions: {
      acceptCurrent: {
        label: 'Accept Current (8080)',
        code: 'const PORT = 8080',
        explanation: 'Hardcodes port 8080 directly.',
      },
      acceptIncoming: {
        label: 'Accept Incoming (Flexible Env)',
        code: 'const PORT = process.env.PORT || 3000',
        explanation: 'Adopts dynamic environment variable port configuration with fallback.',
      },
      acceptBoth: {
        label: 'Accept Both (Env with 8080 default)',
        code: 'const PORT = process.env.PORT || 8080',
        explanation: 'Uses environment variable when available, defaulting to 8080.',
      },
    },
    plainEnglishExplanation: 'Both branches modified how the server selects its port. Choosing "Accept Both" gives you the best of both worlds.',
  },
]