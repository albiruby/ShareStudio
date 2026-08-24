'use client';

import React from 'react';
import { ActivityMetrics } from '@/lib/types';
import { X, Copy, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: ActivityMetrics;
}

export function TextSnippetModal({ isOpen, onClose, metrics }: ModalProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const snippets = [
    `[ ${metrics.distance} ${metrics.unit} | ${metrics.pace}/${metrics.unit} | ${metrics.time} ] 🏃 ${metrics.title} ${metrics.location}`,
    `${metrics.distance} ${metrics.unit} run in ${metrics.time} at ${metrics.pace}/${metrics.unit} pace! ❤️ #${metrics.title.replace(/\s+/g, '')}`,
    `⚡ ${metrics.title} • ${metrics.distance} ${metrics.unit} • ${metrics.pace}/${metrics.unit} • ${metrics.heartRate} bpm`,
    `Ran ${metrics.distance} ${metrics.unit} through ${metrics.location} (${metrics.time}, ${metrics.pace}/${metrics.unit}) ✔️`,
    `[ ${metrics.date} ] ${metrics.distance} ${metrics.unit} @ ${metrics.pace}/${metrics.unit}`,
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
            <span>✨ Share Aura Text Snippets</span>
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-400">
          Click any text snippet below to copy directly to your clipboard for Instagram/TikTok captions:
        </p>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {snippets.map((text, i) => (
            <div
              key={i}
              onClick={() => handleCopy(text, i)}
              className="p-3 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-cyan-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
            >
              <p className="text-xs text-zinc-200 font-mono pr-2">{text}</p>
              <button className="p-1.5 bg-zinc-700 group-hover:bg-cyan-500 text-white rounded-lg transition-colors flex-shrink-0">
                {copiedIndex === i ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
