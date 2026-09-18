import React, { useState } from 'react'
import { ErrorDiagnostic } from '../../types/errors'
import { Check, Copy, AlertTriangle, Lightbulb, Wrench, ShieldCheck, Terminal } from 'lucide-react'

interface ErrorCardProps {
  diagnostic: ErrorDiagnostic
  onTryInSandbox?: (command: string) => void
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ diagnostic, onTryInSandbox }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(diagnostic.fixCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 space-y-4 shadow-xl transition-all">
      {/* Header: Title + Category Tag */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-3.5 h-3.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: diagnostic.badgeColor }}
          ></div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {diagnostic.title}
          </h3>
        </div>

        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border"
          style={{
            color: diagnostic.badgeColor,
            borderColor: `${diagnostic.badgeColor}40`,
            backgroundColor: `${diagnostic.badgeColor}15`,
          }}
        >
          {diagnostic.badgeLabel}
        </span>
      </div>

      {/* Raw Error Snapshot */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-rose-400/90 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-rose-400" />
          <span>Raw Error Signature</span>
        </div>
        {diagnostic.rawExample}
      </div>

      {/* 3-Part Diagnostic Body */}
      <div className="space-y-3 text-xs sm:text-sm">
        {/* 1. What Happened (Plain English) */}
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>1. What Happened (In Plain English)</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
            {diagnostic.plainEnglishSummary}
          </p>
        </div>

        {/* 2. Root Cause */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <span>2. Why It Happened (The Root Cause)</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            {diagnostic.rootCause}
          </p>
        </div>

        {/* 3. 1-Click Copy-Paste Fix */}
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Wrench className="w-4 h-4" />
              <span>3. How to Fix It</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/40 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>

          {/* Copyable Terminal Command Block */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
            <span className="select-all">{diagnostic.fixCommand}</span>
          </div>

          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            {diagnostic.fixExplanation}
          </p>

          {diagnostic.fixCodeSnippet && (
            <pre className="p-2.5 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre">
              {diagnostic.fixCodeSnippet}
            </pre>
          )}
        </div>
      </div>

      {/* Pro Tip / Prevention Footer */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span><strong>Pro Tip:</strong> {diagnostic.preventativeTip}</span>
        </div>

        {onTryInSandbox && diagnostic.category === 'git' && (
          <button
            onClick={() => onTryInSandbox(diagnostic.fixCommand)}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold font-mono text-xs ml-2 whitespace-nowrap"
          >
            <Terminal className="w-3 h-3" />
            <span>Try in Sandbox</span>
          </button>
        )}
      </div>
    </div>
  )
}