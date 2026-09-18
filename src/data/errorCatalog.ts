import { ErrorDiagnostic, ErrorCategory } from '../types/errors'

export const ERROR_CATALOG: ErrorDiagnostic[] = [
  {
    id: 'git-unrelated-histories',
    category: 'git',
    title: 'Refusing to Merge Unrelated Histories',
    signatureRegex: 'refusing to merge unrelated histories|fatal:\\s+refusing to merge',
    rawExample: 'fatal: refusing to merge unrelated histories',
    plainEnglishSummary: 'Git refuses to combine your local project with the GitHub repo because they started from completely separate root commits (often happens when you check "Add a README" when creating a new repo on GitHub).',
    rootCause: 'Git tracks history as a tree of commits. If your local folder and your remote GitHub repo do not share a common ancestor commit, Git protects you by blocking the merge by default.',
    fixCommand: 'git pull origin main --allow-unrelated-histories',
    fixExplanation: 'This command tells Git: "I know these two repositories started separately, please stitch their commit trees together anyway."',
    preventativeTip: 'When creating a new repository on GitHub, either leave it empty or clone it first before adding your local files.',
    badgeLabel: 'Git Merge',
    badgeColor: '#06b6d4',
  },
  {
    id: 'git-non-fast-forward',
    category: 'git',
    title: 'Push Rejected: Non-Fast-Forward',
    signatureRegex: 'failed to push some refs|Updates were rejected because the remote contains work|non-fast-forward',
    rawExample: 'error: failed to push some refs to \'https://github.com/user/repo.git\'\nhint: Updates were rejected because the remote contains work that you do not have locally.',
    plainEnglishSummary: 'GitHub has commits or changes that you do not have on your computer yet. Git will not let you push because you would overwrite your teammate\'s work.',
    rootCause: 'Your remote branch is ahead of your local branch. Git requires your local branch to incorporate remote changes before accepting your new commits.',
    fixCommand: 'git pull --rebase origin main && git push origin main',
    fixExplanation: 'Pulls the newest changes from GitHub, replays your local commits on top of them cleanly, and then pushes to GitHub.',
    preventativeTip: 'Always run `git pull` before starting new work on a shared branch.',
    badgeLabel: 'Git Push',
    badgeColor: '#06b6d4',
  },
  {
    id: 'git-remote-already-exists',
    category: 'git',
    title: 'Remote Origin Already Exists',
    signatureRegex: 'remote origin already exists|fatal:\\s+remote origin',
    rawExample: 'fatal: remote origin already exists.',
    plainEnglishSummary: 'You are trying to link your project to GitHub using `git remote add origin ...`, but your project is already connected to an existing remote address.',
    rootCause: 'The nickname "origin" has already been assigned in your `.git/config` file.',
    fixCommand: 'git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git',
    fixExplanation: 'Replaces the existing URL of "origin" with your new repository link instead of trying to add a duplicate nickname.',
    preventativeTip: 'Use `git remote -v` to inspect your current remote connections anytime.',
    badgeLabel: 'Git Remote',
    badgeColor: '#06b6d4',
  },
  {
    id: 'git-not-a-repo',
    category: 'git',
    title: 'Not a Git Repository',
    signatureRegex: 'not a git repository|fatal:\\s+not a git repository',
    rawExample: 'fatal: not a git repository (or any of the parent directories): .git',
    plainEnglishSummary: 'You are typing Git commands inside a regular folder that has not been initialized with Git yet, or you are in the wrong directory.',
    rootCause: 'Git looks for a hidden `.git` metadata folder in your current directory and its parent folders. None was found.',
    fixCommand: 'git init',
    fixExplanation: 'Creates the hidden `.git` folder in your current directory, enabling full Git version control tracking.',
    preventativeTip: 'Check your current terminal path using `pwd` (Mac/Linux) or `cd` (Windows) to make sure you are in your project folder.',
    badgeLabel: 'Git Setup',
    badgeColor: '#06b6d4',
  },
  {
    id: 'git-local-changes-overwritten',
    category: 'git',
    title: 'Local Changes Would Be Overwritten',
    signatureRegex: 'Your local changes to the following files would be overwritten by|error:\\s+Your local changes',
    rawExample: 'error: Your local changes to the following files would be overwritten by merge:\n  src/App.tsx\nPlease commit your changes or stash them before you merge.',
    plainEnglishSummary: 'You edited files that also changed on the remote branch. Git refuses to pull because doing so would erase your uncommitted work.',
    rootCause: 'Uncommitted file modifications collide directly with incoming commits.',
    fixCommand: 'git stash && git pull && git stash pop',
    fixExplanation: 'Temporarily saves your uncommitted changes into a safe shelf ("stash"), pulls the latest updates, and reapplies your changes on top.',
    preventativeTip: 'Commit or stash your working files before switching branches or pulling updates.',
    badgeLabel: 'Git Stash',
    badgeColor: '#06b6d4',
  },
  {
    id: 'git-detached-head',
    category: 'git',
    title: 'You Are in "Detached HEAD" State',
    signatureRegex: 'detached HEAD|HEAD is now at|You are in \'detached HEAD\' state',
    rawExample: 'Note: switching to \'a4b2c1d\'.\nYou are in \'detached HEAD\' state. You can look around, make experimental changes and commit them...',
    plainEnglishSummary: 'Your project pointer (`HEAD`) is looking directly at an old snapshot commit instead of resting on an active branch like `main`. New commits made here won\'t belong to any branch.',
    rootCause: 'You ran `git checkout <commit-sha>` instead of `git checkout <branch-name>`.',
    fixCommand: 'git checkout main',
    fixExplanation: 'Attaches your `HEAD` pointer back to your primary `main` branch safely.',
    preventativeTip: 'Use `git switch <branch-name>` instead of `checkout` to avoid accidentally detaching HEAD.',
    badgeLabel: 'Git HEAD',
    badgeColor: '#06b6d4',
  },
  {
    id: 'node-eaddrinuse',
    category: 'node',
    title: 'Port Already In Use (EADDRINUSE)',
    signatureRegex: 'EADDRINUSE|address already in use|listen EADDRINUSE :::',
    rawExample: 'Error: listen EADDRINUSE: address already in use :::3000\n    at Server.setupListenHandle [as _listen2] (node:net:1485:16)',
    plainEnglishSummary: 'Another background terminal, server, or browser tab is already running on port 3000, so your new server cannot start.',
    rootCause: 'TCP network ports can only be bound by one process at a time on your machine.',
    fixCommand: 'npx kill-port 3000',
    fixCodeSnippet: '# Windows PowerShell alternative:\n# Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force',
    fixExplanation: 'Instantly identifies and terminates the orphan background process occupying port 3000 so your server can start.',
    preventativeTip: 'Always shut down servers using `Ctrl + C` in the terminal before closing your editor.',
    badgeLabel: 'Node.js',
    badgeColor: '#10b981',
  },
  {
    id: 'npm-enoent',
    category: 'npm',
    title: 'File or Directory Not Found (ENOENT)',
    signatureRegex: 'npm ERR! code ENOENT|ENOENT: no such file or directory|npm ERR! path.*package.json',
    rawExample: 'npm ERR! code ENOENT\nnpm ERR! syscall open\nnpm ERR! path C:\\project\\package.json\nnpm ERR! errno -4058\nnpm ERR! enoent ENOENT: no such file or directory, open \'package.json\'',
    plainEnglishSummary: 'NPM is looking for `package.json` to install dependencies, but cannot find it in your current terminal folder.',
    rootCause: 'You ran `npm install` or `npm run dev` outside your actual project directory (e.g., in `C:\\` or your Desktop instead of the project folder).',
    fixCommand: 'cd your-project-folder && npm install',
    fixExplanation: 'Navigates into your project subfolder where `package.json` actually lives before running npm commands.',
    preventativeTip: 'Type `ls` or `dir` in your terminal to confirm `package.json` is visible in your directory.',
    badgeLabel: 'NPM',
    badgeColor: '#f59e0b',
  },
  {
    id: 'npm-eresolve',
    category: 'npm',
    title: 'Unable to Resolve Dependency Tree (ERESOLVE)',
    signatureRegex: 'npm ERR! code ERESOLVE|ERESOLVE unable to resolve dependency tree|Conflicting peer dependency',
    rawExample: 'npm ERR! code ERESOLVE\nnpm ERR! ERESOLVE unable to resolve dependency tree\nnpm ERR! Found: react@18.3.1\nnpm ERR! Could not resolve dependency: peer react@"^17.0.0" from some-package',
    plainEnglishSummary: 'Two different packages in your project are requesting incompatible versions of React or another shared library.',
    rootCause: 'Strict peer dependency checks introduced in modern NPM versions block installs when minor version mismatches occur.',
    fixCommand: 'npm install --legacy-peer-deps',
    fixExplanation: 'Bypasses rigid peer dependency conflict checks and installs compatible packages as older NPM versions did.',
    preventativeTip: 'Check package documentation to ensure plugins support your current major React/Node version.',
    badgeLabel: 'NPM Deps',
    badgeColor: '#f59e0b',
  },
  {
    id: 'js-typeerror-undefined',
    category: 'javascript',
    title: 'Cannot Read Properties of Undefined',
    signatureRegex: 'Cannot read properties of undefined|Cannot read property .* of undefined|TypeError: .* is undefined',
    rawExample: 'TypeError: Cannot read properties of undefined (reading \'map\')\n    at UserList (UserList.tsx:14:18)',
    plainEnglishSummary: 'Your code is trying to access a property or call `.map()` on a variable that has not loaded yet and is currently `undefined` (common during async data fetches).',
    rootCause: 'React rendered the UI component before your API response or async state finished downloading.',
    fixCommand: 'users?.map((user) => ...)',
    fixCodeSnippet: '// Use optional chaining (?.) and default fallback:\nconst list = data?.users || []\nreturn list.map((item) => <div key={item.id}>{item.name}</div>)',
    fixExplanation: 'Adding optional chaining `?.` or a default fallback `|| []` prevents JavaScript from crashing while data is still loading.',
    preventativeTip: 'Always initialize state with a safe default matching its data type (e.g. `useState<User[]>([])`).',
    badgeLabel: 'JavaScript',
    badgeColor: '#ec4899',
  },
  {
    id: 'js-reference-error',
    category: 'javascript',
    title: 'ReferenceError: Variable Is Not Defined',
    signatureRegex: 'ReferenceError: .* is not defined|is not defined at',
    rawExample: 'Uncaught ReferenceError: count is not defined\n    at handleClick (App.tsx:22:9)',
    plainEnglishSummary: 'Your code tried to use a variable or function name that was never created, was misspelled, or is outside the current function scope.',
    rootCause: 'Missing variable declaration (`const`, `let`) or missing `import` statement at the top of the file.',
    fixCommand: 'import { count } from \'./your-module\'',
    fixCodeSnippet: '// Check spelling or declare with const/let:\nconst [count, setCount] = useState(0)',
    fixExplanation: 'Ensure the variable is either declared in scope or properly imported from its source module.',
    preventativeTip: 'Use TypeScript or ESLint to catch undefined variable references before running your code.',
    badgeLabel: 'JavaScript',
    badgeColor: '#ec4899',
  },
  {
    id: 'react-unexpected-token',
    category: 'react',
    title: 'SyntaxError: Unexpected Token \'<\'',
    signatureRegex: 'SyntaxError: Unexpected token \'<\'|Unexpected token < in JSON at position 0',
    rawExample: 'Uncaught (in promise) SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON',
    plainEnglishSummary: 'Your app called `fetch(\'/api/users\')` expecting JSON data, but received an HTML webpage (usually a 404 Not Found error page from your server).',
    rootCause: 'Calling `.json()` on a response that returned an HTML error page because the API URL route was incorrect.',
    fixCommand: 'const res = await fetch(\'/api/users\'); if (!res.ok) throw new Error(res.statusText)',
    fixExplanation: 'Always check `res.ok` before parsing `.json()` to catch 404 or 500 HTML responses gracefully.',
    preventativeTip: 'Verify your API backend routes and proxy settings in `vite.config.ts`.',
    badgeLabel: 'React / API',
    badgeColor: '#a855f7',
  },
  {
    id: 'network-cors-blocked',
    category: 'network',
    title: 'Blocked by CORS Policy',
    signatureRegex: 'blocked by CORS policy|No \'Access-Control-Allow-Origin\' header|Cross-Origin Request Blocked',
    rawExample: 'Access to fetch at \'http://localhost:5000/api\' from origin \'http://localhost:3000\' has been blocked by CORS policy: No \'Access-Control-Allow-Origin\' header is present on the requested resource.',
    plainEnglishSummary: 'Your web browser\'s security system blocked your frontend from talking to your backend server because the backend didn\'t explicitly give permission.',
    rootCause: 'Cross-Origin Resource Sharing (CORS) security protocol blocks cross-port or cross-domain browser requests by default unless allowed by the server.',
    fixCommand: 'npm install cors',
    fixCodeSnippet: '// In your Express Node.js backend (server.js):\nimport cors from \'cors\'\napp.use(cors({ origin: \'http://localhost:3000\' }))',
    fixExplanation: 'Enables CORS middleware on your backend server to grant your frontend permission to request data.',
    preventativeTip: 'In development, configure a Vite or Next.js proxy to forward API requests without triggering browser CORS.',
    badgeLabel: 'Network',
    badgeColor: '#3b82f6',
  },
  {
    id: 'git-pathspec-not-matched',
    category: 'git',
    title: 'Pathspec Did Not Match Any File(s)',
    signatureRegex: 'pathspec .* did not match any file|error:\\s+pathspec',
    rawExample: 'error: pathspec \'feature-login\' did not match any file(s) known to git',
    plainEnglishSummary: 'You tried to checkout a branch name that does not exist yet on your computer.',
    rootCause: 'Typo in the branch name or forgetting the `-b` flag when trying to create a brand new branch.',
    fixCommand: 'git checkout -b feature-login',
    fixExplanation: 'The `-b` flag tells Git: "Create this branch if it doesn\'t exist, and switch to it immediately."',
    preventativeTip: 'Run `git branch -a` to view all available local and remote branches.',
    badgeLabel: 'Git Branch',
    badgeColor: '#06b6d4',
  },
  {
    id: 'react-hydration-failed',
    category: 'react',
    title: 'React Hydration Mismatch Error',
    signatureRegex: 'Hydration failed because the initial UI does not match|Text content does not match server-rendered HTML',
    rawExample: 'Error: Hydration failed because the initial UI does not match what was rendered on the server. Expected server HTML to contain a matching <div> in <p>.',
    plainEnglishSummary: 'The HTML generated on your server (e.g. Next.js) did not match the HTML rendered in the client\'s browser upon loading.',
    rootCause: 'Using browser-only APIs (`window`, `localStorage`, `new Date()`) or invalid HTML nesting (like `<p><div>...</div></p>`) during initial render.',
    fixCommand: 'useEffect(() => { setIsClient(true) }, [])',
    fixCodeSnippet: '// Ensure browser-only code runs after mount:\nconst [isClient, setIsClient] = useState(false)\nuseEffect(() => setIsClient(true), [])\nif (!isClient) return null',
    fixExplanation: 'Delays accessing `window` or client-only timestamps until after React has mounted in the browser.',
    preventativeTip: 'Never place block-level tags like `<div>` inside inline paragraph `<p>` tags.',
    badgeLabel: 'React / SSR',
    badgeColor: '#a855f7',
  },
  {
    id: 'git-merge-conflict-marker',
    category: 'git',
    title: 'Automatic Merge Failed (Fix Conflicts)',
    signatureRegex: 'Automatic merge failed; fix conflicts and then commit the result|CONFLICT \\(content\\)',
    rawExample: 'Auto-merging src/App.tsx\nCONFLICT (content): Merge conflict in src/App.tsx\nAutomatic merge failed; fix conflicts and then commit the result.',
    plainEnglishSummary: 'Two people edited the exact same line of code in different branches. Git doesn\'t know which version you want to keep, so it paused and marked the file with `<<<<<<< HEAD` conflict markers.',
    rootCause: 'Divergent branch history with conflicting line changes on the same file.',
    fixCommand: 'git status',
    fixExplanation: 'Open the conflicted file in VS Code, choose "Accept Current Change" or "Accept Incoming Change", delete the marker lines, and run `git commit`.',
    preventativeTip: 'Communicate with your team when working on shared critical files like `routes` or `App.tsx`.',
    badgeLabel: 'Git Conflict',
    badgeColor: '#06b6d4',
  },
]

export function searchErrorDiagnostics(
  query: string,
  category: ErrorCategory | 'all' = 'all'
): ErrorDiagnostic[] {
  const cleanQuery = query.trim().toLowerCase()

  return ERROR_CATALOG.filter((item) => {
    // Category check
    if (category !== 'all' && item.category !== category) {
      return false
    }

    if (!cleanQuery) return true

    // Signature regex test
    try {
      const regex = new RegExp(item.signatureRegex, 'i')
      if (regex.test(cleanQuery) || regex.test(query)) return true
    } catch {
      // ignore regex parse errors on user input
    }

    // Text search on title, summary, rawExample, rootCause
    return (
      item.title.toLowerCase().includes(cleanQuery) ||
      item.plainEnglishSummary.toLowerCase().includes(cleanQuery) ||
      item.rawExample.toLowerCase().includes(cleanQuery) ||
      item.rootCause.toLowerCase().includes(cleanQuery) ||
      item.fixCommand.toLowerCase().includes(cleanQuery) ||
      item.badgeLabel.toLowerCase().includes(cleanQuery)
    )
  })
}