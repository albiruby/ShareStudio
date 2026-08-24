import { toPng, toBlob } from 'html-to-image';

export async function copyCanvasToClipboard(
  element: HTMLElement
): Promise<boolean> {
  try {
    const blob = await toBlob(element, {
      pixelRatio: 2,
      quality: 0.95,
      cacheBust: true,
    });

    if (!blob) {
      throw new Error('Failed to generate image blob');
    }

    if (navigator.clipboard && navigator.clipboard.write) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return true;
    } else {
      throw new Error('Clipboard API not supported');
    }
  } catch (err) {
    console.error('Error copying image to clipboard:', err);
    return false;
  }
}

export async function copyStickerToClipboard(
  element: HTMLElement
): Promise<boolean> {
  try {
    const blob = await toBlob(element, {
      pixelRatio: 3,
      quality: 1,
      cacheBust: true,
      skipAutoScale: true,
      style: {
        transform: 'none',
        opacity: '1',
      },
    });

    if (!blob) {
      throw new Error('Failed to generate sticker blob');
    }

    if (navigator.clipboard && navigator.clipboard.write) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      return true;
    } else {
      throw new Error('Clipboard API not supported');
    }
  } catch (err) {
    console.error('Error copying sticker to clipboard:', err);
    return false;
  }
}

export async function downloadCanvasImage(
  element: HTMLElement,
  filename = 'sharestudio-run.png'
): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      quality: 0.95,
      cacheBust: true,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Error downloading canvas image:', err);
    return false;
  }
}
