import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, slideInFromLeft, slideInFromRight, springBouncy, springSlam, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import { ImpactHit, DataLoad } from '../audio/SFX';
import type { SceneProps } from '../types';

export const Scene06_Communication: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneContainer
      sceneId="scene06"
      durationInFrames={durationInFrames}
      backgroundVideo="scene06_communication.mp4"
      backgroundImage="scenes/scene06.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* SFX */}
      <DataLoad at={80} volume={0.3} />
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
              3. 24/7 AI Communication
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* 24/7 Clock */}
      <Sequence from={80} durationInFrames={550}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            opacity: fadeIn(frame, 80, 20),
            transform: `scale(${springSlam(frame, fps, 80)})`,
            textAlign: 'center',
          }}>
            <div style={{
              width: 300, height: 300, borderRadius: '50%',
              border: `6px solid ${BRAND.colors.primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', margin: '0 auto',
              boxShadow: `0 0 60px ${BRAND.colors.primary}44`,
            }}>
              <div style={{
                fontSize: 96, fontWeight: 'bold',
                fontFamily: BRAND.fonts.mono, color: BRAND.colors.primary,
              }}>
                24/7
              </div>
              <div style={{
                position: 'absolute', width: 6, height: 100,
                backgroundColor: BRAND.colors.primary,
                top: 50, left: '50%', marginLeft: -3, borderRadius: 3,
                transformOrigin: 'center bottom',
                transform: `rotate(${(frame - 80) * 6}deg)`,
                boxShadow: `0 0 15px ${BRAND.colors.primary}`,
              }} />
            </div>
            <div style={{
              fontSize: 36, color: 'white',
              fontFamily: BRAND.fonts.headline, marginTop: 30,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Always Available, Never Sleeping
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Multi-channel visualization */}
      <Sequence from={630} durationInFrames={800}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex', gap: 30, opacity: fadeIn(frame, 630, 20),
          }}>
            {[
              { icon: 'Chat', delay: 660 },
              { icon: 'Email', delay: 720 },
              { icon: 'SMS', delay: 780 },
            ].map((channel) => (
              <GlassPanel key={channel.icon} width={320} padding="32px">
                <div style={{
                  opacity: springBouncy(frame, fps, channel.delay),
                  transform: `translateY(${slideInFromBottom(frame, channel.delay, 30)}px)`,
                  textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                  height: 280,
                }}>
                  <div style={{
                    fontSize: 36, fontWeight: 'bold',
                    fontFamily: BRAND.fonts.headline, color: BRAND.colors.primary,
                  }}>
                    {channel.icon}
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    width: '100%', flex: 1, justifyContent: 'center',
                  }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} style={{
                        height: 10, backgroundColor: BRAND.colors.primary, borderRadius: 5,
                        width: `${60 + i * 8}%`,
                        opacity: fadeIn(frame, channel.delay + 30 + i * 15, 10) * 0.6,
                        alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                      }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 20, fontFamily: BRAND.fonts.primary, color: '#22C55E' }}>
                    Active
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Chat mockup */}
      <Sequence from={1430} durationInFrames={520}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={800} padding="32px">
            <div style={{ opacity: fadeIn(frame, 1430, 20) }}>
              <div style={{
                fontSize: 32, fontWeight: 'bold',
                fontFamily: BRAND.fonts.headline, color: BRAND.colors.primary,
                borderBottom: `2px solid ${BRAND.colors.primary}44`,
                paddingBottom: 16, marginBottom: 24,
              }}>
                Live Chat
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  opacity: fadeIn(frame, 1460, 15),
                  transform: `translateX(${slideInFromLeft(frame, 1460, 20)}px)`,
                  alignSelf: 'flex-start',
                }}>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: 12, maxWidth: 500,
                  }}>
                    <div style={{ fontSize: 24, fontFamily: BRAND.fonts.primary, color: 'white' }}>
                      What's covered under my policy?
                    </div>
                  </div>
                </div>
                <div style={{
                  opacity: fadeIn(frame, 1520, 15),
                  transform: `translateX(${slideInFromRight(frame, 1520, 20)}px)`,
                  alignSelf: 'flex-end',
                }}>
                  <div style={{
                    backgroundColor: BRAND.colors.primary, padding: '12px 20px', borderRadius: 12, maxWidth: 500,
                  }}>
                    <div style={{ fontSize: 24, fontFamily: BRAND.fonts.primary, color: BRAND.colors.background }}>
                      Your policy covers liability, property damage, and medical expenses. Would you like details?
                    </div>
                  </div>
                </div>
                <div style={{
                  opacity: fadeIn(frame, 1600, 15),
                  transform: `translateX(${slideInFromLeft(frame, 1600, 20)}px)`,
                  alignSelf: 'flex-start',
                }}>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: 12,
                  }}>
                    <div style={{ fontSize: 24, fontFamily: BRAND.fonts.primary, color: 'white' }}>
                      Yes please!
                    </div>
                  </div>
                </div>
                <div style={{
                  opacity: fadeIn(frame, 1660, 15), alignSelf: 'flex-end',
                }}>
                  <div style={{
                    backgroundColor: BRAND.colors.primary, padding: '12px 20px', borderRadius: 12,
                    display: 'flex', gap: 6,
                  }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{
                        width: 10, height: 10, borderRadius: '50%',
                        backgroundColor: BRAND.colors.background,
                        opacity: 0.4 + Math.sin((frame - 1660 + i * 10) * 0.2) * 0.4,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 92% — SVG circular arc */}
      <Sequence from={1950} durationInFrames={300}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', opacity: fadeIn(frame, 1950, 20) }}>
            <div style={{ position: 'relative', width: 280, height: 280, margin: '0 auto' }}>
              <svg width={280} height={280} viewBox="0 0 280 280">
                {/* Background circle */}
                <circle cx={140} cy={140} r={120} fill="none"
                  stroke="rgba(255,255,255,0.1)" strokeWidth={12} />
                {/* Animated arc */}
                <circle cx={140} cy={140} r={120} fill="none"
                  stroke={BRAND.colors.primary}
                  strokeWidth={12}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - interpolate(frame, [1960, 2020], [0, 0.92], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                  }))}
                  transform="rotate(-90 140 140)"
                  style={{ filter: `drop-shadow(0 0 12px ${BRAND.colors.primary}88)` }}
                />
              </svg>
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 80, fontWeight: 'bold',
                fontFamily: BRAND.fonts.mono, color: BRAND.colors.primary,
                letterSpacing: -2,
              }}>
                {countUp(frame, 92, 1970, 50)}%
              </div>
            </div>
            <div style={{
              fontSize: 48, color: 'white',
              fontFamily: BRAND.fonts.headline, marginTop: 20,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Client Satisfaction
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
