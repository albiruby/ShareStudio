export type AspectRatio = '9:16' | '1:1' | '4:5';

export interface ActivityMetrics {
  title: string;
  distance: string;
  unit: string;
  pace: string;
  time: string;
  heartRate: string;
  elevation: string;
  calories: string;
  date: string;
  timeOfDay: string;
  location: string;
  gear: string;
  splits: Array<{ km: number; pace: string }>;
}

export type StickerType =
  | 'red_bold_header'
  | 'elevation_gradient'
  | 'minimal_horizontal'
  | 'serif_classic'
  | 'digital_red_led'
  | 'barcode_ticket'
  | 'color_badge'
  | 'runner_bold'
  | 'splits_list'
  | 'finish_banner'
  | 'receipt'
  | 'json_code'
  | 'speedometer'
  | 'splits_histogram'
  | 'polyline_track'
  | 'windows_error'
  | 'mbanking'
  | 'getty_stamp'
  | 'cigarette_warning'
  | 'imessage'
  | 'ios_call'
  | 'sticky_note'
  | 'nutrition_facts'
  | 'instagram_post'
  | 'serif_magazine'
  | 'marathon_milestone'
  | 'cadence_rpm'
  | 'hr_zone_meter'
  | 'newspaper_headline'
  | 'spotify_player'
  | 'airport_boarding_pass'
  | 'cassette_tape'
  | 'polaroid_frame'
  | 'cyberpunk_neon'
  | 'workout_summary_grid'
  | 'weekly_recap_ring'
  | 'icon_badge'
  | 'minimal_minimalist'
  | 'retro_badge'
  | 'futuristic_glass'
  | 'minimal_circle'
  | 'compact_split'
  | 'elevation_wave'
  | 'horizontal_metrics'
  | 'serif_italic'
  | 'receipt_full'
  | 'splits_roman'
  | 'text_sentence'
  | 'large_typography'
  | 'data_table'
  | 'bar_chart_pace'
  | 'location_card'
  | 'day_badge'
  | 'dual_stats'
  | 'column_numbers'
  | 'highlight_blocks'
  | 'cumulative_list'
  | 'verified_badge'
  | 'time_range'
  | 'pace_chart'
  | 'italic_title'
  | 'location_pill'
  | 'map_route'
  | 'square_frame'
  | 'colored_bar'
  | 'data_rows'
  | 'calendar_card'
  | 'weekly_list'
  | 'description_card'
  | 'pace_zones'
  | 'elevation_area'
  | 'text_paragraph'
  | 'highlight_bar'
  | 'kilometres_bold'
  | 'trademark_style'
  | 'heart_pill'
  | 'led_clock'
  | 'bold_location'
  | 'route_number'
  | 'app_widget'
  | 'money_tag'
  | 'multilingual'
  | 'simple_table'
  | 'repeat_text'
  | 'monthly_total'
  | 'weekly_dots'
  | 'weekly_summary'
  | 'weekly_table'
  | 'circle_grid'
  | 'monthly_chart'
  | 'progress_pct'
  | 'area_chart_weekly'
  | 'dot_progress'
  | 'square_progress'
  | 'vertical_bars'
  | 'stacked_days'
  | 'running_total'
  | 'weekly_map'
  | 'gradient_mesh'
  | 'neo_brutalist'
  | 'glass_card'
  | 'neon_glow'
  | 'film_strip'
  | 'newspaper_column'
  | 'terminal_green'
  | 'vhs_retro'
  | 'notebook_line'
  | 'blueprint'
  | 'embossed'
  | 'metallic'
  | 'pixel_art'
  | 'achievement'
  | 'leaderboard'
  | 'countdown'
  | 'progress_ring'
  | 'radial_chart'
  | 'heatmap'
  | 'timeline'
  | 'tab_ui'
  | 'card_stack'
  | 'ribbon'
  | 'notification'
  | 'music_player'
  | 'weather_card'
  | 'splits_bar_chart'
  | 'stacked_metrics'
  | 'running_man'
  | 'bordered_frame'
  | 'stat_ribbon'
  | 'dot_matrix'
  | 'badge_collection'
  | 'mini_map'
  | 'parametric';

export interface StickerStyle {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'led' | 'handwritten';
  fontSize: number;
  opacity: number;
  borderRadius: number;
  iconName?: string;
}

export interface ParametricConfig {
  id: string;
  label: string;
  category: string;
  layout: string;
  metricsShown: string[];
  fontClass: string;
  borderStyle: 'solid' | 'dashed' | 'double' | 'none';
  cornerRadius: number;
  bgColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  iconIdx: number;
}

export interface StickerInstance {
  id: string;
  type: StickerType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  style: StickerStyle;
  parametricConfig?: ParametricConfig;
}

export type StyleVariant =
  | 'default'
  | 'neon'
  | 'cyberpunk'
  | 'retro_gold'
  | 'monochrome'
  | 'pastel'
  | 'vivid_red'
  | 'ocean_blue';

export interface BackgroundSettings {
  imageUrl: string | null;
  dimmerOverlay: number;
  filter: 'normal' | 'dark_mood' | 'portra' | 'vintage_bw' | 'sepia' | 'fisheye';
  solidColor: string;
  gradientPreset: string | null;
}
