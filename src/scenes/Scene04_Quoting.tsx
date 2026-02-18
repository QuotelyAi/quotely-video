import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, springBouncy, springSlam, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import { ImpactHit, DataLoad, Whoosh } from '../audio/SFX';
import type { SceneProps } from '../types';

const CARRIERS = [
  { name: 'Progressive', color: '#0070C0' },
  { name: 'Travelers', color: '#CC0000' },
  { name: 'Nationwide', color: '#004B87' },
  { name: 'Safeco', color: '#00529B' },
  { name: 'Liberty Mutual', color: '#F7B500' },
];

export const Scene04_Quoting: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneContainer
      sceneId="scene04"
      durationInFrames={durationInFrames}
      backgroundVideo="scene04_quoting.mp4"
      backgroundImage="scenes/scene04.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* SFX */}
      <Whoosh at={30} volume={0.4} />
      <DataLoad at={700} volume={0.4} />
      <ImpactHit at={1950} volume={0.8} />

      {/* Section title */}
      <Sequence from={30} durationInFrames={durationInFrames - 30}>
        <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 60 }}>
          <GlassPanel width="auto" padding="16px 32px">
            <div style={{
              fontSize: 36,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline,
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
            <GlassPanel width={380} padding="40px" borderColor="#EF4444">
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
                  width: 200, height: 200, borderRadius: '50%',
                  border: '6px solid #EF4444',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                }}>
                  <div style={{
                    fontSize: 72, fontWeight: 'bold',
                    fontFamily: BRAND.fonts.mono, color: '#EF4444', letterSpacing: -2,
                  }}>
                    {Math.min(countUp(frame, 24, 120, 60), 24)}
                  </div>
                  <div style={{ fontSize: 28, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    Hours
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Quotely - 60 Seconds */}
            <GlassPanel width={380} padding="40px" borderColor={BRAND.colors.primary} glowColor={BRAND.colors.primary}>
              <div style={{
                opacity: fadeIn(frame, 140, 20),
                transform: `translateY(${slideInFromBottom(frame, 140, 30)}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 32, color: BRAND.colors.textSecondary,
                  fontFamily: BRAND.fonts.primary, marginBottom: 20,
                }}>
                  Quotely
                </div>
                <div style={{
                  width: 200, height: 200, borderRadius: '50%',
                  border: `6px solid ${BRAND.colors.primary}`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto',
                  backgroundColor: `${BRAND.colors.primary}11`,
                  boxShadow: `0 0 40px ${BRAND.colors.primary}44`,
                }}>
                  <div style={{
                    fontSize: 72, fontWeight: 'bold',
                    fontFamily: BRAND.fonts.mono, color: BRAND.colors.primary, letterSpacing: -2,
                  }}>
                    {Math.max(60 - countUp(frame, 60, 160, 60), 0)}
                  </div>
                  <div style={{ fontSize: 28, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    Seconds
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Animated pipeline flowchart with SVG connecting path */}
      <Sequence from={680} durationInFrames={800}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            position: 'relative',
            width: 1200,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            justifyContent: 'center',
            opacity: fadeIn(frame, 680, 20),
          }}>
            {/* SVG connecting path */}
            <svg style={{
              position: 'absolute',
              top: '50%',
              left: 40,
              right: 40,
              width: 'calc(100% - 80px)',
              height: 4,
              transform: 'translateY(-50%)',
              overflow: 'visible',
            }}>
              <line
                x1="0" y1="2" x2="100%" y2="2"
                stroke={BRAND.colors.primary}
                strokeWidth={3}
                strokeDasharray="1120"
                strokeDashoffset={interpolate(frame, [700, 920], [1120, 0], {
                  extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                  easing: Easing.out(Easing.cubic),
                })}
                opacity={0.6}
              />
            </svg>

            {[
              { label: 'Client\nRequest', delay: 700 },
              { label: 'AI\nAnalysis', delay: 750 },
              { label: 'Multi-Carrier\nQuotes', delay: 800 },
              { label: 'Best\nOptions', delay: 850 },
              { label: 'Client\nReceives', delay: 900 },
            ].map((step, i) => (
              <div key={i} style={{
                opacity: fadeIn(frame, step.delay, 20),
                transform: `scale(${springBouncy(frame, fps, step.delay)})`,
                zIndex: 2,
              }}>
                <div style={{
                  width: 160, height: 100,
                  backgroundColor: `${BRAND.colors.primary}22`,
                  border: `2px solid ${BRAND.colors.primary}`,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                }}>
                  <div style={{
                    fontSize: 22, fontWeight: 'bold',
                    fontFamily: BRAND.fonts.primary, color: 'white',
                    whiteSpace: 'pre-line', lineHeight: 1.3,
                  }}>
                    {step.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Real carrier logos */}
      <Sequence from={1480} durationInFrames={450}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', opacity: fadeIn(frame, 1480, 20) }}>
            <div style={{
              fontSize: 40, fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline, color: 'white',
              marginBottom: 40,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Multiple Carriers, One Platform
            </div>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              {CARRIERS.map((carrier, i) => {
                const delay = 1500 + i * 30;
                return (
                  <div key={carrier.name} style={{
                    width: 140, height: 120,
                    backgroundColor: carrier.color,
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: springBouncy(frame, fps, delay),
                    transform: `scale(${springBouncy(frame, fps, delay)})`,
                    boxShadow: `0 8px 32px ${carrier.color}44`,
                  }}>
                    <div style={{
                      fontSize: 16, fontWeight: 'bold',
                      fontFamily: BRAND.fonts.primary, color: 'white',
                      textAlign: 'center', padding: 8,
                    }}>
                      {carrier.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 85% Faster — horizontal progress bar fill (G4-style) */}
      <Sequence from={1930} durationInFrames={320}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            opacity: fadeIn(frame, 1930, 20),
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 160,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono,
              color: BRAND.colors.primary,
              textShadow: `0 0 80px ${BRAND.colors.primary}88`,
              letterSpacing: -4,
              transform: `scale(${springSlam(frame, fps, 1940)})`,
            }}>
              {countUp(frame, 85, 1950, 50)}%
            </div>
            <div style={{
              fontSize: 48,
              color: 'white',
              fontFamily: BRAND.fonts.headline,
              marginTop: 16,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Faster Quote Delivery
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
