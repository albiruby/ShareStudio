'use client';

import React from 'react';
import { ActivityMetrics, StickerStyle, StickerType, ParametricConfig } from '@/lib/types';
import { ParametricStickerRenderer } from './ParametricRenderer';
import {
  ElevationWaveSticker, HorizontalMetricsSticker, SerifItalicSticker,
  ReceiptFullSticker, SplitsRomanSticker, TextSentenceSticker,
  LargeTypographySticker, DataTableSticker, BarChartPaceSticker,
  LocationCardSticker, DayBadgeSticker, DualStatsSticker,
  ColumnNumbersSticker, HighlightBlocksSticker, CumulativeListSticker,
  VerifiedBadgeSticker, TimeRangeSticker, PaceChartSticker,
  ItalicTitleSticker, LocationPillSticker, MapRouteSticker,
  SquareFrameSticker, ColoredBarSticker, DataRowsSticker,
  CalendarCardSticker, WeeklyListSticker, DescriptionCardSticker,
  PaceZonesSticker, ElevationAreaSticker, TextParagraphSticker,
  HighlightBarSticker, KilometresBoldSticker, TrademarkStyleSticker,
  HeartPillSticker, LedClockSticker, BoldLocationSticker,
  RouteNumberSticker, AppWidgetSticker, MoneyTagSticker,
  MultilingualSticker, SimpleTableSticker, RepeatTextSticker,
  MonthlyTotalSticker, WeeklyDotsSticker, WeeklySummarySticker,
  WeeklyTableSticker, CircleGridSticker, MonthlyChartSticker,
  ProgressPctSticker, AreaChartWeeklySticker, DotProgressSticker,
  SquareProgressSticker, VerticalBarsSticker, StackedDaysSticker,
  RunningTotalSticker, WeeklyMapSticker,
  GradientMeshSticker, NeoBrutalistSticker, GlassCardSticker,
  NeonGlowSticker, FilmStripSticker, NewspaperColumnSticker,
  TerminalGreenSticker, VhsRetroSticker, NotebookLineSticker,
  BlueprintSticker, EmbossedSticker, MetallicSticker,
  PixelArtSticker, AchievementSticker, LeaderboardSticker,
  CountdownSticker, ProgressRingSticker, RadialChartSticker,
  HeatmapSticker, TimelineSticker, TabUiSticker,
  CardStackSticker, RibbonSticker, NotificationSticker,
  MusicPlayerSticker, WeatherCardSticker, SplitsBarChartSticker,
  StackedMetricsSticker, RunningManSticker, BorderedFrameSticker,
  StatRibbonSticker, DotMatrixSticker, BadgeCollectionSticker,
  MiniMapSticker,
  ProgressBarSticker, CircularGaugeSticker, Grid4x4Sticker,
  QuoteCardSticker, ComparisonSplitSticker, StackedCardsSticker,
  FloatingLabelsSticker, AsymmetricLayoutSticker, MinimalistLineSticker,
  CardFlipSticker, MasonryGridSticker, HexagonBadgeSticker,
  DiamondShapeSticker, TriangleLayoutSticker, ArchFrameSticker,
  CircleCutoutSticker, RoundedStripesSticker, GradientBorderSticker,
  InnerShadowSticker, DoubleFrameSticker, ZigzagEdgeSticker,
  WaveBottomSticker, CornerFoldSticker, TabbedCardSticker,
  AccordionSticker, SplitDiagonalSticker, DotPatternSticker,
  CrossStitchSticker, ChevronRowsSticker, PinstripeSticker,
  BrickLayoutSticker, TileMosaicSticker, StainedGlassSticker,
  PaperTextureSticker, CarbonFiberSticker, BrushedMetalSticker,
  DenimFabricSticker, ConcreteWallSticker, RusticWoodSticker,
  BambooWeaveSticker, WovenPatternSticker, LeatherGrainSticker,
  SilkSheenSticker, VelvetPlushSticker, SatinFinishSticker,
  MattePaperSticker, GlossySurfaceSticker, TranslucentGlassSticker,
  FrostedGlassSticker, SmokedGlassSticker, CrackedIceSticker,
  LiquidMetalSticker, HolographicSticker, IridescentSticker,
  PrismaticSticker, NebulaCloudSticker, AuroraBorealisSticker,
  GalaxySpiralSticker, StarFieldSticker, SunFlareSticker,
  MoonGlowSticker, WaterRippleSticker, FlameWaveSticker,
  ElectricSparkSticker, LaserGridSticker, RadarSweepSticker,
  SonarPingSticker, TargetLockSticker, ScopeViewSticker,
  XrayVisionSticker, ThermalMapSticker, NightVisionSticker,
  BlueprintGridSticker, SchematicSticker, CircuitBoardSticker,
  MotherboardSticker, ChipLayoutSticker, WireFrameSticker,
  MeshNetworkSticker, NodeGraphSticker, DataFlowSticker,
  PipelineSticker, CircuitPathSticker, TraceLineSticker,
} from './UniqueTemplates';
import {
  Flame,
  Heart,
  Trophy,
  Medal,
  MapPin,
  Zap,
  Clock,
  Shield,
  Flag,
  Battery,
  Check,
  Star,
  Crown,
  Sparkles,
  Target,
  Compass,
  Mountain,
  Activity,
  BarChart,
  TrendingUp,
  Award,
  Gauge,
  Timer,
  Watch,
  Navigation,
  Dumbbell,
  Footprints,
  Bike,
  CircleDot,
  Layers,
  Box,
  Tag,
  Ticket,
  FileText,
  Music,
  Disc,
  Radio,
  Plane,
  Smile,
  ThumbsUp,
  Coffee,
  Sun,
  Moon,
  Wind,
  Thermometer,
  CloudLightning,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  AlertOctagon,
  RefreshCw,
  Eye,
  Share2,
  Copy,
  Hexagon,
  Octagon,
  Triangle,
  Square,
  Circle,
  AlertTriangle,
  Phone,
} from 'lucide-react';

