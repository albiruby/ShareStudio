'use client';

import React from 'react';
import { AspectRatio, ActivityMetrics } from '@/lib/types';
import { MOCK_DATASETS } from '@/lib/constants';
import {
  Sparkles,
  Copy,
  Download,
  RotateCcw,
  Smartphone,
  Square,
  FileText,
  Layers,
} from 'lucide-react';

interface NavbarProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  metrics: ActivityMetrics;
  setMetrics: (m: ActivityMetrics) => void;
  onCopyClipboard: () => void;
  onDownloadPNG: () => void;
  onResetCanvas: () => void;
  onOpenTextSnippets: () => void;
  isCopying: boolean;
}

export function Navbar({
  aspectRatio,
  setAspectRatio,
  metrics,
  setMetrics,
  onCopyClipboard,
  onDownloadPNG,
  onResetCanvas,
  onOpenTextSnippets,
  isCopying,
}: NavbarProps) {
  return (
    <header className="h-16 border-b border-zinc-800/80 glass-panel px-4 flex items-center justify-between z-40 sticky top-0">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-pink flex items-center justify-center font-black text-white text-lg shadow-lg shadow-brand-orange/20">
          S
        </div>
        <div>
          <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
            ShareStudio <span className="text-[10px] px-1.5 py-0.2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full font-mono">PRO</span>
          </h1>
          <p className="text-[10px] text-zinc-400">Athletic Visualizer & Story Canvas</p>
        </div>
      </div>

      {/* Preset Run Selector & Aspect Ratio */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center bg-zinc-800/80 p-1 rounded-lg border border-zinc-700 text-xs">
          <span className="text-zinc-400 px-2 text-[11px]">Run Preset:</span>
          <select
            onChange={(e) => {
              if (MOCK_DATASETS[e.target.value]) {
                setMetrics(MOCK_DATASETS[e.target.value]);
              }
            }}
            className="bg-zinc-900 text-zinc-200 px-2 py-1 rounded outline-none border border-zinc-700 cursor-pointer"
          >
            <option value="morning_run">Morning Run (8.43 km)</option>
            <option value="half_marathon">Half Marathon (21.1 km)</option>
            <option value="interval_workout">Track Intervals (6.5 km)</option>
            <option value="trail_run">Mountain Trail (14.8 km)</option>
          </select>
        </div>

        {/* Ratio Selector */}
        <div className="flex items-center bg-zinc-800/80 p-1 rounded-lg border border-zinc-700 text-xs">
          <button
            onClick={() => setAspectRatio('9:16')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              aspectRatio === '9:16' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> 9:16
          </button>
          <button
            onClick={() => setAspectRatio('1:1')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              aspectRatio === '1:1' ? 'bg-cyan-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Square className="w-3.5 h-3.5" /> 1:1
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenTextSnippets}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg border border-zinc-700 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-yellow-400" />
          <span>Copy Text</span>
        </button>

        <button
          onClick={onResetCanvas}
          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="Reset Studio & Clear All"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Copy to Clipboard */}
        <button
          onClick={onCopyClipboard}
          disabled={isCopying}
          className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{isCopying ? 'Copying...' : 'Copy Image'}</span>
        </button>

        {/* Download PNG */}
        <button
          onClick={onDownloadPNG}
          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs rounded-lg border border-zinc-700 flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download</span>
        </button>
      </div>
    </header>
  );
}
