import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitState, GitCommit } from '../../types/git'
import { getBranchColor } from '../../data/gitTemplates'
import { Tag, User, Clock, CheckCircle2 } from 'lucide-react'

interface GitGraphProps {
  gitState: GitState
  onSelectCommit?: (commit: GitCommit) => void
  selectedCommitId?: string | null
}

interface ComputedNode {
  commit: GitCommit
  x: number
  y: number
  branchIndex: number
  color: string
  isHead: boolean
  branchLabels: string[]
}

interface ComputedLink {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  color: string
  isMerge: boolean
}

export const GitGraph: React.FC<GitGraphProps> = ({
  gitState,
  onSelectCommit,
  selectedCommitId,
}) => {
  const { commits, branches, currentBranch, headCommitId, isInitialized } = gitState

  const { nodes, links, width, height } = useMemo(() => {
    const commitList = Object.values(commits)
    if (commitList.length === 0) {
      return { nodes: [], links: [], width: 600, height: 280 }
    }

    // Branch lanes mapping
    const branchNames = Object.keys(branches)
    const branchLaneMap: Record<string, number> = {}
    branchNames.forEach((name, idx) => {
      branchLaneMap[name] = idx
    })

    const nodeSpacingX = 110
    const laneSpacingY = 75
    const paddingX = 70
    const paddingY = 60

    // Topological/linear layout ordering
    const computedNodes: ComputedNode[] = []
    const nodeMap: Record<string, ComputedNode> = {}

    commitList.forEach((commit, index) => {
      const laneIndex = branchLaneMap[commit.branch] ?? 0
      const x = paddingX + index * nodeSpacingX
      const y = paddingY + laneIndex * laneSpacingY
      const color = branches[commit.branch]?.color || getBranchColor(laneIndex)

      // Collect all branches pointing to this commit
      const branchLabels = Object.values(branches)
        .filter((b) => b.commitId === commit.id)
        .map((b) => b.name)

      const node: ComputedNode = {
        commit,
        x,
        y,
        branchIndex: laneIndex,
        color,
        isHead: commit.id === headCommitId,
        branchLabels,
      }

      computedNodes.push(node)
      nodeMap[commit.id] = node
    })

    // Compute bezier curved links
    const computedLinks: ComputedLink[] = []

    computedNodes.forEach((node) => {
      node.commit.parentIds.forEach((parentId, pIdx) => {
        const parentNode = nodeMap[parentId]
        if (parentNode) {
          computedLinks.push({
            id: `${parentNode.commit.id}->${node.commit.id}-${pIdx}`,
            sourceX: parentNode.x,
            sourceY: parentNode.y,
            targetX: node.x,
            targetY: node.y,
            color: node.color,
            isMerge: node.commit.parentIds.length > 1,
          })
        }
      })
    })

    const totalWidth = Math.max(700, paddingX * 2 + commitList.length * nodeSpacingX)
    const totalHeight = Math.max(300, paddingY * 2 + Math.max(1, branchNames.length) * laneSpacingY)

    return {
      nodes: computedNodes,
      links: computedLinks,
      width: totalWidth,
      height: totalHeight,
    }
  }, [commits, branches, headCommitId])

  if (!isInitialized) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
        <p className="text-sm">Repository not initialized.</p>
        <p className="text-xs text-slate-600 mt-1 font-mono">Run `git init` to start tracking</p>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-x-auto rounded-2xl bg-slate-950/70 border border-slate-800 p-4 shadow-inner">
      {/* Visual Lane Guides & Background Glow */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>

      <svg
        width={width}
        height={height}
        className="overflow-visible min-w-full select-none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Branch Guide Lines */}
        {Object.keys(branches).map((bName, idx) => {
          const y = 60 + idx * 75
          return (
            <g key={`lane-${bName}`} opacity={0.15}>
              <line
                x1={20}
                y1={y}
                x2={width - 20}
                y2={y}
                stroke={branches[bName]?.color || '#06b6d4'}
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <text
                x={25}
                y={y - 8}
                fill={branches[bName]?.color || '#06b6d4'}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {bName}
              </text>
            </g>
          )
        })}

        {/* 2. Bezier Connection Links */}
        {links.map((link) => {
          const dx = link.targetX - link.sourceX
          // Smooth S-curve bezier control points
          const path = `M ${link.sourceX} ${link.sourceY} C ${link.sourceX + dx * 0.5} ${link.sourceY}, ${link.targetX - dx * 0.5} ${link.targetY}, ${link.targetX} ${link.targetY}`

          return (
            <motion.path
              key={link.id}
              d={path}
              fill="none"
              stroke={link.color}
              strokeWidth={link.isMerge ? 3 : 2.5}
              strokeDasharray={link.isMerge ? '6 3' : 'none'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )
        })}

        {/* 3. Commit Nodes */}
        <AnimatePresence>
          {nodes.map((node) => {
            const isSelected = selectedCommitId === node.commit.id
            return (
              <g
                key={node.commit.id}
                onClick={() => onSelectCommit && onSelectCommit(node.commit)}
                className="cursor-pointer group"
              >
                {/* HEAD Ring Pulse */}
                {node.isHead && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={24}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={1.5}
                    className="animate-ping opacity-30"
                  />
                )}

                {/* Outer Glow on Selection */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    filter="url(#glow)"
                  />
                )}

                {/* Node Circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={16}
                  fill="#0f172a"
                  stroke={node.color}
                  strokeWidth={node.isHead ? 3.5 : 2.5}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.25 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />

                {/* Short SHA label inside node */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.commit.shortSha}
                </text>

                {/* Commit Message Pill (Above Node) */}
                <g transform={`translate(${node.x}, ${node.y - 28})`}>
                  <foreignObject x={-60} y={-10} width={120} height={24}>
                    <div className="flex items-center justify-center">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700/80 text-[10px] text-slate-300 font-mono truncate max-w-[110px] shadow-sm">
                        {node.commit.message}
                      </span>
                    </div>
                  </foreignObject>
                </g>

                {/* Branch / HEAD Badges (Below Node) */}
                <g transform={`translate(${node.x}, ${node.y + 24})`}>
                  <foreignObject x={-60} y={0} width={120} height={50}>
                    <div className="flex flex-col items-center gap-1">
                      {node.isHead && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-cyan-500 text-slate-950 uppercase tracking-wider shadow-sm shadow-cyan-500/30">
                          HEAD ({currentBranch})
                        </span>
                      )}
                      {node.branchLabels.map((bName) => (
                        <span
                          key={bName}
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-slate-800 text-cyan-300 border border-cyan-500/30"
                        >
                          {bName}
                        </span>
                      ))}
                    </div>
                  </foreignObject>
                </g>
              </g>
            )
          })}
        </AnimatePresence>
      </svg>
    </div>
  )
}