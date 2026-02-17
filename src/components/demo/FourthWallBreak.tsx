import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { slapIn, fadeIn, fadeOut } from '../../utils/animations';
import { BRAND } from '../../data/brand';

interface FourthWallBreakProps {
  headline: string;
  subtext?: string;
  variant: 'light' | 'dark';
  durationInFrames: number;
  children?: React.ReactNode;
}

const GLITCH_FRAMES = 8;

export const FourthWallBreak: React.FC<FourthWallBreakProps> = ({
  headline,
  subtext,
  variant,
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isLight = variant === 'light';
  const bgColor = isLight ? '#F5F0E8' : '#1A1A1A';
  const textColor = isLight ? '#1A1A1A' : '#FFFFFF';
  const gold = BRAND.colors.primary;

  // Glitch transition at start (first 8 frames)
  const inGlitchEntry = frame < GLITCH_FRAMES;
  const inGlitchExit = frame > durationInFrames - GLITCH_FRAMES;
  const inGlitch = inGlitchEntry || inGlitchExit;

  const glitchProgress = inGlitchEntry
    ? interpolate(frame, [0, GLITCH_FRAMES], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : inGlitchExit
      ? interpolate(frame, [durationInFrames - GLITCH_FRAMES, durationInFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  const glitchOffset = Math.sin(frame * 5) * glitchProgress * 30;

  // Content fade
  const contentOpacity = fadeIn(frame, GLITCH_FRAMES, 10) * fadeOut(frame, durationInFrames - GLITCH_FRAMES - 10, 10);

  // Headline slap animation
  const headlineScale = slapIn(frame, fps, GLITCH_FRAMES + 2);

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, overflow: 'hidden' }}>
      {/* Film grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(${isLight ? '0,0,0' : '255,255,255'}, 0.03) 2px,
            rgba(${isLight ? '0,0,0' : '255,255,255'}, 0.03) 4px
          )`,
          backgroundSize: '4px 4px',
          pointerEvents: 'none',
        }}
      />

      {/* Glitch strips */}
      {inGlitch && (
        <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
          {[0, 33, 66].map((top, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '100%',
                height: i === 2 ? '34%' : '33%',
                top: `${top}%`,
                backgroundColor: BRAND.colors.background,
                transform: `translateX(${(i % 2 === 0 ? 1 : -1) * glitchOffset}px)`,
                opacity: glitchProgress * 0.6,
              }}
            />
          ))}
        </AbsoluteFill>
      )}

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 120,
          opacity: contentOpacity,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 72,
            fontWeight: 900,
            color: textColor,
            textAlign: 'center',
            lineHeight: 1.1,
            transform: `scale(${headlineScale})`,
            marginBottom: subtext ? 32 : 0,
            letterSpacing: '-1px',
          }}
        >
          {headline}
        </div>

        {/* Subtext */}
        {subtext && (
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 32,
              fontWeight: 400,
              color: isLight ? '#555' : '#AAA',
              textAlign: 'center',
              lineHeight: 1.5,
              opacity: fadeIn(frame, GLITCH_FRAMES + 15, 15),
              maxWidth: 1200,
            }}
          >
            {subtext}
          </div>
        )}

        {/* Custom children content (for dot grids, comparisons, etc.) */}
        {children}
      </AbsoluteFill>

      {/* Gold accent line at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 4,
          backgroundColor: gold,
          width: `${interpolate(frame, [GLITCH_FRAMES, durationInFrames - GLITCH_FRAMES], [0, 100], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}%`,
        }}
      />
    </AbsoluteFill>
  );
};
