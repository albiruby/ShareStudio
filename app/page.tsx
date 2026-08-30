'use client';

import React from 'react';
import {
  AspectRatio,
  ActivityMetrics,
  BackgroundSettings,
  StickerInstance,
  StickerType,
} from '@/lib/types';
import { DEFAULT_METRICS, DEFAULT_STYLES } from '@/lib/constants';
import { copyCanvasToClipboard, copyStickerToClipboard, downloadCanvasImage } from '@/lib/exportUtils';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { CanvasStudio } from '@/components/CanvasStudio';
import { InspectorPanel } from '@/components/InspectorPanel';
import { TextSnippetModal } from '@/components/TextSnippetModal';

export default function Home() {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>('9:16');
  const [metrics, setMetrics] = React.useState<ActivityMetrics>(DEFAULT_METRICS);
  const [background, setBackground] = React.useState<BackgroundSettings>({
    imageUrl: null,
    dimmerOverlay: 0.3,
    filter: 'normal',
    solidColor: '#09090b',
    gradientPreset: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
  });

  const [stickers, setStickers] = React.useState<StickerInstance[]>([
    {
      id: 'initial_receipt_1',
      type: 'receipt',
      x: 50,
      y: 80,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: 1,
      style: DEFAULT_STYLES.receipt,
    },
  ]);

  const [selectedId, setSelectedId] = React.useState<string | null>(
    'initial_receipt_1'
  );
  const [isCopying, setIsCopying] = React.useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddSticker = (type: StickerType, customStyle?: any) => {
    const newSticker: StickerInstance = {
      id: `sticker_${Date.now()}`,
      type,
      x: Math.floor(Math.random() * 30) + 30,
      y: Math.floor(Math.random() * 40) + 100,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: stickers.length + 1,
      style: customStyle || DEFAULT_STYLES[type] || DEFAULT_STYLES.receipt,
    };
    setStickers((prev) => [...prev, newSticker]);
    setSelectedId(newSticker.id);
  };

  const handleUpdateSticker = (updated: StickerInstance) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const handleDeleteSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleDuplicateSticker = (id: string) => {
    const target = stickers.find((s) => s.id === id);
    if (!target) return;
    const duplicated: StickerInstance = {
      ...target,
      id: `sticker_${Date.now()}`,
      x: target.x + 20,
      y: target.y + 20,
      zIndex: stickers.length + 1,
    };
    setStickers((prev) => [...prev, duplicated]);
    setSelectedId(duplicated.id);
  };

  const handleLayerUp = (id: string) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, zIndex: s.zIndex + 1 } : s))
    );
  };

  const handleLayerDown = (id: string) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, zIndex: Math.max(1, s.zIndex - 1) } : s))
    );
  };

  const handleResetCanvas = () => {
    setMetrics(DEFAULT_METRICS);
    setBackground({
      imageUrl: null,
      dimmerOverlay: 0.3,
      filter: 'normal',
      solidColor: '#09090b',
      gradientPreset: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    });
    setStickers([]);
    setSelectedId(null);
    showToast('Studio reset back to clean state');
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    setIsCopying(true);
    const previousSelected = selectedId;
    setSelectedId(null);

    await new Promise((r) => setTimeout(r, 100));

    const success = await copyCanvasToClipboard(canvasRef.current);
    setSelectedId(previousSelected);
    setIsCopying(false);

    if (success) {
      showToast('Story copied! Paste in Instagram/TikTok Story');
    } else {
      showToast('Copy failed. Click Download PNG instead');
    }
  };

  const handleCopySticker = async () => {
    const stickerEl = document.querySelector(`[data-sticker-id="${selectedId}"]`) as HTMLElement;
    if (!stickerEl) {
      showToast('Select a sticker first');
      return;
    }
    setIsCopying(true);

    await new Promise((r) => setTimeout(r, 50));

    const success = await copyStickerToClipboard(stickerEl);
    setIsCopying(false);

    if (success) {
      showToast('Sticker copied! Paste in Instagram/TikTok Story');
    } else {
      showToast('Sticker copy failed. Try Download PNG instead');
    }
  };

  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadPNG = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    const previousSelected = selectedId;
    setSelectedId(null);

    await new Promise((r) => setTimeout(r, 100));
    await downloadCanvasImage(canvasRef.current, `sharestudio-${metrics.distance}km.png`);
    setSelectedId(previousSelected);
    setIsDownloading(false);
    showToast('Downloaded high-res story PNG');
  };

  const selectedSticker = stickers.find((s) => s.id === selectedId) || null;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        e.preventDefault();
        handleDeleteSticker(selectedId);
      }
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
      if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleDuplicateSticker(selectedId);
      }

      const nudge = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const s = stickers.find((s) => s.id === selectedId);
        if (s) handleUpdateSticker({ ...s, x: s.x - nudge });
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const s = stickers.find((s) => s.id === selectedId);
        if (s) handleUpdateSticker({ ...s, x: s.x + nudge });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const s = stickers.find((s) => s.id === selectedId);
        if (s) handleUpdateSticker({ ...s, y: s.y - nudge });
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const s = stickers.find((s) => s.id === selectedId);
        if (s) handleUpdateSticker({ ...s, y: s.y + nudge });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, stickers]);

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-zinc-100">
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-zinc-100 font-semibold px-5 py-3 rounded-2xl shadow-2xl z-50 text-xs flex items-center gap-2 toast-enter">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {toastMessage}
        </div>
      )}

      <Navbar
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        metrics={metrics}
        setMetrics={setMetrics}
        onCopyClipboard={handleCopyClipboard}
        onCopySticker={handleCopySticker}
        onDownloadPNG={handleDownloadPNG}
        onResetCanvas={handleResetCanvas}
        onOpenTextSnippets={() => setIsTextModalOpen(true)}
        isCopying={isCopying}
        isDownloading={isDownloading}
        hasSelectedSticker={selectedId !== null}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          metrics={metrics}
          setMetrics={setMetrics}
          background={background}
          onUpdateBackground={setBackground}
          onAddSticker={handleAddSticker}
        />

        <CanvasStudio
          canvasRef={canvasRef}
          aspectRatio={aspectRatio}
          background={background}
          stickers={stickers}
          selectedId={selectedId}
          metrics={metrics}
          onSelectSticker={setSelectedId}
          onUpdateSticker={handleUpdateSticker}
          onDeleteSticker={handleDeleteSticker}
          onDuplicateSticker={handleDuplicateSticker}
          onLayerUp={handleLayerUp}
          onLayerDown={handleLayerDown}
          onUpdateMetrics={setMetrics}
        />

        <div className="w-72 border-l border-zinc-800/60 glass-panel p-4 overflow-y-auto hidden lg:block">
          <InspectorPanel
            selectedSticker={selectedSticker}
            onUpdateSticker={handleUpdateSticker}
            onDeleteSticker={() => selectedSticker && handleDeleteSticker(selectedSticker.id)}
          />
        </div>
      </div>

      <TextSnippetModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        metrics={metrics}
      />
    </div>
  );
}
