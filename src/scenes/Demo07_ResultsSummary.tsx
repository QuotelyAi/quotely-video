import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn, glowPulse } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { StatCard } from '../components/demo/StatCard';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import type { SceneProps } from '../types';

export const Demo07_ResultsSummary: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const stats = [
    { icon: '📋', label: 'Leads Processed', value: 50, suffix: '', color: BRAND.colors.primary },
    { icon: '⚡', label: 'Total Time', value: 42, suffix: 's', color: '#22C55E' },
    { icon: '📧', label: 'Comms Sent', value: 100, suffix: '', color: '#3B82F6' },
    { icon: '👁️', label: 'Engaged', value: 12, suffix: '', color: '#A855F7' },
    { icon: '🔄', label: 'Follow-Ups', value: 23, suffix: '', color: '#F59E0B' },
  ];

  const glow = glowPulse(frame, 0.06);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.info/dashboard">
          <DashboardLayout activeNav="Dashboard" headerTitle="Dashboard">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 32,
              }}
            >
              {/* Title */}
              <div
                style={{
                  textAlign: 'center',
                  opacity: fadeIn(frame, 10, 20),
                }}
              >
                <h1
                  style={{
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 32,
                    fontWeight: 700,
                    color: BRAND.colors.text,
                    margin: '0 0 8px',
                  }}
                >
                  Batch Complete
                </h1>
                <p
                  style={{
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 16,
                    color: BRAND.colors.textSecondary,
                    margin: 0,
                  }}
                >
                  50 auto insurance leads processed end-to-end
                </p>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                {stats.map((stat, i) => (
                  <StatCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={30 + i * 15}
                    color={stat.color}
                    countDuration={35}
                  />
                ))}
              </div>

              {/* CTA */}
              {frame > 200 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    opacity: fadeIn(frame, 200, 25),
                    transform: `scale(${scaleIn(frame, 200, 25)})`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: BRAND.colors.primary,
                      color: '#000',
                      padding: '14px 48px',
                      borderRadius: 10,
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 18,
                      fontWeight: 700,
                      boxShadow: `0 0 ${20 + glow * 20}px ${BRAND.colors.primary}44`,
                      letterSpacing: 0.5,
                    }}
                  >
                    Start Your Free Trial →
                  </div>
                  <div
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 14,
                      color: BRAND.colors.textSecondary,
                    }}
                  >
                    quotely.info
                  </div>
                </div>
              )}
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo07} />
    </AbsoluteFill>
  );
};