interface TemplateProps {
  metrics: ActivityMetrics;
  style: StickerStyle;
  onEditField?: (field: string, value: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Flame,
  Heart,
  Trophy,
  Medal,
  MapPin,
  Zap,
  Clock,
  Shield,
  Flag,
  Battery,
  Check,
  Star,
  Crown,
  Sparkles,
  Target,
  Compass,
  Mountain,
  Activity,
  BarChart,
  TrendingUp,
  Award,
  Gauge,
  Timer,
  Watch,
  Navigation,
  Dumbbell,
  Footprints,
  Bike,
  CircleDot,
  Layers,
  Box,
  Tag,
  Ticket,
  FileText,
  Music,
  Disc,
  Radio,
  Plane,
  Smile,
  ThumbsUp,
  Coffee,
  Sun,
  Moon,
  Wind,
  Thermometer,
  CloudLightning,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  AlertOctagon,
  RefreshCw,
  Eye,
  Share2,
  Copy,
  Hexagon,
  Octagon,
  Triangle,
  Square,
  Circle,
};

function EditableField({
  value,
  onSave,
  className = '',
}: {
  value: string;
  onSave?: (val: string) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [temp, setTemp] = React.useState(value);

  React.useEffect(() => {
    setTemp(value);
  }, [value]);

  if (isEditing) {
    return (
      <input
        type="text"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onBlur={() => {
          setIsEditing(false);
          if (onSave) onSave(temp);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsEditing(false);
            if (onSave) onSave(temp);
          }
        }}
        className="bg-black/40 text-current outline-none border-b border-cyan-400 px-1 rounded text-inherit w-full inline-block"
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-pointer hover:bg-white/10 transition-colors px-0.5 rounded ${className}`}
      title="Click to edit"
    >
      {value}
    </span>
  );
}

// Standalone Icon Badge Sticker (Clicking any icon in Icons tab renders this!)
export function IconBadgeSticker({ metrics, style, onEditField }: TemplateProps) {
  const IconComponent = (style.iconName && ICON_MAP[style.iconName]) || Zap;
  return (
    <div
      className="p-3 shadow-2xl border flex items-center gap-3 select-none"
      style={{
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        borderColor: style.borderColor,
        borderRadius: `${style.borderRadius}px`,
        opacity: style.opacity,
      }}
    >
      <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        <div className="font-extrabold text-lg leading-tight">
          <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />{' '}
          <span className="text-xs">{metrics.unit}</span>
        </div>
        <div className="text-[11px] opacity-80 font-mono">
          <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> •{' '}
          <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} />
        </div>
      </div>
    </div>
  );
}

// 1. Red Bold Header
export function RedBoldHeaderSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 text-center font-black uppercase tracking-tight leading-tight select-none" style={{ color: style.textColor }}>
      <div className="text-3xl" style={{ color: style.accentColor || '#ef4444' }}>MON</div>
      <div className="text-xl text-white"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></div>
      <div className="text-2xl mt-1"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> {metrics.unit}</div>
      <div className="text-xs opacity-80 font-mono mt-1"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// 2. Elevation Gradient Curve
export function ElevationGradientSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-4 rounded-xl text-white font-mono text-center border border-zinc-800" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <div className="text-xl font-bold mb-2"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</div>
      <svg className="w-full h-12 stroke-cyan-400 fill-cyan-500/20" viewBox="0 0 100 30">
        <path d="M0,25 Q25,5 50,20 T100,10 L100,30 L0,30 Z" strokeWidth="2" />
      </svg>
      <div className="text-[10px] text-zinc-400 mt-1 flex justify-between">
        <span>ELEV: <EditableField value={metrics.elevation} onSave={(v) => onEditField?.('elevation', v)} />m</span>
        <span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />km</span>
      </div>
    </div>
  );
}

// 3. Minimal Horizontal
export function MinimalHorizontalSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="px-4 py-2 bg-black/80 backdrop-blur border border-zinc-800 rounded-full text-white font-mono text-xs flex gap-4 items-center" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <span>DIST: <strong className="text-cyan-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />km</strong></span>
      <span>PACE: <strong className="text-yellow-400"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></strong></span>
      <span>TIME: <strong><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></strong></span>
    </div>
  );
}

// 4. Serif Classic
export function SerifClassicSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 bg-zinc-900/90 border border-zinc-700 rounded-xl font-serif text-white text-center w-64" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <div className="text-3xl italic font-bold"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-xl">km</span></div>
      <div className="text-sm italic opacity-90 mt-1">Pace <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • HR <EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> bpm</div>
      <div className="text-xs opacity-75 mt-2 border-t border-zinc-800 pt-1 font-sans"><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// 5. Digital Red LED
export function DigitalRedLedSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-black border border-red-900 rounded-lg text-red-600 font-led text-center w-56" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="text-[10px] text-red-700 uppercase">SCOREBOARD</div>
      <div className="text-3xl my-1 tracking-widest glow-orange"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
      <div className="text-xs tracking-wider text-red-500"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</div>
    </div>
  );
}

// 6. Barcode Ticket
export function BarcodeTicketSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 bg-white text-black font-mono text-xs w-64 rounded shadow-2xl border border-zinc-300" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="font-extrabold text-sm border-b border-black pb-1 mb-2 flex justify-between">
        <span>DISTANCE</span><span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
      </div>
      <div className="space-y-1 text-[11px]">
        <div className="flex justify-between"><span>PACE:</span><span><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</span></div>
        <div className="flex justify-between"><span>TIME:</span><span><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></span></div>
        <div className="flex justify-between"><span>LOCATION:</span><span><EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} /></span></div>
      </div>
      <div className="mt-3 pt-2 border-t border-black text-center font-mono text-2xl tracking-widest">|||| | |||| | ||</div>
    </div>
  );
}

// 7. Color Badge
export function ColorBadgeSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="bg-amber-400 text-black font-black px-4 py-2 rounded-xl text-sm flex gap-3 items-center shadow-lg uppercase" style={{ backgroundColor: style.backgroundColor, color: style.textColor }}>
      <span className="bg-black text-white px-2 py-0.5 rounded text-xs">RUN</span>
      <span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
      <span><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></span>
    </div>
  );
}

// 8. Runner Bold
export function RunnerBoldSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 text-white font-sans text-center">
      <div className="text-4xl font-extrabold flex items-center justify-center gap-2">
        <span>🏃</span><span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
      </div>
      <div className="text-xs font-mono text-zinc-300 mt-1"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// 9. Splits List
export function SplitsListSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-56 p-3 bg-zinc-950 text-white font-mono text-xs rounded-xl border border-zinc-800 space-y-1" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <div className="font-bold border-b border-zinc-800 pb-1 text-[10px] text-zinc-400 uppercase">KM Splits Breakdown</div>
      {metrics.splits.slice(0, 6).map((s) => (
        <div key={s.km} className="flex justify-between py-0.5 border-b border-zinc-900">
          <span className="text-zinc-500">KM {s.km}</span>
          <span className="font-bold text-cyan-400">{s.pace}</span>
        </div>
      ))}
    </div>
  );
}

// 10. Finish Banner
export function FinishBannerSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 border-2 border-white bg-black text-white p-2 text-center uppercase" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <div className="bg-white text-black font-extrabold text-xs py-0.5 mb-1">FINISH</div>
      <div className="text-3xl font-black"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs font-mono mt-1 text-zinc-400"><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// 11. Receipt Tag
export function ReceiptSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 bg-white text-black font-mono text-xs w-64 rounded-lg shadow-2xl border border-zinc-300" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="text-center border-b border-dashed border-zinc-400 pb-2 mb-2">
        <h3 className="font-bold text-sm uppercase"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></h3>
        <p className="text-[10px] text-zinc-500"><EditableField value={metrics.date} onSave={(v) => onEditField?.('date', v)} /></p>
      </div>
      <div className="space-y-1 text-[11px]">
        <div className="flex justify-between"><span>DISTANCE:</span><span className="font-bold"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span></div>
        <div className="flex justify-between"><span>PACE:</span><span className="font-bold"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</span></div>
        <div className="flex justify-between"><span>TIME:</span><span className="font-bold"><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></span></div>
      </div>
      <div className="border-t border-dashed border-zinc-400 mt-2 pt-2 text-center font-mono text-xl tracking-widest">|||| | |||| | ||</div>
    </div>
  );
}

// 12. JSON Code Tag
export function JsonCodeSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-zinc-950 text-green-400 font-mono text-xs w-64 rounded-xl border border-zinc-800 shadow-2xl" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="flex items-center gap-1 mb-2 pb-1 border-b border-zinc-800">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[9px] text-zinc-500 ml-1">sharestudio.json</span>
      </div>
      <pre className="whitespace-pre-wrap leading-tight text-[11px]">
        <code>{`{\n  "activity": "`}<EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} />{`",\n  "distance": "`}<EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />{` km",\n  "pace": "`}<EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} />{`"\n}`}</code>
      </pre>
    </div>
  );
}

// 13. Speedometer Tag
export function SpeedometerSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-zinc-900 text-white font-sans text-xs w-56 rounded-xl border border-zinc-800 text-center" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <div className="text-[10px] text-red-500 uppercase font-bold tracking-widest">TOP SPEED</div>
      <div className="text-2xl font-black my-1 text-red-400"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</div>
      <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full w-3/4" />
      </div>
    </div>
  );
}

// 14. Splits Histogram Tag
export function SplitsHistogramSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-zinc-900 text-white font-mono text-xs w-60 rounded-xl border border-zinc-800" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <div className="text-[10px] text-zinc-400 mb-2 uppercase">Split Pace Bars</div>
      <div className="flex items-end gap-1.5 h-16 pt-2 border-b border-zinc-800">
        {[60, 80, 45, 90, 70, 85, 55].map((h, i) => (
          <div key={i} className="flex-1 bg-cyan-400/80 hover:bg-cyan-400 rounded-t transition-all" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="text-center font-bold text-cyan-400 mt-2"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> AVG</div>
    </div>
  );
}

// 15. Polyline Track Tag
export function PolylineTrackSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 bg-black/80 backdrop-blur text-white text-center w-56 rounded-2xl border border-zinc-800" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor }}>
      <svg className="w-full h-20 stroke-cyan-400 fill-none mb-2" viewBox="0 0 100 60">
        <path d="M10,50 L30,10 L70,20 L90,45" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="50" r="4" className="fill-green-500" />
        <circle cx="90" cy="45" r="4" className="fill-red-500" />
      </svg>
      <div className="text-sm font-bold"><EditableField value={metrics.location} onSave={(v) => onEditField?.('location', v)} /></div>
      <div className="text-xs text-zinc-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM Run</div>
    </div>
  );
}

// 16. Windows Error Parody
export function WindowsErrorSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 bg-zinc-300 text-black border-2 border-white shadow-2xl font-sans text-xs" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="bg-blue-900 text-white px-2 py-0.5 font-bold flex justify-between text-[10px]">
        <span>System Alert</span>
        <span>X</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          <p className="font-bold">A run has occurred!</p>
        </div>
        <p className="text-[11px] text-zinc-700 mb-3"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM at <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> pace.</p>
        <div className="flex justify-end gap-1">
          <button className="px-3 py-0.5 bg-zinc-200 border border-zinc-500 font-bold">OK</button>
        </div>
      </div>
    </div>
  );
}

// 17. M-Banking Parody
export function MBankingSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-3 bg-white text-slate-900 rounded-2xl shadow-xl font-sans text-xs border border-emerald-200" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5 mb-2">
        <span className="font-bold text-emerald-600 text-xs">m-Running</span>
        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">BERHASIL</span>
      </div>
      <div className="text-center my-2">
        <div className="text-[10px] text-zinc-400">TOTAL DISTANCE</div>
        <div className="text-2xl font-black text-slate-900"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      </div>
    </div>
  );
}

// 18. Getty Stamp Parody
export function GettyStampSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="px-3 py-1.5 bg-black/80 text-white rounded border border-zinc-700 inline-block font-sans text-xs" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <span className="font-black tracking-tighter text-sm lowercase border-r border-zinc-600 pr-2 mr-2">sharestudio</span>
      <span>Distance: <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km</span>
    </div>
  );
}

// 19. Cigarette Warning Parody
export function CigaretteWarningSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 bg-black text-white border-2 border-white p-2.5 text-center uppercase font-sans" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="bg-red-600 text-white font-extrabold text-[10px] py-0.5 mb-1">PERINGATAN</div>
      <p className="font-black text-sm">TRAINING FOR A MARATHON</p>
      <p className="text-[10px] text-zinc-400 mt-0.5"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • PACE <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></p>
    </div>
  );
}

// 20. iOS iMessage Parody
export function IMessageSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="max-w-xs px-4 py-2 bg-blue-600 text-white rounded-2xl text-xs font-sans shadow-lg" style={{ backgroundColor: style.backgroundColor, color: style.textColor }}>
      <p><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> km in <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /> at <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> pace ❤️</p>
    </div>
  );
}

// 21. iOS Call Banner
export function IosCallSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 px-3 py-2 bg-zinc-900/90 backdrop-blur text-white rounded-2xl border border-zinc-800 flex items-center justify-between text-xs font-sans shadow-2xl" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs">🏃</div>
        <div>
          <div className="font-bold text-xs"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM ✔️</div>
          <div className="text-[9px] text-zinc-400">Pace: <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="p-1.5 bg-green-500 rounded-full"><Phone className="w-3 h-3 text-white" /></div>
      </div>
    </div>
  );
}

// 22. Sticky Note
export function StickyNoteSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-48 p-3 bg-yellow-200 text-black font-handwritten text-lg rounded shadow-xl rotate-1" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <p className="font-bold border-b border-black/20 pb-1"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></p>
      <p className="mt-1">• <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</p>
      <p>• Pace <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></p>
    </div>
  );
}

// 23. Nutrition Facts
export function NutritionFactsSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-56 p-2.5 bg-white text-black border-2 border-black font-sans text-xs" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <h2 className="font-black text-base border-b-2 border-black pb-0.5">Nutrition Facts</h2>
      <div className="border-b border-black py-0.5 font-bold flex justify-between">
        <span>Distance</span><span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
      </div>
      <div className="text-[10px] space-y-0.5 py-1">
        <div className="flex justify-between"><span>Pace</span><span><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></span></div>
        <div className="flex justify-between"><span>Time</span><span><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></span></div>
      </div>
    </div>
  );
}

// 24. Instagram Post Parody
export function InstagramPostSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-3 bg-zinc-950 text-white rounded-xl border border-zinc-800 font-sans text-xs space-y-1.5 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
          <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-[10px]">🏃</div>
        </div>
        <span className="font-bold text-xs">runner_albireo</span>
      </div>
      <div className="font-bold text-sm"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
    </div>
  );
}

// 25. Serif Magazine
export function SerifMagazineSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 bg-black/70 backdrop-blur text-white font-serif text-center w-64 rounded-xl border border-white/20" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <p className="text-[10px] uppercase tracking-widest text-zinc-300 border-b border-white/20 pb-1 mb-2"><EditableField value={metrics.date} onSave={(v) => onEditField?.('date', v)} /></p>
      <h2 className="text-2xl italic font-semibold"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></h2>
      <div className="text-3xl font-bold my-1 text-amber-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-lg italic">km</span></div>
    </div>
  );
}

// 26. Marathon Milestone PB Card
export function MarathonMilestoneSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 bg-yellow-400 text-black font-sans text-center w-64 rounded-xl border-2 border-black shadow-2xl" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <Trophy className="w-8 h-8 mx-auto mb-1 text-black" />
      <div className="font-black text-xs tracking-widest uppercase">PERSONAL RECORD PB</div>
      <div className="text-3xl font-black my-1"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs font-mono font-bold"><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /> • PACE <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
    </div>
  );
}

// 27. Cadence RPM Gauge
export function CadenceRpmSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-slate-900 text-sky-400 font-mono text-center w-56 rounded-2xl border border-sky-800 shadow-xl" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
      <div className="text-[10px] text-slate-400 uppercase">CADENCE / STRIDE</div>
      <div className="text-3xl font-black text-white my-1">178 <span className="text-xs text-sky-400 font-normal">SPM</span></div>
      <div className="text-[10px] bg-sky-950 text-sky-300 py-0.5 px-2 rounded-full inline-block font-bold">OPTIMAL RHYTHM</div>
    </div>
  );
}

// 28. HR Zone 2 Aerobic Bar
export function HrZoneMeterSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-slate-900 text-white font-sans text-xs w-64 rounded-xl border border-slate-700" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> HR ZONE 2</span>
        <span className="font-mono text-emerald-400 font-bold"><EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> BPM</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-slate-800 gap-0.5 my-1.5">
        <div className="w-1/5 bg-blue-500" />
        <div className="w-2/5 bg-emerald-500" />
        <div className="w-1/5 bg-amber-500 opacity-30" />
        <div className="w-1/5 bg-red-500 opacity-30" />
      </div>
    </div>
  );
}

// 29. Newspaper Headline Banner
export function NewspaperHeadlineSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-3 bg-amber-50 text-stone-900 font-serif text-center border-2 border-stone-800 shadow-xl" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="text-[9px] uppercase font-mono tracking-widest border-b border-stone-800 pb-0.5 mb-1">THE DAILY ATHLETE GAZETTE</div>
      <h3 className="font-extrabold text-lg leading-tight uppercase">RUNNER CRUSHES <EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</h3>
      <p className="text-[11px] italic mt-1 text-stone-700">Finished in <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /> with a blistering pace of <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /km.</p>
    </div>
  );
}

// 30. Spotify Player Parody
export function SpotifyPlayerSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-3 bg-neutral-900 text-white rounded-2xl font-sans text-xs shadow-2xl border border-neutral-800" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-lg">🏃</div>
        <div className="flex-1 truncate">
          <h4 className="font-bold text-sm truncate"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></h4>
          <p className="text-[11px] text-neutral-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</p>
        </div>
      </div>
      <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden mt-3">
        <div className="bg-emerald-500 h-full w-2/3" />
      </div>
    </div>
  );
}

// 31. Airport Boarding Pass Ticket
export function AirportBoardingPassSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-3 bg-white text-slate-900 font-mono text-xs rounded-xl shadow-2xl border border-slate-300" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
        <span className="font-black text-blue-600 flex items-center gap-1"><Plane className="w-3.5 h-3.5" /> SHARE AIRLINES</span>
        <span className="bg-slate-100 text-[9px] px-1.5 py-0.5 font-bold">BOARDING PASS</span>
      </div>
      <div className="flex justify-between my-2 text-center">
        <div><div className="text-[9px] text-slate-400">FROM</div><div className="font-bold text-sm">START</div></div>
        <div className="text-lg font-bold text-blue-500">✈</div>
        <div><div className="text-[9px] text-slate-400">DEST</div><div className="font-bold text-sm"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} />KM</div></div>
      </div>
    </div>
  );
}

// 32. Cassette Tape 80s Retro
export function CassetteTapeSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-60 p-3 bg-amber-400 text-slate-900 rounded-xl font-mono text-xs border-2 border-slate-900 shadow-xl" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="bg-white p-2 rounded border border-slate-900 text-center">
        <div className="text-[10px] font-bold border-b border-slate-300 pb-0.5 mb-1">SIDE A • MORNING RUN MIX</div>
        <div className="font-black text-sm"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
      </div>
    </div>
  );
}

// 33. Polaroid Vintage Photo Badge
export function PolaroidFrameSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-56 p-3 bg-white text-stone-800 shadow-2xl rounded font-sans text-center border border-stone-200" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="w-full h-32 bg-stone-900 rounded mb-2 flex items-center justify-center text-4xl">🏃</div>
      <div className="font-bold text-xs"><EditableField value={metrics.title} onSave={(v) => onEditField?.('title', v)} /></div>
      <div className="text-[10px] text-stone-500"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM • <EditableField value={metrics.date} onSave={(v) => onEditField?.('date', v)} /></div>
    </div>
  );
}

// 34. Cyberpunk Neon HUD Badge
export function CyberpunkNeonSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-60 p-3 bg-slate-950 text-cyan-400 font-mono text-xs border border-cyan-400 rounded glow-cyan shadow-2xl" style={{ backgroundColor: style.backgroundColor, color: style.textColor, borderColor: style.borderColor }}>
      <div className="text-[9px] text-cyan-600 border-b border-cyan-800 pb-1 mb-1">CYBER_RUN // TELEMETRY_SYS</div>
      <div className="text-2xl font-black tracking-wider text-cyan-300"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-[10px] text-cyan-500 mt-1">PACE: <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> | STATUS: OPTIMAL</div>
    </div>
  );
}

// 35. 4-Quadrant Workout Summary Grid
export function WorkoutSummaryGridSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-3 bg-zinc-950 text-white font-sans text-xs rounded-2xl border border-zinc-800 shadow-2xl grid grid-cols-2 gap-2" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="p-2 bg-zinc-900 rounded-xl text-center">
        <div className="text-[9px] text-zinc-400 uppercase">Distance</div>
        <div className="text-xl font-black text-cyan-400"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-xs">km</span></div>
      </div>
      <div className="p-2 bg-zinc-900 rounded-xl text-center">
        <div className="text-[9px] text-zinc-400 uppercase">Pace</div>
        <div className="text-xl font-black text-amber-400"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
      </div>
      <div className="p-2 bg-zinc-900 rounded-xl text-center">
        <div className="text-[9px] text-zinc-400 uppercase">Duration</div>
        <div className="text-lg font-black text-emerald-400"><EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></div>
      </div>
      <div className="p-2 bg-zinc-900 rounded-xl text-center">
        <div className="text-[9px] text-zinc-400 uppercase">Heart Rate</div>
        <div className="text-xl font-black text-rose-400"><EditableField value={metrics.heartRate} onSave={(v) => onEditField?.('heartRate', v)} /> <span className="text-xs">bpm</span></div>
      </div>
    </div>
  );
}

// 36. Weekly Recap Ring Progress Badge
export function WeeklyRecapRingSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-64 p-4 bg-zinc-900 text-white font-sans text-xs rounded-2xl border border-zinc-700 shadow-2xl flex items-center gap-3" style={{ backgroundColor: style.backgroundColor, borderColor: style.borderColor, color: style.textColor }}>
      <div className="w-14 h-14 rounded-full border-4 border-cyan-400 flex items-center justify-center font-black text-sm text-cyan-400 flex-shrink-0">
        84%
      </div>
      <div>
        <div className="text-[10px] text-zinc-400 uppercase font-bold">WEEKLY TARGET RECAP</div>
        <div className="text-lg font-black text-white"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
        <div className="text-[10px] text-emerald-400">+12% vs last week</div>
      </div>
    </div>
  );
}

// 37. Ultra Clean 1-Line Minimalist Badge
export function MinimalMinimalistSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="px-4 py-1.5 bg-black/80 backdrop-blur border border-white/20 rounded-full text-white font-sans text-xs flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="font-bold"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> {metrics.unit}</span>
      <span className="text-zinc-400">•</span>
      <span className="text-zinc-300"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></span>
    </div>
  );
}

// 38. Retro 70s Sport Badge
export function RetroBadgeSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-3 bg-stone-900 border-2 border-amber-500 rounded-2xl text-amber-400 font-sans text-center w-56 shadow-2xl">
      <div className="text-[10px] tracking-widest uppercase text-amber-500 font-bold border-b border-amber-800 pb-1 mb-1">ATHLETIC DEPT 1974</div>
      <div className="text-3xl font-black text-white"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</div>
      <div className="text-xs font-mono mt-1 text-amber-300"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /> /KM</div>
    </div>
  );
}

// 39. Futuristic Glass HUD
export function FuturisticGlassSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="p-4 glass-panel border border-sky-500/40 text-sky-400 font-mono text-center w-64 rounded-2xl glow-cyan">
      <div className="text-[9px] uppercase tracking-widest text-sky-300 mb-1">SYS // TELEMETRY HUD</div>
      <div className="text-3xl font-black text-white"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> <span className="text-sky-400 text-sm">KM</span></div>
      <div className="flex justify-around text-[10px] mt-2 pt-2 border-t border-sky-500/30 text-sky-200">
        <span>PACE: <EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></span>
        <span>TIME: <EditableField value={metrics.time} onSave={(v) => onEditField?.('time', v)} /></span>
      </div>
    </div>
  );
}

// 40. Minimal Circular Stat Badge
export function MinimalCircleSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-32 h-32 rounded-full bg-zinc-950 border-2 border-zinc-700 text-white flex flex-col items-center justify-center text-center p-2 shadow-2xl">
      <div className="text-xs text-zinc-400 uppercase font-bold">RUN</div>
      <div className="text-2xl font-black text-cyan-400 my-0.5"><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /></div>
      <div className="text-[10px] text-zinc-400 font-mono"><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></div>
    </div>
  );
}

// 41. Compact Split Box
export function CompactSplitSticker({ metrics, style, onEditField }: TemplateProps) {
  return (
    <div className="w-48 p-2.5 bg-purple-950 text-purple-200 border border-purple-800 rounded-xl font-mono text-xs space-y-1">
      <div className="flex justify-between font-bold border-b border-purple-800 pb-1">
        <span>SPLIT LAP</span>
        <span className="text-purple-400">BEST KM</span>
      </div>
      <div className="flex justify-between font-bold text-white text-sm">
        <span><EditableField value={metrics.distance} onSave={(v) => onEditField?.('distance', v)} /> KM</span>
        <span><EditableField value={metrics.pace} onSave={(v) => onEditField?.('pace', v)} /></span>
      </div>
    </div>
  );
}

// Master Dispatcher component
export function StickerRenderer({
  type,
  metrics,
  style,
  onEditField,
  parametricConfig,
}: {
  type: StickerType;
  metrics: ActivityMetrics;
  style: StickerStyle;
  onEditField?: (field: string, value: string) => void;
  parametricConfig?: ParametricConfig;
}) {
  switch (type) {
    case 'parametric':
      if (parametricConfig) return <ParametricStickerRenderer config={parametricConfig} metrics={metrics} />;
      return <ReceiptSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'icon_badge': return <IconBadgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'red_bold_header': return <RedBoldHeaderSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'elevation_gradient': return <ElevationGradientSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'minimal_horizontal': return <MinimalHorizontalSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'serif_classic': return <SerifClassicSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'digital_red_led': return <DigitalRedLedSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'barcode_ticket': return <BarcodeTicketSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'color_badge': return <ColorBadgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'runner_bold': return <RunnerBoldSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'splits_list': return <SplitsListSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'finish_banner': return <FinishBannerSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'receipt': return <ReceiptSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'json_code': return <JsonCodeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'speedometer': return <SpeedometerSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'splits_histogram': return <SplitsHistogramSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'polyline_track': return <PolylineTrackSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'windows_error': return <WindowsErrorSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'mbanking': return <MBankingSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'getty_stamp': return <GettyStampSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cigarette_warning': return <CigaretteWarningSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'imessage': return <IMessageSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'ios_call': return <IosCallSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'sticky_note': return <StickyNoteSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'nutrition_facts': return <NutritionFactsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'instagram_post': return <InstagramPostSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'serif_magazine': return <SerifMagazineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'marathon_milestone': return <MarathonMilestoneSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cadence_rpm': return <CadenceRpmSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'hr_zone_meter': return <HrZoneMeterSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'newspaper_headline': return <NewspaperHeadlineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'spotify_player': return <SpotifyPlayerSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'airport_boarding_pass': return <AirportBoardingPassSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cassette_tape': return <CassetteTapeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'polaroid_frame': return <PolaroidFrameSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cyberpunk_neon': return <CyberpunkNeonSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'workout_summary_grid': return <WorkoutSummaryGridSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weekly_recap_ring': return <WeeklyRecapRingSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'minimal_minimalist': return <MinimalMinimalistSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'retro_badge': return <RetroBadgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'futuristic_glass': return <FuturisticGlassSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'minimal_circle': return <MinimalCircleSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'compact_split': return <CompactSplitSticker metrics={metrics} style={style} onEditField={onEditField} />;
    // ── Unique Structured Templates ──
    case 'elevation_wave': return <ElevationWaveSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'horizontal_metrics': return <HorizontalMetricsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'serif_italic': return <SerifItalicSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'receipt_full': return <ReceiptFullSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'splits_roman': return <SplitsRomanSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'text_sentence': return <TextSentenceSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'large_typography': return <LargeTypographySticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'data_table': return <DataTableSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'bar_chart_pace': return <BarChartPaceSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'location_card': return <LocationCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'day_badge': return <DayBadgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'dual_stats': return <DualStatsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'column_numbers': return <ColumnNumbersSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'highlight_blocks': return <HighlightBlocksSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cumulative_list': return <CumulativeListSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'verified_badge': return <VerifiedBadgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'time_range': return <TimeRangeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'pace_chart': return <PaceChartSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'italic_title': return <ItalicTitleSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'location_pill': return <LocationPillSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'map_route': return <MapRouteSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'square_frame': return <SquareFrameSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'colored_bar': return <ColoredBarSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'data_rows': return <DataRowsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'calendar_card': return <CalendarCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weekly_list': return <WeeklyListSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'description_card': return <DescriptionCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'pace_zones': return <PaceZonesSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'elevation_area': return <ElevationAreaSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'text_paragraph': return <TextParagraphSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'highlight_bar': return <HighlightBarSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'kilometres_bold': return <KilometresBoldSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'trademark_style': return <TrademarkStyleSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'heart_pill': return <HeartPillSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'led_clock': return <LedClockSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'bold_location': return <BoldLocationSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'route_number': return <RouteNumberSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'app_widget': return <AppWidgetSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'money_tag': return <MoneyTagSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'multilingual': return <MultilingualSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'simple_table': return <SimpleTableSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'repeat_text': return <RepeatTextSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'monthly_total': return <MonthlyTotalSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weekly_dots': return <WeeklyDotsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weekly_summary': return <WeeklySummarySticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weekly_table': return <WeeklyTableSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'circle_grid': return <CircleGridSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'monthly_chart': return <MonthlyChartSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'progress_pct': return <ProgressPctSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'area_chart_weekly': return <AreaChartWeeklySticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'dot_progress': return <DotProgressSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'square_progress': return <SquareProgressSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'vertical_bars': return <VerticalBarsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'stacked_days': return <StackedDaysSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'running_total': return <RunningTotalSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weekly_map': return <WeeklyMapSticker metrics={metrics} style={style} onEditField={onEditField} />;
    // ── Extra Unique Templates ──
    case 'gradient_mesh': return <GradientMeshSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'neo_brutalist': return <NeoBrutalistSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'glass_card': return <GlassCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'neon_glow': return <NeonGlowSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'film_strip': return <FilmStripSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'newspaper_column': return <NewspaperColumnSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'terminal_green': return <TerminalGreenSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'vhs_retro': return <VhsRetroSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'notebook_line': return <NotebookLineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'blueprint': return <BlueprintSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'embossed': return <EmbossedSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'metallic': return <MetallicSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'pixel_art': return <PixelArtSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'achievement': return <AchievementSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'leaderboard': return <LeaderboardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'countdown': return <CountdownSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'progress_ring': return <ProgressRingSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'radial_chart': return <RadialChartSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'heatmap': return <HeatmapSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'timeline': return <TimelineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'tab_ui': return <TabUiSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'card_stack': return <CardStackSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'ribbon': return <RibbonSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'notification': return <NotificationSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'music_player': return <MusicPlayerSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'weather_card': return <WeatherCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'splits_bar_chart': return <SplitsBarChartSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'stacked_metrics': return <StackedMetricsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'running_man': return <RunningManSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'bordered_frame': return <BorderedFrameSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'stat_ribbon': return <StatRibbonSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'dot_matrix': return <DotMatrixSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'badge_collection': return <BadgeCollectionSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'mini_map': return <MiniMapSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'progress_bar': return <ProgressBarSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'circular_gauge': return <CircularGaugeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'grid_4x4': return <Grid4x4Sticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'quote_card': return <QuoteCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'comparison_split': return <ComparisonSplitSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'stacked_cards': return <StackedCardsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'floating_labels': return <FloatingLabelsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'asymmetric_layout': return <AsymmetricLayoutSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'minimalist_line': return <MinimalistLineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'card_flip': return <CardFlipSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'masonry_grid': return <MasonryGridSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'hexagon_badge': return <HexagonBadgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'diamond_shape': return <DiamondShapeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'triangle_layout': return <TriangleLayoutSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'arch_frame': return <ArchFrameSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'circle_cutout': return <CircleCutoutSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'rounded_stripes': return <RoundedStripesSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'gradient_border': return <GradientBorderSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'inner_shadow': return <InnerShadowSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'double_frame': return <DoubleFrameSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'zigzag_edge': return <ZigzagEdgeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'wave_bottom': return <WaveBottomSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'corner_fold': return <CornerFoldSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'tabbed_card': return <TabbedCardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'accordion': return <AccordionSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'split_diagonal': return <SplitDiagonalSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'dot_pattern': return <DotPatternSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cross_stitch': return <CrossStitchSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'chevron_rows': return <ChevronRowsSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'pinstripe': return <PinstripeSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'brick_layout': return <BrickLayoutSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'tile_mosaic': return <TileMosaicSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'stained_glass': return <StainedGlassSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'paper_texture': return <PaperTextureSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'carbon_fiber': return <CarbonFiberSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'brushed_metal': return <BrushedMetalSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'denim_fabric': return <DenimFabricSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'concrete_wall': return <ConcreteWallSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'rustic_wood': return <RusticWoodSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'bamboo_weave': return <BambooWeaveSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'woven_pattern': return <WovenPatternSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'leather_grain': return <LeatherGrainSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'silk_sheen': return <SilkSheenSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'velvet_plush': return <VelvetPlushSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'satin_finish': return <SatinFinishSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'matte_paper': return <MattePaperSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'glossy_surface': return <GlossySurfaceSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'translucent_glass': return <TranslucentGlassSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'frosted_glass': return <FrostedGlassSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'smoked_glass': return <SmokedGlassSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'cracked_ice': return <CrackedIceSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'liquid_metal': return <LiquidMetalSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'holographic': return <HolographicSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'iridescent': return <IridescentSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'prismatic': return <PrismaticSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'nebula_cloud': return <NebulaCloudSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'aurora_borealis': return <AuroraBorealisSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'galaxy_spiral': return <GalaxySpiralSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'star_field': return <StarFieldSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'sun_flare': return <SunFlareSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'moon_glow': return <MoonGlowSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'water_ripple': return <WaterRippleSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'flame_wave': return <FlameWaveSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'electric_spark': return <ElectricSparkSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'laser_grid': return <LaserGridSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'radar_sweep': return <RadarSweepSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'sonar_ping': return <SonarPingSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'target_lock': return <TargetLockSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'scope_view': return <ScopeViewSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'xray_vision': return <XrayVisionSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'thermal_map': return <ThermalMapSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'night_vision': return <NightVisionSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'blueprint_grid': return <BlueprintGridSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'schematic': return <SchematicSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'circuit_board': return <CircuitBoardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'motherboard': return <MotherboardSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'chip_layout': return <ChipLayoutSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'wire_frame': return <WireFrameSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'mesh_network': return <MeshNetworkSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'node_graph': return <NodeGraphSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'data_flow': return <DataFlowSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'pipeline': return <PipelineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'circuit_path': return <CircuitPathSticker metrics={metrics} style={style} onEditField={onEditField} />;
    case 'trace_line': return <TraceLineSticker metrics={metrics} style={style} onEditField={onEditField} />;
    default: return <ReceiptSticker metrics={metrics} style={style} onEditField={onEditField} />;
  }
}
