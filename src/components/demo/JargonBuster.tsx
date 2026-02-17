import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../../data/brand';

interface JargonBusterProps {
  term: string;
  definition: string;
  appearFrame: number;
  duration?: number;
}

export const JargonBuster: React.FC<JargonBusterProps> = ({
  term,
  definition,
  appearFrame,
  duration = 150,
}) => {
  const frame = useCurrentFrame();
  const gold = BRAND.colors.primary;

  const localFrame = frame - appearFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  // Wipe-in from left
  const wipeProgress = interpolate(localFrame, [0, 20], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
  const fadeOutOpacity = interpolate(localFrame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gold underline width
  const underlineWidth = interpolate(localFrame, [10, 30], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 60,
          right: 60,
          clipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
          opacity: fadeOutOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            borderLeft: `4px solid ${gold}`,
            borderRadius: '0 8px 8px 0',
            padding: '20px 32px',
            maxWidth: 800,
          }}
        >
          {/* Term */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
            <span
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: 24,
                fontWeight: 800,
                color: gold,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {term}
            </span>
            {/* Gold underline */}
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                height: 2,
                backgroundColor: gold,
                width: `${underlineWidth}%`,
              }}
            />
          </div>

          {/* Definition */}
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 20,
              fontWeight: 400,
              color: '#E0E0E0',
              lineHeight: 1.5,
              fontStyle: 'italic',
              opacity: interpolate(localFrame, [12, 25], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {definition}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
