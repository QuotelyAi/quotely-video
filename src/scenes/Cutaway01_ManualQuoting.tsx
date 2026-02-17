import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { FourthWallBreak } from '../components/demo/FourthWallBreak';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import { typewriter, fadeIn, slapIn } from '../utils/animations';
import { BRAND } from '../data/brand';
import type { SceneProps } from '../types';

const TOTAL_DOTS = 400; // Representative grid (actual: 1,000)
const COLS = 25;

export const Cutaway01_ManualQuoting: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gold = BRAND.colors.primary;

  // Phase timing
  const typewriterStart = 35;
  const typewriterText = "That's 1,000 quote forms. EZLynx makes you click through each one.";
  const typewriterDuration = typewriterText.length / 1.2;
  const gridStart = 70;
  const redPhaseEnd = 155; // Dots turn red one-by-one
  const goldSweepFrame = 160; // All gold at once
  const ctaStart = 170;

  // How many dots are red (one-by-one, painfully slow)
  const redCount = interpolate(frame, [gridStart, redPhaseEnd], [0, TOTAL_DOTS], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const allGold = frame >= goldSweepFrame;

  return (
    <FourthWallBreak
      headline=""
      variant="light"
      durationInFrames={durationInFrames}
    >
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 120px',
        }}
      >
        {/* Headline slams in */}
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 64,
            fontWeight: 900,
            color: '#1A1A1A',
            textAlign: 'center',
            transform: `scale(${slapIn(frame, fps, 8)})`,
            marginBottom: 16,
            letterSpacing: '-1px',
          }}
        >
          50 LEADS. 20 CARRIERS EACH.
        </div>

        {/* Typewriter subtext */}
        <div
          style={{
            fontFamily: BRAND.fonts.mono,
            fontSize: 28,
            color: '#555',
            textAlign: 'center',
            marginBottom: 32,
            minHeight: 40,
          }}
        >
          {typewriter(typewriterText, frame, typewriterStart, 1.2)}
          {frame >= typewriterStart && frame < typewriterStart + typewriterDuration && (
            <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>|</span>
          )}
        </div>

        {/* 250-dot grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: 4,
            width: 600,
            opacity: fadeIn(frame, gridStart, 10),
            marginBottom: 32,
          }}
        >
          {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
            const isRed = !allGold && i < Math.floor(redCount);
            const isGold = allGold;
            const dotColor = isGold ? gold : isRed ? '#EF4444' : '#D1D5DB';

            return (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  backgroundColor: dotColor,
                  transition: isGold ? 'none' : undefined,
                  boxShadow: isGold ? `0 0 6px ${gold}66` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* CTA text */}
        {frame >= ctaStart && (
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 40,
              fontWeight: 800,
              color: gold,
              textAlign: 'center',
              opacity: fadeIn(frame, ctaStart, 10),
              transform: `scale(${slapIn(frame, fps, ctaStart)})`,
              textShadow: `0 2px 12px ${gold}44`,
            }}
          >
            Quotely does it all. Automatically.
          </div>
        )}
      </AbsoluteFill>

      {DEMO_SUBTITLES.cutaway01 && (
        <SubtitleOverlay subtitles={DEMO_SUBTITLES.cutaway01} />
      )}
    </FourthWallBreak>
  );
};
