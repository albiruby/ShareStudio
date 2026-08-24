'use client';

import React from 'react';
import { ActivityMetrics, StickerStyle } from '@/lib/types';
import {
  Flame, Heart, Trophy, MapPin, Zap, Clock, Mountain, Activity,
  TrendingUp, Gauge, Timer, Navigation, Footprints, Target, Star,
  Award, Compass, Crown, Shield, Flag, CheckCircle2, Plane,
  BarChart, Bike, Moon, Sun, Wind, Thermometer, AlertTriangle,
  Phone, Disc, Music, Coffee, Eye, Share2, Copy,
} from 'lucide-react';

interface TProps {
  metrics: ActivityMetrics;
  style: StickerStyle;
  onEditField?: (field: string, value: string) => void;
}

function EditableField({ value, onSave, className = '' }: { value: string; onSave?: (v: string) => void; className?: string }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [temp, setTemp] = React.useState(value);
  React.useEffect(() => { setTemp(value); }, [value]);
  if (isEditing) {
    return (
      <input type="text" value={temp} onChange={(e) => setTemp(e.target.value)}
        onBlur={() => { setIsEditing(false); onSave?.(temp); }}
        onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditing(false); onSave?.(temp); } }}
        className="bg-black/40 text-current outline-none border-b border-cyan-400 px-1 rounded text-inherit w-full inline-block"
        autoFocus
      />
    );
  }
  return (
    <span onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
      className={`cursor-pointer hover:bg-white/10 transition-colors px-0.5 rounded ${className}`}
      title="Click to edit">{value}</span>
  );
}

