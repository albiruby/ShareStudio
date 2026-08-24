import { ParametricConfig } from './types';

/*
 * PARAMETRIC TEMPLATE ENGINE
 * Generates 1,000+ structurally unique templates by combining:
 *   20 layout archetypes × 10 metric subsets × 5 font families = 1,000
 * Each combination produces a visually & structurally distinct sticker.
 */

// ─── 20 Layout Archetypes ────────────────────────────────────────
// Each renders a fundamentally different HTML structure
export const LAYOUTS = [
  { id: 'card-center',   name: 'Centered Card',       cat: 'Editorial & Magazine' },
  { id: 'card-left',     name: 'Left Align Card',     cat: 'Editorial & Magazine' },
  { id: 'card-right',    name: 'Right Align Card',    cat: 'Editorial & Magazine' },
  { id: 'row-compact',   name: 'Compact Row',         cat: 'Minimalist Geometry' },
  { id: 'row-spread',    name: 'Spread Row',          cat: 'Minimalist Geometry' },
  { id: 'grid-2x2',      name: '2×2 Grid',            cat: 'Data Analytics' },
  { id: 'grid-3col',     name: '3-Column Grid',       cat: 'Data Analytics' },
  { id: 'grid-stack',    name: 'Stacked Rows',        cat: 'Data Analytics' },
  { id: 'circle',        name: 'Circle Badge',        cat: 'Minimalist Geometry' },
  { id: 'pill',          name: 'Pill Tag',             cat: 'Minimalist Geometry' },
  { id: 'receipt',       name: 'Receipt List',         cat: 'Receipts & Documents' },
  { id: 'json',          name: 'JSON Block',           cat: 'Retro OS & Terminal' },
  { id: 'terminal',      name: 'Terminal Output',      cat: 'Retro OS & Terminal' },
  { id: 'bars',          name: 'Bar Chart',            cat: 'Data Analytics' },
  { id: 'wave',          name: 'Wave Line',            cat: 'Data Analytics' },
  { id: 'dialog',        name: 'OS Dialog',            cat: 'Retro OS & Terminal' },
  { id: 'bubble',        name: 'Chat Bubble',          cat: 'Pop-Culture & Parody' },
  { id: 'ticket',        name: 'Ticket Stub',          cat: 'Receipts & Documents' },
  { id: 'banner',        name: 'Banner Ribbon',        cat: 'Typography Kinetic' },
  { id: 'stamp',         name: 'Stamp Seal',           cat: 'Minimalist Geometry' },
] as const;

// ─── 10 Metric Subsets ───────────────────────────────────────────
// Different fields shown = different sticker content & structure
export const METRIC_SETS = [
  { keys: ['distance', 'pace'],                     tag: 'Dist+Pace' },
  { keys: ['distance', 'time'],                     tag: 'Dist+Time' },
  { keys: ['distance', 'pace', 'time'],             tag: 'Dist+Pace+Time' },
  { keys: ['distance', 'heartRate'],                tag: 'Dist+HR' },
  { keys: ['pace', 'time', 'heartRate'],            tag: 'Pace+Time+HR' },
  { keys: ['distance', 'elevation'],                tag: 'Dist+Elev' },
  { keys: ['distance', 'calories'],                 tag: 'Dist+Cal' },
  { keys: ['heartRate', 'elevation', 'calories'],   tag: 'HR+Elev+Cal' },
  { keys: ['distance', 'pace', 'time', 'heartRate'], tag: 'Full Stats' },
  { keys: ['pace', 'heartRate', 'elevation'],       tag: 'Pace+HR+Elev' },
] as const;

// ─── 5 Font Families ─────────────────────────────────────────────
export const FONTS = [
  { cls: 'font-sans',        label: 'Sans' },
  { cls: 'font-serif',       label: 'Serif' },
  { cls: 'font-mono',        label: 'Mono' },
  { cls: 'font-led',         label: 'LED' },
  { cls: 'font-handwritten', label: 'Hand' },
] as const;

// ─── Metric Display Helpers ──────────────────────────────────────
export const METRIC_LABELS: Record<string, string> = {
  distance: 'Distance',
  pace: 'Pace',
  time: 'Duration',
  heartRate: 'Heart Rate',
  elevation: 'Elevation',
  calories: 'Calories',
  location: 'Location',
  date: 'Date',
};

export const METRIC_UNITS: Record<string, string> = {
  distance: 'KM',
  pace: '/KM',
  time: '',
  heartRate: 'BPM',
  elevation: 'm',
  calories: 'kcal',
  location: '',
  date: '',
};

