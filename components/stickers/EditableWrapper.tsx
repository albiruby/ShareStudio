'use client';

import React from 'react';
import { StickerInstance } from '@/lib/types';
import { Move, RotateCw, Trash2, ArrowUp, ArrowDown, Copy } from 'lucide-react';

interface WrapperProps {
  sticker: StickerInstance;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updated: StickerInstance) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
  children: React.ReactNode;
}

export function EditableWrapper({
  sticker,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onLayerUp,
  onLayerDown,
  children,
}: WrapperProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - sticker.x,
      y: e.clientY - sticker.y,
    });
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      onUpdate({
        ...sticker,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, sticker, onUpdate]);

  return (
    <div
      data-sticker-id={sticker.id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute cursor-move select-none transition-shadow ${
        isSelected ? 'sticker-active-outline ring-2 ring-cyan-400 z-50' : ''
      }`}
      style={{
        left: `${sticker.x}px`,
        top: `${sticker.y}px`,
        transform: `rotate(${sticker.rotation}deg) scale(${sticker.width / 100})`,
        transformOrigin: 'center center',
        zIndex: sticker.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Top Controls Action Bar when Selected */}
      {isSelected && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900/90 border border-zinc-700 text-white p-1 rounded-lg shadow-2xl backdrop-blur-md z-50 text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLayerUp();
            }}
            className="p-1 hover:bg-zinc-700 rounded text-zinc-300 hover:text-white"
            title="Bring Forward"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLayerDown();
            }}
            className="p-1 hover:bg-zinc-700 rounded text-zinc-300 hover:text-white"
            title="Send Backward"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-1 hover:bg-zinc-700 rounded text-zinc-300 hover:text-white"
            title="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-950 text-red-400 rounded"
            title="Delete Sticker"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {children}
    </div>
  );
}
