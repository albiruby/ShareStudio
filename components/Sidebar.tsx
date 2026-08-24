'use client';

import React from 'react';
import { StickerType, ActivityMetrics, BackgroundSettings } from '@/lib/types';
import { DEFAULT_STYLES } from '@/lib/constants';
import { StickerRenderer } from './stickers/MegaTemplates';
import { PhotoControls } from './PhotoControls';
import {
  LayoutGrid,
  Shapes,
  Image as ImageIcon,
  Sliders,
  Search,
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
} from 'lucide-react';

interface SidebarProps {
  metrics: ActivityMetrics;
  setMetrics: (m: ActivityMetrics) => void;
  background: BackgroundSettings;
  onUpdateBackground: (bg: BackgroundSettings) => void;
  onAddSticker: (type: StickerType) => void;
}

interface TemplateItem {
  type: StickerType;
  label: string;
  category: 'Tags' | 'Parodies' | 'Metrics' | 'Retro' | 'Editorial';
}

const MASTER_SHARESTUDIO_TEMPLATES: TemplateItem[] = [
  { type: 'red_bold_header', label: 'Red Bold Header Tag', category: 'Tags' },
  { type: 'elevation_gradient', label: 'Elevation Gradient Wave', category: 'Metrics' },
  { type: 'minimal_horizontal', label: 'Minimal Horizontal Bar', category: 'Tags' },
  { type: 'serif_classic', label: 'Serif Classic Tag', category: 'Editorial' },
  { type: 'digital_red_led', label: 'Digital LED Scoreboard', category: 'Retro' },
  { type: 'barcode_ticket', label: 'Barcode Ticket Stub', category: 'Tags' },
  { type: 'color_badge', label: 'Yellow Color Badge', category: 'Tags' },
  { type: 'runner_bold', label: 'Runner Bold Emblem', category: 'Tags' },
  { type: 'splits_list', label: 'Splits List Breakdown', category: 'Metrics' },
  { type: 'finish_banner', label: 'Finish Line Banner', category: 'Tags' },
  { type: 'receipt', label: 'Thermal Cashier Receipt', category: 'Parodies' },
  { type: 'json_code', label: 'Developer JSON Code', category: 'Retro' },
  { type: 'speedometer', label: 'Speedometer Top Speed', category: 'Metrics' },
  { type: 'splits_histogram', label: 'Splits Pace Histogram', category: 'Metrics' },
  { type: 'polyline_track', label: 'Polyline Route Track', category: 'Tags' },
  { type: 'windows_error', label: 'Windows OS Alert Box', category: 'Parodies' },
  { type: 'mbanking', label: 'Mobile Banking Success', category: 'Parodies' },
  { type: 'getty_stamp', label: 'ShareStudio Watermark Stamp', category: 'Parodies' },
  { type: 'cigarette_warning', label: 'Marathon Health Warning', category: 'Parodies' },
  { type: 'imessage', label: 'iOS iMessage Bubble', category: 'Parodies' },
  { type: 'ios_call', label: 'iOS Call Banner', category: 'Parodies' },
  { type: 'sticky_note', label: 'Yellow Taped Sticky Note', category: 'Parodies' },
  { type: 'nutrition_facts', label: 'Nutrition Facts Table', category: 'Parodies' },
  { type: 'instagram_post', label: 'Social Post Parody', category: 'Parodies' },
  { type: 'serif_magazine', label: 'Editorial Magazine Serif', category: 'Editorial' },
  { type: 'marathon_milestone', label: 'Personal Best Record', category: 'Metrics' },
  { type: 'cadence_rpm', label: 'Cadence RPM Stride', category: 'Metrics' },
  { type: 'hr_zone_meter', label: 'Heart Rate Zone 2 Meter', category: 'Metrics' },
  { type: 'newspaper_headline', label: 'Newspaper Headline Banner', category: 'Retro' },
  { type: 'spotify_player', label: 'Now Playing Music Player', category: 'Parodies' },
  { type: 'airport_boarding_pass', label: 'Airport Boarding Pass', category: 'Tags' },
  { type: 'cassette_tape', label: '80s Cassette Tape Mix', category: 'Retro' },
  { type: 'polaroid_frame', label: 'Vintage Polaroid Frame', category: 'Retro' },
  { type: 'cyberpunk_neon', label: 'Cyberpunk HUD Badge', category: 'Retro' },
];

