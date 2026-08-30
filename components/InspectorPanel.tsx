'use client';

import React from 'react';
import { StickerInstance } from '@/lib/types';
import { Palette, Trash2, Type, Box, CornerDownRight } from 'lucide-react';

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

const FONT_OPTIONS = [
  { value: 'sans', label: 'Sans' },
  { value: 'serif', label: 'Serif' },
  { value: 'mono', label: 'Mono' },
  { value: 'led', label: 'LED' },
  { value: 'handwritten', label: 'Hand' },
] as const;

export function InspectorPanel({
  selectedSticker,
  onUpdateSticker,
  onDeleteSticker,
}: InspectorProps) {
  if (!selectedSticker) {
    return (
      <div className="glass-panel p-4 rounded-xl text-center text-zinc-500 text-xs my-3">
        <div className="py-6 space-y-2">
          <Palette className="w-6 h-6 mx-auto text-zinc-600" />
          <p className="font-semibold text-zinc-400">No Sticker Selected</p>
          <p className="text-[10px] text-zinc-600">Click any sticker on canvas to customize its colors, fonts & properties.</p>
          <div className="pt-3 border-t border-zinc-800/60 mt-3">
            <p className="text-[9px] text-zinc-600 font-mono">
              Del = delete · Ctrl+D = duplicate · Arrows = nudge
            </p>
          </div>
        </div>
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

      {/* Type & Position Info */}
      <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
        <span className="px-2 py-0.5 bg-zinc-800/60 rounded">{selectedSticker.type}</span>
        <span>x:{Math.round(selectedSticker.x)}</span>
        <span>y:{Math.round(selectedSticker.y)}</span>
        <span>z:{selectedSticker.zIndex}</span>
      </div>

      {/* Text Color */}
      <div className="space-y-2.5">
        <label className="text-[11px] text-zinc-400 font-semibold block flex items-center gap-1.5">
          <Type className="w-3 h-3" /> Text Color
        </label>
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

      {/* Background Fill */}
      <div className="space-y-2.5">
        <label className="text-[11px] text-zinc-400 font-semibold block flex items-center gap-1.5">
          <Box className="w-3 h-3" /> Background Fill
        </label>
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

      {/* Accent Color */}
      <div className="space-y-2.5">
        <label className="text-[11px] text-zinc-400 font-semibold block flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" /> Accent Color
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle('accentColor', color)}
              className="w-6 h-6 rounded-full border border-zinc-700/50 hover:scale-110 transition-all hover:shadow-lg"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={style.accentColor.startsWith('#') ? style.accentColor : '#00E5FF'}
            onChange={(e) => updateStyle('accentColor', e.target.value)}
            className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Border Color */}
      <div className="space-y-2.5">
        <label className="text-[11px] text-zinc-400 font-semibold block flex items-center gap-1.5">
          <CornerDownRight className="w-3 h-3" /> Border Color
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateStyle('borderColor', color)}
              className="w-6 h-6 rounded-full border border-zinc-700/50 hover:scale-110 transition-all hover:shadow-lg"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={style.borderColor.startsWith('#') ? style.borderColor : '#27272a'}
            onChange={(e) => updateStyle('borderColor', e.target.value)}
            className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label className="text-[11px] text-zinc-400 font-semibold block">Font Family</label>
        <div className="flex gap-1.5">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.value}
              onClick={() => updateStyle('fontFamily', f.value)}
              className={`flex-1 py-1.5 text-[10px] rounded-lg border transition-all ${
                style.fontFamily === f.value
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 font-bold'
                  : 'bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-zinc-400">
          <span>Font Size</span>
          <span className="text-zinc-300 font-mono">{style.fontSize}px</span>
        </div>
        <input
          type="range"
          min="8"
          max="48"
          value={style.fontSize}
          onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
          className="w-full accent-cyan-400 bg-zinc-800/80 h-1.5 rounded-full cursor-pointer"
        />
      </div>

      {/* Border Radius */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-zinc-400">
          <span>Border Radius</span>
          <span className="text-zinc-300 font-mono">{style.borderRadius}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={style.borderRadius}
          onChange={(e) => updateStyle('borderRadius', parseInt(e.target.value))}
          className="w-full accent-cyan-400 bg-zinc-800/80 h-1.5 rounded-full cursor-pointer"
        />
      </div>

      {/* Transformations */}
      <div className="space-y-4 pt-3 border-t border-zinc-800/60">
        <div>
          <div className="flex justify-between text-[10px] text-zinc-400 mb-2">
            <span>Scale / Size</span>
            <span className="text-zinc-300 font-mono">{selectedSticker.width}%</span>
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
            <span className="text-zinc-300 font-mono">{selectedSticker.rotation}°</span>
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
            <span className="text-zinc-300 font-mono">{Math.round(style.opacity * 100)}%</span>
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

      {/* Keyboard Shortcuts */}
      <div className="pt-3 border-t border-zinc-800/60 text-[9px] text-zinc-600 font-mono space-y-1">
        <p>Del = delete · Ctrl+D = duplicate</p>
        <p>Arrows = nudge · Shift = 10px · Esc = deselect</p>
      </div>
    </div>
  );
}
