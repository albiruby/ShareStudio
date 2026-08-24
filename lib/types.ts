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
  | 'icon_badge';

export interface StickerStyle {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'led' | 'handwritten';
  fontSize: number;
  opacity: number;
  borderRadius: number;
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
  customData?: Partial<ActivityMetrics> & { [key: string]: any };
}

export interface BackgroundSettings {
  imageUrl: string | null;
  dimmerOverlay: number;
  filter: 'normal' | 'dark_mood' | 'portra' | 'vintage_bw' | 'sepia' | 'fisheye';
  solidColor: string;
  gradientPreset: string | null;
}
