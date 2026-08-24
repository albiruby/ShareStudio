'use client';

import React from 'react';
import { StickerType, ActivityMetrics, BackgroundSettings } from '@/lib/types';
import { DEFAULT_STYLES } from '@/lib/constants';
import { StickerRenderer } from './stickers/MegaTemplates';
import { PhotoControls } from './PhotoControls';
import {
  LayoutGrid, Shapes, Image as ImageIcon, Sliders, Search,
  Flame, Heart, Trophy, Medal, MapPin, Zap, Clock, Shield, Flag, Battery,
  Check, Star, Crown, Sparkles, Target, Compass, Mountain, Activity,
  BarChart, TrendingUp, Award, Gauge, Timer, Watch, Navigation,
  Dumbbell, Footprints, Bike, CircleDot, Layers, Box, Tag, Ticket,
  FileText, Music, Disc, Radio, Plane, Smile, ThumbsUp, Coffee,
  Sun, Moon, Wind, Thermometer, CloudLightning, ShieldCheck,
  CheckCircle2, AlertCircle, AlertOctagon, RefreshCw, Eye, Share2,
  Copy, Hexagon, Octagon, Triangle, Square, Circle,
} from 'lucide-react';

interface SidebarProps {
  metrics: ActivityMetrics;
  setMetrics: (m: ActivityMetrics) => void;
  background: BackgroundSettings;
  onUpdateBackground: (bg: BackgroundSettings) => void;
  onAddSticker: (type: StickerType, customStyle?: any) => void;
}

interface TemplateItem {
  type: StickerType;
  label: string;
  category: 'Single' | 'Recap' | 'Chart' | 'Map' | 'Retro' | 'Badge';
}

