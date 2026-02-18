export const BRAND = {
  colors: {
    primary: '#FFD700',
    background: '#0F172A',
    backgroundSecondary: '#111827',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    border: '#1F2937',
    accent: '#FFD700',
    success: '#22C55E',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  fonts: {
    headline: 'Georgia, "Times New Roman", serif',
    primary: 'Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
    mono: '"Courier New", Courier, monospace',
  },
  video: {
    width: 1920,
    height: 1080,
    fps: 30,
    totalFrames: 18000,
  },
  logo: {
    src: 'quotely_logo.png',
  },
} as const;

export const CROSS_FADE = 20;

export const GRADIENTS = {
  darkNavy: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
  navyToForest: 'linear-gradient(160deg, #0f172a 0%, #052e16 100%)',
  warmDark: 'linear-gradient(180deg, #1a0a0a 0%, #0f172a 100%)',
  tensionBuild: 'linear-gradient(180deg, #1a0000 0%, #0f172a 100%)',
  problemRed: 'linear-gradient(180deg, #1c0606 0%, #0f172a 100%)',
} as const;

export const SCENE_BACKGROUNDS: Record<string, string> = {
  scene01: GRADIENTS.warmDark,
  scene02: GRADIENTS.darkNavy,
  scene03: GRADIENTS.problemRed,
  scene04: GRADIENTS.navyToForest,
  scene05: GRADIENTS.darkNavy,
  scene06: GRADIENTS.navyToForest,
  scene07: GRADIENTS.darkNavy,
  scene08: GRADIENTS.tensionBuild,
  scene09: GRADIENTS.navyToForest,
  scene10: GRADIENTS.warmDark,
  scene11: GRADIENTS.darkNavy,
  scene12: GRADIENTS.darkNavy,
};

// Demo video scene timing - re-exported from demoTiming.ts for convenience
export { DEMO_SCENE_TIMING } from './demoTiming';

export const SCENE_TIMING = {
  scene01: { start: 0, duration: 450 },
  scene02: { start: 450, duration: 450 },
  scene03: { start: 900, duration: 1800 },
  scene04: { start: 2700, duration: 2250 },
  scene05: { start: 4950, duration: 2250 },
  scene06: { start: 7200, duration: 2250 },
  scene07: { start: 9450, duration: 2250 },
  scene08: { start: 11700, duration: 1800 },
  scene09: { start: 13500, duration: 1800 },
  scene10: { start: 15300, duration: 1350 },
  scene11: { start: 16650, duration: 900 },
  scene12: { start: 17550, duration: 450 },
} as const;
