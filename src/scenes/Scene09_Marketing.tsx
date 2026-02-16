import { AbsoluteFill, useCurrentFrame, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene09_Marketing: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const lineProgress = interpolate(frame, [630, 730], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
      {/* Section title */}
      <Sequence from={30} durationInFrames={durationInFrames - 30}>
        <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 60 }}>
          <GlassPanel width="auto" delay={30} padding="16px 32px">
            <div style={{
              fontSize: 36,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.primary,
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
            display: 'flex',
            gap: 24,
            opacity: fadeIn(frame, 80, 20),
          }}>
            {[
              { color: BRAND.colors.primary, delay: 100 },
              { color: '#3B82F6', delay: 120 },
              { color: '#22C55E', delay: 140 },
              { color: '#EF4444', delay: 160 },
              { color: BRAND.colors.textSecondary, delay: 180 },
            ].map((email, i) => (
              <GlassPanel key={i} width={200} delay={email.delay} padding="20px">
                <div style={{
                  opacity: fadeIn(frame, email.delay, 20),
                  transform: `scale(${scaleIn(frame, email.delay, 25)})`,
                }}>
                  <div style={{
                    width: '100%',
                    height: 10,
                    backgroundColor: email.color,
                    borderRadius: 2,
                    marginBottom: 10,
                  }} />
                  <div style={{
                    width: '80%',
                    height: 6,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: 2,
                    marginBottom: 6,
                  }} />
                  <div style={{
                    width: '90%',
                    height: 6,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: 2,
                    marginBottom: 6,
                  }} />
                  <div style={{
                    width: '70%',
                    height: 6,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: 2,
                  }} />
                </div>
              </GlassPanel>
            ))}
          </div>
          {frame >= 250 && (
            <div style={{
              position: 'absolute',
              bottom: '30%',
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
              fontFamily: BRAND.fonts.primary,
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
            display: 'flex',
            gap: 60,
            opacity: fadeIn(frame, 350, 20),
          }}>
            {/* Version A (winner) */}
            <div style={{ position: 'relative' }}>
              <GlassPanel
                width={300}
                delay={370}
                padding="30px"
                borderColor={frame >= 470 ? BRAND.colors.primary : undefined}
              >
                <div style={{
                  transform: `scale(${scaleIn(frame, 370, 25)})`,
                }}>
                  <div style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: BRAND.fonts.primary,
                    marginBottom: 16,
                  }}>
                    A
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[100, 90, 95].map((w, i) => (
                      <div key={i} style={{
                        width: `${w}%`,
                        height: 8,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderRadius: 2,
                      }} />
                    ))}
                  </div>
                  <div style={{
                    fontSize: 20,
                    color: '#22C55E',
                    fontFamily: BRAND.fonts.primary,
                    fontWeight: 'bold',
                    marginTop: 16,
                  }}>
                    38% Open Rate
                  </div>
                </div>
              </GlassPanel>
              {/* Winner badge */}
              {frame >= 470 && (
                <div style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: BRAND.colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  opacity: fadeIn(frame, 470, 20),
                  transform: `scale(${scaleIn(frame, 470, 25)})`,
                  boxShadow: `0 0 20px ${BRAND.colors.primary}`,
                  zIndex: 10,
                }}>
                  W
                </div>
              )}
            </div>

            {/* Version B */}
            <GlassPanel width={300} delay={390} padding="30px">
              <div style={{
                transform: `scale(${scaleIn(frame, 390, 25)})`,
                opacity: frame >= 470 ? 0.5 : 1,
              }}>
                <div style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: BRAND.fonts.primary,
                  marginBottom: 16,
                }}>
                  B
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[100, 85, 90].map((w, i) => (
                    <div key={i} style={{
                      width: `${w}%`,
                      height: 8,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: 2,
                    }} />
                  ))}
                </div>
                <div style={{
                  fontSize: 20,
                  color: BRAND.colors.textSecondary,
                  fontFamily: BRAND.fonts.primary,
                  marginTop: 16,
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
          <GlassPanel width={700} delay={600} padding="40px">
            <div style={{ opacity: fadeIn(frame, 600, 20) }}>
              <div style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginBottom: 24,
                textAlign: 'center',
              }}>
                Campaign Performance
              </div>
              <div style={{ position: 'relative', height: 200 }}>
                <svg width="600" height="200" style={{ position: 'absolute', left: 20, top: 0 }}>
                  {/* Grid lines */}
                  <line x1="0" y1="0" x2="600" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                  {/* Animated line */}
                  <path
                    d={`M 0 200 L ${lineProgress * 1.5} ${200 - lineProgress * 0.3} L ${lineProgress * 3} ${200 - lineProgress * 0.8} L ${lineProgress * 4.5} ${200 - lineProgress * 1.5} L ${lineProgress * 6} ${200 - lineProgress * 2}`}
                    stroke={BRAND.colors.primary}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: `drop-shadow(0 0 8px ${BRAND.colors.primary}66)` }}
                  />

                  {/* Gradient fill */}
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

      {/* Big stat: 3x More Referrals */}
      <Sequence from={900} durationInFrames={885}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={900} padding="40px 80px">
            <div style={{
              opacity: fadeIn(frame, 900, 25),
              transform: `scale(${scaleIn(frame, 900, 30)})`,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 140,
                fontWeight: 'bold',
                color: BRAND.colors.primary,
                fontFamily: BRAND.fonts.primary,
                textShadow: `0 0 60px ${BRAND.colors.primary}66`,
                lineHeight: 1,
              }}>
                {countUp(frame, 3, 920, 50)}x
              </div>
              <div style={{
                fontSize: 48,
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginTop: 20,
              }}>
                More Referrals
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