const UNIQUE_TEMPLATES: TemplateItem[] = [
  // ── Single Tags (Structurally unique layouts) ──
  { type: 'red_bold_header', label: 'Red Bold Header', category: 'Single' },
  { type: 'elevation_wave', label: 'Elevation Wave', category: 'Single' },
  { type: 'horizontal_metrics', label: 'Horizontal Metrics', category: 'Single' },
  { type: 'serif_italic', label: 'Serif Italic', category: 'Single' },
  { type: 'digital_red_led', label: 'Digital LED Scoreboard', category: 'Single' },
  { type: 'receipt_full', label: 'Full Thermal Receipt', category: 'Single' },
  { type: 'color_badge', label: 'Yellow Badge', category: 'Single' },
  { type: 'runner_bold', label: 'Runner Bold', category: 'Single' },
  { type: 'splits_roman', label: 'Splits Roman Bars', category: 'Single' },
  { type: 'finish_banner', label: 'Finish Banner', category: 'Single' },
  { type: 'json_code', label: 'JSON Code Block', category: 'Single' },
  { type: 'text_sentence', label: 'Text Sentence', category: 'Single' },
  { type: 'large_typography', label: 'Large Typography', category: 'Single' },
  { type: 'day_badge', label: 'Day Badge', category: 'Single' },
  { type: 'dual_stats', label: 'Dual Stats', category: 'Single' },
  { type: 'column_numbers', label: 'Column Numbers', category: 'Single' },
  { type: 'highlight_blocks', label: 'Highlight Blocks', category: 'Single' },
  { type: 'cumulative_list', label: 'Cumulative Time List', category: 'Single' },
  { type: 'verified_badge', label: 'Verified Badge', category: 'Single' },
  { type: 'time_range', label: 'Time Range', category: 'Single' },
  { type: 'pace_chart', label: 'Pace Chart', category: 'Single' },
  { type: 'italic_title', label: 'Italic Title', category: 'Single' },
  { type: 'location_pill', label: 'Location Pill', category: 'Single' },
  { type: 'square_frame', label: 'Square Frame', category: 'Single' },
  { type: 'colored_bar', label: 'Colored Bar', category: 'Single' },
  { type: 'data_rows', label: 'Data Rows', category: 'Single' },
  { type: 'calendar_card', label: 'Calendar Card', category: 'Single' },
  { type: 'weekly_list', label: 'Weekly List', category: 'Single' },
  { type: 'description_card', label: 'Description Card', category: 'Single' },
  { type: 'kilometres_bold', label: 'Kilometres Bold', category: 'Single' },
  { type: 'trademark_style', label: 'Trademark Style', category: 'Single' },
  { type: 'heart_pill', label: 'Heart Pill', category: 'Badge' },
  { type: 'led_clock', label: 'LED Clock', category: 'Retro' },
  { type: 'bold_location', label: 'Bold Location', category: 'Single' },
  { type: 'route_number', label: 'Route + Number', category: 'Map' },
  { type: 'app_widget', label: 'App Widget', category: 'Single' },
  { type: 'money_tag', label: 'Money Tag', category: 'Badge' },
  { type: 'multilingual', label: 'Multilingual', category: 'Single' },
  { type: 'simple_table', label: 'Simple Table', category: 'Single' },
  { type: 'repeat_text', label: 'Repeat Text', category: 'Single' },
  { type: 'data_table', label: 'Data Table', category: 'Single' },
  { type: 'bar_chart_pace', label: 'Bar Chart Pace', category: 'Chart' },
  { type: 'location_card', label: 'Location Card', category: 'Single' },
  { type: 'highlight_bar', label: 'Highlight Bar', category: 'Badge' },
  { type: 'text_paragraph', label: 'Text Paragraph', category: 'Single' },
  { type: 'pace_zones', label: 'Pace Zones', category: 'Chart' },
  { type: 'elevation_area', label: 'Elevation Area', category: 'Chart' },
  { type: 'map_route', label: 'Map Route', category: 'Map' },
  // ── Recap Tags ──
  { type: 'monthly_total', label: 'Monthly Total', category: 'Recap' },
  { type: 'weekly_dots', label: 'Weekly Dots', category: 'Recap' },
  { type: 'weekly_summary', label: 'Weekly Summary', category: 'Recap' },
  { type: 'weekly_table', label: 'Weekly Table', category: 'Recap' },
  { type: 'circle_grid', label: 'Circle Grid', category: 'Recap' },
  { type: 'monthly_chart', label: 'Monthly Chart', category: 'Recap' },
  { type: 'progress_pct', label: 'Progress Percentage', category: 'Recap' },
  { type: 'area_chart_weekly', label: 'Area Chart Weekly', category: 'Recap' },
  { type: 'dot_progress', label: 'Dot Progress', category: 'Recap' },
  { type: 'square_progress', label: 'Square Progress', category: 'Recap' },
  { type: 'vertical_bars', label: 'Vertical Bars Weekly', category: 'Recap' },
  { type: 'stacked_days', label: 'Stacked Days', category: 'Recap' },
  { type: 'running_total', label: 'Running Total', category: 'Recap' },
  { type: 'weekly_map', label: 'Weekly Map', category: 'Recap' },
  // ── Extra Unique Designs ──
  { type: 'gradient_mesh', label: 'Gradient Mesh', category: 'Badge' },
  { type: 'neo_brutalist', label: 'Neo Brutalist', category: 'Retro' },
  { type: 'glass_card', label: 'Glass Card', category: 'Badge' },
  { type: 'neon_glow', label: 'Neon Glow', category: 'Retro' },
  { type: 'film_strip', label: 'Film Strip', category: 'Retro' },
  { type: 'newspaper_column', label: 'Newspaper Column', category: 'Retro' },
  { type: 'terminal_green', label: 'Terminal Green', category: 'Retro' },
  { type: 'vhs_retro', label: 'VHS Retro', category: 'Retro' },
  { type: 'notebook_line', label: 'Notebook Line', category: 'Single' },
  { type: 'blueprint', label: 'Blueprint', category: 'Retro' },
  { type: 'embossed', label: 'Embossed', category: 'Badge' },
  { type: 'metallic', label: 'Metallic Plate', category: 'Badge' },
  { type: 'pixel_art', label: 'Pixel Art', category: 'Retro' },
  { type: 'achievement', label: 'Achievement', category: 'Badge' },
  { type: 'leaderboard', label: 'Leaderboard', category: 'Chart' },
  { type: 'countdown', label: 'Countdown', category: 'Single' },
  { type: 'progress_ring', label: 'Progress Ring', category: 'Chart' },
  { type: 'radial_chart', label: 'Radial Chart', category: 'Chart' },
  { type: 'heatmap', label: 'Heatmap', category: 'Chart' },
  { type: 'timeline', label: 'Timeline', category: 'Single' },
  { type: 'tab_ui', label: 'Tab UI', category: 'Single' },
  { type: 'card_stack', label: 'Card Stack', category: 'Badge' },
  { type: 'ribbon', label: 'Ribbon', category: 'Badge' },
  { type: 'notification', label: 'Notification', category: 'Single' },
  { type: 'music_player', label: 'Music Player', category: 'Single' },
  { type: 'weather_card', label: 'Weather Card', category: 'Single' },
  { type: 'splits_bar_chart', label: 'Splits Bar Chart', category: 'Chart' },
  { type: 'stacked_metrics', label: 'Stacked Metrics', category: 'Single' },
  { type: 'running_man', label: 'Running Man', category: 'Single' },
  { type: 'bordered_frame', label: 'Bordered Frame', category: 'Badge' },
  { type: 'stat_ribbon', label: 'Stat Ribbon', category: 'Single' },
  { type: 'dot_matrix', label: 'Dot Matrix', category: 'Retro' },
  { type: 'badge_collection', label: 'Badge Collection', category: 'Badge' },
  { type: 'mini_map', label: 'Mini Map', category: 'Map' },
];