const ATHLETIC_ICONS = [
  { icon: Flame, name: 'Calories Flame' },
  { icon: Heart, name: 'Heart Rate' },
  { icon: Trophy, name: 'Trophy Winner' },
  { icon: Medal, name: 'Medal Champion' },
  { icon: MapPin, name: 'GPS Location' },
  { icon: Zap, name: 'Speed / Pace' },
  { icon: Clock, name: 'Duration Clock' },
  { icon: Shield, name: 'Endurance Shield' },
  { icon: Flag, name: 'Finish Flag' },
  { icon: Battery, name: 'Energy Battery' },
  { icon: Check, name: 'Verified Check' },
  { icon: Star, name: 'Star Award' },
  { icon: Crown, name: 'King / PB' },
  { icon: Sparkles, name: 'Magic Sparkles' },
  { icon: Target, name: 'Pace Target' },
  { icon: Compass, name: 'Trail Compass' },
  { icon: Mountain, name: 'Elevation Mountain' },
  { icon: Activity, name: 'Pulse Activity' },
  { icon: BarChart, name: 'Splits BarChart' },
  { icon: TrendingUp, name: 'Progress Trend' },
];

export function Sidebar({
  metrics,
  setMetrics,
  background,
  onUpdateBackground,
  onAddSticker,
}: SidebarProps) {
  const [activeTab, setActiveTab] = React.useState<'library' | 'icons' | 'photo' | 'metrics'>('library');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  // Filter templates
  const filteredTemplates = MASTER_SHARESTUDIO_TEMPLATES.filter((item) => {
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="w-80 border-r border-zinc-800 glass-panel flex flex-col h-[calc(100vh-4rem)] z-30">
      {/* Unified Sidebar Tabs */}
      <div className="flex border-b border-zinc-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'library'
              ? 'border-cyan-400 text-cyan-400 bg-zinc-800/50'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" /> Library
        </button>
        <button
          onClick={() => setActiveTab('icons')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'icons'
              ? 'border-cyan-400 text-cyan-400 bg-zinc-800/50'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Shapes className="w-3.5 h-3.5" /> Icons
        </button>
        <button
          onClick={() => setActiveTab('photo')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'photo'
              ? 'border-cyan-400 text-cyan-400 bg-zinc-800/50'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> Photo
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'metrics'
              ? 'border-cyan-400 text-cyan-400 bg-zinc-800/50'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" /> Data
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* TAB 1: UNIFIED MASTER SHARESTUDIO LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 1000+ templates & stickers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {['All', 'Tags', 'Parodies', 'Metrics', 'Retro', 'Editorial'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Visual Card Grid */}
            <div className="grid grid-cols-2 gap-2">
              {filteredTemplates.map((item) => (
                <div
                  key={item.type}
                  onClick={() => onAddSticker(item.type)}
                  className="group relative bg-zinc-950 border border-zinc-800 hover:border-cyan-500 rounded-xl p-2 cursor-pointer transition-all hover:scale-[1.02] flex flex-col items-center justify-center min-h-[110px] overflow-hidden shadow-lg"
                >
                  <div className="scale-[0.42] origin-center transform-gpu pointer-events-none my-auto">
                    <StickerRenderer
                      type={item.type}
                      metrics={metrics}
                      style={DEFAULT_STYLES[item.type]}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-zinc-900/90 py-1 text-center border-t border-zinc-800 opacity-90 group-hover:opacity-100 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <span className="text-[10px] font-bold truncate px-1 block">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ATHLETIC ICONS & SHAPES */}
        {activeTab === 'icons' && (
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              ShareStudio Athletic Icons Catalog
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {ATHLETIC_ICONS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => onAddSticker('color_badge')}
                    className="p-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 hover:bg-zinc-800 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-1 transition-all group"
                    title={item.name}
                  >
                    <IconComp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] text-zinc-400 truncate w-full text-center">{item.name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO CONTROLS */}
        {activeTab === 'photo' && (
          <PhotoControls
            background={background}
            onUpdateBackground={onUpdateBackground}
          />
        )}

        {/* TAB 4: MANUAL METRICS EDITOR */}
        {activeTab === 'metrics' && (
          <div className="space-y-3 text-xs">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Edit Run Telemetry Data
            </h3>
            <div>
              <label className="block text-zinc-400 mb-1">Run Title</label>
              <input
                type="text"
                value={metrics.title}
                onChange={(e) => setMetrics({ ...metrics, title: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-zinc-400 mb-1">Distance (KM)</label>
                <input
                  type="text"
                  value={metrics.distance}
                  onChange={(e) => setMetrics({ ...metrics, distance: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Avg Pace (/KM)</label>
                <input
                  type="text"
                  value={metrics.pace}
                  onChange={(e) => setMetrics({ ...metrics, pace: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-zinc-400 mb-1">Duration</label>
                <input
                  type="text"
                  value={metrics.time}
                  onChange={(e) => setMetrics({ ...metrics, time: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Heart Rate (BPM)</label>
                <input
                  type="text"
                  value={metrics.heartRate}
                  onChange={(e) => setMetrics({ ...metrics, heartRate: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Location</label>
              <input
                type="text"
                value={metrics.location}
                onChange={(e) => setMetrics({ ...metrics, location: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
