import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../data/brand';

type TransitionType = 'flash' | 'wipe-left' | 'wipe-right' | 'gold-wash';

interface SceneTransitionFlashProps {
  type: TransitionType;
  durationInFrames?: number;
}

export const SceneTransitionFlash: React.FC<SceneTransitionFlashProps> = ({
  type,
  durationInFrames = 20,
}) => {
  const frame = useCurrentFrame();
  const mid = durationInFrames / 2;

  if (type === 'flash') {
    const opacity = interpolate(
      frame,
      [0, mid * 0.4, mid, durationInFrames],
      [0, 0.9, 0.9, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    return (
      <AbsoluteFill
        style={{
          backgroundColor: 'white',
          opacity,
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (type === 'gold-wash') {
    const opacity = interpolate(
      frame,
      [0, mid * 0.5, mid, durationInFrames],
      [0, 0.7, 0.7, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at center, ${BRAND.colors.primary}cc 0%, transparent 70%)`,
          opacity,
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (type === 'wipe-left' || type === 'wipe-right') {
    const direction = type === 'wipe-left' ? 1 : -1;
    const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const xPos = direction > 0 ? 100 - progress : progress - 100;

    return (
      <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${xPos}%`,
            width: '120%',
            height: '100%',
            background: `linear-gradient(${direction > 0 ? '90deg' : '270deg'}, transparent 0%, ${BRAND.colors.primary}88 40%, ${BRAND.colors.primary}88 60%, transparent 100%)`,
          }}
        />
      </AbsoluteFill>
    );
  }

  return null;
};
