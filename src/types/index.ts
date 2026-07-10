export type UserLevel = "CHILD" | "TEEN" | "ADULT" | "EXPERT";

export interface ArtworkTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  textColor: string;
  fontFamily?: string;
  particleEffect?: "stars" | "dust" | "waves" | "fragments" | "none";
  animationStyle?: "smooth" | "dramatic" | "fluid" | "fragmented";
}

export interface Artist {
  id: string;
  name: string;
  nationality?: string | null;
  birthYear?: number | null;
  deathYear?: number | null;
  bio?: string | null;
  photoUrl?: string | null;
  movements: string[];
  slug: string;
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  artistId: string;
  year?: number | null;
  medium?: string | null;
  dimensions?: string | null;
  location?: string | null;
  locationLat?: number | null;
  locationLng?: number | null;
  imageUrl: string;
  thumbnailUrl?: string | null;
  description?: string | null;
  historicalCtx?: string | null;
  politicalCtx?: string | null;
  artisticCtx?: string | null;
  hiddenDetails?: HiddenDetail[] | null;
  symbolism?: Symbolism[] | null;
  theories?: Theory[] | null;
  movements: string[];
  tags: string[];
  theme?: ArtworkTheme | null;
  aiSystemPrompt?: string | null;
  artist: Artist;
  timelineEvents?: TimelineEvent[];
}

export interface HiddenDetail {
  id: string;
  title: string;
  description: string;
  coordinates?: { x: number; y: number; width: number; height: number };
  imageRegion?: string;
}

export interface Symbolism {
  symbol: string;
  meaning: string;
  location?: string;
}

export interface Theory {
  title: string;
  description: string;
  credibility: "ACCEPTED" | "DEBATED" | "SPECULATIVE";
}

export interface TimelineEvent {
  id: string;
  artworkId: string;
  year: number;
  title: string;
  description?: string | null;
  category: "ARTIST_LIFE" | "HISTORICAL_EVENT" | "ARTWORK_CREATION" | "ARTISTIC_MOVEMENT" | "WORLD_EVENT";
  sourceUrl?: string | null;
  imageUrl?: string | null;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "EXPLORATION" | "KNOWLEDGE" | "ACCESSIBILITY" | "SOCIAL" | "STREAK";
  points: number;
}

export interface Quiz {
  id: string;
  artworkId: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface AccessibilitySettings {
  librasEnabled: boolean;
  librasSize: "small" | "medium" | "large";
  librasPosition: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  librasPinned: boolean;
  highContrast: boolean;
  dyslexiaFont: boolean;
  fontSize: "sm" | "md" | "lg" | "xl";
  reducedMotion: boolean;
  screenReader: boolean;
  captionsEnabled: boolean;
}

export interface RealtimeEvent {
  type: string;
  [key: string]: unknown;
}

export interface Donation {
  id: string;
  amount: number;
  name: string | null;
  message: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
