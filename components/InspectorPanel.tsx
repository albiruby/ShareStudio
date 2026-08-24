'use client';

import React from 'react';
import { StickerInstance } from '@/lib/types';
import { Palette, Type, Sliders, Layers, Trash2 } from 'lucide-react';

interface InspectorProps {
  selectedSticker: StickerInstance | null;
  onUpdateSticker: (sticker: StickerInstance) => void;
  onDeleteSticker: () => void;
}

const PRESET_COLORS = [
  '#ffffff',
  '#000000',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#18181b',
  '#fef08a',
];

export function InspectorPanel({
  selectedSticker,
  onUpdateSticker,
  onDeleteSticker,
}: InspectorProps) {
  if (!selectedSticker) {
    return (
      <div className="glass-panel p-4 rounded-xl text-center text-zinc-500 text-xs my-3">
        Select any sticker on the canvas to customize its colors, text, fonts & layers.
      </div>
    );
  }

  const { style } = selectedSticker;

  const updateStyle = (key: keyof typeof style, value: any) => {
    onUpdateSticker({
      ...selectedSticker,
      style: {
        ...selectedSticker.style,
        [key]: value,
      },
    });
  };

  return (
    <div className="glass-panel p-4 rounded-xl space-y-4 my-3 text-xs">
      <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
        <span className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-2">
          <Palette className="w-3.5 h-3.5 text-cyan-400" /> Sticker Inspector
        </span>
        <button
          onClick={onDeleteSticker}
          className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-950/50 rounded-lg transition-all"
          title="Delete Sticker"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Color Customization */}
      <div className="space-y-2.5">
        <label className="text-[11px] text-zinc-400 font-semibold block">Text Color</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle('textColor', color)}
              className="w-6 h-6 rounded-full border border-zinc-700/50 hover:scale-110 transition-all hover:shadow-lg"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={style.textColor.startsWith('#') ? style.textColor : '#ffffff'}
            onChange={(e) => updateStyle('textColor', e.target.value)}
            className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="text-[11px] text-zinc-400 font-semibold block">Background Fill</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle('backgroundColor', color)}
              className="w-6 h-6 rounded-full border border-zinc-700/50 hover:scale-110 transition-all hover:shadow-lg"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={style.backgroundColor.startsWith('#') ? style.backgroundColor : '#000000'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Transformations Sliders */}
      <div className="space-y-4 pt-3 border-t border-zinc-800/60">
        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-2">
            <span>Scale / Size</span>
            <span className="text-zinc-300">{selectedSticker.width}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="200"
            value={selectedSticker.width}
            onChange={(e) =>
              onUpdateSticker({
                ...selectedSticker,
                width: parseInt(e.target.value),
              })
            }
            className="w-full accent-cyan-400 bg-zinc-800/80 h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-2">
            <span>Rotation</span>
            <span className="text-zinc-300">{selectedSticker.rotation}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            value={selectedSticker.rotation}
            onChange={(e) =>
              onUpdateSticker({
                ...selectedSticker,
                rotation: parseInt(e.target.value),
              })
            }
            className="w-full accent-cyan-400 bg-zinc-800/80 h-1.5 rounded-full cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-2">
            <span>Opacity</span>
            <span className="text-zinc-300">{Math.round(style.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={style.opacity}
            onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
            className="w-full accent-cyan-400 bg-zinc-800/80 h-1.5 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
