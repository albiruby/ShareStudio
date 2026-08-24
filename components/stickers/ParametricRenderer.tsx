'use client';

import React from 'react';
import { ActivityMetrics, ParametricConfig } from '@/lib/types';
import { METRIC_LABELS, METRIC_UNITS } from '@/lib/templateEngine';
import {
  Flame, Heart, Trophy, MapPin, Zap, Clock, Mountain, Activity,
  TrendingUp, Gauge, Timer, Dumbbell, Footprints, Target, Star,
  Award, Compass, Crown, Shield, Flag
} from 'lucide-react';

const ICONS = [
  Flame, Heart, Trophy, MapPin, Zap, Clock, Mountain, Activity,
  TrendingUp, Gauge, Timer, Dumbbell, Footprints, Target, Star,
  Award, Compass, Crown, Shield, Flag
];

/* ── Shared helpers ──────────────────────────────────────────── */

function getVal(metrics: ActivityMetrics, key: string): string {
  return (metrics as any)[key] ?? '—';
}

function getUnit(key: string): string {
  return METRIC_UNITS[key] || '';
}

function getLabel(key: string): string {
  return METRIC_LABELS[key] || key;
}

/* ── Main Parametric Renderer ────────────────────────────────── */

export function ParametricStickerRenderer({
  config,
  metrics,
}: {
  config: ParametricConfig;
  metrics: ActivityMetrics;
}) {
  const Icon = ICONS[config.iconIdx % ICONS.length];
  const keys = config.metricsShown;
  const fc = config.fontClass;

  switch (config.layout) {
    // ────────────────────────────────────────────────────────
    // 1. CARD-CENTER: Big centered primary metric, subtitle below
    case 'card-center':
      return (
        <div className={`w-56 p-4 text-center shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: config.accentColor }} />
          <div className="text-3xl font-black leading-none" style={{ color: config.accentColor }}>
            {getVal(metrics, keys[0])} <span className="text-xs opacity-70">{getUnit(keys[0])}</span>
          </div>
          {keys.slice(1).map(k => (
            <div key={k} className="text-[11px] mt-1 opacity-80">{getLabel(k)}: {getVal(metrics, k)} {getUnit(k)}</div>
          ))}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 2. CARD-LEFT: Left aligned, stacked metrics
    case 'card-left':
      return (
        <div className={`w-60 p-4 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="flex items-center gap-2 mb-2 pb-2" style={{ borderBottom: `1px solid ${config.borderColor}` }}>
            <Icon className="w-4 h-4" style={{ color: config.accentColor }} />
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: config.accentColor }}>SHARE STUDIO</span>
          </div>
          {keys.map((k, i) => (
            <div key={k} className={`${i === 0 ? 'text-2xl font-black' : 'text-xs opacity-75 mt-0.5'}`}>
              {i === 0 ? <>{getVal(metrics, k)} <span className="text-sm">{getUnit(k)}</span></> :
                <>{getLabel(k)}: {getVal(metrics, k)} {getUnit(k)}</>}
            </div>
          ))}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 3. CARD-RIGHT: Right aligned, primary metric top-right
    case 'card-right':
      return (
        <div className={`w-60 p-4 text-right shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="text-[9px] uppercase tracking-widest mb-1 opacity-60">{getLabel(keys[0])}</div>
          <div className="text-3xl font-black" style={{ color: config.accentColor }}>
            {getVal(metrics, keys[0])}
          </div>
          <div className="text-xs mt-1.5 space-y-0.5 opacity-80">
            {keys.slice(1).map(k => (
              <div key={k}>{getLabel(k)}: {getVal(metrics, k)} {getUnit(k)}</div>
            ))}
          </div>
          <div className="mt-2 flex justify-end"><Icon className="w-4 h-4" style={{ color: config.accentColor }} /></div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 4. ROW-COMPACT: Single horizontal row, pill shape
    case 'row-compact':
      return (
        <div className={`px-4 py-2 flex items-center gap-3 shadow-lg ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: 9999, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: config.accentColor }} />
          {keys.map((k, i) => (
            <React.Fragment key={k}>
              {i > 0 && <span className="text-[8px] opacity-30">•</span>}
              <span className={i === 0 ? 'font-bold text-sm' : 'text-[11px] opacity-80'}>
                {getVal(metrics, k)} {getUnit(k)}
              </span>
            </React.Fragment>
          ))}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 5. ROW-SPREAD: Spread row with equal columns, dividers between
    case 'row-spread':
      return (
        <div className={`w-64 flex shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}`, overflow: 'hidden' }}>
          {keys.map((k, i) => (
            <div key={k} className="flex-1 p-3 text-center"
              style={{ borderRight: i < keys.length - 1 ? `1px solid ${config.borderColor}` : 'none' }}>
              <div className="text-[9px] uppercase tracking-wider opacity-50">{getLabel(k)}</div>
              <div className="font-black text-lg" style={{ color: i === 0 ? config.accentColor : config.textColor }}>
                {getVal(metrics, k)}
              </div>
              <div className="text-[8px] opacity-40">{getUnit(k)}</div>
            </div>
          ))}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 6. GRID-2×2: 4-cell grid (fills with available keys, repeats icon for empty)
    case 'grid-2x2':
      return (
        <div className={`w-60 grid grid-cols-2 gap-1.5 p-2 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          {[0, 1, 2, 3].map(i => {
            const k = keys[i % keys.length];
            return (
              <div key={i} className="p-2.5 rounded-lg text-center"
                style={{ backgroundColor: `${config.borderColor}44` }}>
                <div className="text-[9px] uppercase opacity-50" style={{ color: config.textColor }}>{getLabel(k)}</div>
                <div className="text-xl font-black" style={{ color: i === 0 ? config.accentColor : config.textColor }}>
                  {getVal(metrics, k)}
                </div>
                <div className="text-[8px] opacity-40" style={{ color: config.textColor }}>{getUnit(k)}</div>
              </div>
            );
          })}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 7. GRID-3COL: 3-column metrics row
    case 'grid-3col':
      return (
        <div className={`w-64 p-3 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="text-[9px] uppercase tracking-widest mb-2 font-bold" style={{ color: config.accentColor }}>RUN SUMMARY</div>
          <div className="grid grid-cols-3 gap-2">
            {keys.slice(0, 3).map((k, i) => (
              <div key={k} className="text-center">
                <div className="text-xl font-black" style={{ color: i === 0 ? config.accentColor : config.textColor }}>
                  {getVal(metrics, k)}
                </div>
                <div className="text-[9px] uppercase opacity-50">{getLabel(k)}</div>
              </div>
            ))}
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 8. GRID-STACK: Vertically stacked rows with alternating bg
    case 'grid-stack':
      return (
        <div className={`w-56 shadow-xl overflow-hidden ${fc}`}
          style={{ borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          {keys.map((k, i) => (
            <div key={k} className="flex justify-between items-center px-3 py-2"
              style={{ backgroundColor: i % 2 === 0 ? config.bgColor : `${config.borderColor}33`, color: config.textColor }}>
              <span className="text-[10px] uppercase opacity-60">{getLabel(k)}</span>
              <span className="font-bold text-sm" style={{ color: i === 0 ? config.accentColor : config.textColor }}>
                {getVal(metrics, k)} {getUnit(k)}
              </span>
            </div>
          ))}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 9. CIRCLE: Circular badge, single primary metric
    case 'circle':
      return (
        <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl ${fc}`}
          style={{ backgroundColor: config.bgColor, border: `3px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="text-[8px] uppercase tracking-wider opacity-60" style={{ color: config.textColor }}>{getLabel(keys[0])}</div>
          <div className="text-2xl font-black" style={{ color: config.accentColor }}>{getVal(metrics, keys[0])}</div>
          <div className="text-[8px] opacity-50" style={{ color: config.textColor }}>{getUnit(keys[0])}</div>
          {keys[1] && <div className="text-[9px] mt-0.5 opacity-60" style={{ color: config.textColor }}>{getVal(metrics, keys[1])} {getUnit(keys[1])}</div>}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 10. PILL: Capsule/pill-shaped tag
    case 'pill':
      return (
        <div className={`px-5 py-2 flex items-center gap-2 shadow-lg ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: 9999, border: `2px ${config.borderStyle} ${config.accentColor}` }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accentColor }} />
          <span className="font-extrabold text-sm" style={{ color: config.accentColor }}>{getVal(metrics, keys[0])} {getUnit(keys[0])}</span>
          {keys[1] && <span className="text-[10px] opacity-70">| {getVal(metrics, keys[1])} {getUnit(keys[1])}</span>}
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 11. RECEIPT: Thermal receipt with dashed borders
    case 'receipt':
      return (
        <div className={`w-56 p-3 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: 4, border: `1px dashed ${config.borderColor}` }}>
          <div className="text-center text-[10px] font-bold border-b border-dashed pb-1 mb-2" style={{ borderColor: config.borderColor }}>
            ★ SHARE STUDIO ★
          </div>
          {keys.map(k => (
            <div key={k} className="flex justify-between py-0.5 text-[11px]">
              <span className="opacity-60">{getLabel(k).toUpperCase()}</span>
              <span className="font-bold">{getVal(metrics, k)} {getUnit(k)}</span>
            </div>
          ))}
          <div className="text-center mt-2 pt-1 border-t border-dashed text-2xl tracking-widest" style={{ borderColor: config.borderColor }}>
            |||| | |||| | ||
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 12. JSON: Developer JSON code block
    case 'json':
      return (
        <div className={`w-60 p-3 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="flex items-center gap-1 mb-2 pb-1" style={{ borderBottom: `1px solid ${config.borderColor}` }}>
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[9px] opacity-40 ml-1" style={{ color: config.textColor }}>run.json</span>
          </div>
          <pre className="text-[11px] whitespace-pre-wrap leading-relaxed" style={{ color: config.textColor }}>
{`{`}{keys.map((k, i) => `\n  "${k}": "${getVal(metrics, k)} ${getUnit(k)}"${i < keys.length - 1 ? ',' : ''}`).join('')}{`\n}`}
          </pre>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 13. TERMINAL: CLI terminal output
    case 'terminal':
      return (
        <div className={`w-60 p-3 shadow-xl font-mono`}
          style={{ backgroundColor: config.bgColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="text-[9px] opacity-40 mb-1" style={{ color: config.textColor }}>user@sharestudio:~$</div>
          <div className="text-[10px]" style={{ color: config.accentColor }}>$ run --stats</div>
          {keys.map(k => (
            <div key={k} className="text-[11px] mt-0.5" style={{ color: config.textColor }}>
              <span style={{ color: config.accentColor }}>[OK]</span> {getLabel(k).toLowerCase()}: {getVal(metrics, k)} {getUnit(k)}
            </div>
          ))}
          <div className="mt-1 animate-pulse" style={{ color: config.accentColor }}>▌</div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 14. BARS: Bar chart with metrics
    case 'bars':
      return (
        <div className={`w-60 p-3 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="text-[10px] uppercase tracking-wider mb-2 font-bold" style={{ color: config.accentColor }}>Performance</div>
          <div className="flex items-end gap-1 h-12 mb-2">
            {[55, 75, 45, 90, 60, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 3 ? config.accentColor : `${config.accentColor}44` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px]">
            {keys.slice(0, 2).map(k => (
              <span key={k}><span className="opacity-50">{getLabel(k)}: </span><strong>{getVal(metrics, k)}</strong></span>
            ))}
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 15. WAVE: Wave/line chart
    case 'wave':
      return (
        <div className={`w-60 p-3 shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase opacity-50">Pace Trend</span>
            <Icon className="w-3.5 h-3.5" style={{ color: config.accentColor }} />
          </div>
          <svg className="w-full h-10" viewBox="0 0 100 30" fill="none">
            <path d="M0,20 Q15,5 30,18 T60,10 T100,15" stroke={config.accentColor} strokeWidth="2" />
            <path d="M0,20 Q15,5 30,18 T60,10 T100,15 L100,30 L0,30 Z" fill={`${config.accentColor}22`} />
          </svg>
          <div className="mt-1.5 text-center">
            <span className="text-xl font-black" style={{ color: config.accentColor }}>{getVal(metrics, keys[0])}</span>
            <span className="text-xs opacity-50 ml-1">{getUnit(keys[0])}</span>
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 16. DIALOG: OS-style dialog window
    case 'dialog':
      return (
        <div className={`w-64 shadow-xl ${fc}`}
          style={{ borderRadius: 2, border: `2px outset ${config.borderColor}` }}>
          <div className="px-2 py-0.5 font-bold text-[11px] flex justify-between items-center" style={{ backgroundColor: config.accentColor, color: '#ffffff' }}>
            <span>Run Complete</span>
            <span className="cursor-pointer">✕</span>
          </div>
          <div className="p-3" style={{ backgroundColor: config.bgColor, color: config.textColor }}>
            <div className="flex gap-2 mb-2">
              <Icon className="w-8 h-8 flex-shrink-0" style={{ color: config.accentColor }} />
              <div className="text-[11px]">
                <p className="font-bold mb-1">A run has been completed!</p>
                {keys.map(k => (
                  <p key={k}>{getLabel(k)}: <strong>{getVal(metrics, k)} {getUnit(k)}</strong></p>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4 py-0.5 text-xs font-bold" style={{ border: `1px outset ${config.borderColor}`, backgroundColor: `${config.bgColor}` }}>OK</div>
            </div>
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 17. BUBBLE: Chat message bubble
    case 'bubble':
      return (
        <div className={`max-w-[240px] ${fc}`}>
          <div className="px-4 py-2.5 shadow-lg" style={{ backgroundColor: config.bgColor, color: config.textColor, borderRadius: '18px 18px 4px 18px' }}>
            <div className="text-xs">
              Just finished {getVal(metrics, keys[0])} {getUnit(keys[0])}
              {keys[1] && <> in {getVal(metrics, keys[1])} {getUnit(keys[1])}</>}
              {keys[2] && <> • {getLabel(keys[2])}: {getVal(metrics, keys[2])}</>} 🏃💪
            </div>
          </div>
          <div className="text-[9px] mt-0.5 text-right opacity-40" style={{ color: config.textColor }}>Read ✓✓</div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 18. TICKET: Ticket stub with perforated edge
    case 'ticket':
      return (
        <div className={`w-60 shadow-xl overflow-hidden ${fc}`}
          style={{ borderRadius: config.cornerRadius, border: `1px ${config.borderStyle} ${config.borderColor}` }}>
          <div className="p-3" style={{ backgroundColor: config.bgColor, color: config.textColor }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: config.accentColor }}>ADMIT ONE</span>
              <Icon className="w-4 h-4" style={{ color: config.accentColor }} />
            </div>
            <div className="text-2xl font-black" style={{ color: config.accentColor }}>
              {getVal(metrics, keys[0])} {getUnit(keys[0])}
            </div>
            {keys.slice(1).map(k => (
              <div key={k} className="text-[10px] opacity-70">{getLabel(k)}: {getVal(metrics, k)} {getUnit(k)}</div>
            ))}
          </div>
          <div className="border-t-2 border-dashed mx-2" style={{ borderColor: config.borderColor }} />
          <div className="p-2 text-center text-2xl tracking-widest" style={{ backgroundColor: config.bgColor, color: config.textColor }}>
            ◆ ◇ ◆ ◇ ◆
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 19. BANNER: Bold horizontal banner / ribbon
    case 'banner':
      return (
        <div className={`w-64 p-3 text-center uppercase tracking-wider shadow-xl ${fc}`}
          style={{ backgroundColor: config.bgColor, color: config.textColor, borderTop: `3px solid ${config.accentColor}`, borderBottom: `3px solid ${config.accentColor}` }}>
          <div className="text-[9px] opacity-50 mb-0.5" style={{ color: config.accentColor }}>★ RUN ACHIEVEMENT ★</div>
          <div className="text-2xl font-black" style={{ color: config.accentColor }}>
            {getVal(metrics, keys[0])} {getUnit(keys[0])}
          </div>
          <div className="text-[10px] mt-0.5 opacity-70">
            {keys.slice(1).map((k, i) => (
              <React.Fragment key={k}>
                {i > 0 && ' · '}
                {getVal(metrics, k)} {getUnit(k)}
              </React.Fragment>
            ))}
          </div>
        </div>
      );

    // ────────────────────────────────────────────────────────
    // 20. STAMP: Circular stamp seal
    case 'stamp':
      return (
        <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-center ${fc}`}
          style={{ border: `4px double ${config.accentColor}`, color: config.accentColor, backgroundColor: 'transparent' }}>
          <div className="text-[7px] uppercase tracking-widest font-bold">SHARE STUDIO</div>
          <div className="text-xl font-black leading-none my-0.5">{getVal(metrics, keys[0])}</div>
          <div className="text-[8px] font-bold">{getUnit(keys[0])}</div>
          {keys[1] && <div className="text-[7px] opacity-70 mt-0.5">{getVal(metrics, keys[1])} {getUnit(keys[1])}</div>}
          <div className="text-[6px] uppercase tracking-widest mt-0.5 font-bold">✓ VERIFIED</div>
        </div>
      );

    // Fallback
    default:
      return (
        <div className="p-3 bg-zinc-900 text-white rounded-lg text-xs">
          <strong>{getVal(metrics, keys[0])}</strong> {getUnit(keys[0])}
        </div>
      );
  }
}
