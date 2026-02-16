import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromLeft, slideInFromRight, scaleIn, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene08_Claims: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      sceneId="scene08"
      durationInFrames={durationInFrames}
      backgroundVideo="scene08_claims.mp4"
      backgroundImage="scenes/scene08.png"
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
              5. Instant Claims Processing
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Claims chat flow */}
      <Sequence from={80} durationInFrames={650}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={700} delay={80} padding="32px">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {/* AI: What happened? */}
              <div style={{
                opacity: fadeIn(frame, 80, 15),
                transform: `translateX(${slideInFromLeft(frame, 80, 20)}px)`,
                alignSelf: 'flex-start',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '12px 20px',
                  maxWidth: '70%',
                }}>
                  <div style={{ fontSize: 20, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    What happened?
                  </div>
                </div>
              </div>

              {/* Client: Car hit */}
              <div style={{
                opacity: fadeIn(frame, 180, 15),
                transform: `translateX(${slideInFromRight(frame, 180, 20)}px)`,
                alignSelf: 'flex-end',
              }}>
                <div style={{
                  backgroundColor: '#3B82F6',
                  borderRadius: 12,
                  padding: '12px 20px',
                  maxWidth: '70%',
                }}>
                  <div style={{ fontSize: 20, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    My car was hit in a parking lot
                  </div>
                </div>
              </div>

              {/* AI: Help file */}
              <div style={{
                opacity: fadeIn(frame, 280, 15),
                transform: `translateX(${slideInFromLeft(frame, 280, 20)}px)`,
                alignSelf: 'flex-start',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '12px 20px',
                  maxWidth: '70%',
                }}>
                  <div style={{ fontSize: 20, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    I'm sorry to hear that. Let me help you file a claim.
                  </div>
                </div>
              </div>

              {/* AI: Upload photos */}
              <div style={{
                opacity: fadeIn(frame, 380, 15),
                transform: `translateX(${slideInFromLeft(frame, 380, 20)}px)`,
                alignSelf: 'flex-start',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '12px 20px',
                  maxWidth: '70%',
                }}>
                  <div style={{ fontSize: 20, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    Please upload photos of the damage
                  </div>
                </div>
              </div>

              {/* Client: Photo */}
              <div style={{
                opacity: fadeIn(frame, 480, 15),
                transform: `translateX(${slideInFromRight(frame, 480, 20)}px)`,
                alignSelf: 'flex-end',
              }}>
                <div style={{
                  backgroundColor: '#3B82F6',
                  borderRadius: 12,
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <div style={{
                    width: 50,
                    height: 40,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    IMG
                  </div>
                  <div style={{ fontSize: 18, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    damage_photo.jpg
                  </div>
                </div>
              </div>

              {/* AI: Claim filed */}
              <div style={{
                opacity: fadeIn(frame, 580, 15),
                transform: `translateX(${slideInFromLeft(frame, 580, 20)}px)`,
                alignSelf: 'flex-start',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: `2px solid ${BRAND.colors.primary}`,
                  borderRadius: 12,
                  padding: '12px 20px',
                  boxShadow: `0 0 15px ${BRAND.colors.primary}44`,
                }}>
                  <div style={{ fontSize: 20, color: 'white', fontFamily: BRAND.fonts.primary }}>
                    Claim filed! Tracking{' '}
                    <span style={{ color: BRAND.colors.primary, fontWeight: 'bold' }}>#CLM-2847</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Status tracker */}
      <Sequence from={750} durationInFrames={450}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={1000} delay={750} padding="40px">
            <div style={{ opacity: fadeIn(frame, 750, 20) }}>
              <div style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginBottom: 40,
                textAlign: 'center',
              }}>
                Claim Status
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
              }}>
                {/* Background line */}
                <div style={{
                  position: 'absolute',
                  top: 20,
                  left: '10%',
                  right: '10%',
                  height: 3,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                }} />

                {[
                  { label: 'Filed', frame: 780, color: BRAND.colors.primary },
                  { label: 'Under Review', frame: 840, color: BRAND.colors.primary },
                  { label: 'Approved', frame: 900, color: BRAND.colors.primary },
                  { label: 'Paid', frame: 960, color: '#22C55E' },
                ].map((step, i) => {
                  const isActive = frame >= step.frame;
                  return (
                    <div key={i} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 2,
                      flex: 1,
                    }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: isActive ? step.color : 'rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: isActive ? BRAND.colors.background : 'white',
                        boxShadow: isActive ? `0 0 20px ${step.color}` : 'none',
                      }}>
                        {isActive ? '✓' : `${i + 1}`}
                      </div>
                      <div style={{
                        marginTop: 12,
                        fontSize: 18,
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: isActive ? 'white' : BRAND.colors.textSecondary,
                        fontFamily: BRAND.fonts.primary,
                        textAlign: 'center',
                      }}>
                        {step.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Big stat: 5x Faster Filing */}
      <Sequence from={1050} durationInFrames={735}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={1050} padding="40px 80px">
            <div style={{
              opacity: fadeIn(frame, 1050, 25),
              transform: `scale(${scaleIn(frame, 1050, 30)})`,
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
                {countUp(frame, 5, 1070, 50)}x
              </div>
              <div style={{
                fontSize: 48,
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                marginTop: 20,
              }}>
                Faster Filing
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
