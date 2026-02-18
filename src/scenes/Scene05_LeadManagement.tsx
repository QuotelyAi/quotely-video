import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, springBouncy, springSlam, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import { ImpactHit, DataLoad } from '../audio/SFX';
import type { SceneProps } from '../types';

export const Scene05_LeadManagement: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneContainer
      sceneId="scene05"
      durationInFrames={durationInFrames}
      backgroundVideo="scene05_leads.mp4"
      backgroundImage="scenes/scene05.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* SFX */}
      <DataLoad at={100} volume={0.4} />
      <ImpactHit at={1950} volume={0.8} />

      {/* Section title */}
      <Sequence from={30} durationInFrames={durationInFrames - 30}>
        <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 60 }}>
          <GlassPanel width="auto" padding="16px 32px">
            <div style={{
              fontSize: 36, fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline,
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
              fontSize: 44, fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline, color: 'white',
              marginBottom: 40, textShadow: '0 2px 8px rgba(0,0,0,0.8)',
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
                <GlassPanel key={lead.label} width={200} padding="24px" borderColor={lead.color}>
                  <div style={{
                    opacity: springBouncy(frame, fps, lead.delay),
                    transform: `scale(${springBouncy(frame, fps, lead.delay)})`,
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', fontFamily: BRAND.fonts.primary, color: 'white' }}>
                      {lead.label}
                    </div>
                    <div style={{
                      fontSize: 64, fontWeight: 'bold',
                      fontFamily: BRAND.fonts.mono, color: lead.color, letterSpacing: -2,
                    }}>
                      {countUp(frame, lead.score, lead.delay + 20, 40)}
                    </div>
                    <div style={{
                      backgroundColor: lead.color, padding: '8px 20px', borderRadius: 8,
                      fontSize: 18, fontWeight: 'bold', fontFamily: BRAND.fonts.primary, color: 'white',
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
          <GlassPanel width={1000} padding="40px">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 40, justifyContent: 'center',
              opacity: fadeIn(frame, 800, 20),
            }}>
              {[
                { label: 'Leads', color: '#3B82F6', delay: 820 },
                { label: 'AI Scoring', color: BRAND.colors.primary, delay: 880 },
                { label: 'Agent Assignment', color: '#22C55E', delay: 940 },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    opacity: springBouncy(frame, fps, step.delay),
                    transform: `scale(${springBouncy(frame, fps, step.delay)})`,
                  }}>
                    <div style={{
                      width: 180, height: 120,
                      backgroundColor: `${step.color}22`,
                      border: `2px solid ${step.color}`,
                      borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: step.color === BRAND.colors.primary ? `0 0 30px ${step.color}44` : 'none',
                    }}>
                      <div style={{
                        fontSize: step.label.length > 10 ? 28 : 32,
                        fontWeight: 'bold', fontFamily: BRAND.fonts.primary, color: step.color, textAlign: 'center',
                      }}>
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {i < 2 && (
                    <div style={{ fontSize: 48, color: BRAND.colors.primary, opacity: fadeIn(frame, step.delay + 20, 15) }}>
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Nurture sequence */}
      <Sequence from={1400} durationInFrames={550}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={1200} padding="40px">
            <div style={{ textAlign: 'center', opacity: fadeIn(frame, 1400, 20) }}>
              <div style={{
                fontSize: 40, fontWeight: 'bold',
                fontFamily: BRAND.fonts.headline, color: 'white', marginBottom: 40,
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
                      opacity: springBouncy(frame, fps, step.delay),
                      transform: `scale(${springBouncy(frame, fps, step.delay)})`,
                    }}>
                      <div style={{
                        width: 120, height: 120, borderRadius: '50%',
                        backgroundColor: `${BRAND.colors.primary}22`,
                        border: `2px solid ${BRAND.colors.primary}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{
                          fontSize: 20, fontWeight: 'bold',
                          fontFamily: BRAND.fonts.primary, color: 'white', textAlign: 'center',
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

      {/* Big stat: 45% — Horizontal progress bar fill + count-up */}
      <Sequence from={1950} durationInFrames={300}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', opacity: fadeIn(frame, 1950, 20) }}>
            <div style={{
              fontSize: 160, fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono, color: BRAND.colors.primary,
              textShadow: `0 0 80px ${BRAND.colors.primary}88`,
              letterSpacing: -4,
              transform: `scale(${springSlam(frame, fps, 1960)})`,
            }}>
              {countUp(frame, 45, 1970, 50)}%
            </div>
            {/* Progress bar */}
            <div style={{
              width: 600, height: 12, borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.15)',
              margin: '24px auto 0',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${interpolate(frame, [1970, 2020], [0, 100], {
                  extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                  easing: Easing.out(Easing.cubic),
                })}%`,
                height: '100%', borderRadius: 6,
                backgroundColor: BRAND.colors.primary,
                boxShadow: `0 0 20px ${BRAND.colors.primary}88`,
              }} />
            </div>
            <div style={{
              fontSize: 48, color: 'white',
              fontFamily: BRAND.fonts.headline, marginTop: 16,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Conversion Increase
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