// ──────────────────────────────────────────────────────────────
// 1. ELEVATION WAVE — Large pace on top, gradient wave SVG below
// ──────────────────────────────────────────────────────────────
export function ElevationWaveSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-4 text-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-3xl font-black" style={{ color: style.accentColor || '#00E5FF' }}>
        <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> <span className="text-sm">/KM</span>
      </div>
      <svg className="w-full h-16 mt-2" viewBox="0 0 100 30" fill="none">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={style.accentColor || '#00E5FF'} stopOpacity="0.6" />
            <stop offset="100%" stopColor={style.accentColor || '#00E5FF'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,22 Q10,8 25,18 T50,12 T75,20 T100,10 L100,30 L0,30 Z" fill="url(#waveGrad)" />
        <path d="M0,22 Q10,8 25,18 T50,12 T75,20 T100,10" stroke={style.accentColor || '#00E5FF'} strokeWidth="2" fill="none" />
      </svg>
      <div className="flex justify-between mt-1 text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>
        <span>ELEV: <EditableField value={metrics.elevation} onSave={(v) => onEditField?.('elevation', v)} />m</span>
        <span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />km</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 2. HORIZONTAL METRICS — 3 metrics in a compact row with labels
// ──────────────────────────────────────────────────────────────
export function HorizontalMetricsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="px-4 py-3 flex gap-4 items-center shadow-lg" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {[
        { label: 'DISTANCE', val: metrics.distance + 'KM', color: style.accentColor || '#00E5FF' },
        { label: 'PACE', val: metrics.pace + '/KM', color: style.accentColor || '#00E5FF' },
        { label: 'TIME', val: metrics.time, color: style.textColor },
      ].map((m, i) => (
        <div key={i} className="text-center">
          <div className="text-[8px] uppercase tracking-wider" style={{ color: style.textColor, opacity: 0.5 }}>{m.label}</div>
          <div className="font-black text-sm" style={{ color: m.color }}>{m.val}</div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 3. SERIF ITALIC — Elegant italic serif layout
// ──────────────────────────────────────────────────────────────
export function SerifItalicSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-4 text-center font-serif" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-3xl italic font-bold" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-lg">km</span>
      </div>
      <div className="text-sm italic mt-1" style={{ color: style.textColor, opacity: 0.8 }}>
        Pace <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • HR <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> bpm
      </div>
      <div className="text-xs mt-2 border-t pt-1 font-sans" style={{ borderColor: style.borderColor, color: style.textColor, opacity: 0.6 }}>
        <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 4. RECEIPT FULL — Full thermal receipt with all data + barcode
// ──────────────────────────────────────────────────────────────
export function ReceiptFullSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 font-mono text-xs shadow-xl" style={{ backgroundColor: '#fafafa', color: '#1c1917', borderRadius: 4, border: '1px dashed #d6d3d1' }}>
      <div className="text-center border-b border-dashed pb-1 mb-2 text-[10px] font-bold">
        <div>Morning Run</div>
        <div className="text-[9px] text-stone-400">RUN</div>
      </div>
      {[
        ['Date', metrics.date],
        ['Distance', metrics.distance + ' km'],
        ['Start Time', metrics.timeOfDay],
        ['Pace', metrics.pace + ' /km'],
        ['Elevation', metrics.elevation + ' m'],
        ['Duration', metrics.time],
        ['Calories', metrics.calories + ' kcal'],
        ['Heart Rate', metrics.heartRate + ' bpm'],
        ['Gear', metrics.gear],
      ].map(([k, v]) => (
        <div key={k as string} className="flex justify-between py-[1px] text-[10px]">
          <span className="text-stone-400">{k}</span>
          <span className="font-bold">{v}</span>
        </div>
      ))}
      <div className="border-t border-dashed mt-2 pt-1 text-center">
        <div className="text-[10px] font-bold">Total: {metrics.distance} km</div>
        <div className="text-xl tracking-widest mt-1">||| | |||| | ||</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 5. SPLITS ROMAN — Roman numeral splits with progress bars
// ──────────────────────────────────────────────────────────────
export function SplitsRomanSticker({ metrics, style, onEditField }: TProps) {
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const maxPace = 500;
  return (
    <div className="w-52 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-2 font-bold" style={{ color: style.accentColor }}>KM Splits</div>
      {metrics.splits.slice(0, 8).map((s, i) => (
        <div key={s.km} className="flex items-center gap-2 py-[2px]">
          <div className="w-6 text-[10px] font-bold" style={{ color: style.accentColor }}>{romans[i]}</div>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${style.borderColor}66` }}>
            <div className="h-full rounded-full" style={{ width: `${(420 / maxPace) * 100}%`, backgroundColor: style.accentColor || '#3b82f6' }} />
          </div>
          <div className="text-[10px] font-mono w-10 text-right" style={{ color: style.textColor }}>{s.pace}</div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 6. TEXT SENTENCE — Plain text sentence style
// ──────────────────────────────────────────────────────────────
export function TextSentenceSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 shadow-lg" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <p className="text-sm" style={{ color: style.textColor }}>
        Running <strong style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> kilometers</strong>,
        averaging a <strong style={{ color: style.accentColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> pace</strong>
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 7. LARGE TYPOGRAPHY — Massive distance number
// ──────────────────────────────────────────────────────────────
export function LargeTypographySticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 text-center shadow-lg" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-4xl font-black tracking-tight" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-xl">kilometers</span>
        <span className="text-lg align-super">®</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 8. DATA TABLE — Multi-column data table
// ──────────────────────────────────────────────────────────────
export function DataTableSticker({ metrics, style, onEditField }: TProps) {
  const rows = [
    { lap: '1', dist: '1 km', time: '07:32:00', pace: '07:32 /km', hr: '158 bpm' },
    { lap: '2', dist: '1 km', time: '07:19:00', pace: '07:19 /km', hr: '155 bpm' },
    { lap: '3', dist: '1 km', time: '07:13:00', pace: '07:13 /km', hr: '157 bpm' },
    { lap: '4', dist: '1 km', time: '07:04:00', pace: '07:04 /km', hr: '159 bpm' },
    { lap: '5', dist: '1 km', time: '06:55:00', pace: '06:55 /km', hr: '161 bpm' },
  ];
  return (
    <div className="w-72 p-3 text-[9px] font-mono shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, color: style.textColor }}>
      <div className="flex gap-2 mb-1 pb-1 border-b font-bold uppercase text-[8px]" style={{ borderColor: style.borderColor, color: style.accentColor }}>
        <span className="w-6">LAP</span><span className="w-10">DIST</span><span className="w-14">TIME</span><span className="w-14">PACE</span><span className="w-12">HR</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2 py-[1px]" style={{ color: i < 3 ? style.textColor : style.accentColor }}>
          <span className="w-6">{r.lap}</span><span className="w-10">{r.dist}</span><span className="w-14">{r.time}</span><span className="w-14">{r.pace}</span><span className="w-12">{r.hr}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 9. BAR CHART PACE — Vertical bars with km labels
// ──────────────────────────────────────────────────────────────
export function BarChartPaceSticker({ metrics, style, onEditField }: TProps) {
  const bars = [70, 85, 60, 95, 75, 80, 65, 90];
  return (
    <div className="w-60 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-end gap-1 h-20 mb-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full rounded-t" style={{ height: `${h}%`, backgroundColor: style.accentColor || '#fff' }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1 text-[7px] mb-1" style={{ color: style.textColor, opacity: 0.5 }}>
        {bars.map((_, i) => <span key={i} className="flex-1 text-center">KM{i + 1}</span>)}
      </div>
      <div className="text-center font-black text-lg" style={{ color: style.accentColor }}>
        <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /><span className="text-xs">"</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 10. LOCATION CARD — City name + distance + small icons
// ──────────────────────────────────────────────────────────────
export function LocationCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="font-black text-lg" style={{ color: style.textColor }}>
        <EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} />
      </div>
      <div className="text-sm font-bold mt-1" style={{ color: style.accentColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <EditableField value={metrics.unit} onSave={(v) => onEditField?.('unit', v)} /> Run
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${style.accentColor}22`, color: style.accentColor }}>
          <span className="font-bold">{metrics.distance}</span><span>K</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${style.accentColor}22`, color: style.accentColor }}>
          <span className="font-bold">{metrics.unit}</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 11. DAY BADGE — "[MONDAY] RUN" style
// ──────────────────────────────────────────────────────────────
export function DayBadgeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 text-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-sm tracking-widest" style={{ color: style.accentColor }}>[ <EditableField value={metrics.date?.split(' ')[0] || 'MONDAY'} onSave={(v) => onEditField?.('date', v)} /> ]</div>
      <div className="text-xl font-black mt-1" style={{ color: style.textColor }}>🏃 RUN</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.7 }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM - <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> - <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 12. DUAL STATS — Two metric rows with different icons
// ──────────────────────────────────────────────────────────────
export function DualStatsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl space-y-2" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {[
        { icon: Footprints, dist: metrics.distance, unit: metrics.unit, pace: metrics.pace, time: metrics.time },
        { icon: Bike, dist: '22.4', unit: 'KM', pace: '28.5', time: '47M 12S' },
      ].map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <r.icon className="w-4 h-4 flex-shrink-0" style={{ color: style.accentColor }} />
          <div className="text-lg font-black" style={{ color: style.textColor }}>{r.dist} <span className="text-xs font-normal">{r.unit}</span></div>
          <div className="text-[10px] ml-auto" style={{ color: style.textColor, opacity: 0.6 }}>{r.pace} • {r.time}</div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 13. COLUMN NUMBERS — Numbered metric list
// ──────────────────────────────────────────────────────────────
export function ColumnNumbersSticker({ metrics, style, onEditField }: TProps) {
  const items = [
    { n: '1', val: metrics.distance + ' km' },
    { n: '2', val: metrics.pace + '/km' },
    { n: '3', val: metrics.time },
    { n: '4', val: metrics.calories + ' cal' },
    { n: '5', val: metrics.elevation + ' m' },
  ];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {items.map((item) => (
        <div key={item.n} className="flex items-baseline gap-3 py-0.5">
          <span className="text-sm font-bold" style={{ color: style.accentColor }}>{item.n}.</span>
          <span className="text-sm font-mono" style={{ color: style.textColor }}>{item.val}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 14. HIGHLIGHT BLOCKS — Colored block highlights
// ──────────────────────────────────────────────────────────────
export function HighlightBlocksSticker({ metrics, style, onEditField }: TProps) {
  const colors = ['#a3e635', '#facc15', '#fb923c'];
  const vals = [
    { label: metrics.distance + ' KM' },
    { label: metrics.pace + ' /KM' },
    { label: metrics.time },
  ];
  return (
    <div className="w-48 p-3 space-y-1.5 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {vals.map((v, i) => (
        <div key={i} className="px-3 py-1.5 font-black text-sm text-center" style={{ backgroundColor: colors[i], color: '#000' }}>
          {v.label}
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 15. CUMULATIVE LIST — Cumulative time list
// ──────────────────────────────────────────────────────────────
export function CumulativeListSticker({ metrics, style, onEditField }: TProps) {
  const cumTimes = ['00:07:32', '00:14:50', '00:22:03', '00:29:08', '00:36:03', '00:42:55', '00:49:55', '00:57:02'];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-xl font-black mb-2" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />km</div>
      <div className="space-y-[1px] font-mono text-[10px]">
        {cumTimes.map((t, i) => (
          <div key={i} className="flex justify-between" style={{ color: style.textColor, opacity: 0.7 }}>
            <span>{t}</span><span className="text-[9px]">*km{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="border-t mt-2 pt-1 font-bold text-sm" style={{ borderColor: style.borderColor, color: style.accentColor }}>{metrics.time}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 16. VERIFIED BADGE — Large number with checkmark
// ──────────────────────────────────────────────────────────────
export function VerifiedBadgeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 flex items-center gap-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-3xl font-black" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-lg">KM</span>
      </div>
      <CheckCircle2 className="w-7 h-7" style={{ color: '#3b82f6' }} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 17. TIME RANGE — Start/finish times with day
// ──────────────────────────────────────────────────────────────
export function TimeRangeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 text-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex justify-center gap-3 text-sm font-bold" style={{ color: style.accentColor }}>
        <span><EditableField value={metrics.timeOfDay} onSave={(v) => onEditField?.('timeOfDay', v)} /></span>
        <span style={{ color: style.textColor, opacity: 0.4 }}>→</span>
        <span>06:43 AM</span>
      </div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.7 }}>{metrics.time} • {metrics.distance} KM • {metrics.pace}"</div>
      <div className="text-sm font-bold mt-1 tracking-widest" style={{ color: style.textColor }}>
        <EditableField value={metrics.date?.split(' ')[0] || 'MONDAY'} onSave={(v) => onEditField?.('date', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 18. PACE CHART — Line chart for pace
// ──────────────────────────────────────────────────────────────
export function PaceChartSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: style.textColor, opacity: 0.5 }}>Pace Trend</div>
      <svg className="w-full h-14" viewBox="0 0 100 30" fill="none">
        <path d="M0,20 Q12,8 25,15 T50,12 T75,18 T100,10" stroke={style.accentColor || '#fff'} strokeWidth="2" />
        <circle cx="75" cy="18" r="3" fill={style.accentColor || '#fff'} />
        <text x="75" y="8" fill={style.accentColor || '#fff'} fontSize="5" textAnchor="middle">6:51 MIN/KM</text>
      </svg>
      <div className="text-[9px] text-center mt-1" style={{ color: style.textColor, opacity: 0.4 }}>MIN/KM</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 19. ITALIC TITLE — Large italic title with subtitle
// ──────────────────────────────────────────────────────────────
export function ItalicTitleSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-6 text-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-4xl font-serif italic font-bold" style={{ color: style.textColor }}>
        <EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} />
      </div>
      <div className="text-sm mt-2" style={{ color: style.textColor, opacity: 0.7 }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km. <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /km <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 20. LOCATION PILL — Pill with pin + location
// ──────────────────────────────────────────────────────────────
export function LocationPillSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="px-4 py-2 inline-flex items-center gap-2 shadow-lg" style={{ backgroundColor: style.backgroundColor, borderRadius: 9999, border: `1px solid ${style.borderColor}` }}>
      <MapPin className="w-4 h-4" style={{ color: style.accentColor }} />
      <span className="text-sm font-bold" style={{ color: style.textColor }}>
        <EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} />, <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 21. MAP ROUTE — Route map with location + stats
// ──────────────────────────────────────────────────────────────
export function MapRouteSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <svg className="w-full h-20 mb-2" viewBox="0 0 100 60" fill="none">
        <path d="M20,50 L25,35 L40,40 L55,15 L70,25 L80,10 L85,30" stroke={style.accentColor || '#fff'} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="20" cy="50" r="3" fill="#22c55e" />
        <circle cx="85" cy="30" r="3" fill="#ef4444" />
      </svg>
      <div className="text-[10px] text-center font-bold" style={{ color: style.textColor, opacity: 0.6 }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 22. SQUARE FRAME — Square bordered frame with distance tag
// ──────────────────────────────────────────────────────────────
export function SquareFrameSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-48 h-48 relative shadow-xl" style={{ border: `2px solid ${style.accentColor || '#3b82f6'}`, borderRadius: style.borderRadius, backgroundColor: style.backgroundColor }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: style.accentColor || '#3b82f6', color: '#fff' }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <EditableField value={metrics.unit} onSave={(v) => onEditField?.('unit', v)} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-[10px]" style={{ color: style.textColor, opacity: 0.3 }}>
        [FRAME]
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 23. COLORED BAR — Horizontal colored bar with metrics
// ──────────────────────────────────────────────────────────────
export function ColoredBarSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-64 shadow-xl" style={{ borderRadius: style.borderRadius, overflow: 'hidden' }}>
      <div className="flex" style={{ backgroundColor: '#ef4444' }}>
        <div className="px-4 py-2 text-white font-bold text-sm flex-1">
          <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM
        </div>
        <div className="px-4 py-2 text-white font-bold text-sm flex-1 text-right">
          <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
        </div>
      </div>
      <div className="px-4 py-1.5 flex justify-between text-[10px]" style={{ backgroundColor: '#f97316', color: '#fff' }}>
        <span>{metrics.date}</span>
        <span>{metrics.timeOfDay}</span>
      </div>
      <div className="px-4 py-2 text-center font-bold text-sm" style={{ backgroundColor: style.backgroundColor, color: style.textColor }}>
        <EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 24. DATA ROWS — Key-value data rows
// ──────────────────────────────────────────────────────────────
export function DataRowsSticker({ metrics, style, onEditField }: TProps) {
  const rows = [
    ['DISTANCE', metrics.distance + ' ' + metrics.unit],
    ['PACE', metrics.pace + ' /KM'],
    ['TIME', metrics.time],
    ['ELEVATION', metrics.elevation + ' M'],
    ['CALORIES', metrics.calories + ' CAL'],
    ['HEARTRATE', metrics.heartRate + ' BPM'],
  ];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between py-[2px] text-[11px]">
          <span className="uppercase" style={{ color: style.textColor, opacity: 0.6 }}>{k}</span>
          <span className="font-bold" style={{ color: style.textColor }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 25. CALENDAR CARD — Calendar icon + date + stats
// ──────────────────────────────────────────────────────────────
export function CalendarCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 flex flex-col items-center justify-center rounded" style={{ border: `1px solid ${style.accentColor}` }}>
          <div className="text-[7px] font-bold" style={{ color: style.accentColor }}>{metrics.date?.split(' ')[0] || '24'}</div>
          <div className="text-[10px] font-black" style={{ color: style.accentColor }}>{metrics.date?.split(' ')[1] || 'AUG'}</div>
        </div>
        <div>
          <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>{metrics.date}</div>
        </div>
      </div>
      <div className="text-2xl font-black" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sm">KM</span>
      </div>
      <div className="text-[10px] mt-1" style={{ color: style.accentColor }}><EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 26. WEEKLY LIST — Day list with distances
// ──────────────────────────────────────────────────────────────
export function WeeklyListSticker({ metrics, style, onEditField }: TProps) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  return (
    <div className="w-48 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {days.map((d, i) => (
        <div key={d} className="flex justify-between items-center py-[2px] text-[11px]">
          <span style={{ color: i === 0 ? style.accentColor : style.textColor, opacity: i === 0 ? 1 : 0.4, fontWeight: i === 0 ? 700 : 400 }}>{d} {i === 0 ? '•' : ''} {i === 0 ? metrics.distance + ' KM' : ''}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 27. DESCRIPTION CARD — Title + long description
// ──────────────────────────────────────────────────────────────
export function DescriptionCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="italic font-bold text-sm" style={{ color: style.accentColor }}>Run:</div>
      <div className="font-bold text-sm mt-0.5" style={{ color: style.textColor }}>
        <EditableField value={metrics.date?.split(' ').slice(0, 3).join(' ') || 'Monday, 24 August'} onSave={(v) => onEditField?.('date', v)} />
      </div>
      <div className="text-lg font-black mt-0.5" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> Km</div>
      <p className="text-[10px] mt-1 leading-relaxed" style={{ color: style.textColor, opacity: 0.6 }}>
        A steady pace of <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> perkm, conquering a <EditableField value={metrics.elevation} onSave={(v) => onEditField?.('elevation', v)} />m climb along the way
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 28. PACE ZONES — Horizontal zone bars
// ──────────────────────────────────────────────────────────────
export function PaceZonesSticker({ metrics, style, onEditField }: TProps) {
  const zones = [
    { label: 'Z5', pct: 10, color: '#ef4444' },
    { label: 'Z4', pct: 15, color: '#f97316' },
    { label: 'Z3', pct: 50, color: '#22c55e' },
    { label: 'Z2', pct: 40, color: '#3b82f6' },
    { label: 'Z1', pct: 5, color: '#a855f7' },
  ];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] font-bold mb-2" style={{ color: style.textColor }}>Pace Zones</div>
      {zones.map((z) => (
        <div key={z.label} className="flex items-center gap-2 mb-1">
          <span className="text-[9px] w-5" style={{ color: style.textColor, opacity: 0.5 }}>{z.label}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${style.borderColor}44` }}>
            <div className="h-full rounded-full" style={{ width: `${z.pct}%`, backgroundColor: z.color }} />
          </div>
          <span className="text-[8px] w-8 text-right" style={{ color: style.textColor, opacity: 0.4 }}>{z.pct}%</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 29. ELEVATION AREA — Area chart for elevation
// ──────────────────────────────────────────────────────────────
export function ElevationAreaSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] font-bold mb-1" style={{ color: style.textColor }}>Elevation</div>
      <div className="flex justify-between text-[9px] mb-1" style={{ color: style.textColor, opacity: 0.5 }}>
        <span>18m</span><span>30m</span>
      </div>
      <svg className="w-full h-12" viewBox="0 0 100 30" fill="none">
        <path d="M0,25 Q10,20 20,22 T40,15 T60,20 T80,10 T100,18 L100,30 L0,30 Z" fill={`${style.accentColor || '#6b7280'}33`} />
        <path d="M0,25 Q10,20 20,22 T40,15 T60,20 T80,10 T100,18" stroke={style.accentColor || '#6b7280'} strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 30. TEXT PARAGRAPH — Red text paragraph
// ──────────────────────────────────────────────────────────────
export function TextParagraphSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <p className="text-[11px] leading-relaxed" style={{ color: style.accentColor || '#ef4444' }}>
        Out early on <EditableField value={metrics.date} onSave={(v) => onEditField?.('date', v)} /> (<EditableField value={metrics.timeOfDay} onSave={(v) => onEditField?.('timeOfDay', v)} />
        ). Logged <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM with a <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> pace. Warm run, steady at 175 spm with <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> BPM avg.
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 31. HIGHLIGHT BAR — Blue/lime highlight bar
// ──────────────────────────────────────────────────────────────
export function HighlightBarSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-64 px-4 py-2 shadow-xl" style={{ backgroundColor: '#3b82f6', borderRadius: style.borderRadius }}>
      <div className="text-xl font-black text-white text-center">
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM / <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 32. KILOMETRES BOLD — "8.43 KILOMETRES" bold with dot
// ──────────────────────────────────────────────────────────────
export function KilometresBoldSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-3 flex items-center gap-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: style.accentColor }} />
      <div>
        <div className="text-lg font-black uppercase tracking-wider" style={{ color: style.textColor }}>
          <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KILOMETRES
        </div>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: style.textColor, opacity: 0.5 }}>
          <EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 33. TRADEMARK STYLE — "MONDAY™" with coordinates
// ──────────────────────────────────────────────────────────────
export function TrademarkStyleSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-3xl font-black uppercase" style={{ color: style.textColor }}>
        <EditableField value={metrics.date?.split(' ')[0] || 'MONDAY'} onSave={(v) => onEditField?.('date', v)} /><span className="text-sm align-super">™</span>
      </div>
      <div className="text-xl font-black" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /><EditableField value={metrics.unit} onSave={(v) => onEditField?.('unit', v)} />/<EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /><span className="text-sm">"</span>
      </div>
      <div className="text-sm" style={{ color: style.textColor, opacity: 0.6 }}>-6.227, 107<span className="align-super">®</span></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 34. HEART PILL — Red heart pill badge
// ──────────────────────────────────────────────────────────────
export function HeartPillSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="px-5 py-2.5 inline-flex items-center gap-2 shadow-lg" style={{ backgroundColor: '#ef4444', borderRadius: 9999 }}>
      <Heart className="w-5 h-5 text-white fill-white" />
      <span className="text-white font-bold text-sm"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 35. LED CLOCK — LED clock display
// ──────────────────────────────────────────────────────────────
export function LedClockSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 text-center shadow-xl" style={{ backgroundColor: '#0a0a0a', borderRadius: style.borderRadius, border: `1px solid #1f1f1f` }}>
      <div className="text-3xl font-led tracking-widest" style={{ color: '#ef4444' }}>
        <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 36. BOLD LOCATION — Large location name
// ──────────────────────────────────────────────────────────────
export function BoldLocationSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-2xl font-black uppercase" style={{ color: style.textColor }}>
        <EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} />
      </div>
      <div className="text-xs mt-0.5" style={{ color: style.textColor, opacity: 0.5 }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <EditableField value={metrics.unit} onSave={(v) => onEditField?.('unit', v)} /> / <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 37. ROUTE NUMBER — Large number + small map
// ──────────────────────────────────────────────────────────────
export function RouteNumberSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 flex items-center gap-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-3xl font-black" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />
      </div>
      <div className="flex-1">
        <svg className="w-full h-10" viewBox="0 0 60 30" fill="none">
          <path d="M5,25 L15,10 L30,20 L45,8 L55,15" stroke={style.accentColor || '#6b7280'} strokeWidth="1.5" fill="none" />
        </svg>
        <div className="text-[9px]" style={{ color: style.textColor, opacity: 0.5 }}>
          <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> Bpm • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /Km • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 38. APP WIDGET — Small app widget
// ──────────────────────────────────────────────────────────────
export function AppWidgetSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-48 p-2.5 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-center gap-1.5 mb-1.5 pb-1.5" style={{ borderBottom: `1px solid ${style.borderColor}` }}>
        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: style.accentColor }}>
          <Footprints className="w-3 h-3 text-white" />
        </div>
        <span className="text-[10px] font-bold" style={{ color: style.textColor }}>Run</span>
      </div>
      <div className="flex justify-between text-[9px]" style={{ color: style.textColor }}>
        <div><div className="text-[7px] opacity-50">Time</div><div className="font-bold">{metrics.timeOfDay}</div></div>
        <div><div className="text-[7px] opacity-50">Distance</div><div className="font-bold" style={{ color: style.accentColor }}>{metrics.distance} KM</div></div>
        <div><div className="text-[7px] opacity-50">Pace</div><div className="font-bold">{metrics.pace}</div></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 39. MONEY TAG — Currency/tag style
