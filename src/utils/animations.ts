import { interpolate, spring, Easing } from 'remotion';

// ─── Existing animations (backward compatible) ───

export const fadeIn = (
  frame: number,
  delay: number = 0,
  duration: number = 20
): number =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const fadeOut = (
  frame: number,
  startFrame: number,
  duration: number = 20
): number =>
  interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const slideInFromLeft = (
  frame: number,
  delay: number = 0,
  duration: number = 25
): number =>
  interpolate(frame, [delay, delay + duration], [-100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const slideInFromRight = (
  frame: number,
  delay: number = 0,
  duration: number = 25
): number =>
  interpolate(frame, [delay, delay + duration], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const slideInFromBottom = (
  frame: number,
  delay: number = 0,
  duration: number = 25
): number =>
  interpolate(frame, [delay, delay + duration], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const scaleIn = (
  frame: number,
  delay: number = 0,
  duration: number = 20
): number =>
  interpolate(frame, [delay, delay + duration], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

export const typewriter = (
  text: string,
  frame: number,
  delay: number = 0,
  charsPerFrame: number = 1.5
): string => {
  const elapsed = Math.max(0, frame - delay);
  const chars = Math.floor(elapsed * charsPerFrame);
  return text.slice(0, chars);
};

export const countUp = (
  frame: number,
  target: number,
  delay: number = 0,
  duration: number = 45
): number => {
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return Math.round(progress * target);
};

export const pulse = (frame: number, speed: number = 0.1): number =>
  1 + Math.sin(frame * speed) * 0.05;

export const springIn = (
  frame: number,
  fps: number,
  delay: number = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

export const glowPulse = (frame: number, speed: number = 0.08): number =>
  0.5 + Math.sin(frame * speed) * 0.5;

export const slapIn = (
  frame: number,
  fps: number,
  delay: number = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.6 },
  });

export const wipeReveal = (
  frame: number,
  delay: number = 0,
  duration: number = 20
): number =>
  interpolate(frame, [delay, delay + duration], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// ─── New spring variants ───

/** Confident spring — headings, authority text */
export const springConfident = (
  frame: number,
  fps: number,
  delay: number = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

/** Slam spring — big stats, impact moments */
export const springSlam = (
  frame: number,
  fps: number,
  delay: number = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 280, mass: 0.8 },
  });

/** Heavy spring — section reveals, slow authority */
export const springHeavy = (
  frame: number,
  fps: number,
  delay: number = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

/** Bouncy spring — bullet points, playful elements */
export const springBouncy = (
  frame: number,
  fps: number,
  delay: number = 0
): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 6, stiffness: 200 },
  });

// ─── Stagger helpers ───

/** Calculate delay for item `index` in a staggered list */
export const staggerDelay = (
  baseDelay: number,
  index: number,
  interval: number = 8
): number => baseDelay + index * interval;

/** Spring with built-in stagger — returns 0→1 for each item */
export const staggerSpring = (
  frame: number,
  fps: number,
  baseDelay: number,
  index: number,
  interval: number = 8
): number =>
  spring({
    frame: frame - (baseDelay + index * interval),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

/** Word reveal — returns number of words to show */
export const wordReveal = (
  text: string,
  frame: number,
  delay: number = 0,
  wordsPerSecond: number = 6,
  fps: number = 30
): string => {
  const words = text.split(' ');
  const elapsed = Math.max(0, frame - delay);
  const count = Math.min(
    words.length,
    Math.floor((elapsed / fps) * wordsPerSecond)
  );
  return words.slice(0, count).join(' ');
};

/** Camera shake — returns {x, y} offset in pixels */
export const cameraShake = (
  frame: number,
  startFrame: number,
  duration: number = 10,
  intensity: number = 8
): { x: number; y: number } => {
  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > duration) return { x: 0, y: 0 };
  const decay = 1 - elapsed / duration;
  const x = Math.sin(elapsed * 13.7) * intensity * decay;
  const y = Math.cos(elapsed * 17.3) * intensity * decay;
  return { x, y };
};

// ─── Easing presets ───

export const EASE_OUT_EXPO = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const EASE_OUT_BACK = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const EASE_IN_OUT_CIRC = (t: number): number =>
  t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;

// ─── Deterministic pseudo-random ───

export const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
