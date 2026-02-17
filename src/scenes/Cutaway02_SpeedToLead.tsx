import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { FourthWallBreak } from '../components/demo/FourthWallBreak';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import { countUp, fadeIn, slapIn } from '../utils/animations';
import { BRAND } from '../data/brand';
import type { SceneProps } from '../types';

export const Cutaway02_SpeedToLead: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gold = BRAND.colors.primary;

  // Phase timing
  const numberStart = 12;
  const numberDuration = 45;
  const subtextStart = 60;
  const comparisonStart = 100;
  const bottomTextStart = 160;

  const percentValue = countUp(frame, 78, numberStart, numberDuration);

  return (
    <FourthWallBreak
      headline=""
      variant="dark"
      durationInFrames={durationInFrames}
    >
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 120px',
        }}
      >
        {/* Giant percentage counter */}
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 200,
            fontWeight: 900,
            color: gold,
            textAlign: 'center',
            lineHeight: 1,
            transform: `scale(${slapIn(frame, fps, numberStart)})`,
            marginBottom: 8,
            textShadow: `0 4px 24px ${gold}44`,
          }}
        >
          {percentValue}%
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 36,
            fontWeight: 600,
            color: '#FFFFFF',
            textAlign: 'center',
            opacity: fadeIn(frame, subtextStart, 15),
            marginBottom: 48,
          }}
        >
          of leads buy from the <span style={{ color: gold }}>FIRST</span> agent who calls.
        </div>

        {/* Two-column comparison */}
        <div
          style={{
            display: 'flex',
            gap: 60,
            opacity: fadeIn(frame, comparisonStart, 20),
            marginBottom: 48,
          }}
        >
          {/* Manual column */}
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${slapIn(frame, fps, comparisonStart + 5)})`,
            }}
          >
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: 18,
                fontWeight: 600,
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                marginBottom: 12,
              }}
            >
              Manual
            </div>
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: 56,
                fontWeight: 900,
                color: '#EF4444',
              }}
            >
              2-4 hours
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 2,
              backgroundColor: '#333',
              alignSelf: 'stretch',
            }}
          />

          {/* Quotely column */}
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${slapIn(frame, fps, comparisonStart + 10)})`,
            }}
          >
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: 18,
                fontWeight: 600,
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                marginBottom: 12,
              }}
            >
              Quotely
            </div>
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: 56,
                fontWeight: 900,
                color: '#22C55E',
              }}
            >
              12 seconds
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        {frame >= bottomTextStart && (
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 24,
              fontWeight: 500,
              color: '#AAA',
              textAlign: 'center',
              fontStyle: 'italic',
              opacity: fadeIn(frame, bottomTextStart, 15),
              maxWidth: 800,
            }}
          >
            The lead doesn't care about your process. They care who called first.
          </div>
        )}
      </AbsoluteFill>

      {DEMO_SUBTITLES.cutaway02 && (
        <SubtitleOverlay subtitles={DEMO_SUBTITLES.cutaway02} />
      )}
    </FourthWallBreak>
  );
};
