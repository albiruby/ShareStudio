'use client';

import React from 'react';
import { StickerType, ActivityMetrics, BackgroundSettings } from '@/lib/types';
import { DEFAULT_STYLES, STYLE_VARIANTS, StyleVariant } from '@/lib/constants';
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
  { type: 'red_bold_header', label: 'Red Bold Header', category: 'Single' },
  { type: 'elevation_wave', label: 'Elevation Wave', category: 'Single' },
  { type: 'horizontal_metrics', label: 'Horizontal Metrics', category: 'Single' },
  { type: 'serif_italic', label: 'Serif Italic', category: 'Single' },
  { type: 'digital_red_led', label: 'Digital LED', category: 'Retro' },
  { type: 'receipt_full', label: 'Full Receipt', category: 'Single' },
  { type: 'color_badge', label: 'Color Badge', category: 'Badge' },
  { type: 'runner_bold', label: 'Runner Bold', category: 'Single' },
  { type: 'splits_roman', label: 'Splits Roman', category: 'Chart' },
  { type: 'finish_banner', label: 'Finish Banner', category: 'Badge' },
  { type: 'json_code', label: 'JSON Code', category: 'Retro' },
  { type: 'text_sentence', label: 'Text Sentence', category: 'Single' },
  { type: 'large_typography', label: 'Large Typography', category: 'Single' },
  { type: 'day_badge', label: 'Day Badge', category: 'Single' },
  { type: 'dual_stats', label: 'Dual Stats', category: 'Single' },
  { type: 'column_numbers', label: 'Column Numbers', category: 'Single' },
  { type: 'highlight_blocks', label: 'Highlight Blocks', category: 'Badge' },
  { type: 'cumulative_list', label: 'Cumulative List', category: 'Chart' },
  { type: 'verified_badge', label: 'Verified Badge', category: 'Badge' },
  { type: 'time_range', label: 'Time Range', category: 'Single' },
  { type: 'pace_chart', label: 'Pace Chart', category: 'Chart' },
  { type: 'italic_title', label: 'Italic Title', category: 'Single' },
  { type: 'location_pill', label: 'Location Pill', category: 'Single' },
  { type: 'map_route', label: 'Map Route', category: 'Map' },
  { type: 'square_frame', label: 'Square Frame', category: 'Single' },
  { type: 'colored_bar', label: 'Colored Bar', category: 'Single' },
  { type: 'data_rows', label: 'Data Rows', category: 'Single' },
  { type: 'calendar_card', label: 'Calendar Card', category: 'Single' },
  { type: 'weekly_list', label: 'Weekly List', category: 'Recap' },
  { type: 'description_card', label: 'Description Card', category: 'Single' },
  { type: 'pace_zones', label: 'Pace Zones', category: 'Chart' },
  { type: 'elevation_area', label: 'Elevation Area', category: 'Chart' },
  { type: 'text_paragraph', label: 'Text Paragraph', category: 'Single' },
  { type: 'highlight_bar', label: 'Highlight Bar', category: 'Badge' },
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
  { type: 'data_table', label: 'Data Table', category: 'Chart' },
  { type: 'bar_chart_pace', label: 'Bar Chart', category: 'Chart' },
  { type: 'location_card', label: 'Location Card', category: 'Single' },
  { type: 'gradient_mesh', label: 'Gradient Mesh', category: 'Badge' },
  { type: 'neo_brutalist', label: 'Neo Brutalist', category: 'Retro' },
  { type: 'glass_card', label: 'Glass Card', category: 'Badge' },
  { type: 'neon_glow', label: 'Neon Glow', category: 'Retro' },
  { type: 'film_strip', label: 'Film Strip', category: 'Retro' },
  { type: 'newspaper_column', label: 'Newspaper', category: 'Retro' },
  { type: 'terminal_green', label: 'Terminal Green', category: 'Retro' },
  { type: 'vhs_retro', label: 'VHS Retro', category: 'Retro' },
  { type: 'notebook_line', label: 'Notebook Line', category: 'Single' },
  { type: 'blueprint', label: 'Blueprint', category: 'Retro' },
  { type: 'embossed', label: 'Embossed', category: 'Badge' },
  { type: 'metallic', label: 'Metallic', category: 'Badge' },
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
  { type: 'progress_bar', label: 'Progress Bar', category: 'Chart' },
  { type: 'circular_gauge', label: 'Circular Gauge', category: 'Chart' },
  { type: 'grid_4x4', label: 'Grid 4x4', category: 'Chart' },
  { type: 'quote_card', label: 'Quote Card', category: 'Single' },
  { type: 'comparison_split', label: 'Comparison Split', category: 'Single' },
  { type: 'stacked_cards', label: 'Stacked Cards', category: 'Badge' },
  { type: 'floating_labels', label: 'Floating Labels', category: 'Single' },
  { type: 'asymmetric_layout', label: 'Asymmetric Layout', category: 'Single' },
  { type: 'minimalist_line', label: 'Minimalist Line', category: 'Single' },
  { type: 'card_flip', label: 'Card Flip', category: 'Single' },
  { type: 'masonry_grid', label: 'Masonry Grid', category: 'Chart' },
  { type: 'hexagon_badge', label: 'Hexagon Badge', category: 'Badge' },
  { type: 'diamond_shape', label: 'Diamond Shape', category: 'Badge' },
  { type: 'triangle_layout', label: 'Triangle Layout', category: 'Single' },
  { type: 'arch_frame', label: 'Arch Frame', category: 'Badge' },
  { type: 'circle_cutout', label: 'Circle Cutout', category: 'Single' },
  { type: 'rounded_stripes', label: 'Rounded Stripes', category: 'Single' },
  { type: 'gradient_border', label: 'Gradient Border', category: 'Badge' },
  { type: 'inner_shadow', label: 'Inner Shadow', category: 'Badge' },
  { type: 'double_frame', label: 'Double Frame', category: 'Badge' },
  { type: 'zigzag_edge', label: 'Zigzag Edge', category: 'Single' },
  { type: 'wave_bottom', label: 'Wave Bottom', category: 'Single' },
  { type: 'corner_fold', label: 'Corner Fold', category: 'Single' },
  { type: 'tabbed_card', label: 'Tabbed Card', category: 'Single' },
  { type: 'accordion', label: 'Accordion', category: 'Single' },
  { type: 'split_diagonal', label: 'Split Diagonal', category: 'Single' },
  { type: 'dot_pattern', label: 'Dot Pattern', category: 'Single' },
  { type: 'cross_stitch', label: 'Cross Stitch', category: 'Retro' },
  { type: 'chevron_rows', label: 'Chevron Rows', category: 'Single' },
  { type: 'pinstripe', label: 'Pinstripe', category: 'Single' },
  { type: 'brick_layout', label: 'Brick Layout', category: 'Single' },
  { type: 'tile_mosaic', label: 'Tile Mosaic', category: 'Badge' },
  { type: 'stained_glass', label: 'Stained Glass', category: 'Badge' },
  { type: 'paper_texture', label: 'Paper Texture', category: 'Single' },
  { type: 'carbon_fiber', label: 'Carbon Fiber', category: 'Retro' },
  { type: 'brushed_metal', label: 'Brushed Metal', category: 'Badge' },
  { type: 'denim_fabric', label: 'Denim Fabric', category: 'Single' },
  { type: 'concrete_wall', label: 'Concrete Wall', category: 'Single' },
  { type: 'rustic_wood', label: 'Rustic Wood', category: 'Single' },
  { type: 'bamboo_weave', label: 'Bamboo Weave', category: 'Retro' },
  { type: 'woven_pattern', label: 'Woven Pattern', category: 'Retro' },
  { type: 'leather_grain', label: 'Leather Grain', category: 'Badge' },
  { type: 'silk_sheen', label: 'Silk Sheen', category: 'Badge' },
  { type: 'velvet_plush', label: 'Velvet Plush', category: 'Badge' },
  { type: 'satin_finish', label: 'Satin Finish', category: 'Badge' },
  { type: 'matte_paper', label: 'Matte Paper', category: 'Single' },
  { type: 'glossy_surface', label: 'Glossy Surface', category: 'Badge' },
  { type: 'translucent_glass', label: 'Translucent Glass', category: 'Badge' },
  { type: 'frosted_glass', label: 'Frosted Glass', category: 'Badge' },
  { type: 'smoked_glass', label: 'Smoked Glass', category: 'Badge' },
  { type: 'cracked_ice', label: 'Cracked Ice', category: 'Single' },
  { type: 'liquid_metal', label: 'Liquid Metal', category: 'Retro' },
  { type: 'holographic', label: 'Holographic', category: 'Badge' },
  { type: 'iridescent', label: 'Iridescent', category: 'Badge' },
  { type: 'prismatic', label: 'Prismatic', category: 'Badge' },
  { type: 'nebula_cloud', label: 'Nebula Cloud', category: 'Single' },
  { type: 'aurora_borealis', label: 'Aurora Borealis', category: 'Single' },
  { type: 'galaxy_spiral', label: 'Galaxy Spiral', category: 'Single' },
  { type: 'star_field', label: 'Star Field', category: 'Single' },
  { type: 'sun_flare', label: 'Sun Flare', category: 'Single' },
  { type: 'moon_glow', label: 'Moon Glow', category: 'Single' },
  { type: 'water_ripple', label: 'Water Ripple', category: 'Single' },
  { type: 'flame_wave', label: 'Flame Wave', category: 'Single' },
  { type: 'electric_spark', label: 'Electric Spark', category: 'Retro' },
  { type: 'laser_grid', label: 'Laser Grid', category: 'Retro' },
  { type: 'radar_sweep', label: 'Radar Sweep', category: 'Retro' },
  { type: 'sonar_ping', label: 'Sonar Ping', category: 'Retro' },
  { type: 'target_lock', label: 'Target Lock', category: 'Retro' },
  { type: 'scope_view', label: 'Scope View', category: 'Retro' },
  { type: 'xray_vision', label: 'X-Ray Vision', category: 'Retro' },
  { type: 'thermal_map', label: 'Thermal Map', category: 'Retro' },
  { type: 'night_vision', label: 'Night Vision', category: 'Retro' },
  { type: 'blueprint_grid', label: 'Blueprint Grid', category: 'Retro' },
  { type: 'schematic', label: 'Schematic', category: 'Retro' },
  { type: 'circuit_board', label: 'Circuit Board', category: 'Retro' },
  { type: 'motherboard', label: 'Motherboard', category: 'Retro' },
  { type: 'chip_layout', label: 'Chip Layout', category: 'Retro' },
  { type: 'wire_frame', label: 'Wire Frame', category: 'Retro' },
  { type: 'mesh_network', label: 'Mesh Network', category: 'Retro' },
  { type: 'node_graph', label: 'Node Graph', category: 'Chart' },
  { type: 'data_flow', label: 'Data Flow', category: 'Chart' },
  { type: 'pipeline', label: 'Pipeline', category: 'Chart' },
  { type: 'circuit_path', label: 'Circuit Path', category: 'Retro' },
  { type: 'trace_line', label: 'Trace Line', category: 'Chart' },
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
  const [selectedVariant, setSelectedVariant] = React.useState<string>('All');

  const allDesigns: Array<{
    type: StickerType;
    label: string;
    category: string;
    variant: StyleVariant;
    globalIndex: number;
  }> = [];

  let idx = 0;
  for (const variant of STYLE_VARIANTS) {
    for (const tmpl of UNIQUE_TEMPLATES) {
      allDesigns.push({
        type: tmpl.type,
        label: tmpl.label,
        category: tmpl.category,
        variant,
        globalIndex: idx++,
      });
    }
  }

  const filteredDesigns = allDesigns.filter((d) => {
    const matchesSearch = d.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesVariant = selectedVariant === 'All' || d.variant.id === selectedVariant;
    return matchesSearch && matchesCategory && matchesVariant;
  });

  const getStyleForVariant = (type: StickerType, variant: StyleVariant) => {
    const base = DEFAULT_STYLES[type] || DEFAULT_STYLES.receipt;
    return {
      ...base,
      backgroundColor: variant.bg,
      textColor: variant.text,
      accentColor: variant.accent,
      borderColor: variant.border,
    };
  };

  return (
    <aside className="w-[340px] border-r border-zinc-800/80 glass-panel flex flex-col h-[calc(100vh-4rem)] z-30">
      {/* Tabs */}
      <div className="flex border-b border-zinc-800/60 text-[11px] font-semibold">
        {[
          { key: 'library' as const, icon: LayoutGrid, label: `Library`, count: allDesigns.length },
          { key: 'icons' as const, icon: Shapes, label: 'Icons' },
          { key: 'photo' as const, icon: ImageIcon, label: 'Photo' },
          { key: 'metrics' as const, icon: Sliders, label: 'Data' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3.5 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
              activeTab === tab.key
                ? 'border-cyan-400 text-cyan-400 bg-cyan-400/5'
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            {tab.count && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {/* TAB 1: LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${allDesigns.length} designs...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 text-zinc-200 text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-cyan-500/50 focus:bg-zinc-900 transition-all placeholder:text-zinc-600"
              />
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {['All', 'Single', 'Recap', 'Chart', 'Map', 'Badge', 'Retro'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-white hover:bg-zinc-700/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Variant Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] scrollbar-none">
              <button
                onClick={() => setSelectedVariant('All')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border ${
                  selectedVariant === 'All'
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-white'
                }`}
              >
                All Styles
              </button>
              {STYLE_VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    selectedVariant === v.id
                      ? 'font-bold border-white shadow-lg'
                      : 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50 hover:text-white'
                  }`}
                  style={selectedVariant === v.id ? { backgroundColor: v.accent, color: v.bg, borderColor: v.accent } : {}}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.accent }} />
                  {v.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>{filteredDesigns.length} unique designs</span>
              <span className="text-zinc-600">Click to add</span>
            </div>

            {/* Design Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredDesigns.slice(0, 1000).map((design) => (
                <div
                  key={`${design.type}_${design.variant.id}`}
                  onClick={() => onAddSticker(design.type, getStyleForVariant(design.type, design.variant))}
                  className="group relative border hover:border-cyan-500/60 p-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col items-center justify-center min-h-[140px] overflow-hidden"
                  style={{
                    backgroundColor: design.variant.bg,
                    borderColor: design.variant.border,
                    borderRadius: design.variant.borderRadius,
                  }}
                >
                  <div className="scale-[0.45] origin-center transform-gpu pointer-events-none my-auto">
                    <StickerRenderer
                      type={design.type}
                      metrics={metrics}
                      style={getStyleForVariant(design.type, design.variant)}
                    />
                  </div>
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: design.variant.accent, borderColor: design.variant.border }} />
                  <div className="absolute inset-x-0 bottom-0 py-1.5 text-center border-t opacity-90 group-hover:opacity-100 transition-all"
                    style={{
                      backgroundColor: design.variant.accent,
                      color: design.variant.bg,
                      borderColor: design.variant.border,
                    }}
                  >
                    <span className="text-[9px] font-bold truncate px-1.5 block"
                      style={{
                        fontFamily: design.variant.fontFamily,
                        letterSpacing: design.variant.letterSpacing,
                        textTransform: design.variant.textTransform,
                      }}
                    >{design.label} · {design.variant.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredDesigns.length > 1000 && (
              <div className="text-center text-[10px] text-zinc-500 py-3">
                Showing 1000 of {filteredDesigns.length} designs. Use filters to narrow down.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ICONS */}
        {activeTab === 'icons' && (
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Athletic Icons (30)</h3>
            <div className="grid grid-cols-4 gap-2.5">
              {ATHLETIC_ICONS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => onAddSticker('runner_bold')}
                    className="p-4 bg-zinc-900/60 border border-zinc-800/60 hover:border-cyan-400/50 hover:bg-zinc-800/80 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 transition-all duration-200 group hover:shadow-lg hover:shadow-cyan-500/10"
                    title={item.name}
                  >
                    <IconComp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] text-zinc-400 truncate w-full text-center group-hover:text-zinc-300">{item.name}</span>
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
          <div className="space-y-4 text-xs">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Edit Run Data</h3>
            <div>
              <label className="block text-zinc-400 mb-1.5 text-[11px]">Run Title</label>
              <input type="text" value={metrics.title} onChange={(e) => setMetrics({ ...metrics, title: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500/50 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1.5 text-[11px]">Distance (KM)</label>
                <input type="text" value={metrics.distance} onChange={(e) => setMetrics({ ...metrics, distance: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1.5 text-[11px]">Pace (/KM)</label>
                <input type="text" value={metrics.pace} onChange={(e) => setMetrics({ ...metrics, pace: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500/50 transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1.5 text-[11px]">Duration</label>
                <input type="text" value={metrics.time} onChange={(e) => setMetrics({ ...metrics, time: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1.5 text-[11px]">Heart Rate</label>
                <input type="text" value={metrics.heartRate} onChange={(e) => setMetrics({ ...metrics, heartRate: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1.5 text-[11px]">Location</label>
              <input type="text" value={metrics.location} onChange={(e) => setMetrics({ ...metrics, location: e.target.value })}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500/50 transition-all" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
