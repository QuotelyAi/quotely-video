import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { DataTable } from '../components/demo/DataTable';
import { SidePanel } from '../components/demo/SidePanel';
import { TimelineItem } from '../components/demo/TimelineItem';
import { AnimatedCursor } from '../components/demo/AnimatedCursor';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import { MOCK_LEADS } from '../data/mockLeads';
import type { SceneProps } from '../types';

const tableRows = MOCK_LEADS.slice(0, 15).map((lead) => ({
  id: lead.id,
  name: `${lead.firstName} ${lead.lastName}`,
  carrier: lead.carrier,
  rate: `$${lead.monthlyRate}/mo`,
  status: 'Quoted',
  comms: 'Email + SMS',
}));

const COLUMNS = [
  { key: 'id', label: '#', width: 40 },
  { key: 'name', label: 'Name', width: 150 },
  { key: 'carrier', label: 'Carrier', width: 120 },
  { key: 'rate', label: 'Rate', width: 90 },
  { key: 'status', label: 'Status', width: 90 },
  { key: 'comms', label: 'Comms Sent', width: 120 },
];

export const Demo04_Communications: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.info/leads">
          <DashboardLayout activeNav="Communications" headerTitle="Communications">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 20,
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
                  Communications
                </h2>
                <div
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    color: BRAND.colors.info,
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  50 emails + 50 SMS sent
                </div>
              </div>

              {/* Table */}
              <DataTable
                columns={COLUMNS}
                rows={tableRows}
                delay={15}
                scrollStartFrame={9998}
                scrollEndFrame={9999}
                visibleRows={10}
              />

              {/* Side panel - appears when "clicking" a lead */}
              <SidePanel
                title="James Smith — Communications"
                appearFrame={250}
                width={400}
              >
                {/* Timeline */}
                <TimelineItem
                  icon="💰"
                  title="Quote Generated"
                  description="Progressive — $89/mo for 2024 Toyota Camry"
                  timestamp="2:00 PM"
                  delay={280}
                  color={BRAND.colors.primary}
                />
                <TimelineItem
                  icon="📧"
                  title="Email Sent"
                  description="Your personalized auto insurance quote is ready"
                  timestamp="2:01 PM"
                  delay={320}
                  color={BRAND.colors.info}
                />
                <TimelineItem
                  icon="💬"
                  title="SMS Sent"
                  description="Hi James, your quote from Progressive is ready! Click to review: quotely.info/q/js892"
                  timestamp="2:01 PM"
                  delay={360}
                  color="#A855F7"
                />
                <TimelineItem
                  icon="🔗"
                  title="Quote Link Generated"
                  description="quotely.info/q/js892 — expires in 7 days"
                  timestamp="2:01 PM"
                  delay={400}
                  color={BRAND.colors.textSecondary}
                  isLast
                />

                {/* Email preview */}
                {frame > 460 && (
                  <div
                    style={{
                      marginTop: 24,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: 10,
                      padding: 16,
                      border: '1px solid #1e1e3a',
                      opacity: fadeIn(frame, 460, 15),
                    }}
                  >
                    <div
                      style={{
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 12,
                        color: BRAND.colors.textSecondary,
                        marginBottom: 8,
                      }}
                    >
                      📧 Email Preview
                    </div>
                    <div
                      style={{
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 14,
                        fontWeight: 600,
                        color: BRAND.colors.text,
                        marginBottom: 6,
                      }}
                    >
                      Your Auto Insurance Quote — $89/mo
                    </div>
                    <div
                      style={{
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 12,
                        color: BRAND.colors.textSecondary,
                        lineHeight: 1.5,
                      }}
                    >
                      Hi James, we found a great rate for your 2024 Toyota Camry.
                      Click below to review your personalized quote and get covered today.
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        backgroundColor: BRAND.colors.primary,
                        color: '#000',
                        padding: '8px 20px',
                        borderRadius: 6,
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 13,
                        fontWeight: 600,
                        display: 'inline-block',
                      }}
                    >
                      Review My Quote →
                    </div>
                  </div>
                )}
              </SidePanel>

              {/* Cursor */}
              <AnimatedCursor
                waypoints={[
                  { x: 400, y: 200, frame: 0 },
                  { x: 200, y: 160, frame: 200 },
                  { x: 200, y: 160, frame: 230, click: true },
                  { x: 900, y: 300, frame: 400 },
                  { x: 900, y: 400, frame: 600 },
                ]}
              />
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo04} />
    </AbsoluteFill>
  );
};
