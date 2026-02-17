export const DEMO_SCENE_TIMING = {
  demo01:    { start: 0,    duration: 750 },    // 25s - Lead Upload
  cutaway01: { start: 750,  duration: 210 },    // 7s  - Manual Quoting Problem
  demo02:    { start: 960,  duration: 750 },    // 25s - Quote Processing
  demo03:    { start: 1710, duration: 750 },    // 25s - CRM Overview
  cutaway02: { start: 2460, duration: 240 },    // 8s  - Speed to Lead
  demo04:    { start: 2700, duration: 690 },    // 23s - Communications
  demo05:    { start: 3390, duration: 750 },    // 25s - Response Dashboard
  demo06:    { start: 4140, duration: 450 },    // 15s - Follow-Up Queue
  demo07:    { start: 4590, duration: 390 },    // 13s - Results Summary
} as const;

export const DEMO_TOTAL_FRAMES = 4980; // ~166 seconds at 30fps
