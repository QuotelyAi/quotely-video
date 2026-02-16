export const DEMO_SCENE_TIMING = {
  demo01: { start: 0, duration: 750 },       // 25s - Lead Upload
  demo02: { start: 750, duration: 900 },      // 30s - Quote Processing
  demo03: { start: 1650, duration: 750 },     // 25s - CRM Overview
  demo04: { start: 2400, duration: 900 },     // 30s - Communications
  demo05: { start: 3300, duration: 750 },     // 25s - Response Dashboard
  demo06: { start: 4050, duration: 600 },     // 20s - Follow-Up Queue
  demo07: { start: 4650, duration: 450 },     // 15s - Results Summary
} as const;

export const DEMO_TOTAL_FRAMES = 5100; // ~170 seconds at 30fps
