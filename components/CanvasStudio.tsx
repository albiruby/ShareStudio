'use client';

import React from 'react';
import {
  AspectRatio,
  StickerInstance,
  ActivityMetrics,
  BackgroundSettings,
} from '@/lib/types';
import { EditableWrapper } from './stickers/EditableWrapper';
import { StickerRenderer } from './stickers/MegaTemplates';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  aspectRatio: AspectRatio;
  background: BackgroundSettings;
  stickers: StickerInstance[];
  selectedId: string | null;
  metrics: ActivityMetrics;
  onSelectSticker: (id: string | null) => void;
  onUpdateSticker: (sticker: StickerInstance) => void;
  onDeleteSticker: (id: string) => void;
  onDuplicateSticker: (id: string) => void;
  onLayerUp: (id: string) => void;
  onLayerDown: (id: string) => void;
}

export function CanvasStudio({
  canvasRef,
  aspectRatio,
  background,
  stickers,
  selectedId,
  metrics,
  onSelectSticker,
  onUpdateSticker,
  onDeleteSticker,
  onDuplicateSticker,
  onLayerUp,
  onLayerDown,
}: CanvasProps) {
  // Dimensions helper
  const getAspectRatioDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'w-[360px] h-[640px] md:w-[405px] md:h-[720px]';
      case '1:1':
        return 'w-[450px] h-[450px]';
      case '4:5':
        return 'w-[400px] h-[500px]';
      default:
        return 'w-[405px] h-[720px]';
    }
  };

  return (
    <div
      onClick={() => onSelectSticker(null)}
      className="flex-1 flex items-center justify-center p-6 overflow-auto relative bg-dark-900 bg-[radial-gradient(#1c1c21_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <div
        ref={canvasRef}
        className={`relative overflow-hidden shadow-2xl transition-all duration-300 border border-zinc-800/80 rounded-2xl ${getAspectRatioDimensions()}`}
        style={{
          background: background.gradientPreset
            ? background.gradientPreset
            : '#09090b',
        }}
      >
        {/* Background Image Container */}
        {background.imageUrl && (
          <img
            src={background.imageUrl}
            alt="User Background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Dark Dimmer Overlay */}
        {background.dimmerOverlay > 0 && (
          <div
            className="absolute inset-0 bg-black pointer-events-none transition-opacity"
            style={{ opacity: background.dimmerOverlay }}
          />
        )}

        {/* Sticker Layers */}
        {stickers.map((sticker) => (
          <EditableWrapper
            key={sticker.id}
            sticker={sticker}
            isSelected={selectedId === sticker.id}
            onSelect={() => onSelectSticker(sticker.id)}
            onUpdate={onUpdateSticker}
            onDelete={() => onDeleteSticker(sticker.id)}
            onDuplicate={() => onDuplicateSticker(sticker.id)}
            onLayerUp={() => onLayerUp(sticker.id)}
            onLayerDown={() => onLayerDown(sticker.id)}
          >
            <StickerRenderer
              type={sticker.type}
              metrics={metrics}
              style={sticker.style}
              onEditField={(field, value) => {
                // Update metrics directly
                metrics[field as keyof ActivityMetrics] = value as any;
              }}
            />
          </EditableWrapper>
        ))}

        {stickers.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 text-center p-6 pointer-events-none">
            <p className="font-bold text-sm text-zinc-400">Canvas Ready</p>
            <p className="text-xs mt-1">Select a Preset Tag or Parody Sticker from the sidebar to start creating!</p>
          </div>
        )}
      </div>
    </div>
  );
}
