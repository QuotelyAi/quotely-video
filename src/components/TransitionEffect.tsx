import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../data/brand';

interface TransitionEffectProps {
  type: 'fade' | 'wipe' | 'glitch';
  durationInFrames?: number;
}

export const TransitionEffect: React.FC<TransitionEffectProps> = ({
  type,
  durationInFrames = 15,
}) => {
  const frame = useCurrentFrame();

  if (type === 'fade') {
    const opacity = interpolate(frame, [0, durationInFrames], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <AbsoluteFill
        style={{
          backgroundColor: BRAND.colors.background,
          opacity,
        }}
      />
    );
  }

  if (type === 'wipe') {
    const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <AbsoluteFill
        style={{
          backgroundColor: BRAND.colors.background,
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      />
    );
  }

  if (type === 'glitch') {
    const glitchIntensity = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const offset = Math.sin(frame * 3) * glitchIntensity * 20;
    const opacity = glitchIntensity > 0.5 ? 0.3 : 0;

    return (
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '33%',
            top: 0,
            backgroundColor: BRAND.colors.background,
            transform: `translateX(${offset}px)`,
            opacity,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '33%',
            top: '33%',
            backgroundColor: BRAND.colors.background,
            transform: `translateX(${-offset}px)`,
            opacity,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '34%',
            top: '66%',
            backgroundColor: BRAND.colors.background,
            transform: `translateX(${offset}px)`,
            opacity,
          }}
        />
      </AbsoluteFill>
    );
  }

  return null;
};
