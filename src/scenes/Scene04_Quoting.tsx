import React from 'react';
import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, scaleIn, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene04_Quoting: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      sceneId="scene04"
      durationInFrames={durationInFrames}
      backgroundVideo="scene04_quoting.mp4"
      backgroundImage="scenes/scene04.png"
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
              1. Instant AI Quoting
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Timer comparison */}
      <Sequence from={80} durationInFrames={600}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            gap: 80,
            opacity: fadeIn(frame, 80, 20),
          }}>
            {/* Old Way - 24 Hours */}
            <GlassPanel width={380} delay={100} padding="40px">
              <div style={{
                opacity: fadeIn(frame, 100, 20),
                transform: `translateY(${slideInFromBottom(frame, 100, 30)}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 32,
                  color: BRAND.colors.textSecondary,
                  fontFamily: BRAND.fonts.primary,
                  marginBottom: 20,
                }}>
                  Old Way
                </div>
                <div style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: '6px solid #EF4444',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                }}>
                  <div style={{
                    fontSize: 72,
                    fontWeight: 'bold',
                    fontFamily: BRAND.fonts.primary,
                    color: '#EF4444',
                  }}>
                    {Math.min(countUp(frame, 24, 120, 60), 24)}
                  </div>
                  <div style={{
                    fontSize: 28,
                    color: 'white',
                    fontFamily: BRAND.fonts.primary,
                  }}>
                    Hours
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Quotely - 60 Seconds */}
            <GlassPanel width={380} delay={140} padding="40px" borderColor={BRAND.colors.primary}>
              <div style={{
                opacity: fadeIn(frame, 140, 20),
                transform: `translateY(${slideInFromBottom(frame, 140, 30)}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 32,
                  color: BRAND.colors.textSecondary,
                  fontFamily: BRAND.fonts.primary,
                  marginBottom: 20,
                }}>
                  Quotely
                </div>
                <div style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: `6px solid ${BRAND.colors.primary}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  backgroundColor: `${BRAND.colors.primary}11`,
                  boxShadow: `0 0 40px ${BRAND.colors.primary}44`,
                }}>
                  <div style={{
                    fontSize: 72,
                    fontWeight: 'bold',
                    fontFamily: BRAND.fonts.primary,
                    color: BRAND.colors.primary,
                  }}>
                    {Math.max(60 - countUp(frame, 60, 160, 60), 0)}
                  </div>
                  <div style={{
                    fontSize: 28,
                    color: 'white',
                    fontFamily: BRAND.fonts.primary,
                  }}>
                    Seconds
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Flowchart in glass panel */}
      <Sequence from={680} durationInFrames={800}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={1200} delay={680} padding="40px">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              justifyContent: 'center',
              opacity: fadeIn(frame, 680, 20),
            }}>
              {[
                { label: 'Client\nRequest', delay: 700 },
                { label: 'AI\nAnalysis', delay: 750 },
                { label: 'Multi-Carrier\nQuotes', delay: 800 },
                { label: 'Best\nOptions', delay: 850 },
                { label: 'Client\nReceives', delay: 900 },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    opacity: fadeIn(frame, step.delay, 20),
                    transform: `scale(${scaleIn(frame, step.delay, 25)})`,
                  }}>
                    <div style={{
                      width: 160,
                      height: 100,
                      backgroundColor: `${BRAND.colors.primary}22`,
                      border: `2px solid ${BRAND.colors.primary}`,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        fontFamily: BRAND.fonts.primary,
                        color: 'white',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.3,
                      }}>
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {i < 4 && (
                    <div style={{
                      opacity: fadeIn(frame, step.delay + 15, 15),
                      fontSize: 36,
                      color: BRAND.colors.primary,
                    }}>
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Carrier logos */}
      <Sequence from={1480} durationInFrames={450}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={1480} padding="40px 60px">
            <div style={{ textAlign: 'center', opacity: fadeIn(frame, 1480, 20) }}>
              <div style={{
                fontSize: 40,
                fontWeight: 'bold',
                fontFamily: BRAND.fonts.primary,
                color: 'white',
                marginBottom: 40,
              }}>
                Multiple Carriers, One Platform
              </div>
              <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                {[
                  { name: 'Carrier A', color: '#3B82F6', delay: 1500 },
                  { name: 'Carrier B', color: '#22C55E', delay: 1530 },
                  { name: 'Carrier C', color: '#EF4444', delay: 1560 },
                  { name: 'Carrier D', color: '#F59E0B', delay: 1590 },
                  { name: 'Carrier E', color: '#8B5CF6', delay: 1620 },
                ].map((carrier) => (
                  <div key={carrier.name} style={{
                    width: 120,
                    height: 120,
                    backgroundColor: carrier.color,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: fadeIn(frame, carrier.delay, 20),
                    transform: `scale(${scaleIn(frame, carrier.delay, 25)})`,
                    boxShadow: `0 8px 32px ${carrier.color}44`,
                  }}>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      fontFamily: BRAND.fonts.primary,
                      color: 'white',
                    }}>
                      {carrier.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 85% Faster */}
      <Sequence from={1930} durationInFrames={320}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={1930} padding="40px 80px">
            <div style={{
              opacity: fadeIn(frame, 1930, 20),
              transform: `scale(${scaleIn(frame, 1930, 30)})`,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 140,
                fontWeight: 'bold',
                fontFamily: BRAND.fonts.primary,
                color: BRAND.colors.primary,
                textShadow: `0 0 60px ${BRAND.colors.primary}66`,
              }}>
                {countUp(frame, 85, 1950, 50)}%
              </div>
              <div style={{
                fontSize: 48,
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginTop: 16,
              }}>
                Faster Quote Delivery
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
