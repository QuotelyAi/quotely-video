import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, countUp, scaleIn } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { StatCard } from '../components/demo/StatCard';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import type { SceneProps } from '../types';

interface FollowUp {
  name: string;
  type: 'call' | 'email' | 'sms';
  scheduledDate: string;
  scheduledTime: string;
  status: 'Queued' | 'Scheduled';
}

const FOLLOW_UPS: FollowUp[] = [
  { name: 'Charles Thomas', type: 'email', scheduledDate: 'Today', scheduledTime: '4:00 PM', status: 'Queued' },
  { name: 'Daniel Taylor', type: 'sms', scheduledDate: 'Today', scheduledTime: '5:30 PM', status: 'Queued' },
  { name: 'Matthew Moore', type: 'call', scheduledDate: 'Tomorrow', scheduledTime: '9:00 AM', status: 'Scheduled' },
  { name: 'Anthony Jackson', type: 'email', scheduledDate: 'Tomorrow', scheduledTime: '10:00 AM', status: 'Scheduled' },
  { name: 'Mark Martin', type: 'sms', scheduledDate: 'Tomorrow', scheduledTime: '11:30 AM', status: 'Scheduled' },
  { name: 'Steven Lee', type: 'call', scheduledDate: 'Tomorrow', scheduledTime: '2:00 PM', status: 'Scheduled' },
  { name: 'Paul Perez', type: 'email', scheduledDate: 'Feb 18', scheduledTime: '9:00 AM', status: 'Scheduled' },
  { name: 'Andrew Thompson', type: 'sms', scheduledDate: 'Feb 18', scheduledTime: '10:30 AM', status: 'Scheduled' },
];

const TYPE_CONFIG = {
  call: { icon: '📞', color: '#22C55E', label: 'Phone Call' },
  email: { icon: '📧', color: '#3B82F6', label: 'Email' },
  sms: { icon: '💬', color: '#A855F7', label: 'SMS' },
};

export const Demo06_FollowUpQueue: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.com/follow-ups">
          <DashboardLayout activeNav="Leads" headerTitle="Follow-Up Queue">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                  opacity: fadeIn(frame, 5, 15),
                }}
              >
                <h2
                  style={{
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 22,
                    fontWeight: 700,
                    color: BRAND.colors.text,
                    margin: 0,
                  }}
                >
                  Automated Follow-Ups
                </h2>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <StatCard icon="📋" label="Total Scheduled" value={23} delay={15} color={BRAND.colors.primary} />
                <StatCard icon="📞" label="Calls" value={7} delay={25} color="#22C55E" />
                <StatCard icon="📧" label="Emails" value={9} delay={35} color="#3B82F6" />
                <StatCard icon="💬" label="SMS" value={7} delay={45} color="#A855F7" />
              </div>

              {/* Follow-up list */}
              <div
                style={{
                  backgroundColor: 'rgba(17, 17, 40, 0.6)',
                  borderRadius: 12,
                  border: '1px solid #1e1e3a',
                  overflow: 'hidden',
                  opacity: fadeIn(frame, 60, 20),
                }}
              >
                {/* List header */}
                <div
                  style={{
                    display: 'flex',
                    padding: '12px 20px',
                    borderBottom: '1px solid #1e1e3a',
                    backgroundColor: 'rgba(17, 17, 40, 0.9)',
                  }}
                >
                  {['Lead', 'Type', 'Scheduled', 'Status'].map((h) => (
                    <div
                      key={h}
                      style={{
                        flex: 1,
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 12,
                        fontWeight: 600,
                        color: BRAND.colors.textSecondary,
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {/* Rows */}
                {FOLLOW_UPS.map((fu, i) => {
                  const cfg = TYPE_CONFIG[fu.type];
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        padding: '14px 20px',
                        alignItems: 'center',
                        borderBottom: i < FOLLOW_UPS.length - 1 ? '1px solid #1e1e3a22' : 'none',
                        opacity: fadeIn(frame, 80 + i * 12, 12),
                        backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 14,
                            fontWeight: 500,
                            color: BRAND.colors.text,
                          }}
                        >
                          {fu.name}
                        </span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{cfg.icon}</span>
                        <span
                          style={{
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 13,
                            color: cfg.color,
                          }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 13,
                            color: BRAND.colors.textSecondary,
                          }}
                        >
                          {fu.scheduledDate} at {fu.scheduledTime}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            backgroundColor: fu.status === 'Queued' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                            color: fu.status === 'Queued' ? '#F59E0B' : '#3B82F6',
                            padding: '3px 10px',
                            borderRadius: 6,
                            fontFamily: BRAND.fonts.primary,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {fu.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom counter */}
              {frame > 350 && (
                <div
                  style={{
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    opacity: fadeIn(frame, 350, 20),
                    transform: `scale(${scaleIn(frame, 350, 20)})`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      border: `1px solid ${BRAND.colors.primary}33`,
                      borderRadius: 10,
                      padding: '12px 28px',
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 15,
                      fontWeight: 600,
                      color: BRAND.colors.primary,
                    }}
                  >
                    🤖 23 follow-ups scheduled automatically — no manual work required
                  </div>
                </div>
              )}
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo06} />
    </AbsoluteFill>
  );
};
