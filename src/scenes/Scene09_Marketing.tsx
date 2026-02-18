import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, springBouncy, springSlam, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import { ImpactHit, DataLoad } from '../audio/SFX';
import type { SceneProps } from '../types';

export const Scene09_Marketing: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = interpolate(frame, [630, 730], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <SceneContainer
      sceneId="scene09"
      durationInFrames={durationInFrames}
      backgroundVideo="scene09_marketing.mp4"
      backgroundImage="scenes/scene09.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* SFX */}
      <DataLoad at={80} volume={0.3} />
      <ImpactHit at={900} volume={0.8} />

      {/* Section title */}
      <Sequence from={30} durationInFrames={durationInFrames - 30}>
        <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 60 }}>
          <GlassPanel width="auto" padding="16px 32px">
            <div style={{
              fontSize: 36, fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline,
              color: BRAND.colors.primary,
              opacity: fadeIn(frame, 30, 15),
            }}>
              6. AI-Powered Marketing
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Email campaign cards */}
      <Sequence from={80} durationInFrames={270}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex', gap: 24, opacity: fadeIn(frame, 80, 20),
          }}>
            {[
              { color: BRAND.colors.primary, delay: 100 },
              { color: '#3B82F6', delay: 120 },
              { color: '#22C55E', delay: 140 },
              { color: '#EF4444', delay: 160 },
              { color: BRAND.colors.textSecondary, delay: 180 },
            ].map((email, i) => (
              <GlassPanel key={i} width={200} padding="20px">
                <div style={{
                  opacity: springBouncy(frame, fps, email.delay),
                  transform: `scale(${springBouncy(frame, fps, email.delay)})`,
                }}>
                  <div style={{
                    width: '100%', height: 10,
                    backgroundColor: email.color, borderRadius: 2, marginBottom: 10,
                  }} />
                  {[80, 90, 70].map((w, j) => (
                    <div key={j} style={{
                      width: `${w}%`, height: 6,
                      backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 6,
                    }} />
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
          {frame >= 250 && (
            <div style={{
              position: 'absolute', bottom: '30%',
              fontSize: 28, fontWeight: 'bold', color: 'white',
              fontFamily: BRAND.fonts.headline,
              opacity: fadeIn(frame, 250, 15),
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Personalized Campaigns
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* A/B test visual */}
      <Sequence from={350} durationInFrames={300}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex', gap: 60, opacity: fadeIn(frame, 350, 20),
          }}>
            <div style={{ position: 'relative' }}>
              <GlassPanel
                width={300} padding="30px"
                borderColor={frame >= 470 ? BRAND.colors.primary : undefined}
              >
                <div style={{
                  transform: `scale(${springBouncy(frame, fps, 370)})`,
                }}>
                  <div style={{
                    fontSize: 40, fontWeight: 'bold', color: 'white',
                    fontFamily: BRAND.fonts.headline, marginBottom: 16,
                  }}>
                    A
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[100, 90, 95].map((w, i) => (
                      <div key={i} style={{
                        width: `${w}%`, height: 8,
                        backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2,
                      }} />
                    ))}
                  </div>
                  <div style={{
                    fontSize: 20, color: '#22C55E',
                    fontFamily: BRAND.fonts.mono, fontWeight: 'bold', marginTop: 16,
                  }}>
                    38% Open Rate
                  </div>
                </div>
              </GlassPanel>
              {frame >= 470 && (
                <div style={{
                  position: 'absolute', top: -20, right: -20,
                  width: 60, height: 60, borderRadius: '50%',
                  backgroundColor: BRAND.colors.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28,
                  opacity: fadeIn(frame, 470, 20),
                  transform: `scale(${springBouncy(frame, fps, 470)})`,
                  boxShadow: `0 0 20px ${BRAND.colors.primary}`,
                  zIndex: 10,
                }}>
                  W
                </div>
              )}
            </div>

            <GlassPanel width={300} padding="30px">
              <div style={{
                transform: `scale(${springBouncy(frame, fps, 390)})`,
                opacity: frame >= 470 ? 0.5 : 1,
              }}>
                <div style={{
                  fontSize: 40, fontWeight: 'bold', color: 'white',
                  fontFamily: BRAND.fonts.headline, marginBottom: 16,
                }}>
                  B
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[100, 85, 90].map((w, i) => (
                    <div key={i} style={{
                      width: `${w}%`, height: 8,
                      backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2,
                    }} />
                  ))}
                </div>
                <div style={{
                  fontSize: 20, color: BRAND.colors.textSecondary,
                  fontFamily: BRAND.fonts.mono, marginTop: 16,
                }}>
                  22% Open Rate
                </div>
              </div>
            </GlassPanel>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Analytics graph */}
      <Sequence from={600} durationInFrames={300}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={700} padding="40px">
            <div style={{ opacity: fadeIn(frame, 600, 20) }}>
              <div style={{
                fontSize: 28, fontWeight: 'bold', color: 'white',
                fontFamily: BRAND.fonts.headline, marginBottom: 24, textAlign: 'center',
              }}>
                Campaign Performance
              </div>
              <div style={{ position: 'relative', height: 200 }}>
                <svg width="600" height="200" style={{ position: 'absolute', left: 20, top: 0 }}>
                  <line x1="0" y1="0" x2="600" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <path
                    d={`M 0 200 L ${lineProgress * 1.5} ${200 - lineProgress * 0.3} L ${lineProgress * 3} ${200 - lineProgress * 0.8} L ${lineProgress * 4.5} ${200 - lineProgress * 1.5} L ${lineProgress * 6} ${200 - lineProgress * 2}`}
                    stroke={BRAND.colors.primary} strokeWidth="3" fill="none"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ filter: `drop-shadow(0 0 8px ${BRAND.colors.primary}66)` }}
                  />
                  <defs>
                    <linearGradient id="lineGrad09" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={BRAND.colors.primary} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={BRAND.colors.primary} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0 200 L ${lineProgress * 1.5} ${200 - lineProgress * 0.3} L ${lineProgress * 3} ${200 - lineProgress * 0.8} L ${lineProgress * 4.5} ${200 - lineProgress * 1.5} L ${lineProgress * 6} ${200 - lineProgress * 2} L ${lineProgress * 6} 200 Z`}
                    fill="url(#lineGrad09)"
                  />
                </svg>
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 3x — Number slam at 3x scale settling to 1x */}
      <Sequence from={900} durationInFrames={885}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            textAlign: 'center',
            opacity: fadeIn(frame, 900, 25),
          }}>
            <div style={{
              fontSize: 200,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono,
              color: BRAND.colors.primary,
              textShadow: `0 0 80px ${BRAND.colors.primary}88, 0 0 160px ${BRAND.colors.primary}44`,
              lineHeight: 1,
              letterSpacing: -6,
              // Scale from 3x → 1x with springSlam
              transform: `scale(${interpolate(
                springSlam(frame, fps, 920),
                [0, 1],
                [3, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )})`,
            }}>
              {countUp(frame, 3, 920, 50)}x
            </div>
            <div style={{
              fontSize: 48, color: 'white',
              fontFamily: BRAND.fonts.headline, marginTop: 20,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              More Referrals
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
