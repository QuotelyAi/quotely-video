export interface AvatarConfig {
  clip: string;
  showFrom: number;
  showUntil?: number;
}

// Maps scene IDs to avatar clip configurations
// Avatar appears intermittently to add a "presenter" feel without being distracting
export const AVATAR_SCHEDULE: Record<string, AvatarConfig | null> = {
  scene01: null,                                          // No avatar - dramatic opening
  scene02: { clip: 'greeting.mp4', showFrom: 60, showUntil: 380 },  // "Meet your guide"
  scene03: { clip: 'explaining.mp4', showFrom: 100, showUntil: 600 }, // Problem context
  scene04: { clip: 'explaining.mp4', showFrom: 80, showUntil: 500 },  // Quoting feature
  scene05: { clip: 'explaining.mp4', showFrom: 80, showUntil: 500 },  // Lead management
  scene06: { clip: 'explaining.mp4', showFrom: 80, showUntil: 500 },  // Communication
  scene07: { clip: 'explaining.mp4', showFrom: 80, showUntil: 500 },  // Policy management
  scene08: { clip: 'explaining.mp4', showFrom: 80, showUntil: 500 },  // Claims
  scene09: { clip: 'explaining.mp4', showFrom: 80, showUntil: 500 },  // Marketing
  scene10: { clip: 'explaining.mp4', showFrom: 100, showUntil: 800 }, // Vision - more visible
  scene11: { clip: 'pointing.mp4', showFrom: 60, showUntil: 800 },    // CTA - pointing
  scene12: { clip: 'closing.mp4', showFrom: 30, showUntil: 400 },     // Outro - waving goodbye
};