// ─── Visual themes tied to layout type ───────────────────────────
// Each layout archetype has its own distinct visual identity
const LAYOUT_THEMES: Record<string, { bg: string; text: string; accent: string; border: string }> = {
  'card-center':  { bg: '#09090b',   text: '#ffffff',  accent: '#00E5FF', border: '#27272a' },
  'card-left':    { bg: '#0f172a',   text: '#e2e8f0',  accent: '#38bdf8', border: '#1e293b' },
  'card-right':   { bg: '#1a1a2e',   text: '#eaeaea',  accent: '#e94560', border: '#16213e' },
  'row-compact':  { bg: '#000000',   text: '#ffffff',  accent: '#22d3ee', border: '#333333' },
  'row-spread':   { bg: '#18181b',   text: '#fafafa',  accent: '#a78bfa', border: '#3f3f46' },
  'grid-2x2':     { bg: '#09090b',   text: '#ffffff',  accent: '#34d399', border: '#27272a' },
  'grid-3col':    { bg: '#0c0c0c',   text: '#d4d4d4',  accent: '#fbbf24', border: '#262626' },
  'grid-stack':   { bg: '#0f172a',   text: '#94a3b8',  accent: '#f472b6', border: '#1e293b' },
  'circle':       { bg: '#09090b',   text: '#00E5FF',  accent: '#00E5FF', border: '#155e75' },
  'pill':         { bg: 'rgba(0,0,0,0.85)', text: '#ffffff', accent: '#4ade80', border: '#166534' },
  'receipt':      { bg: '#fafaf9',   text: '#1c1917',  accent: '#78716c', border: '#d6d3d1' },
  'json':         { bg: '#0a0a0a',   text: '#4ade80',  accent: '#22c55e', border: '#1a1a1a' },
  'terminal':     { bg: '#1a1a2e',   text: '#00ff41',  accent: '#00ff41', border: '#333366' },
  'bars':         { bg: '#18181b',   text: '#ffffff',  accent: '#f59e0b', border: '#27272a' },
  'wave':         { bg: '#020617',   text: '#e0f2fe',  accent: '#0ea5e9', border: '#0c4a6e' },
  'dialog':       { bg: '#c0c0c0',   text: '#000000',  accent: '#000080', border: '#ffffff' },
  'bubble':       { bg: '#2563eb',   text: '#ffffff',  accent: '#60a5fa', border: '#1d4ed8' },
  'ticket':       { bg: '#fffbeb',   text: '#451a03',  accent: '#d97706', border: '#fcd34d' },
  'banner':       { bg: '#18181b',   text: '#facc15',  accent: '#eab308', border: '#713f12' },
  'stamp':        { bg: 'transparent', text: '#dc2626', accent: '#dc2626', border: '#dc2626' },
};

// ─── Category list for filters ───────────────────────────────────
export const PARAMETRIC_CATEGORIES = [
  'All',
  'Editorial & Magazine',
  'Retro OS & Terminal',
  'Receipts & Documents',
  'Data Analytics',
  'Pop-Culture & Parody',
  'Minimalist Geometry',
  'Typography Kinetic',
];

// ─── Generator Function ─────────────────────────────────────────
// Produces 20 layouts × 10 metric sets × 5 fonts = 1,000 unique configs
let _cachedTemplates: ParametricConfig[] | null = null;

export function generateParametricTemplates(): ParametricConfig[] {
  if (_cachedTemplates) return _cachedTemplates;

  const configs: ParametricConfig[] = [];
  let idx = 0;

  for (const layout of LAYOUTS) {
    const theme = LAYOUT_THEMES[layout.id] || LAYOUT_THEMES['card-center'];
    for (const metricSet of METRIC_SETS) {
      for (const font of FONTS) {
        idx++;
        const borderStyles: ParametricConfig['borderStyle'][] = ['solid', 'dashed', 'double', 'none'];
        const corners = [4, 8, 12, 16, 9999];
        configs.push({
          id: `p_${idx}`,
          label: `${layout.name} · ${font.label} · ${metricSet.tag}`,
          category: layout.cat,
          layout: layout.id,
          metricsShown: [...metricSet.keys],
          fontClass: font.cls,
          borderStyle: borderStyles[idx % borderStyles.length],
          cornerRadius: corners[idx % corners.length],
          bgColor: theme.bg,
          textColor: theme.text,
          accentColor: theme.accent,
          borderColor: theme.border,
          iconIdx: idx % 20,
        });
      }
    }
  }

  _cachedTemplates = configs;
  return configs;
}