// ──────────────────────────────────────────────────────────────
export function MoneyTagSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="px-4 py-2 inline-flex items-center gap-2 shadow-lg" style={{ backgroundColor: '#facc15', borderRadius: 9999 }}>
      <span className="text-black font-bold text-sm">↑</span>
      <Zap className="w-4 h-4 text-black" />
      <span className="text-black font-bold text-sm">
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM, <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 40. MULTILINGUAL — Running in multiple languages
// ──────────────────────────────────────────────────────────────
export function MultilingualSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <p className="text-xs" style={{ color: style.textColor }}>
        RUNNING/БЕГ/ТР'E∃IMO/الجري/달리기/लौकी/跑歩
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 41. SIMPLE TABLE — Simple 3-row table
// ──────────────────────────────────────────────────────────────
export function SimpleTableSticker({ metrics, style, onEditField }: TProps) {
  const rows = [
    [metrics.distance + ' KM', ''],
    [metrics.pace + '"', ''],
    [metrics.time, ''],
  ];
  return (
    <div className="w-48 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {rows.map(([val], i) => (
        <div key={i} className="flex justify-between px-3 py-1.5 text-sm" style={{ borderBottom: i < 2 ? `1px solid ${style.borderColor}` : 'none', color: style.textColor }}>
          <span className="font-bold">{val}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 42. REPEAT TEXT — Repeating text block
// ──────────────────────────────────────────────────────────────
export function RepeatTextSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-lg font-black" style={{ color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <EditableField value={metrics.unit} onSave={(v) => onEditField?.('unit', v)} />
      </div>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="text-[10px] leading-tight" style={{ color: style.textColor, opacity: 0.3 + (i * 0.1) }}>
          <EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} />
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 43. MONTHLY TOTAL — Monthly total + percentage
// ──────────────────────────────────────────────────────────────
export function MonthlyTotalSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl text-center" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: style.textColor, opacity: 0.5 }}>MONTHLY</div>
      <div className="text-2xl font-black" style={{ color: style.textColor }}>239,23 KM</div>
      <div className="text-xs font-bold" style={{ color: '#22c55e' }}>↑140.2%</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 44. WEEKLY DOTS — Weekly dot chart
// ──────────────────────────────────────────────────────────────
export function WeeklyDotsSticker({ metrics, style, onEditField }: TProps) {
  const days = [
    { day: 'MONDAY', km: 8.4, color: '#f97316' },
    { day: 'TUESDAY', km: 7.6, color: '#f97316' },
    { day: 'WEDNESDAY', km: 10.0, color: '#f97316' },
    { day: 'THURSDAY', km: 7.8, color: '#f97316' },
    { day: 'FRIDAY', km: 10.5, color: '#f97316' },
    { day: 'SATURDAY', km: 8.6, color: '#f97316' },
    { day: 'SUNDAY', km: 6.0, color: '#f97316' },
  ];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {days.map((d) => (
        <div key={d.day} className="flex items-center gap-2 py-[2px]">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
          <span className="text-[9px] flex-1" style={{ color: style.textColor, opacity: 0.6 }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 45. WEEKLY SUMMARY — Weekly summary with mini bar chart
// ──────────────────────────────────────────────────────────────
export function WeeklySummarySticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: style.textColor, opacity: 0.5 }}>this week</div>
      <div className="flex justify-between">
        <div>
          <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>DISTANCE</div>
          <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-[10px]">km</span></div>
        </div>
        <div>
          <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>TIME</div>
          <div className="text-lg font-black" style={{ color: style.textColor }}>{metrics.time}</div>
        </div>
      </div>
      <div className="flex items-end gap-1 h-8 mt-2">
        {[1, 0, 0, 0, 0, 0, 0].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full rounded-t" style={{ height: h ? '100%' : '4px', backgroundColor: h ? style.accentColor : `${style.borderColor}44` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1 text-[7px] mt-0.5" style={{ color: style.textColor, opacity: 0.3 }}>
        <span className="flex-1 text-center">M</span><span className="flex-1 text-center">T</span><span className="flex-1 text-center">W</span><span className="flex-1 text-center">T</span><span className="flex-1 text-center">F</span><span className="flex-1 text-center">S</span><span className="flex-1 text-center">S</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 46. WEEKLY TABLE — THIS WEEK table
// ──────────────────────────────────────────────────────────────
export function WeeklyTableSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex justify-between text-[10px] font-bold pb-1 mb-1" style={{ borderBottom: `1px solid ${style.borderColor}`, color: style.textColor, opacity: 0.5 }}>
        <span>THIS WEEK</span><span>KM</span>
      </div>
      <div className="flex justify-between text-[11px] py-0.5" style={{ color: style.textColor }}>
        <span><EditableField value={metrics.date?.split(' ')[0] || 'MONDAY'} onSave={(v) => onEditField?.('date', v)} /></span>
        <span className="font-bold">{metrics.distance}</span>
      </div>
      <div className="flex justify-between text-[11px] py-0.5 border-t font-bold" style={{ borderColor: style.borderColor, color: style.textColor }}>
        <span>TOTAL</span><span>{metrics.distance}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 47. CIRCLE GRID — Circle grid chart
// ──────────────────────────────────────────────────────────────
export function CircleGridSticker({ metrics, style, onEditField }: TProps) {
  const values = [8.1, 17.3, 7.3, 10.1, 5, 5.8, 5.2, 10.7, 11.2, 10.3, 7.3, 17.2, 7.2, 14.1, 15.1, 10.1];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-center text-sm font-black mb-2" style={{ color: style.textColor }}>239.23 KM</div>
      <div className="grid grid-cols-7 gap-1">
        {values.map((v, i) => (
          <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[6px] font-bold text-white" style={{ backgroundColor: v > 10 ? '#ef4444' : '#f97316' }}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 48. MONTHLY CHART — Monthly bar chart
// ──────────────────────────────────────────────────────────────
export function MonthlyChartSticker({ metrics, style, onEditField }: TProps) {
  const bars = [60, 80, 45, 90, 70, 85, 55, 95, 75, 65, 80, 50];
  return (
    <div className="w-60 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex justify-between text-[9px] mb-1" style={{ color: style.textColor, opacity: 0.5 }}>
        <span>239.23 KM</span><span>06:40/KM</span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 7 ? '#ffffff' : `${style.accentColor || '#ffffff'}44` }} />
        ))}
      </div>
      <div className="text-center text-[10px] font-bold mt-1" style={{ color: style.textColor }}>THIS MONTH</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 49. PROGRESS PCT — Monthly distance progress percentage
// ──────────────────────────────────────────────────────────────
export function ProgressPctSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-xs font-bold" style={{ color: style.textColor }}>Monthly Distance Progress</div>
      <div className="text-4xl font-black mt-1" style={{ color: style.textColor }}>▲140,2%</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 50. AREA CHART WEEKLY — Area chart for weekly
// ──────────────────────────────────────────────────────────────
export function AreaChartWeeklySticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-center text-[10px]" style={{ color: style.accentColor || '#ef4444' }}>this week</div>
      <div className="text-center font-bold text-sm" style={{ color: style.accentColor || '#ef4444' }}>(<EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> kilometres)</div>
      <svg className="w-full h-14 mt-1" viewBox="0 0 100 30" fill="none">
        <path d="M0,5 Q20,10 40,20 T80,25 T100,28 L100,30 L0,30 Z" fill={`${style.accentColor || '#6366f1'}22`} />
        <path d="M0,5 Q20,10 40,20 T80,25 T100,28" stroke={style.accentColor || '#6366f1'} strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 51. DOT PROGRESS — Dot progress indicator
// ──────────────────────────────────────────────────────────────
export function DotProgressSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl text-center" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: style.textColor, opacity: 0.5 }}>this week</div>
      <div className="text-3xl font-black mt-1" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /><span className="text-sm font-normal">km</span></div>
      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 0 ? style.accentColor : `${style.borderColor}66` }} />
        ))}
      </div>
      <div className="text-[9px] mt-1" style={{ color: style.textColor, opacity: 0.4 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="mx-[3px]">{['S','M','T','W','T','F','S'][i]}</span>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 52. SQUARE PROGRESS — Green square progress blocks
// ──────────────────────────────────────────────────────────────
export function SquareProgressSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: style.textColor, opacity: 0.5 }}>this week</div>
      <div className="text-sm font-bold mt-0.5" style={{ color: '#84cc16' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> kilometres</div>
      <div className="flex gap-1 mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-5 h-5 border" style={{ borderColor: i === 0 ? '#84cc16' : `${style.borderColor}44`, backgroundColor: i === 0 ? '#84cc16' : 'transparent' }} />
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 53. VERTICAL BARS — Vertical bar chart (Mon-Sun)
// ──────────────────────────────────────────────────────────────
export function VerticalBarsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-end gap-1.5 h-20 mb-1">
        {[90, 10, 10, 10, 10, 10, 10].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full rounded-t" style={{ height: `${h}%`, backgroundColor: i === 0 ? style.accentColor || '#fff' : `${style.accentColor || '#fff'}33` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 text-[8px]" style={{ color: style.textColor, opacity: 0.4 }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <span key={d} className="flex-1 text-center">{d}</span>
        ))}
      </div>
      <div className="text-center text-[10px] mt-1" style={{ color: style.textColor }}>Total : <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 54. STACKED DAYS — Stacked day names with distances
// ──────────────────────────────────────────────────────────────
export function StackedDaysSticker({ metrics, style, onEditField }: TProps) {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex">
        <div className="flex-1 space-y-[1px]">
          {days.map((d, i) => (
            <div key={d} className="text-[10px] font-bold" style={{ color: style.textColor, opacity: i === 0 ? 1 : 0.4 }}>
              <EditableField value={d} onSave={() => {}} />
            </div>
          ))}
        </div>
        <div className="text-right space-y-[1px]">
          {days.map((d, i) => (
            <div key={d} className="text-[10px]" style={{ color: style.textColor, opacity: i === 0 ? 1 : 0.3 }}>
              {i === 0 ? <>{metrics.distance} KILOMETRES</> : '0 KILOMETRES'}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t mt-1 pt-1 text-[10px] font-bold" style={{ borderColor: style.borderColor, color: style.textColor }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM WEEKLY
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 55. RUNNING TOTAL — "running this week Total"
// ──────────────────────────────────────────────────────────────
export function RunningTotalSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-lg font-bold" style={{ color: style.textColor }}>running this week</div>
      <div className="text-2xl font-black" style={{ color: style.textColor }}>Total: <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />km</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 56. WEEKLY MAP — Weekly total with small map
// ──────────────────────────────────────────────────────────────
export function WeeklyMapSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl text-center" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>weekly total</div>
      <div className="text-xl font-black" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />km</div>
      <svg className="w-10 h-10 mx-auto mt-1" viewBox="0 0 30 30" fill="none">
        <path d="M5,25 L10,10 L20,15 L25,5" stroke={style.accentColor || '#6b7280'} strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 57. GRADIENT MESH — Gradient mesh background
// ──────────────────────────────────────────────────────────────
export function GradientMeshSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 h-40 p-4 flex flex-col justify-end relative overflow-hidden shadow-xl" style={{ borderRadius: style.borderRadius }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
      <div className="relative z-10">
        <div className="text-3xl font-black text-white"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sm">KM</span></div>
        <div className="text-xs text-white/70"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 58. NEO BRUTALIST — Harsh black/white brutalist
// ──────────────────────────────────────────────────────────────
export function NeoBrutalistSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 bg-white text-black font-mono shadow-[4px_4px_0px_0px_#000] border-2 border-black" style={{ borderRadius: 0 }}>
      <div className="text-[9px] uppercase tracking-widest border-b-2 border-black pb-1 mb-1">RUN DATA</div>
      <div className="text-2xl font-black">{metrics.distance} KM</div>
      <div className="text-xs">{metrics.pace} /KM • {metrics.time}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 59. GLASS CARD — Glassmorphism card
// ──────────────────────────────────────────────────────────────
export function GlassCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 backdrop-blur-xl shadow-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: style.borderRadius, border: '1px solid rgba(255,255,255,0.2)' }}>
      <div className="text-[10px] uppercase tracking-wider text-white/50">Running Stats</div>
      <div className="text-3xl font-black text-white mt-1"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sm">KM</span></div>
      <div className="flex gap-3 mt-2 text-xs text-white/70">
        <span>⏱ {metrics.time}</span>
        <span>📍 {metrics.location}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 60. NEON GLOW — Neon glowing outline
// ──────────────────────────────────────────────────────────────
export function NeonGlowSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 text-center shadow-xl" style={{ borderRadius: style.borderRadius, border: `2px solid ${style.accentColor || '#00ffcc'}`, boxShadow: `0 0 15px ${style.accentColor || '#00ffcc'}44, inset 0 0 15px ${style.accentColor || '#00ffcc'}11`, backgroundColor: '#050515' }}>
      <div className="text-[10px] tracking-widest" style={{ color: `${style.accentColor || '#00ffcc'}88` }}>TELEMETRY</div>
      <div className="text-3xl font-black my-1" style={{ color: style.accentColor || '#00ffcc' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px]" style={{ color: `${style.accentColor || '#00ffcc'}aa` }}>{metrics.pace} /KM • {metrics.heartRate} BPM</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 61. FILM STRIP — Film strip frame
// ──────────────────────────────────────────────────────────────
export function FilmStripSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl" style={{ backgroundColor: '#000', borderRadius: 4 }}>
      <div className="flex gap-0.5 px-1 py-1">
        {[0,1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#333' }} />)}
      </div>
      <div className="px-3 py-2 bg-zinc-900 border-y border-zinc-700">
        <div className="text-sm font-bold text-white"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></div>
        <div className="text-xs text-zinc-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.date} onSave={(v) => onEditField?.('date', v)} /></div>
      </div>
      <div className="flex gap-0.5 px-1 py-1">
        {[0,1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#333' }} />)}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 62. NEWSPAPER COLUMN — Multi-column newspaper
// ──────────────────────────────────────────────────────────────
export function NewspaperColumnSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-3 bg-amber-50 text-stone-900 font-serif shadow-xl border-2 border-stone-800" style={{ borderRadius: 0 }}>
      <div className="text-center text-[8px] uppercase tracking-[0.2em] border-b border-stone-800 pb-1 mb-1">THE DAILY RUNNER GAZETTE</div>
      <div className="columns-2 gap-2 text-[10px] leading-relaxed">
        <div className="font-bold text-sm uppercase mb-1">RAN <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <p>Completed in <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /> with average pace of <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} />.</p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 63. TERMINAL GREEN — Green terminal on black
// ──────────────────────────────────────────────────────────────
export function TerminalGreenSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 font-mono text-xs shadow-xl" style={{ backgroundColor: '#0a0a0a', borderRadius: 4, border: '1px solid #1a3a1a' }}>
      <div className="text-[9px] text-green-800 mb-1">$ run --stats --format=verbose</div>
      <div className="text-green-400">distance: <span className="text-green-300">{metrics.distance} km</span></div>
      <div className="text-green-400">pace: <span className="text-green-300">{metrics.pace}/km</span></div>
      <div className="text-green-400">time: <span className="text-green-300">{metrics.time}</span></div>
      <div className="text-green-400">hr: <span className="text-green-300">{metrics.heartRate} bpm</span></div>
      <div className="text-green-700 mt-1">status: <span className="text-green-400">200 OK</span></div>
      <div className="text-green-500 animate-pulse">▌</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 64. VHS RETRO — VHS tape / retro TV
// ──────────────────────────────────────────────────────────────
export function VhsRetroSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: '#1a1a2e', borderRadius: 8, border: '2px solid #333' }}>
      <div className="flex items-center gap-1 mb-1">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[8px] text-red-400 font-bold tracking-widest">REC</span>
        <span className="text-[8px] text-zinc-500 ml-auto">00:01:00</span>
      </div>
      <div className="text-center py-2">
        <div className="text-xl font-black text-white tracking-widest" style={{ fontFamily: 'monospace' }}>
          <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM
        </div>
      </div>
      <div className="text-[8px] text-center text-zinc-500">SP • LP • EP</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 65. NOTEBOOK LINE — Lined notebook paper
// ──────────────────────────────────────────────────────────────
export function NotebookLineSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#fefce8', borderRadius: 4, border: '1px solid #e5e5e5', backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #dbeafe 23px, #dbeafe 24px)' }}>
      <div className="pl-4 border-l-2 border-red-400">
        <div className="text-sm font-handwritten text-stone-800">
          <EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} />
        </div>
        <div className="text-xs font-handwritten text-stone-600 mt-1">
          <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 66. BLUEPRINT — Technical drawing style
// ──────────────────────────────────────────────────────────────
export function BlueprintSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: '#1e3a5f', borderRadius: 4, border: '1px solid #2563eb' }}>
      <div className="text-[8px] text-blue-300 uppercase tracking-widest mb-2 border-b border-blue-600 pb-1">TECHNICAL SPEC // RUN DATA</div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div><span className="text-blue-400">DIST:</span> <span className="text-white font-bold">{metrics.distance} KM</span></div>
        <div><span className="text-blue-400">PACE:</span> <span className="text-white font-bold">{metrics.pace}</span></div>
        <div><span className="text-blue-400">TIME:</span> <span className="text-white font-bold">{metrics.time}</span></div>
        <div><span className="text-blue-400">HR:</span> <span className="text-white font-bold">{metrics.heartRate}</span></div>
      </div>
      <svg className="w-full h-6 mt-2" viewBox="0 0 100 15">
        <path d="M0,7 L20,7 L25,2 L40,12 L55,5 L70,10 L100,7" stroke="#60a5fa" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 67. EMBOSSED — Letterpress / embossed style
// ──────────────────────────────────────────────────────────────
export function EmbossedSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 text-center shadow-xl" style={{ backgroundColor: '#f5f5f4', borderRadius: 8, border: '1px solid #d6d3d1' }}>
      <div className="text-3xl font-black text-stone-300" style={{ textShadow: '1px 1px 0 #fff, -1px -1px 0 #d4d4d4' }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-lg">KM</span>
      </div>
      <div className="text-xs text-stone-400 mt-1" style={{ textShadow: '0 1px 0 #fff' }}>
        <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 68. METALLIC — Metallic/steel plate
// ──────────────────────────────────────────────────────────────
export function MetallicSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ background: 'linear-gradient(135deg, #b0b0b0, #e0e0e0, #b0b0b0)', borderRadius: 8, border: '2px solid #888' }}>
      <div className="text-center">
        <div className="text-[8px] uppercase tracking-[0.3em] text-stone-600 font-bold border-b border-stone-400 pb-0.5 mb-1">SHARE STUDIO™</div>
        <div className="text-2xl font-black text-stone-800" style={{ textShadow: '0 1px 0 #fff' }}>
          <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM
        </div>
        <div className="text-[10px] text-stone-600 font-mono"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 69. PIXEL ART — Pixel art style
// ──────────────────────────────────────────────────────────────
export function PixelArtSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: '#000', borderRadius: 0, border: '4px solid #333', imageRendering: 'pixelated' }}>
      <div className="text-center">
        <div className="text-lg font-led text-green-400 tracking-wider"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
        <div className="text-[8px] text-green-600 mt-1">KM | PACE: {metrics.pace} | TIME: {metrics.time}</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 70. ACHIEVEMENT — Gaming achievement popup
// ──────────────────────────────────────────────────────────────
export function AchievementSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-64 p-2 flex items-center gap-3 shadow-xl" style={{ backgroundColor: '#1a1a2e', borderRadius: 8, border: '1px solid #facc15' }}>
      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
        <Trophy className="w-6 h-6 text-black" />
      </div>
      <div>
        <div className="text-[8px] text-yellow-500 uppercase tracking-widest font-bold">Achievement Unlocked</div>
        <div className="text-xs text-white font-bold mt-0.5"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM RUN</div>
        <div className="text-[9px] text-zinc-400"><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /> • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 71. LEADERBOARD — Ranking / leaderboard
// ──────────────────────────────────────────────────────────────
export function LeaderboardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-52 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-2 font-bold" style={{ color: style.accentColor }}>Leaderboard</div>
      {[{rank:'1',name:'You',km:metrics.distance,highlight:true},{rank:'2',name:'Runner A',km:'7.20'},{rank:'3',name:'Runner B',km:'5.80'},{rank:'4',name:'Runner C',km:'4.30'}].map((r) => (
        <div key={r.rank} className="flex items-center gap-2 py-1 text-[10px]" style={{ color: r.highlight ? style.accentColor : style.textColor, fontWeight: r.highlight ? 700 : 400 }}>
          <span className="w-4 font-bold">{r.rank}</span>
          <span className="flex-1">{r.name}</span>
          <span className="font-mono">{r.km} km</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 72. COUNTDOWN — Countdown timer
// ──────────────────────────────────────────────────────────────
export function CountdownSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl text-center" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[9px] uppercase tracking-widest" style={{ color: style.textColor, opacity: 0.5 }}>Target: Marathon</div>
      <div className="flex justify-center gap-2 mt-2">
        {[{ n: '21', l: 'DAYS' }, { n: '1', l: 'HRS' }, { n: '07', l: 'MIN' }].map((t) => (
          <div key={t.l} className="text-center">
            <div className="text-2xl font-black" style={{ color: style.accentColor }}>{t.n}</div>
            <div className="text-[7px] uppercase" style={{ color: style.textColor, opacity: 0.4 }}>{t.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 73. PROGRESS RING — Circular progress ring
// ──────────────────────────────────────────────────────────────
export function ProgressRingSticker({ metrics, style, onEditField }: TProps) {
  const pct = 72;
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="w-40 h-40 flex flex-col items-center justify-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: '50%', border: `1px solid ${style.borderColor}` }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke={`${style.borderColor}44`} strokeWidth="5" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={style.accentColor || '#00E5FF'} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 40 40)" />
      </svg>
      <div className="text-lg font-black -mt-14" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
      <div className="text-[8px] -mt-1" style={{ color: style.textColor, opacity: 0.5 }}>{pct}% COMPLETE</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 74. RADIAL CHART — Spider / radar chart
// ──────────────────────────────────────────────────────────────
export function RadialChartSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-52 p-3 shadow-xl text-center" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <svg className="w-full h-24" viewBox="0 0 100 80">
        <polygon points="50,5 95,30 80,70 20,70 5,30" fill="none" stroke={`${style.borderColor}44`} strokeWidth="0.5" />
        <polygon points="50,5 95,30 80,70 20,70 5,30" fill={`${style.accentColor || '#00E5FF'}22`} stroke={style.accentColor || '#00E5FF'} strokeWidth="1" />
        <polygon points="50,15 80,33 72,60 28,60 20,33" fill={`${style.accentColor || '#00E5FF'}11`} stroke={`${style.accentColor || '#00E5FF'}44`} strokeWidth="0.5" />
      </svg>
      <div className="text-[9px] font-bold" style={{ color: style.accentColor }}>Fitness Score: 8.5/10</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 75. HEATMAP — Heatmap grid
// ──────────────────────────────────────────────────────────────
export function HeatmapSticker({ metrics, style, onEditField }: TProps) {
  const data = [0.3,0.7,0.5,0.9,0.4,0.8,0.2,0.6,1.0,0.3,0.7,0.5,0.8,0.4,0.9,0.1,0.6,0.8,0.3,0.5,0.7,0.2,0.9,0.4,0.6,0.8,0.3,0.5];
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] font-bold mb-2" style={{ color: style.textColor }}>Activity Heatmap</div>
      <div className="grid grid-cols-7 gap-1">
        {data.map((v, i) => (
          <div key={i} className="w-5 h-5 rounded-sm" style={{ backgroundColor: `rgba(34,197,94,${v})` }} />
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 76. TIMELINE — Vertical timeline
// ──────────────────────────────────────────────────────────────
export function TimelineSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-52 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] font-bold mb-2" style={{ color: style.accentColor }}>RUN TIMELINE</div>
      {metrics.splits.slice(0, 5).map((s, i) => (
        <div key={s.km} className="flex items-start gap-2 pb-2 relative">
          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: style.accentColor }} />
          {i < 4 && <div className="absolute left-[3px] top-2.5 w-px h-full" style={{ backgroundColor: style.borderColor }} />}
          <div className="text-[10px]" style={{ color: style.textColor }}>
            <span className="font-bold">KM {s.km}</span> — {s.pace}
          </div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 77. TAB UI — Tab UI component
// ──────────────────────────────────────────────────────────────
export function TabUiSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex border-b" style={{ borderColor: style.borderColor }}>
        {['Stats', 'Map', 'Splits'].map((t, i) => (
          <div key={t} className="flex-1 text-center py-1.5 text-[10px] font-bold" style={{ color: i === 0 ? style.accentColor : style.textColor, opacity: i === 0 ? 1 : 0.4, borderBottom: i === 0 ? `2px solid ${style.accentColor}` : 'none' }}>{t}</div>
        ))}
      </div>
      <div className="p-3 text-center">
        <div className="text-2xl font-black" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sm">KM</span></div>
        <div className="text-[10px] mt-1" style={{ color: style.textColor, opacity: 0.5 }}>{metrics.pace} /KM • {metrics.time}</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 78. CARD STACK — Stacked cards
// ──────────────────────────────────────────────────────────────
export function CardStackSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="relative w-52 h-32">
      <div className="absolute inset-0 bg-zinc-800 rounded-lg shadow-lg transform rotate-3 translate-x-1 translate-y-1" />
      <div className="absolute inset-0 bg-zinc-700 rounded-lg shadow-lg transform -rotate-1" />
      <div className="absolute inset-0 p-3 rounded-lg shadow-xl" style={{ backgroundColor: style.backgroundColor, border: `1px solid ${style.borderColor}` }}>
        <div className="text-lg font-black" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-[10px] mt-1" style={{ color: style.textColor, opacity: 0.6 }}>{metrics.pace} • {metrics.time}</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 79. RIBBON — Achievement ribbon
// ──────────────────────────────────────────────────────────────
export function RibbonSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="relative inline-block shadow-xl">
      <div className="px-6 py-2 text-center font-black text-sm" style={{ backgroundColor: style.accentColor || '#facc15', color: '#000', borderRadius: 4 }}>
        <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} />
      </div>
      <div className="absolute -bottom-2 left-0 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderTop: `8px solid ${(style.accentColor || '#facc15')}aa` }} />
      <div className="absolute -bottom-2 right-0 w-0 h-0" style={{ borderRight: '8px solid transparent', borderTop: `8px solid ${(style.accentColor || '#facc15')}aa` }} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 80. NOTIFICATION — Push notification
// ──────────────────────────────────────────────────────────────
export function NotificationSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-2.5 flex items-center gap-2.5 shadow-xl" style={{ backgroundColor: '#27272a', borderRadius: 16, border: '1px solid #3f3f46' }}>
      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
        <Footprints className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-white">ShareStudio</span>
          <span className="text-[8px] text-zinc-500">now</span>
        </div>
        <div className="text-[10px] text-zinc-300 truncate">Completed <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM run!</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 81. MUSIC PLAYER — Music player widget
// ──────────────────────────────────────────────────────────────
export function MusicPlayerSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: '#1a1a2e', borderRadius: 12, border: '1px solid #2d2d44' }}>
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">🏃</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-white truncate"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></div>
          <div className="text-[10px] text-zinc-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM Run</div>
        </div>
      </div>
      <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
        <div className="bg-purple-500 h-full w-2/3 rounded-full" />
      </div>
      <div className="flex justify-between text-[8px] text-zinc-500 mt-0.5">
        <span>1:23</span><span>2:07</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 82. WEATHER CARD — Weather + run context
// ──────────────────────────────────────────────────────────────
export function WeatherCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-52 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>{metrics.location}</div>
          <div className="text-2xl font-black" style={{ color: style.textColor }}>28°C</div>
        </div>
        <Sun className="w-8 h-8" style={{ color: '#facc15' }} />
      </div>
      <div className="border-t mt-2 pt-2 text-[10px]" style={{ borderColor: style.borderColor, color: style.textColor, opacity: 0.7 }}>
        Ran <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM at {metrics.timeOfDay}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 83. SPLITS BAR CHART — Horizontal splits bar chart
// ──────────────────────────────────────────────────────────────
export function SplitsBarChartSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] font-bold mb-2" style={{ color: style.accentColor }}>KM SPLITS</div>
      {metrics.splits.slice(0, 6).map((s) => (
        <div key={s.km} className="flex items-center gap-2 mb-1">
          <span className="text-[9px] w-6" style={{ color: style.textColor, opacity: 0.5 }}>KM{s.km}</span>
          <div className="flex-1 h-3 rounded" style={{ backgroundColor: `${style.borderColor}44` }}>
            <div className="h-full rounded" style={{ width: `${60 + Math.random() * 30}%`, backgroundColor: style.accentColor || '#3b82f6' }} />
          </div>
          <span className="text-[9px] font-mono w-8 text-right" style={{ color: style.textColor }}>{s.pace}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 84. STACKED METRICS — Vertical stacked metrics
// ──────────────────────────────────────────────────────────────
export function StackedMetricsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-48 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {[
        { label: 'DISTANCE', val: metrics.distance + ' KM', color: style.accentColor },
        { label: 'PACE', val: metrics.pace + '/KM', color: style.textColor },
        { label: 'TIME', val: metrics.time, color: style.textColor },
        { label: 'HR', val: metrics.heartRate + ' BPM', color: style.textColor },
      ].map((m, i) => (
        <div key={i} className="py-1" style={{ borderBottom: i < 3 ? `1px solid ${style.borderColor}` : 'none' }}>
          <div className="text-[7px] uppercase tracking-wider" style={{ color: style.textColor, opacity: 0.4 }}>{m.label}</div>
          <div className="text-sm font-black" style={{ color: m.color }}>{m.val}</div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 85. RUNNING MAN — Large running figure + stats
// ──────────────────────────────────────────────────────────────
export function RunningManSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 flex items-center gap-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-4xl">🏃</div>
      <div>
        <div className="text-2xl font-black" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sm">KM</span></div>
        <div className="text-[10px] mt-0.5" style={{ color: style.textColor, opacity: 0.6 }}>
          <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /> • <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 86. BORDERED FRAME — Double border elegant frame
// ──────────────────────────────────────────────────────────────
export function BorderedFrameSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-1 shadow-xl" style={{ border: `3px double ${style.accentColor || '#fff'}`, borderRadius: style.borderRadius, backgroundColor: style.backgroundColor }}>
      <div className="p-3 text-center" style={{ border: `1px solid ${style.borderColor}` }}>
        <div className="text-[8px] uppercase tracking-[0.3em]" style={{ color: style.accentColor }}>SHARE STUDIO</div>
        <div className="text-3xl font-black my-1" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sm">KM</span></div>
        <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 87. STAT RIBBON — Horizontal stat ribbon
// ──────────────────────────────────────────────────────────────
export function StatRibbonSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="flex shadow-xl" style={{ borderRadius: style.borderRadius, overflow: 'hidden' }}>
      {[
        { val: metrics.distance + ' KM', bg: style.accentColor || '#3b82f6', color: '#fff' },
        { val: metrics.pace, bg: '#18181b', color: style.textColor },
        { val: metrics.time, bg: '#27272a', color: style.textColor },
      ].map((s, i) => (
        <div key={i} className="px-3 py-2 text-xs font-bold text-center" style={{ backgroundColor: s.bg, color: s.color }}>
          {s.val}
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 88. DOT MATRIX — Dot matrix printer style
// ──────────────────────────────────────────────────────────────
export function DotMatrixSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: '#f5f5dc', borderRadius: 4, border: '1px solid #d4d0b8', fontFamily: 'monospace' }}>
      <div className="text-[10px] text-stone-700 border-b border-dashed border-stone-400 pb-1 mb-1">
        ═══ SHARE STUDIO ═══
      </div>
      <div className="text-[10px] text-stone-700 space-y-0.5">
        <div>DISTANCE . . . . {metrics.distance} KM</div>
        <div>PACE . . . . . . {metrics.pace}/KM</div>
        <div>TIME . . . . . . {metrics.time}</div>
        <div>HEART RATE . . . {metrics.heartRate} BPM</div>
      </div>
      <div className="text-[10px] text-stone-700 border-t border-dashed border-stone-400 mt-1 pt-1 text-center">
        |||||||||||||||||||||||
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 89. BADGE COLLECTION — Row of mini badges
// ──────────────────────────────────────────────────────────────
export function BadgeCollectionSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="flex gap-1.5 flex-wrap shadow-xl p-2" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {[
        { icon: '🏃', val: metrics.distance + ' KM' },
        { icon: '⏱', val: metrics.pace },
        { icon: '❤️', val: metrics.heartRate },
        { icon: '🔥', val: metrics.calories },
      ].map((b, i) => (
        <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${style.accentColor}22`, color: style.accentColor, border: `1px solid ${style.accentColor}44` }}>
          <span>{b.icon}</span><span>{b.val}</span>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 90. MINI MAP — Small map with route
// ──────────────────────────────────────────────────────────────
export function MiniMapSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-52 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="h-20 relative overflow-hidden" style={{ backgroundColor: '#1a2332' }}>
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <path d="M10,40 L25,15 L45,30 L60,10 L80,25 L90,15" stroke={style.accentColor || '#3b82f6'} strokeWidth="2" fill="none" />
          <circle cx="10" cy="40" r="3" fill="#22c55e" />
          <circle cx="90" cy="15" r="3" fill="#ef4444" />
        </svg>
      </div>
      <div className="p-2 text-[10px] flex justify-between" style={{ color: style.textColor }}>
        <span className="font-bold"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
        <span style={{ opacity: 0.5 }}>{metrics.location}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 91. PROGRESS BAR — Horizontal progress with percentage
// ──────────────────────────────────────────────────────────────
export function ProgressBarSticker({ metrics, style, onEditField }: TProps) {
  const pct = Math.min(100, (parseFloat(metrics.distance) / 42.195) * 100);
  return (
    <div className="w-60 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: style.textColor, opacity: 0.5 }}>Marathon Progress</div>
      <div className="text-2xl font-black" style={{ color: style.accentColor }}>{pct.toFixed(1)}%</div>
      <div className="w-full h-2 rounded-full mt-2" style={{ backgroundColor: `${style.accentColor}22` }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: style.accentColor }} />
      </div>
      <div className="flex justify-between mt-1 text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>
        <span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
        <span>42.195 KM</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 92. CIRCULAR GAUGE — Circular gauge with needle
// ──────────────────────────────────────────────────────────────
export function CircularGaugeSticker({ metrics, style, onEditField }: TProps) {
  const bpm = parseInt(metrics.heartRate) || 150;
  const angle = (bpm / 200) * 180 - 90;
  return (
    <div className="w-56 p-4 text-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <svg className="w-full h-24" viewBox="0 0 100 55">
        <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke={`${style.accentColor}33`} strokeWidth="6" strokeLinecap="round" />
        <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke={style.accentColor} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${(bpm/200)*126} 126`} />
        <line x1="50" y1="50" x2={50 + 30*Math.cos(angle*Math.PI/180)} y2={50 + 30*Math.sin(angle*Math.PI/180)}
          stroke={style.textColor} strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill={style.textColor} />
      </svg>
      <div className="text-xl font-black" style={{ color: style.accentColor }}>
        <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> <span className="text-[10px]">BPM</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 93. GRID 4X4 — 4×4 grid of metrics
// ──────────────────────────────────────────────────────────────
export function Grid4x4Sticker({ metrics, style, onEditField }: TProps) {
  const items = [
    { label: 'DIST', val: metrics.distance },
    { label: 'PACE', val: metrics.pace },
    { label: 'TIME', val: metrics.time },
    { label: 'HR', val: metrics.heartRate },
    { label: 'ELEV', val: metrics.elevation + 'm' },
    { label: 'CAL', val: metrics.calories },
    { label: 'DATE', val: metrics.date },
    { label: 'KM', val: metrics.unit },
  ];
  return (
    <div className="grid grid-cols-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <div key={i} className="p-2 text-center" style={{ borderRight: i % 4 < 3 ? `1px solid ${style.borderColor}` : 'none', borderBottom: i < 4 ? `1px solid ${style.borderColor}` : 'none' }}>
          <div className="text-[7px] uppercase" style={{ color: style.textColor, opacity: 0.4 }}>{item.label}</div>
          <div className="text-[11px] font-bold" style={{ color: i === 0 ? style.accentColor : style.textColor }}>{item.val}</div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 94. QUOTE CARD — Inspirational quote layout
// ──────────────────────────────────────────────────────────────
export function QuoteCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-5 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-4xl mb-2" style={{ color: style.accentColor, lineHeight: 1 }}>"</div>
      <div className="text-sm italic" style={{ color: style.textColor }}>
        Ran <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km in <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
      </div>
      <div className="mt-3 text-[10px]" style={{ color: style.textColor, opacity: 0.5 }}>— {metrics.location}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 95. COMPARISON SPLIT — Left vs Right comparison
// ──────────────────────────────────────────────────────────────
export function ComparisonSplitSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="flex shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      <div className="w-1/2 p-4 text-center" style={{ borderRight: `1px solid ${style.borderColor}` }}>
        <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.4 }}>This Run</div>
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
        <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>KM</div>
      </div>
      <div className="w-1/2 p-4 text-center">
        <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.4 }}>Pace</div>
        <div className="text-xl font-black" style={{ color: style.textColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
        <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>/KM</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 96. STACKED CARDS — Overlapping card effect
// ──────────────────────────────────────────────────────────────
export function StackedCardsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="relative w-56 h-40 shadow-xl">
      <div className="absolute inset-x-2 bottom-0 h-36 rounded-lg" style={{ backgroundColor: `${style.accentColor}33`, border: `1px solid ${style.accentColor}44` }} />
      <div className="absolute inset-x-1 bottom-1 h-36 rounded-lg" style={{ backgroundColor: `${style.accentColor}66`, border: `1px solid ${style.accentColor}88` }} />
      <div className="absolute inset-0 h-36 p-4 rounded-lg" style={{ backgroundColor: style.backgroundColor, border: `1px solid ${style.borderColor}` }}>
        <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.7 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</div>
        <div className="text-[10px] mt-2" style={{ color: style.textColor, opacity: 0.5 }}>{metrics.time}</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 97. FLOATING LABELS — Labels floating around center value
// ──────────────────────────────────────────────────────────────
export function FloatingLabelsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="relative w-60 h-48 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-3xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
      </div>
      <div className="absolute top-2 left-3 text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>Distance</div>
      <div className="absolute top-2 right-3 text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>Pace</div>
      <div className="absolute top-6 right-3 text-xs font-bold" style={{ color: style.textColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
      <div className="absolute bottom-2 left-3 text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>Time</div>
      <div className="absolute bottom-2 right-3 text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>HR</div>
      <div className="absolute bottom-6 left-3 text-xs font-bold" style={{ color: style.textColor }}><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      <div className="absolute bottom-6 right-3 text-xs font-bold" style={{ color: style.textColor }}><EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 98. ASYMMETRIC LAYOUT — Off-center weighted design
// ──────────────────────────────────────────────────────────────
export function AsymmetricLayoutSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      <div className="h-12" style={{ backgroundColor: style.accentColor }} />
      <div className="p-4 -mt-4" style={{ backgroundColor: style.backgroundColor }}>
        <div className="text-2xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 99. MINIMALIST LINE — Ultra minimal with single line
// ──────────────────────────────────────────────────────────────
export function MinimalistLineSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-2xl font-light" style={{ color: style.textColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
      <div className="w-full h-px my-2" style={{ backgroundColor: style.accentColor }} />
      <div className="text-[10px] uppercase tracking-widest" style={{ color: style.accentColor }}>kilometers</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 100. CARD FLIP — Front/Back card effect
// ──────────────────────────────────────────────────────────────
export function CardFlipSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="flex shadow-xl" style={{ borderRadius: style.borderRadius, overflow: 'hidden' }}>
      <div className="w-1/2 p-3" style={{ backgroundColor: style.backgroundColor, border: `1px solid ${style.borderColor}` }}>
        <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
        <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>km</div>
      </div>
      <div className="w-1/2 p-3" style={{ backgroundColor: `${style.accentColor}15`, border: `1px solid ${style.borderColor}` }}>
        <div className="text-lg font-black" style={{ color: style.textColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
        <div className="text-[9px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>/km</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 101. MASONRY GRID — Irregular grid layout
// ──────────────────────────────────────────────────────────────
export function MasonryGridSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-60 p-2 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2 p-2 rounded" style={{ backgroundColor: `${style.accentColor}22` }}>
          <div className="text-sm font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        </div>
        <div className="p-2 rounded" style={{ backgroundColor: `${style.textColor}11` }}>
          <div className="text-[10px] font-bold" style={{ color: style.textColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
        </div>
        <div className="p-2 rounded" style={{ backgroundColor: `${style.textColor}11` }}>
          <div className="text-[10px] font-bold" style={{ color: style.textColor }}><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
        </div>
        <div className="col-span-2 p-2 rounded" style={{ backgroundColor: `${style.accentColor}11` }}>
          <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>{metrics.location}</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 102. HEXAGON BADGE — Hexagonal badge design
// ──────────────────────────────────────────────────────────────
export function HexagonBadgeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 h-52 flex items-center justify-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <polygon points="60,5 110,30 110,90 60,115 10,90 10,30" fill="none" stroke={style.accentColor} strokeWidth="2" />
          <polygon points="60,15 100,35 100,85 60,105 20,85 20,35" fill={`${style.accentColor}22`} stroke="none" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
          <div className="text-[9px] uppercase" style={{ color: style.textColor }}>km</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 103. DIAMOND SHAPE — Diamond rotated layout
// ──────────────────────────────────────────────────────────────
export function DiamondShapeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 h-56 flex items-center justify-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="rotate-45 w-32 h-32 flex flex-col items-center justify-center" style={{ border: `2px solid ${style.accentColor}` }}>
        <div className="-rotate-45 text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
        <div className="-rotate-45 text-[9px] uppercase" style={{ color: style.textColor }}>km</div>
        <div className="-rotate-45 text-[10px] mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 104. TRIANGLE LAYOUT — Triangle-based design
// ──────────────────────────────────────────────────────────────
export function TriangleLayoutSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 h-52 flex items-center justify-center shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="relative">
        <svg width="140" height="120" viewBox="0 0 140 120">
          <polygon points="70,10 130,110 10,110" fill={`${style.accentColor}22`} stroke={style.accentColor} strokeWidth="2" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
          <div className="text-[9px] uppercase" style={{ color: style.textColor }}>km</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 105. ARCH FRAME — Arched doorway frame
// ──────────────────────────────────────────────────────────────
export function ArchFrameSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-52 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      <div className="h-16 relative" style={{ backgroundColor: `${style.accentColor}22` }}>
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0,40 Q50,-10 100,40" fill={`${style.accentColor}22`} stroke={style.accentColor} strokeWidth="1" />
        </svg>
      </div>
      <div className="p-3 -mt-4 text-center">
        <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 106. CIRCLE CUTOUT — Circle cutout from rectangle
// ──────────────────────────────────────────────────────────────
export function CircleCutoutSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: style.accentColor }}>
        <div className="text-xs font-black" style={{ color: style.backgroundColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
      </div>
      <div className="pt-10 p-3 text-center">
        <div className="text-[10px] uppercase" style={{ color: style.textColor, opacity: 0.5 }}>Distance</div>
        <div className="text-xs" style={{ color: style.textColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 107. ROUNDED STRIPES — Horizontal stripe pattern
// ──────────────────────────────────────────────────────────────
export function RoundedStripesSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl overflow-hidden" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} className="px-4 py-1.5" style={{ backgroundColor: i % 2 === 0 ? `${style.accentColor}15` : 'transparent' }}>
          {i === 0 && <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>}
          {i === 1 && <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</div>}
          {i === 2 && <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>}
          {i === 3 && <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>HR: <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /></div>}
          {i === 4 && <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}>{metrics.location}</div>}
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 108. GRADIENT BORDER — Gradient border effect
// ──────────────────────────────────────────────────────────────
export function GradientBorderSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-[2px] shadow-xl" style={{ background: `linear-gradient(135deg, ${style.accentColor}, ${style.textColor})`, borderRadius: style.borderRadius }}>
      <div className="p-4 rounded-lg" style={{ backgroundColor: style.backgroundColor }}>
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 109. INNER SHADOW — Inset shadow effect
// ──────────────────────────────────────────────────────────────
export function InnerShadowSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, boxShadow: `inset 0 2px 8px rgba(0,0,0,0.5)` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 110. DOUBLE FRAME — Double border frame
// ──────────────────────────────────────────────────────────────
export function DoubleFrameSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-[3px] shadow-xl" style={{ border: `2px solid ${style.accentColor}`, borderRadius: style.borderRadius }}>
      <div className="p-4" style={{ border: `1px solid ${style.borderColor}`, borderRadius: `calc(${style.borderRadius} - 4px)` }}>
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 111. ZIGZAG EDGE — Zigzag bottom edge
// ──────────────────────────────────────────────────────────────
export function ZigzagEdgeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      <div className="p-4 pb-2">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
      <svg className="w-full h-4" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0,0 L5,8 L10,0 L15,8 L20,0 L25,8 L30,0 L35,8 L40,0 L45,8 L50,0 L55,8 L60,0 L65,8 L70,0 L75,8 L80,0 L85,8 L90,0 L95,8 L100,0 L100,10 L0,10 Z" fill={style.accentColor} opacity="0.3" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 112. WAVE BOTTOM — Wave bottom edge
// ──────────────────────────────────────────────────────────────
export function WaveBottomSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      <div className="p-4 pb-0">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
      <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z" fill={style.accentColor} opacity="0.2" />
        <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke={style.accentColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 113. CORNER FOLD — Corner fold effect
// ──────────────────────────────────────────────────────────────
export function CornerFoldSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute top-0 right-0 w-8 h-8" style={{ background: `linear-gradient(135deg, transparent 50%, ${style.accentColor}33 50%)` }} />
      <div className="p-4">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 114. TABBED CARD — Card with tab header
// ──────────────────────────────────────────────────────────────
export function TabbedCardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex" style={{ borderBottom: `2px solid ${style.accentColor}` }}>
        <div className="px-3 py-1.5 text-[10px] font-bold" style={{ backgroundColor: style.accentColor, color: style.backgroundColor, borderRadius: `${style.borderRadius} ${style.borderRadius} 0 0` }}>SUMMARY</div>
        <div className="px-3 py-1.5 text-[10px]" style={{ color: style.textColor, opacity: 0.4 }}>DETAILS</div>
      </div>
      <div className="p-3">
        <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 115. ACCORDION — Collapsible sections
// ──────────────────────────────────────────────────────────────
export function AccordionSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl overflow-hidden" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      {[
        { label: 'Distance', val: metrics.distance + ' KM', open: true },
        { label: 'Pace', val: metrics.pace + ' /KM', open: false },
        { label: 'Time', val: metrics.time, open: false },
      ].map((item, i) => (
        <div key={i} className="border-b last:border-b-0" style={{ borderColor: style.borderColor }}>
          <div className="px-3 py-2 flex justify-between items-center" style={{ backgroundColor: item.open ? `${style.accentColor}15` : 'transparent' }}>
            <span className="text-[10px] font-bold" style={{ color: style.textColor }}>{item.label}</span>
            <span className="text-xs font-black" style={{ color: item.open ? style.accentColor : style.textColor }}>{item.val}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 116. SPLIT DIAGONAL — Diagonal split layout
// ──────────────────────────────────────────────────────────────
export function SplitDiagonalSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 h-32 shadow-xl relative overflow-hidden" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${style.accentColor}33 50%, transparent 50%)` }} />
      <div className="absolute top-3 left-3">
        <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      </div>
      <div className="absolute bottom-3 right-3 text-right">
        <div className="text-xs font-bold" style={{ color: style.textColor }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
        <div className="text-[9px]" style={{ color: style.textColor, opacity: 0.5 }}>/KM</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 117. DOT PATTERN — Dot pattern background
// ──────────────────────────────────────────────────────────────
export function DotPatternSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${style.accentColor} 1px, transparent 1px)`, backgroundSize: '8px 8px' }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 118. CROSS STITCH — Cross stitch pattern
// ──────────────────────────────────────────────────────────────
export function CrossStitchSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="grid grid-cols-8 gap-px mb-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-full aspect-square" style={{ backgroundColor: Math.random() > 0.5 ? style.accentColor : 'transparent', opacity: 0.3 }} />
        ))}
      </div>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 119. CHEVRON ROWS — Chevron row pattern
// ──────────────────────────────────────────────────────────────
export function ChevronRowsSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, overflow: 'hidden' }}>
      <div className="p-3">
        <div className="text-lg font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
      <svg className="w-full h-4" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0,5 L10,0 L20,5 L30,0 L40,5 L50,0 L60,5 L70,0 L80,5 L90,0 L100,5 L100,10 L0,10 Z" fill={style.accentColor} opacity="0.2" />
      </svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 120. PINSTRIPE — Vertical pinstripe pattern
// ──────────────────────────────────────────────────────────────
export function PinstripeSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${style.accentColor} 0px, ${style.accentColor} 1px, transparent 1px, transparent 8px)` }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 121. BRICK LAYOUT — Brick wall pattern
// ──────────────────────────────────────────────────────────────
export function BrickLayoutSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="grid grid-cols-4 gap-px mb-2">
        {[0,1,2,3,4,5,6,7].map(i => (
          <div key={i} className="h-3 rounded-sm" style={{ backgroundColor: `${style.accentColor}${i % 3 === 0 ? '44' : '22'}`, gridColumn: i === 4 ? 'span 2' : 'span 1' }} />
        ))}
      </div>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px]" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 122. TILE MOSAIC — Mosaic tile pattern
// ──────────────────────────────────────────────────────────────
export function TileMosaicSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-3 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="grid grid-cols-6 gap-px mb-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-sm" style={{ backgroundColor: `${style.accentColor}${['22','44','66','88'][i % 4]}` }} />
        ))}
      </div>
      <div className="text-lg font-black text-center" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px] text-center" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 123. STAINED GLASS — Stained glass effect
// ──────────────────────────────────────────────────────────────
export function StainedGlassSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="grid grid-cols-3 gap-1 mb-2">
        {[style.accentColor, style.textColor, style.accentColor, style.textColor, style.accentColor, style.textColor].map((c, i) => (
          <div key={i} className="h-6 rounded-sm" style={{ backgroundColor: `${c}33`, border: `1px solid ${c}66` }} />
        ))}
      </div>
      <div className="text-xl font-black text-center" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px] text-center" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 124. PAPER TEXTURE — Paper texture effect
// ──────────────────────────────────────────────────────────────
export function PaperTextureSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      <div className="mt-2 pt-2 text-[10px]" style={{ borderTop: `1px dashed ${style.borderColor}`, color: style.textColor, opacity: 0.4 }}>{metrics.location}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 125. CARBON FIBER — Carbon fiber weave pattern
// ──────────────────────────────────────────────────────────────
export function CarbonFiberSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#1a1a1a', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #333 0px, #333 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, #333 0px, #333 1px, transparent 1px, transparent 4px)' }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 126. BRUSHED METAL — Brushed metal texture
// ──────────────────────────────────────────────────────────────
export function BrushedMetalSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#2a2a2a', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 127. DENIM FABRIC — Denim fabric texture
// ──────────────────────────────────────────────────────────────
export function DenimFabricSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#1a3a5c', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 2px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 128. CONCRETE WALL — Concrete wall texture
// ──────────────────────────────────────────────────────────────
export function ConcreteWallSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#3a3a3a', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 129. RUSTIC WOOD — Rustic wood texture
// ──────────────────────────────────────────────────────────────
export function RusticWoodSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#3d2b1f', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 130. BAMBOO WEAVE — Bamboo weave pattern
// ──────────────────────────────────────────────────────────────
export function BambooWeaveSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#2d4a2d', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 131. WOVEN PATTERN — Woven fabric pattern
// ──────────────────────────────────────────────────────────────
export function WovenPatternSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#2a2a3a', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 132. LEATHER GRAIN — Leather grain texture
// ──────────────────────────────────────────────────────────────
export function LeatherGrainSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#2a1a0a', borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '3px 3px' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 133. SILK SHEEN — Silk sheen gradient
// ──────────────────────────────────────────────────────────────
export function SilkSheenSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: `linear-gradient(135deg, ${style.backgroundColor} 0%, ${style.accentColor}15 50%, ${style.backgroundColor} 100%)` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 134. VELVET PLUSH — Velvet plush texture
// ──────────────────────────────────────────────────────────────
export function VelvetPlushSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, boxShadow: `inset 0 2px 10px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 135. SATIN FINISH — Satin finish gradient
// ──────────────────────────────────────────────────────────────
export function SatinFinishSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: `linear-gradient(180deg, ${style.backgroundColor} 0%, ${style.accentColor}10 100%)` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 136. MATTE PAPER — Matte paper texture
// ──────────────────────────────────────────────────────────────
export function MattePaperSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 137. GLOSSY SURFACE — Glossy surface reflection
// ──────────────────────────────────────────────────────────────
export function GlossySurfaceSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 40%)` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 138. TRANSLUCENT GLASS — Translucent glass effect
// ──────────────────────────────────────────────────────────────
export function TranslucentGlassSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: `${style.backgroundColor}cc`, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}`, backdropFilter: 'blur(10px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 139. FROSTED GLASS — Frosted glass blur effect
// ──────────────────────────────────────────────────────────────
export function FrostedGlassSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: `${style.backgroundColor}88`, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}88`, backdropFilter: 'blur(20px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 140. SMOKED GLASS — Smoked glass dark effect
// ──────────────────────────────────────────────────────────────
export function SmokedGlassSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: style.borderRadius, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(15px)' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 141. CRACKED ICE — Cracked ice pattern
// ──────────────────────────────────────────────────────────────
export function CrackedIceSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#e8f4f8', borderRadius: style.borderRadius, border: '1px solid #b8d4e8' }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <path d="M20,10 L35,25 L15,40" stroke="#667" strokeWidth="0.5" fill="none" />
        <path d="M50,5 L65,20 L45,35 L70,50" stroke="#667" strokeWidth="0.5" fill="none" />
        <path d="M80,15 L95,30 L75,45" stroke="#667" strokeWidth="0.5" fill="none" />
        <path d="M10,60 L30,75 L5,90" stroke="#667" strokeWidth="0.5" fill="none" />
        <path d="M60,55 L80,70 L55,85" stroke="#667" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#333', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 142. LIQUID METAL — Liquid metal gradient
// ──────────────────────────────────────────────────────────────
export function LiquidMetalSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%)`, borderRadius: style.borderRadius, border: '1px solid #0f3460' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#8899aa', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 143. HOLOGRAPHIC — Holographic rainbow effect
// ──────────────────────────────────────────────────────────────
export function HolographicSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)', borderRadius: style.borderRadius, border: '1px solid rgba(255,255,255,0.3)' }}>
      <div className="text-xl font-black" style={{ color: '#000' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#000', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 144. IRIDESCENT — Iridescent color shift
// ──────────────────────────────────────────────────────────────
export function IridescentSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: style.borderRadius, border: '1px solid rgba(255,255,255,0.2)' }}>
      <div className="text-xl font-black" style={{ color: '#fff' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#fff', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 145. PRISMATIC — Prismatic light effect
// ──────────────────────────────────────────────────────────────
export function PrismaticSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff)', borderRadius: style.borderRadius, border: '1px solid rgba(255,255,255,0.2)' }}>
      <div className="text-xl font-black" style={{ color: '#fff' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#fff', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 146. NEBULA CLOUD — Nebula cloud background
// ──────────────────────────────────────────────────────────────
export function NebulaCloudSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'radial-gradient(ellipse at 30% 40%, #1a0533 0%, #0a001a 60%, #000 100%)', borderRadius: style.borderRadius, border: '1px solid #2a0a4a' }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#8866aa', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 147. AURORA BOREALIS — Northern lights effect
// ──────────────────────────────────────────────────────────────
export function AuroraBorealisSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'linear-gradient(180deg, #0a0a2e 0%, #1a3a5c 30%, #2ecc71 60%, #0a0a2e 100%)', borderRadius: style.borderRadius, border: '1px solid #2ecc71' }}>
      <div className="text-xl font-black" style={{ color: '#fff' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#fff', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 148. GALAXY SPIRAL — Galaxy spiral pattern
// ──────────────────────────────────────────────────────────────
export function GalaxySpiralSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#000011', borderRadius: style.borderRadius, border: '1px solid #112244' }}>
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
        <path d="M50,50 Q60,30 50,10 Q30,30 50,50 Q70,70 50,90 Q30,70 50,50" stroke="#4466aa" strokeWidth="1" fill="none" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#6688bb', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 149. STAR FIELD — Star field pattern
// ──────────────────────────────────────────────────────────────
export function StarFieldSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#000022', borderRadius: style.borderRadius, border: '1px solid #222244' }}>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(1px 1px at 10% 20%, #fff 100%, transparent), radial-gradient(1px 1px at 30% 60%, #fff 100%, transparent), radial-gradient(1px 1px at 50% 10%, #fff 100%, transparent), radial-gradient(1px 1px at 70% 80%, #fff 100%, transparent), radial-gradient(1px 1px at 90% 40%, #fff 100%, transparent)' }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#6688bb', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 150. SUN FLARE — Sun flare effect
// ──────────────────────────────────────────────────────────────
export function SunFlareSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#1a0a00', borderRadius: style.borderRadius, border: '1px solid #3a2a1a' }}>
      <div className="absolute top-0 right-0 w-16 h-16" style={{ background: 'radial-gradient(circle, rgba(255,200,0,0.3) 0%, transparent 70%)' }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#cc9966', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 151. MOON GLOW — Moon glow effect
// ──────────────────────────────────────────────────────────────
export function MoonGlowSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a0a1a', borderRadius: style.borderRadius, border: '1px solid #1a1a3a' }}>
      <div className="absolute top-2 right-2 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle, rgba(200,200,255,0.4) 0%, transparent 70%)' }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#6666aa', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 152. WATER RIPPLE — Water ripple effect
// ──────────────────────────────────────────────────────────────
export function WaterRippleSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a1a2a', borderRadius: style.borderRadius, border: '1px solid #1a3a5a' }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="10" stroke="#3388aa" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="#3388aa" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="30" stroke="#3388aa" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="#3388aa" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#3388aa', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 153. FLAME WAVE — Flame wave effect
// ──────────────────────────────────────────────────────────────
export function FlameWaveSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'linear-gradient(180deg, #1a0a00 0%, #4a1a00 50%, #ff4400 100%)', borderRadius: style.borderRadius, border: '1px solid #ff4400' }}>
      <div className="text-xl font-black" style={{ color: '#ff8844' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#ffcc88', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 154. ELECTRIC SPARK — Electric spark effect
// ──────────────────────────────────────────────────────────────
export function ElectricSparkSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a0a1a', borderRadius: style.borderRadius, border: '1px solid #00ff88' }}>
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
        <path d="M20,50 L30,45 L25,55 L40,40 L35,55 L50,35 L45,55 L60,30 L55,55 L70,25 L65,55 L80,20" stroke="#00ff88" strokeWidth="1" fill="none" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#00ff88' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#00ff88', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 155. LASER GRID — Laser grid pattern
// ──────────────────────────────────────────────────────────────
export function LaserGridSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a0a0a', borderRadius: style.borderRadius, border: '1px solid #ff0044' }}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,0,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,68,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#ff0044' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#ff4466', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 156. RADAR SWEEP — Radar sweep effect
// ──────────────────────────────────────────────────────────────
export function RadarSweepSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a1a0a', borderRadius: style.borderRadius, border: '1px solid #00ff44' }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="15" stroke="#00ff44" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="30" stroke="#00ff44" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="45" stroke="#00ff44" strokeWidth="0.5" fill="none" />
        <line x1="50" y1="50" x2="50" y2="5" stroke="#00ff44" strokeWidth="0.5" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#00ff44' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#00ff44', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 157. SONAR PING — Sonar ping effect
// ──────────────────────────────────────────────────────────────
export function SonarPingSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#001a33', borderRadius: style.borderRadius, border: '1px solid #0066cc' }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <circle cx="30" cy="50" r="5" stroke="#0088ff" strokeWidth="1" fill="none" />
        <circle cx="30" cy="50" r="15" stroke="#0088ff" strokeWidth="0.5" fill="none" />
        <circle cx="30" cy="50" r="25" stroke="#0088ff" strokeWidth="0.3" fill="none" />
        <line x1="30" y1="50" x2="90" y2="50" stroke="#0088ff" strokeWidth="0.5" strokeDasharray="2,2" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#0088ff' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#0088ff', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 158. TARGET LOCK — Target lock effect
// ──────────────────────────────────────────────────────────────
export function TargetLockSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#1a0a0a', borderRadius: style.borderRadius, border: '1px solid #ff4444' }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="10" stroke="#ff4444" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="#ff4444" strokeWidth="0.5" fill="none" />
        <line x1="50" y1="30" x2="50" y2="70" stroke="#ff4444" strokeWidth="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke="#ff4444" strokeWidth="0.5" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#ff4444' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#ff8888', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 159. SCOPE VIEW — Scope view effect
// ──────────────────────────────────────────────────────────────
export function ScopeViewSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a0a0a', borderRadius: style.borderRadius, border: '1px solid #333' }}>
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" stroke="#00ff00" strokeWidth="0.5" fill="none" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#00ff00" strokeWidth="0.3" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#00ff00" strokeWidth="0.3" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#00ff00' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#00ff00', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 160. XRAY VISION — X-ray vision effect
// ──────────────────────────────────────────────────────────────
export function XrayVisionSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#000', borderRadius: style.borderRadius, border: '1px solid #00aaff' }}>
      <div className="text-xl font-black" style={{ color: '#00ccff' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#00ccff', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 161. THERMAL MAP — Thermal map effect
// ──────────────────────────────────────────────────────────────
export function ThermalMapSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ background: 'linear-gradient(135deg, #0000ff 0%, #00ff00 33%, #ffff00 66%, #ff0000 100%)', borderRadius: style.borderRadius, border: '1px solid #ff0000' }}>
      <div className="text-xl font-black" style={{ color: '#fff' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#fff', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 162. NIGHT VISION — Night vision effect
// ──────────────────────────────────────────────────────────────
export function NightVisionSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#001a00', borderRadius: style.borderRadius, border: '1px solid #00ff00', backgroundImage: 'radial-gradient(rgba(0,255,0,0.1) 1px, transparent 1px)', backgroundSize: '4px 4px' }}>
      <div className="text-xl font-black" style={{ color: '#00ff00' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#00ff00', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 163. BLUEPRINT GRID — Blueprint grid pattern
// ──────────────────────────────────────────────────────────────
export function BlueprintGridSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#0a1a3a', borderRadius: style.borderRadius, border: '1px solid #3388cc', backgroundImage: 'linear-gradient(rgba(51,136,204,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(51,136,204,0.2) 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
      <div className="text-xl font-black" style={{ color: '#3388cc' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#66aadd', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 164. SCHEMATIC — Schematic diagram style
// ──────────────────────────────────────────────────────────────
export function SchematicSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#1a1a1a', borderRadius: style.borderRadius, border: '1px solid #00ff00' }}>
      <div className="text-[9px] font-mono mb-2" style={{ color: '#00ff00' }}>RUN_DATA_v2.0</div>
      <div className="text-xl font-mono font-black" style={{ color: '#00ff00' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px] font-mono mt-1" style={{ color: '#00ff00', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 165. CIRCUIT BOARD — Circuit board pattern
// ──────────────────────────────────────────────────────────────
export function CircuitBoardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: '#0a2a0a', borderRadius: style.borderRadius, border: '1px solid #00aa00' }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <path d="M10,50 L30,50 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70" stroke="#00ff00" strokeWidth="1" fill="none" />
        <circle cx="30" cy="50" r="2" fill="#00ff00" />
        <circle cx="50" cy="30" r="2" fill="#00ff00" />
        <circle cx="70" cy="50" r="2" fill="#00ff00" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: '#00ff00' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: '#00ff00', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 166. MOTHERBOARD — Motherboard layout
// ──────────────────────────────────────────────────────────────
export function MotherboardSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#0a1a0a', borderRadius: style.borderRadius, border: '1px solid #00cc00' }}>
      <div className="grid grid-cols-4 gap-px mb-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-2 rounded-sm" style={{ backgroundColor: i % 2 === 0 ? '#00ff0033' : '#00ff0011' }} />
        ))}
      </div>
      <div className="text-xl font-black" style={{ color: '#00ff00' }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: '#00ff00', opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 167. CHIP LAYOUT — Chip layout design
// ──────────────────────────────────────────────────────────────
export function ChipLayoutSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: '#0a0a0a', borderRadius: style.borderRadius, border: '1px solid #666' }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-px">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-0.5 h-3" style={{ backgroundColor: '#888' }} />
          ))}
        </div>
        <div className="flex-1 h-12 rounded flex items-center justify-center" style={{ backgroundColor: '#1a1a1a', border: '1px solid #444' }}>
          <div className="text-[8px] font-mono" style={{ color: '#00ff00' }}>CPU</div>
        </div>
        <div className="flex gap-px">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-0.5 h-3" style={{ backgroundColor: '#888' }} />
          ))}
        </div>
      </div>
      <div className="text-lg font-black text-center" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 168. WIRE FRAME — Wire frame design
// ──────────────────────────────────────────────────────────────
export function WireFrameSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px dashed ${style.accentColor}` }}>
      <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 169. MESH NETWORK — Mesh network pattern
// ──────────────────────────────────────────────────────────────
export function MeshNetworkSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
        <line x1="10" y1="10" x2="50" y2="50" stroke={style.accentColor} strokeWidth="0.5" />
        <line x1="50" y1="50" x2="90" y2="10" stroke={style.accentColor} strokeWidth="0.5" />
        <line x1="10" y1="90" x2="50" y2="50" stroke={style.accentColor} strokeWidth="0.5" />
        <line x1="50" y1="50" x2="90" y2="90" stroke={style.accentColor} strokeWidth="0.5" />
        <circle cx="10" cy="10" r="2" fill={style.accentColor} />
        <circle cx="90" cy="10" r="2" fill={style.accentColor} />
        <circle cx="10" cy="90" r="2" fill={style.accentColor} />
        <circle cx="90" cy="90" r="2" fill={style.accentColor} />
        <circle cx="50" cy="50" r="3" fill={style.accentColor} />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 170. NODE GRAPH — Node graph layout
// ──────────────────────────────────────────────────────────────
export function NodeGraphSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: style.accentColor }} />
        <div className="flex-1 h-px" style={{ backgroundColor: style.accentColor, opacity: 0.3 }} />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: style.accentColor }} />
      </div>
      <div className="text-xl font-black text-center" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px] text-center" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 171. DATA FLOW — Data flow diagram
// ──────────────────────────────────────────────────────────────
export function DataFlowSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-center gap-1 mb-2">
        {['IN', '→', 'PROC', '→', 'OUT'].map((s, i) => (
          <div key={i} className={`px-1.5 py-0.5 text-[7px] font-bold rounded ${i % 2 === 0 ? '' : 'text-transparent'}`}
            style={i % 2 === 0 ? { backgroundColor: `${style.accentColor}22`, color: style.accentColor, border: `1px solid ${style.accentColor}44` } : {}}>
            {s}
          </div>
        ))}
      </div>
      <div className="text-lg font-black text-center" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 172. PIPELINE — Pipeline layout
// ──────────────────────────────────────────────────────────────
export function PipelineSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <div className="flex items-center gap-1">
        {['DIST', 'PACE', 'TIME'].map((label, i) => (
          <React.Fragment key={i}>
            <div className="px-2 py-1 rounded text-[8px] font-bold" style={{ backgroundColor: `${style.accentColor}22`, color: style.accentColor, border: `1px solid ${style.accentColor}44` }}>
              {label}
            </div>
            {i < 2 && <div className="text-[8px]" style={{ color: style.accentColor, opacity: 0.4 }}>→</div>}
          </React.Fragment>
        ))}
      </div>
      <div className="text-lg font-black mt-2 text-center" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 173. CIRCUIT PATH — Circuit path design
// ──────────────────────────────────────────────────────────────
export function CircuitPathSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 100 100">
        <path d="M10,50 L30,50 L30,30 L70,30 L70,50 L90,50" stroke={style.accentColor} strokeWidth="1" fill="none" />
        <circle cx="30" cy="50" r="2" fill={style.accentColor} />
        <circle cx="70" cy="30" r="2" fill={style.accentColor} />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 174. TRACE LINE — Trace line pattern
// ──────────────────────────────────────────────────────────────
export function TraceLineSticker({ metrics, style, onEditField }: TProps) {
  return (
    <div className="w-56 p-4 shadow-xl relative" style={{ backgroundColor: style.backgroundColor, borderRadius: style.borderRadius, border: `1px solid ${style.borderColor}` }}>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 50">
        <path d="M0,25 Q25,10 50,25 T100,25" stroke={style.accentColor} strokeWidth="1" fill="none" />
      </svg>
      <div className="relative">
        <div className="text-xl font-black" style={{ color: style.accentColor }}><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-xs mt-1" style={{ color: style.textColor, opacity: 0.6 }}><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
    </div>
  );
}
