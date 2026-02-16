import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, countUp, scaleIn, glowPulse } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { LeadCard } from '../components/demo/LeadCard';
import { ProgressBar } from '../components/demo/ProgressBar';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import { MOCK_LEADS } from '../data/mockLeads';
import type { SceneProps } from '../types';

const CARRIERS = [
  { name: 'Progressive', color: '#0070F3' },
  { name: 'GEICO', color: '#00875A' },
  { name: 'State Farm', color: '#E31837' },
  { name: 'Allstate', color: '#003DA5' },
  { name: 'Liberty Mutual', color: '#F5A623' },
];

export const Demo02_QuoteProcessing: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // Processing counter: 0→50 over frames 60-600
  const processedCount = countUp(frame, 50, 60, 540);

  // Overall progress
  const progress = interpolate(
    frame,
    [60, 600],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Show first 12 leads as cards in a grid
  const visibleLeads = MOCK_LEADS.slice(0, 12);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.com/processing">
          <DashboardLayout activeNav="Quotes" headerTitle="Quote Processing">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Processing header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                  opacity: fadeIn(frame, 10, 20),
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 22,
                      fontWeight: 700,
                      color: BRAND.colors.text,
                      margin: 0,
                    }}
                  >
                    Processing Quotes
                  </h2>
                  <p
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 14,
                      color: BRAND.colors.textSecondary,
                      margin: '4px 0 0',
                    }}
                  >
                    AI is quoting all leads simultaneously
                  </p>
                </div>
                {/* Counter */}
                <div
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: 12,
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 32,
                      fontWeight: 700,
                      color: BRAND.colors.success,
                    }}
                  >
                    {processedCount}
                  </span>
                  <span
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 16,
                      color: BRAND.colors.textSecondary,
                    }}
                  >
                    / 50 quoted
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 24 }}>
                <ProgressBar
                  progress={1}
                  delay={60}
                  duration={540}
                  label="Overall Progress"
                  height={10}
                  color={BRAND.colors.success}
                />
              </div>

              {/* Carrier badges */}
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: 20,
                  opacity: fadeIn(frame, 30, 20),
                }}
              >
                {CARRIERS.map((carrier, i) => {
                  const active = frame > 80 + i * 30;
                  const glow = active ? glowPulse(frame - i * 10, 0.1) : 0;
                  return (
                    <div
                      key={carrier.name}
                      style={{
                        backgroundColor: active ? `${carrier.color}22` : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${active ? carrier.color : '#1e1e3a'}`,
                        borderRadius: 8,
                        padding: '8px 16px',
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 12,
                        fontWeight: 600,
                        color: active ? carrier.color : '#555',
                        opacity: fadeIn(frame, 20 + i * 8, 15),
                        boxShadow: active ? `0 0 ${8 + glow * 8}px ${carrier.color}33` : 'none',
                      }}
                    >
                      {active ? '⚡ ' : ''}{carrier.name}
                    </div>
                  );
                })}
              </div>

              {/* Lead cards grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 10,
                  opacity: fadeIn(frame, 40, 20),
                }}
              >
                {visibleLeads.map((lead, i) => {
                  const flipAt = 80 + i * 40;
                  return (
                    <LeadCard
                      key={lead.id}
                      name={`${lead.firstName} ${lead.lastName}`}
                      status="New"
                      carrier={lead.carrier}
                      rate={lead.monthlyRate}
                      delay={20 + i * 4}
                      flipFrame={flipAt}
                    />
                  );
                })}
              </div>

              {/* Speed indicator */}
              {frame > 650 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: 10,
                    padding: '12px 20px',
                    opacity: fadeIn(frame, 650, 15),
                    transform: `scale(${scaleIn(frame, 650, 20)})`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 14,
                      fontWeight: 600,
                      color: BRAND.colors.success,
                    }}
                  >
                    ⚡ All 50 quotes completed in 42 seconds
                  </span>
                </div>
              )}
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo02} />
    </AbsoluteFill>
  );
};
