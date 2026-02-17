import React from 'react';
import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom } from '../utils/animations';
import { BrowserChrome } from '../components/demo/BrowserChrome';
import { DashboardLayout } from '../components/demo/DashboardLayout';
import { AnimatedCursor } from '../components/demo/AnimatedCursor';
import { FileUploadZone } from '../components/demo/FileUploadZone';
import { NotificationToast } from '../components/demo/NotificationToast';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { DEMO_SUBTITLES } from '../utils/demoSubtitles';
import type { SceneProps } from '../types';

export const Demo01_LeadUpload: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // Scene phases:
  // 0-90: Dashboard visible, "Import Leads" button highlighted
  // 90-120: Cursor moves to button, clicks
  // 120-200: Modal appears with upload zone
  // 200-350: File hovers, drops, progress bar fills
  // 350-500: "50 leads imported" success
  // 500-750: Success notification, table preview

  const showModal = frame >= 130;
  const uploadPhase =
    frame < 200 ? 'idle' :
    frame < 250 ? 'hover' :
    frame < 450 ? 'uploading' :
    'done';

  // Import button glow
  const buttonGlow = frame < 100 ? 0.5 + Math.sin(frame * 0.15) * 0.5 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      <div style={{ padding: 40, width: '100%', height: '100%' }}>
        <BrowserChrome url="app.quotely.info/dashboard">
          <DashboardLayout activeNav="Leads" headerTitle="Lead Management">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Main content area */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h2
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 24,
                      fontWeight: 700,
                      color: BRAND.colors.text,
                      margin: 0,
                    }}
                  >
                    Leads
                  </h2>
                  <p
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 14,
                      color: BRAND.colors.textSecondary,
                      margin: '4px 0 0',
                    }}
                  >
                    0 total leads
                  </p>
                </div>
                {/* Import button */}
                <div
                  style={{
                    backgroundColor: BRAND.colors.primary,
                    color: '#000',
                    padding: '10px 24px',
                    borderRadius: 8,
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: `0 0 ${20 + buttonGlow * 20}px ${BRAND.colors.primary}${buttonGlow > 0.3 ? '66' : '22'}`,
                  }}
                >
                  + Import Leads
                </div>
              </div>

              {/* Empty state */}
              {!showModal && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60%',
                    opacity: fadeIn(frame, 10, 20),
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>📋</div>
                  <div
                    style={{
                      fontFamily: BRAND.fonts.primary,
                      fontSize: 18,
                      color: BRAND.colors.textSecondary,
                    }}
                  >
                    No leads yet. Import your first batch to get started.
                  </div>
                </div>
              )}

              {/* Upload modal overlay */}
              {showModal && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: fadeIn(frame, 130, 15),
                    zIndex: 40,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#111128',
                      borderRadius: 16,
                      padding: '32px 40px',
                      border: '1px solid #1e1e3a',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 20,
                      transform: `translateY(${slideInFromBottom(frame, 130, 20)}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 20,
                        fontWeight: 600,
                        color: BRAND.colors.text,
                      }}
                    >
                      Import Leads
                    </div>
                    <FileUploadZone
                      state={uploadPhase}
                      delay={140}
                      uploadStartFrame={260}
                      uploadDuration={180}
                    />
                    {uploadPhase === 'hover' && (
                      <div
                        style={{
                          fontFamily: BRAND.fonts.mono,
                          fontSize: 12,
                          color: BRAND.colors.textSecondary,
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          padding: '6px 12px',
                          borderRadius: 6,
                        }}
                      >
                        leads_batch_50.csv (24 KB)
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Success notification */}
              <NotificationToast
                message="50 leads imported successfully!"
                icon="✅"
                appearFrame={460}
                duration={250}
                color={BRAND.colors.success}
              />

              {/* Cursor */}
              <AnimatedCursor
                waypoints={[
                  { x: 800, y: 300, frame: 0 },
                  { x: 1050, y: 32, frame: 90 },
                  { x: 1050, y: 32, frame: 110, click: true },
                  { x: 600, y: 320, frame: 180 },
                  { x: 600, y: 280, frame: 230, click: true },
                  { x: 600, y: 320, frame: 700 },
                ]}
              />
            </div>
          </DashboardLayout>
        </BrowserChrome>
      </div>

      {/* Subtitles */}
      <SubtitleOverlay subtitles={DEMO_SUBTITLES.demo01} />
    </AbsoluteFill>
  );
};
