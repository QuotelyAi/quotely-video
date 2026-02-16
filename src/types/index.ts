export interface SubtitleEntry {
  text: string;
  startFrame: number;
  endFrame: number;
}

export interface SceneProps {
  startFrame?: number;
  durationInFrames: number;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface FlowchartStep {
  label: string;
  icon?: string;
  description?: string;
}

export interface NarrationSegment {
  sceneId: string;
  text: string;
  audioFile: string;
  imagePrompt?: string;
  imageFile?: string;
}
