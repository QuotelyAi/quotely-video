import { interpolate, spring, Easing } from 'remotion';

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
