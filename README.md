<div align="center">

# 🌿 CommitCraft

### *See Git. Understand Git. Never Panic.*

**The Interactive Visual Git Sandbox, 16-Error Emergency Rescue Matrix & Guided Quest Platform for Beginner Developers.**

[![FirstCommit Hackathon](https://img.shields.io/badge/Devpost-FirstCommit_Hackathon-00e5ff?style=for-the-badge&logo=devpost)](https://firstcommit.devpost.com/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[🚀 Live Interactive Demo](https://commitcraft.vercel.app/) • [🎬 3-Minute Video Script](#-3-minute-video-demo-script) • [📖 AI Disclosure](#-ai-usage-disclosure)

---

</div>

## 💡 The Problem: Why We Built CommitCraft

Every beginner developer faces the exact same terrifying wall when starting out: **Terminal Panic & Git Confusion**.

- **Invisible State**: In standard terminals, Git is a black box. Beginners type `git commit`, `git checkout`, or `git merge` without visualizing what is actually happening to their branch pointers.
- **Cryptic Error Messages**: When something goes wrong at 2 AM, the terminal throws a wall of red text (`fatal: refusing to merge unrelated histories`, `npm ERR! code EADDRINUSE :::3000`, `Cannot read properties of undefined`). Beginners panic, delete their folder, or give up.
- **Merge Conflict Dread**: Merge conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) feel like broken code rather than simple decision points.

**CommitCraft** solves this completely by turning abstract version control concepts into an **animated, tactile visual playground** and an **instant plain-English emergency rescue toolkit**.

---

## ✨ Core Features

```
                                  ┌───────────────────────────────┐
                                  │      CommitCraft Web App      │
                                  └───────────────┬───────────────┘
                                                  │
                 ┌────────────────────────────────┼────────────────────────────────┐
                 ▼                                ▼                                ▼
  ┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐
  │   Visual Git Playground     │  │   Terminal Error Decoder    │  │   Guided Beginner Missions  │
  │ ─────────────────────────── │  │ ─────────────────────────── │  │ ─────────────────────────── │
  │ • State Machine Engine      │  │ • 16 Curated Error Patterns │  │ • Mission 1: First Commit   │
  │ • Animated SVG Graph (DAG)  │  │ • Plain-English Translater  │  │ • Mission 2: Branching Out  │
  │ • Interactive CLI + Pills   │  │ • Root Cause & 1-Click Fix  │  │ • Mission 3: The Safe Merge │
  │ • Conflict Resolution Lab   │  │ • Instant Search & Filter   │  │ • Badges + LocalStorage     │
  └─────────────────────────────┘  └─────────────────────────────┘  └─────────────────────────────┘
```

### 1. 🌿 Interactive Visual Git DAG Canvas
- **Dynamic Topological Layout**: Computes node coordinates across horizontal branch lanes with smooth cubic bezier curves (`M x1 y1 C ... x2 y2`).
- **Reactive State Machine Engine**: Full simulation of `git init`, `git add`, `git commit`, `git branch`, `git checkout -b`, `git merge` (3-way merge commits), and `git reset --hard HEAD~1`.
- **Inspector Modal**: Click any commit circle to inspect its abbreviated SHA, commit message, author, and parent node hashes.
- **1-Click Preset Loaders**: Instantly pre-load *Starter*, *Feature Branch*, and *Merge-Ready* topologies.

### 2. 🚨 16-Error Terminal Emergency Rescue Matrix
- **Curated Diagnostic Catalog**: Covers the top 16 nightmare scenarios across **Git**, **NPM**, **Node.js**, **JavaScript**, **React**, and **Network/CORS**.
- **3-Part Human Translation**:
  1. 🔍 **What Happened**: Clear plain-English explanation without confusing jargon.
  2. 💡 **Why It Happened**: Teaches the root cause so the developer learns.
  3. 🛠️ **1-Click Copy Fix**: Copy-to-clipboard command recipes with instant checkmark feedback.
- **Sandbox Bridge**: Click *"Try in Sandbox"* to automatically teleport Git fixes into the live visual simulator.

### 3. 🏆 Gamified Guided Missions & Achievement Trophies
- **3 Hands-On Quests**:
  - *Quest 1: The Genesis Commit* (Init $\to$ Stage $\to$ Commit) $\to$ Unlocks **Genesis Committer** 🎖️
  - *Quest 2: Parallel Realities* (Branch $\to$ Commit $\to$ Checkout) $\to$ Unlocks **Branch Master** 🌿
  - *Quest 3: The Clean Integration* (Feature Branch $\to$ Commit $\to$ Merge) $\to$ Unlocks **Master Integrator** ⚡
- **Real-Time Step Validation**: Evaluates terminal commands with live visual progress bars.
- **Celebratory Fireworks**: Full-screen dual-cannon `canvas-confetti` fireworks upon mission completion.
- **Persistent State**: Progress, streaks, levels, and unlocked badges persist across sessions via `localStorage`.

### 4. 🔀 Interactive Merge Conflict Resolution Lab
- **Side-by-Side 3-Way Diff**: Visually compares `Current Change (HEAD: main)` vs `Incoming Change (feature)` vs `Resolved File Preview`.
- **1-Click Resolutions**: "Accept Current", "Accept Incoming", or "Accept Both".
- **Conflict Markers Cheat Sheet**: Demystifies `<<<<<<< HEAD`, `=======`, and `>>>>>>> branch` with interactive visual tooltips.

### 5. 💎 Linear-Grade Polish & Web Audio Feedback
- **Tactile Sound Engine**: Custom Web Audio API synthesizer generating soft click and victory chime sounds without external audio assets.
- **Shortcuts & Guide Modal**: Keyboard navigation guide ($\uparrow / \downarrow$ command history, `Enter` to run).
- **100% Client-Side & Offline Ready**: Zero latency, zero external API key requirements.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18.3 + TypeScript 5.7 | Component architecture, state safety, type contracts |
| **Bundler** | Vite 6.2 | Ultra-fast HMR and optimized production bundling |
| **Styling** | Tailwind CSS 3.4 | Linear-inspired dark palette, glassmorphism, responsive grid |
| **Animations** | Framer Motion 12.4 | Spring physics for SVG paths, node transitions, modal reveals |
| **Celebrations** | Canvas Confetti 1.9 | Particle fireworks for achievement unlocks |
| **Icons** | Lucide React | Modern vector iconography |
| **Audio** | Web Audio API | Zero-asset synthesized sound effects |
| **Persistence** | Browser `localStorage` | Client-side save for XP, streaks, and trophy badges |

---

## 🚀 Local Setup & Installation

Follow these steps to run CommitCraft locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/Ayoola-tech2024/commitcraft.git

# 2. Navigate into the project folder
cd commitcraft

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev
```

Open your browser at `http://localhost:5173/` to explore the app!

### Building for Production:
```bash
npm run build
npm run preview
```

---

## 🎬 3-Minute Video Demo Script

> **Video Title**: *CommitCraft — The Visual Git & Code Mentor for Beginner Developers*  
> **Target Audience**: Judges Harshil Arora & Sudheer Prathap (*Beginner's Paradise - FirstCommit*)  
> **Duration**: ~3 minutes

### Scene 1: The Problem (0:00 – 0:35)
- **Visual**: Screen recording showing a terrifying red terminal error (`fatal: refusing to merge unrelated histories`).
- **Narrator**: *"Every beginner developer remembers the feeling of total panic when their terminal throws a wall of cryptic red errors or Git merge conflicts. In a standard terminal, Git is an invisible black box. That’s why we built **CommitCraft** — an interactive visual Git playground, error rescue matrix, and gamified quest platform designed to turn beginner fear into total confidence."*

### Scene 2: Visual Git Playground (0:35 – 1:20)
- **Visual**: Demonstrating the SVG canvas, typing `git commit`, `git checkout -b feature/login`, and `git merge`. Clicking commit nodes to view metadata.
- **Narrator**: *"In the Visual Git Sandbox, every command is drawn in real-time with animated cubic bezier curves and glowing commit nodes. Beginners can switch branches, stage files with one click, or test merge scenarios while watching their branches branch out and connect visually."*

### Scene 3: Terminal Error Decoder (1:20 – 2:05)
- **Visual**: Pasting `EADDRINUSE: 3000` and `refusing to merge unrelated histories`. Showing the 3-part breakdown and clicking "Copy Fix".
- **Narrator**: *"When errors happen, our Error Decoder acts as an emergency rescue tool. With 16 curated patterns covering Git, NPM, Node, React, and CORS, it instantly translates cryptic stack traces into plain English, explains the root cause, and provides a 1-click copyable fix."*

### Scene 4: Guided Quests & Confetti Badges (2:05 – 2:35)
- **Visual**: Playing through Mission 1 (*The Genesis Commit*), typing commands, seeing real-time validation checkmarks, and triggering the full-screen confetti badge unlock.
- **Narrator**: *"To build real muscle memory, CommitCraft includes 3 guided quests. The interactive validator tracks your progress step-by-step, rewarding you with XP, streaks, and unlockable achievement trophies backed by local browser persistence."*

### Scene 5: Conflict Lab & Closing (2:35 – 3:00)
- **Visual**: Showing the 3-way split Merge Conflict Lab, picking "Accept Both", and committing the merge.
- **Narrator**: *"Finally, our Merge Conflict Lab demystifies conflict markers with side-by-side visual diffs. CommitCraft proves that software development doesn't have to be intimidating. Thank you to the FirstCommit organizers for inspiring this journey!"*

---

## 📖 AI Usage Disclosure

*In strict compliance with FirstCommit Hackathon Rule #5 (AI Usage Disclosure):*

- **How AI Was Used**: AI tools (Antigravity pair assistant) were utilized as learning, brainstorming, and code refactoring aids throughout the hackathon. Specifically, AI assisted in:
  1. Brainstorming edge-case beginner Git error signatures for the 16-pattern diagnostic matrix.
  2. Assisting with complex cubic bezier SVG path math for multi-lane branch rendering.
  3. Writing unit test scenarios and structuring progressive Git commits.
- **Developer Ownership**: All architectural decisions, state machine design, component hierarchy, interactive quest logic, and visual styling were actively designed, guided, understood, and tested by the team.

---

## 📜 Credits & Attribution

- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Google Fonts (Inter & Fira Code)](https://fonts.google.com/)
- **Confetti Physics**: [canvas-confetti by Kiril Matev](https://github.com/catdad/canvas-confetti)
- **Event**: Built with ❤️ for the [FirstCommit Hackathon: Beginner's Paradise](https://firstcommit.devpost.com/).

---

<div align="center">
  <strong>🌿 Built for the Next Generation of Developers • CommitCraft 2026</strong>
</div>