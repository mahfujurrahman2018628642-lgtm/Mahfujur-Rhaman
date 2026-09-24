export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration?: string;
  aspectRatio?: '16:9' | '9:16';
  description: string;
  originalUrl: string;
  embedUrl?: string;
}

export interface GraphicItem {
  id: string;
  title: string;
  category: string;
  localSrc: string;
  postimgUrl: string;
  directSrc: string;
  description: string;
}

export interface SkillItem {
  name: string;
  description: string;
  iconName: string;
}

export interface TrainingStage {
  month: string;
  title: string;
  points: string[];
}

export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'bn';