const ATHLETIC_ICONS = [
  { icon: Flame, name: 'Calories' },
  { icon: Heart, name: 'Heart Rate' },
  { icon: Trophy, name: 'Trophy' },
  { icon: Medal, name: 'Medal' },
  { icon: MapPin, name: 'Location' },
  { icon: Zap, name: 'Speed' },
  { icon: Clock, name: 'Clock' },
  { icon: Shield, name: 'Shield' },
  { icon: Flag, name: 'Flag' },
  { icon: Battery, name: 'Battery' },
  { icon: Check, name: 'Check' },
  { icon: Star, name: 'Star' },
  { icon: Crown, name: 'Crown' },
  { icon: Sparkles, name: 'Sparkle' },
  { icon: Target, name: 'Target' },
  { icon: Compass, name: 'Compass' },
  { icon: Mountain, name: 'Mountain' },
  { icon: Activity, name: 'Pulse' },
  { icon: BarChart, name: 'Chart' },
  { icon: TrendingUp, name: 'Trend' },
  { icon: Award, name: 'Award' },
  { icon: Gauge, name: 'Gauge' },
  { icon: Timer, name: 'Timer' },
  { icon: Watch, name: 'Watch' },
  { icon: Navigation, name: 'Nav' },
  { icon: Dumbbell, name: 'Gym' },
  { icon: Footprints, name: 'Footprints' },
  { icon: Bike, name: 'Bike' },
  { icon: CircleDot, name: 'Lap' },
  { icon: Layers, name: 'Layers' },
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

  const filteredTemplates = UNIQUE_TEMPLATES.filter((item) => {
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="w-80 border-r border-zinc-800 glass-panel flex flex-col h-[calc(100vh-4rem)] z-30">
      {/* Tabs */}
      <div className="flex border-b border-zinc-800 text-xs font-semibold">
        {[
          { key: 'library' as const, icon: LayoutGrid, label: 'Library' },
          { key: 'icons' as const, icon: Shapes, label: 'Icons' },
          { key: 'photo' as const, icon: ImageIcon, label: 'Photo' },
          { key: 'metrics' as const, icon: Sliders, label: 'Data' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              activeTab === tab.key
                ? 'border-cyan-400 text-cyan-400 bg-zinc-800/50'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* TAB 1: LIBRARY — Structurally unique templates */}
        {activeTab === 'library' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {['All', 'Single', 'Recap', 'Chart', 'Map', 'Badge', 'Retro'].map((cat) => (
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

            <div className="text-[10px] text-zinc-400 font-mono">
              {filteredTemplates.length} unique templates
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredTemplates.map((item) => {
                const customStyle = DEFAULT_STYLES[item.type] || DEFAULT_STYLES.receipt;
                return (
                  <div
                    key={item.type}
                    onClick={() => onAddSticker(item.type)}
                    className="group relative bg-zinc-950 border border-zinc-800 hover:border-cyan-500 rounded-xl p-2 cursor-pointer transition-all hover:scale-[1.02] flex flex-col items-center justify-center min-h-[110px] overflow-hidden shadow-lg"
                  >
                    <div className="scale-[0.42] origin-center transform-gpu pointer-events-none my-auto">
                      <StickerRenderer
                        type={item.type}
                        metrics={metrics}
                        style={customStyle}
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-zinc-900/90 py-1 text-center border-t border-zinc-800 opacity-90 group-hover:opacity-100 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <span className="text-[10px] font-bold truncate px-1 block">{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ICONS */}
        {activeTab === 'icons' && (
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Athletic Icons</h3>
            <div className="grid grid-cols-4 gap-2">
              {ATHLETIC_ICONS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => onAddSticker('runner_bold')}
                    className="p-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 hover:bg-zinc-800 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-1 transition-all group"
                    title={item.name}
                  >
                    <IconComp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] text-zinc-400 truncate w-full text-center">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO */}
        {activeTab === 'photo' && (
          <PhotoControls background={background} onUpdateBackground={onUpdateBackground} />
        )}

        {/* TAB 4: METRICS EDITOR */}
        {activeTab === 'metrics' && (
          <div className="space-y-3 text-xs">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Edit Run Data</h3>
            <div>
              <label className="block text-zinc-400 mb-1">Run Title</label>
              <input type="text" value={metrics.title} onChange={(e) => setMetrics({ ...metrics, title: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-zinc-400 mb-1">Distance (KM)</label>
                <input type="text" value={metrics.distance} onChange={(e) => setMetrics({ ...metrics, distance: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Pace (/KM)</label>
                <input type="text" value={metrics.pace} onChange={(e) => setMetrics({ ...metrics, pace: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-zinc-400 mb-1">Duration</label>
                <input type="text" value={metrics.time} onChange={(e) => setMetrics({ ...metrics, time: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Heart Rate</label>
                <input type="text" value={metrics.heartRate} onChange={(e) => setMetrics({ ...metrics, heartRate: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Location</label>
              <input type="text" value={metrics.location} onChange={(e) => setMetrics({ ...metrics, location: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-white outline-none focus:border-cyan-500" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
