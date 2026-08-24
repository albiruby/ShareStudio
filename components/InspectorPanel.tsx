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
      <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
        <span className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-cyan-400" /> Sticker Inspector
        </span>
        <button
          onClick={onDeleteSticker}
          className="text-red-400 hover:text-red-300 p-1 hover:bg-red-950/50 rounded transition-colors"
          title="Delete Sticker"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Color Customization */}
      <div className="space-y-2">
        <label className="text-[11px] text-zinc-400 font-semibold block">Text Color</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle('textColor', color)}
              className="w-5 h-5 rounded-full border border-zinc-700 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={style.textColor.startsWith('#') ? style.textColor : '#ffffff'}
            onChange={(e) => updateStyle('textColor', e.target.value)}
            className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] text-zinc-400 font-semibold block">Background Fill</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle('backgroundColor', color)}
              className="w-5 h-5 rounded-full border border-zinc-700 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={style.backgroundColor.startsWith('#') ? style.backgroundColor : '#000000'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Transformations Sliders */}
      <div className="space-y-3 pt-2 border-t border-zinc-800">
        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
            <span>Scale / Size</span>
            <span>{selectedSticker.width}%</span>
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
            className="w-full accent-cyan-400 bg-zinc-800 h-1 rounded cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
            <span>Rotation</span>
            <span>{selectedSticker.rotation}°</span>
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
            className="w-full accent-cyan-400 bg-zinc-800 h-1 rounded cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
            <span>Opacity</span>
            <span>{Math.round(style.opacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={style.opacity}
            onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
            className="w-full accent-cyan-400 bg-zinc-800 h-1 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
