import { AbsoluteFill, useCurrentFrame, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene07_PolicyManagement: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const scanProgress = interpolate(frame, [90, 180], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <SceneContainer
      sceneId="scene07"
      durationInFrames={durationInFrames}
      backgroundVideo="scene07_policy.mp4"
      backgroundImage="scenes/scene07.png"
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
              4. AI Policy Management
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Document scan animation */}
      <Sequence from={60} durationInFrames={340}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={500} delay={60} padding="40px">
            <div style={{ opacity: fadeIn(frame, 60, 20), position: 'relative' }}>
              {/* Document lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    width: `${70 + (i % 3) * 10}%`,
                    height: 10,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: 2,
                  }} />
                ))}
              </div>

              {/* Scanning line */}
              {frame >= 90 && frame <= 180 && (
                <div style={{
                  position: 'absolute',
                  top: `${scanProgress}%`,
                  left: 0,
                  width: '100%',
                  height: 3,
                  backgroundColor: BRAND.colors.primary,
                  boxShadow: `0 0 30px ${BRAND.colors.primary}`,
                }} />
              )}

              {/* Data field highlights */}
              {frame >= 190 && (
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={{
                      width: `${40 + i * 15}%`,
                      height: 10,
                      backgroundColor: '#22C55E',
                      borderRadius: 2,
                      opacity: fadeIn(frame, 190 + i * 20, 15),
                      boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                    }} />
                  ))}
                </div>
              )}

              {/* Data Extracted label */}
              {frame >= 280 && (
                <div style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#22C55E',
                  fontFamily: BRAND.fonts.primary,
                  opacity: fadeIn(frame, 280, 15),
                }}>
                  Data Extracted
                </div>
              )}
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Policy timeline */}
      <Sequence from={350} durationInFrames={250}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={900} delay={350} padding="40px">
            <div style={{ opacity: fadeIn(frame, 350, 20) }}>
              <div style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginBottom: 50,
                textAlign: 'center',
              }}>
                Policy Timeline
              </div>
              <div style={{
                position: 'relative',
                height: 4,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 2,
                margin: '0 40px',
              }}>
                {[
                  { label: 'Policy Start', pos: '5%', color: BRAND.colors.primary, delay: 370 },
                  { label: 'Renewal', pos: '35%', color: '#3B82F6', delay: 410 },
                  { label: 'Claim Filed', pos: '65%', color: '#EF4444', delay: 450 },
                  { label: 'Upsell', pos: '95%', color: '#22C55E', delay: 490 },
                ].map((dot) => (
                  <div key={dot.label} style={{
                    position: 'absolute',
                    left: dot.pos,
                    top: '50%',
                    transform: `translate(-50%, -50%) scale(${scaleIn(frame, dot.delay, 20)})`,
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: dot.color,
                      boxShadow: `0 0 15px ${dot.color}`,
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: 30,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 16,
                      color: BRAND.colors.textSecondary,
                      fontFamily: BRAND.fonts.primary,
                      whiteSpace: 'nowrap',
                    }}>
                      {dot.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Coverage gap detector */}
      <Sequence from={600} durationInFrames={450}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={600} delay={600} padding="40px">
            <div style={{ opacity: fadeIn(frame, 600, 20) }}>
              <div style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginBottom: 24,
              }}>
                Policy Analysis
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { text: 'Liability Coverage: Verified', delay: 640 },
                  { text: 'Property Damage: Adequate', delay: 670 },
                  { text: 'Collision Coverage: Active', delay: 700 },
                ].map((item) => (
                  <div key={item.text} style={{
                    display: 'flex',
                    alignItems: 'center',
                    opacity: fadeIn(frame, item.delay, 15),
                  }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#22C55E',
                      marginRight: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      ✓
                    </div>
                    <div style={{
                      fontSize: 20,
                      color: BRAND.colors.textSecondary,
                      fontFamily: BRAND.fonts.primary,
                    }}>
                      {item.text}
                    </div>
                  </div>
                ))}

                {/* Gap detected */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  opacity: fadeIn(frame, 750, 20),
                  transform: `scale(${scaleIn(frame, 750, 25)})`,
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  padding: 12,
                  borderRadius: 8,
                  border: '2px solid #EF4444',
                  marginTop: 8,
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    marginRight: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                    !
                  </div>
                  <div style={{
                    fontSize: 20,
                    color: '#EF4444',
                    fontFamily: BRAND.fonts.primary,
                    fontWeight: 'bold',
                  }}>
                    Gap Detected: Umbrella Policy Missing
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 73% Less Admin Time */}
      <Sequence from={900} durationInFrames={1335}>
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
                {countUp(frame, 73, 920, 50)}%
              </div>
              <div style={{
                fontSize: 48,
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginTop: 20,
              }}>
                Less Admin Time
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
