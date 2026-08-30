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
  Sticker,
} from 'lucide-react';

interface NavbarProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  metrics: ActivityMetrics;
  setMetrics: (m: ActivityMetrics) => void;
  onCopyClipboard: () => void;
  onCopySticker?: () => void;
  onDownloadPNG: () => void;
  onResetCanvas: () => void;
  onOpenTextSnippets: () => void;
  isCopying: boolean;
  isDownloading?: boolean;
  hasSelectedSticker?: boolean;
}

export function Navbar({
  aspectRatio,
  setAspectRatio,
  metrics,
  setMetrics,
  onCopyClipboard,
  onCopySticker,
  onDownloadPNG,
  onResetCanvas,
  onOpenTextSnippets,
  isCopying,
  isDownloading,
  hasSelectedSticker,
}: NavbarProps) {
  return (
    <header className="h-16 border-b border-zinc-800/60 glass-panel px-5 flex items-center justify-between z-40 sticky top-0">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-pink flex items-center justify-center font-black text-white text-lg shadow-lg shadow-brand-orange/20">
          S
        </div>
        <div>
          <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
            ShareStudio <span className="text-[10px] px-2 py-0.5 bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 rounded-full font-mono">PRO</span>
          </h1>
          <p className="text-[10px] text-zinc-500">Athletic Visualizer & Story Canvas</p>
        </div>
      </div>

      {/* Preset Run Selector & Aspect Ratio */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center bg-zinc-800/50 p-1.5 rounded-xl border border-zinc-700/50 text-xs">
          <span className="text-zinc-500 px-2.5 text-[11px]">Run Preset:</span>
          <select
            onChange={(e) => {
              if (MOCK_DATASETS[e.target.value]) {
                setMetrics(MOCK_DATASETS[e.target.value]);
              }
            }}
            className="bg-zinc-900/80 text-zinc-200 px-3 py-1.5 rounded-lg outline-none border border-zinc-700/50 cursor-pointer hover:bg-zinc-800 transition-all"
          >
            <option value="morning_run">Morning Run (8.43 km)</option>
            <option value="half_marathon">Half Marathon (21.1 km)</option>
            <option value="interval_workout">Track Intervals (6.5 km)</option>
            <option value="trail_run">Mountain Trail (14.8 km)</option>
          </select>
        </div>

        {/* Ratio Selector */}
        <div className="flex items-center bg-zinc-800/50 p-1.5 rounded-xl border border-zinc-700/50 text-xs">
          <button
            onClick={() => setAspectRatio('9:16')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              aspectRatio === '9:16' ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> 9:16
          </button>
          <button
            onClick={() => setAspectRatio('1:1')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              aspectRatio === '1:1' ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
            }`}
          >
            <Square className="w-3.5 h-3.5" /> 1:1
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenTextSnippets}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-zinc-800/50 hover:bg-zinc-700/60 text-zinc-300 text-xs font-medium rounded-xl border border-zinc-700/50 transition-all hover:text-white"
        >
          <FileText className="w-3.5 h-3.5 text-yellow-400" />
          <span>Copy Text</span>
        </button>

        <button
          onClick={onResetCanvas}
          className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-all"
          title="Reset Studio & Clear All"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-zinc-700/50" />

        {/* Copy as Sticker */}
        {hasSelectedSticker && onCopySticker && (
          <button
            onClick={onCopySticker}
            disabled={isCopying}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 hover:shadow-purple-500/30"
            title="Copy selected sticker as transparent PNG"
          >
            <Sticker className="w-3.5 h-3.5" />
            <span>{isCopying ? 'Copying...' : 'Copy Sticker'}</span>
          </button>
        )}

        {/* Copy to Clipboard */}
        <button
          onClick={onCopyClipboard}
          disabled={isCopying}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 hover:shadow-cyan-500/30"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{isCopying ? 'Copying...' : 'Copy Story'}</span>
        </button>

        {/* Download PNG */}
        <button
          onClick={onDownloadPNG}
          disabled={isDownloading}
          className="px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/60 text-white font-medium text-xs rounded-xl border border-zinc-700/50 flex items-center gap-1.5 transition-all hover:text-white active:scale-95 disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isDownloading ? 'Saving...' : 'Download'}</span>
        </button>
      </div>
    </header>
  );
}
