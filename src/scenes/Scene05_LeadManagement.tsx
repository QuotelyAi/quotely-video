import React from 'react';
import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, scaleIn, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene05_LeadManagement: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      sceneId="scene05"
      durationInFrames={durationInFrames}
      backgroundVideo="scene05_leads.mp4"
      backgroundImage="scenes/scene05.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* Section title */}
      <Sequence from={30} durationInFrames={durationInFrames - 30}>
        <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 60 }}>
          <GlassPanel width="auto" delay={30} padding="16px 32px">
            <div style={{
              fontSize: 36,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.primary,
              color: BRAND.colors.primary,
              opacity: fadeIn(frame, 30, 20),
            }}>
              2. AI Lead Management
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Lead scoring cards */}
      <Sequence from={100} durationInFrames={700}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', opacity: fadeIn(frame, 100, 20) }}>
            <div style={{
              fontSize: 44,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.primary,
              color: 'white',
              marginBottom: 40,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              AI-Powered Lead Scoring
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              {[
                { label: 'Lead A', score: 92, temp: 'HOT', color: '#22C55E', delay: 130 },
                { label: 'Lead B', score: 87, temp: 'HOT', color: '#22C55E', delay: 160 },
                { label: 'Lead C', score: 74, temp: 'WARM', color: '#F59E0B', delay: 190 },
                { label: 'Lead D', score: 58, temp: 'WARM', color: '#F59E0B', delay: 220 },
                { label: 'Lead E', score: 45, temp: 'COOL', color: '#EF4444', delay: 250 },
              ].map((lead) => (
                <GlassPanel key={lead.label} width={200} delay={lead.delay} padding="24px" borderColor={lead.color}>
                  <div style={{
                    opacity: fadeIn(frame, lead.delay, 20),
                    transform: `translateY(${slideInFromBottom(frame, lead.delay, 30)}px)`,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                  }}>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      fontFamily: BRAND.fonts.primary,
                      color: 'white',
                    }}>
                      {lead.label}
                    </div>
                    <div style={{
                      fontSize: 64,
                      fontWeight: 'bold',
                      fontFamily: BRAND.fonts.primary,
                      color: lead.color,
                    }}>
                      {countUp(frame, lead.score, lead.delay + 20, 40)}
                    </div>
                    <div style={{
                      backgroundColor: lead.color,
                      padding: '8px 20px',
                      borderRadius: 8,
                      fontSize: 18,
                      fontWeight: 'bold',
                      fontFamily: BRAND.fonts.primary,
                      color: 'white',
                    }}>
                      {lead.temp}
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Routing diagram */}
      <Sequence from={800} durationInFrames={600}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={1000} delay={800} padding="40px">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 40,
              justifyContent: 'center',
              opacity: fadeIn(frame, 800, 20),
            }}>
              <div style={{
                opacity: fadeIn(frame, 820, 20),
                transform: `scale(${scaleIn(frame, 820, 25)})`,
                textAlign: 'center',
              }}>
                <div style={{
                  width: 180,
                  height: 120,
                  backgroundColor: 'rgba(59,130,246,0.2)',
                  border: '2px solid #3B82F6',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', fontFamily: BRAND.fonts.primary, color: '#3B82F6' }}>
                    Leads
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 48, color: BRAND.colors.primary, opacity: fadeIn(frame, 850, 15) }}>→</div>

              <div style={{
                opacity: fadeIn(frame, 880, 20),
                transform: `scale(${scaleIn(frame, 880, 25)})`,
              }}>
                <div style={{
                  width: 180,
                  height: 120,
                  backgroundColor: `${BRAND.colors.primary}22`,
                  border: `2px solid ${BRAND.colors.primary}`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 30px ${BRAND.colors.primary}44`,
                }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', fontFamily: BRAND.fonts.primary, color: BRAND.colors.primary, textAlign: 'center' }}>
                    AI Scoring
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 48, color: BRAND.colors.primary, opacity: fadeIn(frame, 910, 15) }}>→</div>

              <div style={{
                opacity: fadeIn(frame, 940, 20),
                transform: `scale(${scaleIn(frame, 940, 25)})`,
              }}>
                <div style={{
                  width: 180,
                  height: 120,
                  backgroundColor: 'rgba(34,197,94,0.2)',
                  border: '2px solid #22C55E',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 'bold', fontFamily: BRAND.fonts.primary, color: '#22C55E', textAlign: 'center' }}>
                    Agent Assignment
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Nurture sequence */}
      <Sequence from={1400} durationInFrames={550}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={1200} delay={1400} padding="40px">
            <div style={{ textAlign: 'center', opacity: fadeIn(frame, 1400, 20) }}>
              <div style={{
                fontSize: 40,
                fontWeight: 'bold',
                fontFamily: BRAND.fonts.primary,
                color: 'white',
                marginBottom: 40,
              }}>
                Automated Nurture Sequence
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center' }}>
                {[
                  { label: 'Email', delay: 1430 },
                  { label: 'Wait 2d', delay: 1480 },
                  { label: 'SMS', delay: 1530 },
                  { label: 'Wait 3d', delay: 1580 },
                  { label: 'Call', delay: 1630 },
                ].map((step, i) => (
                  <React.Fragment key={i}>
                    <div style={{
                      opacity: fadeIn(frame, step.delay, 20),
                      transform: `scale(${scaleIn(frame, step.delay, 25)})`,
                    }}>
                      <div style={{
                        width: 120,
                        height: 120,
                        backgroundColor: `${BRAND.colors.primary}22`,
                        border: `2px solid ${BRAND.colors.primary}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <div style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          fontFamily: BRAND.fonts.primary,
                          color: 'white',
                          textAlign: 'center',
                        }}>
                          {step.label}
                        </div>
                      </div>
                    </div>
                    {i < 4 && (
                      <div style={{ fontSize: 36, color: BRAND.colors.primary, opacity: fadeIn(frame, step.delay + 15, 15) }}>→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 45% Conversion Increase */}
      <Sequence from={1950} durationInFrames={300}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={1950} padding="40px 80px">
            <div style={{
              opacity: fadeIn(frame, 1950, 20),
              transform: `scale(${scaleIn(frame, 1950, 30)})`,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 140,
                fontWeight: 'bold',
                fontFamily: BRAND.fonts.primary,
                color: BRAND.colors.primary,
                textShadow: `0 0 60px ${BRAND.colors.primary}66`,
              }}>
                {countUp(frame, 45, 1970, 50)}%
              </div>
              <div style={{
                fontSize: 48,
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginTop: 16,
              }}>
                Conversion Increase
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
