'use client';

import React from 'react';
import { BackgroundSettings } from '@/lib/types';
import { Image as ImageIcon, Sliders, Trash2, Sun, Moon } from 'lucide-react';

interface PhotoProps {
  background: BackgroundSettings;
  onUpdateBackground: (bg: BackgroundSettings) => void;
}

const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
  'linear-gradient(135deg, #450a0a 0%, #09090b 100%)',
  'linear-gradient(135deg, #022c22 0%, #09090b 100%)',
  'linear-gradient(135deg, #3b0764 0%, #09090b 100%)',
  'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
];

export function PhotoControls({ background, onUpdateBackground }: PhotoProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onUpdateBackground({
        ...background,
        imageUrl: event.target?.result as string,
        gradientPreset: null,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Upload Local Photo */}
      <div>
        <label className="block text-[11px] text-zinc-400 font-semibold mb-2">
          Upload Photo Background (0% Server Upload)
        </label>
        <div className="flex items-center gap-2">
          <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg cursor-pointer transition-colors border border-zinc-700">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Select Local Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {background.imageUrl && (
            <button
              onClick={() =>
                onUpdateBackground({
                  ...background,
                  imageUrl: null,
                })
              }
              className="p-2 bg-red-950/80 hover:bg-red-900 text-red-400 rounded-lg border border-red-800"
              title="Remove Photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dimmer Overlay Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Moon className="w-3.5 h-3.5 text-zinc-400" /> Dark Dimmer Overlay
          </span>
          <span>{Math.round(background.dimmerOverlay * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="0.9"
          step="0.05"
          value={background.dimmerOverlay}
          onChange={(e) =>
            onUpdateBackground({
              ...background,
              dimmerOverlay: parseFloat(e.target.value),
            })
          }
          className="w-full accent-cyan-400 bg-zinc-800 h-1.5 rounded cursor-pointer"
        />
      </div>

      {/* Background Gradients */}
      <div className="space-y-2">
        <label className="block text-[11px] text-zinc-400 font-semibold">
          Or Choose Gradient Background
        </label>
        <div className="flex gap-2">
          {GRADIENT_PRESETS.map((grad, i) => (
            <button
              key={i}
              onClick={() =>
                onUpdateBackground({
                  ...background,
                  imageUrl: null,
                  gradientPreset: grad,
                })
              }
              className="flex-1 h-8 rounded-lg border border-zinc-700 hover:scale-105 transition-transform"
              style={{ background: grad }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
