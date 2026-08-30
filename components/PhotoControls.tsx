'use client';

import React from 'react';
import { BackgroundSettings } from '@/lib/types';
import { Image as ImageIcon, Trash2, Moon, Sun, Aperture } from 'lucide-react';

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

const FILTER_PRESETS: Array<{
  id: BackgroundSettings['filter'];
  label: string;
  icon: typeof Sun;
  description: string;
}> = [
  { id: 'normal', label: 'Normal', icon: Aperture, description: 'No filter' },
  { id: 'dark_mood', label: 'Dark Mood', icon: Moon, description: 'Desaturated & dark' },
  { id: 'portra', label: 'Portra', icon: Sun, description: 'Warm film tones' },
  { id: 'vintage_bw', label: 'B&W Film', icon: Aperture, description: 'Classic black & white' },
  { id: 'sepia', label: 'Sepia', icon: Sun, description: 'Warm vintage tint' },
  { id: 'fisheye', label: 'Vivid', icon: Aperture, description: 'High contrast & saturated' },
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
    <div className="space-y-5 text-xs">
      {/* Upload Local Photo */}
      <div>
        <label className="block text-[11px] text-zinc-400 font-semibold mb-2">
          Upload Photo Background (100% Client-Side)
        </label>
        <div className="flex items-center gap-2">
          <label className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl cursor-pointer transition-all border border-zinc-700/50 hover:border-cyan-500/30">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px]">Select Local Photo</span>
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
              className="p-2.5 bg-red-950/80 hover:bg-red-900 text-red-400 rounded-xl border border-red-800/50 transition-all"
              title="Remove Photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dimmer Overlay Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-zinc-400" /> Dark Dimmer
          </span>
          <span className="text-zinc-300 font-mono">{Math.round(background.dimmerOverlay * 100)}%</span>
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
          className="w-full accent-cyan-400 bg-zinc-800/80 h-1.5 rounded-full cursor-pointer"
        />
      </div>

      {/* Photo Filters */}
      {background.imageUrl && (
        <div className="space-y-2">
          <label className="block text-[11px] text-zinc-400 font-semibold">
            Photo Filter
          </label>
          <div className="grid grid-cols-3 gap-2">
            {FILTER_PRESETS.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => onUpdateBackground({ ...background, filter: f.id })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    background.filter === f.id
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400'
                      : 'bg-zinc-900/50 border-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mx-auto mb-1" />
                  <span className="text-[9px] font-semibold block">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

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
              className="flex-1 h-9 rounded-xl border border-zinc-700/50 hover:scale-105 transition-all hover:shadow-lg"
              style={{ background: grad }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
