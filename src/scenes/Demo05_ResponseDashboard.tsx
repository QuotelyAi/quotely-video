import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, countUp, slapIn } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { StatCard } from '../components/demo/StatCard';
import { NotificationToast } from '../components/demo/NotificationToast';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import type { SceneProps } from '../types';

export const Demo05_ResponseDashboard: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const engagementData = [
    { label: 'Email Opened', count: 12, color: '#3B82F6', icon: '📧' },
    { label: 'Link Clicked', count: 8, color: '#A855F7', icon: '🔗' },
    { label: 'Responded', count: 3, color: '#22C55E', icon: '💬' },
    { label: 'Pending', count: 27, color: '#F59E0B', icon: '⏳' },
  ];

  // Recent activity items
  const activities = [
    { name: 'Maria Johnson', action: 'opened quote email', time: '2 min ago', color: '#3B82F6' },
    { name: 'Robert Williams', action: 'clicked quote link', time: '4 min ago', color: '#A855F7' },
    { name: 'Linda Brown', action: 'responded via SMS', time: '6 min ago', color: '#22C55E' },
    { name: 'Michael Jones', action: 'opened quote email', time: '8 min ago', color: '#3B82F6' },
    { name: 'Sarah Garcia', action: 'clicked quote link', time: '11 min ago', color: '#A855F7' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.info/analytics">
          <DashboardLayout activeNav="Analytics" headerTitle="Engagement Analytics">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Header */}
              <h2
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: 22,
                  fontWeight: 700,
                  color: BRAND.colors.text,
                  margin: '0 0 24px',
                  opacity: fadeIn(frame, 5, 15),
                }}
              >
                Real-Time Engagement
              </h2>

              {/* Stat cards row */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                {engagementData.map((stat, i) => (
                  <StatCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.count}
                    delay={20 + i * 15}
                    color={stat.color}
                    countDuration={40}
                  />
                ))}
              </div>

              {/* Engagement funnel visual */}
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  opacity: fadeIn(frame, 100, 20),
                }}
              >
                {/* Funnel chart */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(17, 17, 40, 0.6)',
                    borderRadius: 12,
                    border: '1px solid #1e1e3a',
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 14,
                      fontWeight: 600,
                      color: BRAND.colors.text,
                      marginBottom: 20,
                    }}
                  >
                    Engagement Funnel
                  </div>
                  {[
                    { label: 'Quotes Sent', value: 50, pct: 100, color: '#3B82F6' },
                    { label: 'Emails Opened', value: 12, pct: 24, color: '#A855F7' },
                    { label: 'Links Clicked', value: 8, pct: 16, color: '#F59E0B' },
                    { label: 'Responded', value: 3, pct: 6, color: '#22C55E' },
                  ].map((item, i) => {
                    const barWidth = countUp(frame, item.pct, 120 + i * 20, 40);
                    return (
                      <div key={item.label} style={{ marginBottom: 14 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 12,
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ color: BRAND.colors.textSecondary }}>{item.label}</span>
                          <span style={{ color: item.color, fontWeight: 600 }}>
                            {countUp(frame, item.value, 120 + i * 20, 40)} ({barWidth}%)
                          </span>
                        </div>
                        <div
                          style={{
                            height: 8,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${barWidth}%`,
                              height: '100%',
                              backgroundColor: item.color,
                              borderRadius: 4,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent activity feed */}
                <div
                  style={{
                    width: 340,
                    backgroundColor: 'rgba(17, 17, 40, 0.6)',
                    borderRadius: 12,
                    border: '1px solid #1e1e3a',
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 14,
                      fontWeight: 600,
                      color: BRAND.colors.text,
                      marginBottom: 16,
                    }}
                  >
                    Live Activity Feed
                  </div>
                  {activities.map((act, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 0',
                        borderBottom: i < activities.length - 1 ? '1px solid #1e1e3a22' : 'none',
                        opacity: fadeIn(frame, 140 + i * 25, 15),
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: act.color,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 13,
                            color: BRAND.colors.text,
                            fontWeight: 500,
                          }}
                        >
                          {act.name}
                        </span>
                        <span
                          style={{
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 13,
                            color: BRAND.colors.textSecondary,
                          }}
                        >
                          {' '}{act.action}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: BRAND.fonts.primary,
                          fontSize: 11,
                          color: '#555',
                          flexShrink: 0,
                        }}
                      >
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live notification */}
              <NotificationToast
                message="Maria Johnson just opened her quote!"
                icon="📬"
                appearFrame={450}
                duration={200}
                color={BRAND.colors.info}
              />
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo05} />

      {/* Fourth-wall engagement insight overlay */}
      <FourthWallInsight frame={frame} />
    </AbsoluteFill>
  );
};

const INSIGHT_APPEAR = 450;
const INSIGHT_DURATION = 150;

const FourthWallInsight: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - INSIGHT_APPEAR;
  if (localFrame < 0 || localFrame > INSIGHT_DURATION) return null;

  const gold = BRAND.colors.primary;

  // Dark overlay fades in
  const overlayOpacity = interpolate(localFrame, [0, 12], [0, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }) * interpolate(localFrame, [INSIGHT_DURATION - 15, INSIGHT_DURATION], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text springs in
  const textScale = slapIn(localFrame, fps, 8);
  const subtextOpacity = fadeIn(localFrame, 20, 12);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ textAlign: 'center', transform: `scale(${textScale})` }}>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 56,
            fontWeight: 800,
            color: gold,
            marginBottom: 16,
            textShadow: `0 2px 16px ${gold}44`,
          }}
        >
          Maria opened her quote 3 times.
        </div>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 32,
            fontWeight: 500,
            color: '#FFFFFF',
            opacity: subtextOpacity,
          }}
        >
          She's not browsing. She's buying. <span style={{ color: gold, fontWeight: 700 }}>Call her NOW.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
