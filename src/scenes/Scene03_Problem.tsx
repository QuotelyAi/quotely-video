import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, springSlam, springBouncy, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import { DramaticRise, ImpactHit } from '../audio/SFX';
import type { SceneProps } from '../types';

export const Scene03_Problem: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneContainer
      sceneId="scene03"
      durationInFrames={durationInFrames}
      backgroundVideo="scene03_problem.mp4"
      backgroundImage="scenes/scene03.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* SFX */}
      <DramaticRise at={5} volume={0.5} />
      <ImpactHit at={30} volume={0.8} />
      <ImpactHit at={210} volume={0.6} />
      <ImpactHit at={290} volume={0.6} />
      <ImpactHit at={370} volume={0.6} />

      {/* Main stat: $1.3 TRILLION — full-screen slam, no GlassPanel */}
      <Sequence from={5} durationInFrames={175}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 180,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono,
              color: BRAND.colors.primary,
              textShadow: `0 0 80px ${BRAND.colors.primary}88`,
              letterSpacing: -4,
              opacity: springSlam(frame, fps, 10),
              transform: `scale(${springSlam(frame, fps, 10)})`,
            }}>
              $1.3T
            </div>
            <div style={{
              fontSize: 48,
              color: BRAND.colors.textSecondary,
              fontFamily: BRAND.fonts.primary,
              marginTop: 20,
              opacity: fadeIn(frame, 50, 20),
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Yet still stuck in the 20th century
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Sequential stat reveals — full-frame, one at a time */}
      <Sequence from={180} durationInFrames={200}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 120,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono,
              color: '#EF4444',
              opacity: springSlam(frame, fps, 200),
              transform: `scale(${springSlam(frame, fps, 200)})`,
              letterSpacing: -2,
            }}>
              {countUp(frame, 87, 210, 40)}%
            </div>
            <div style={{
              fontSize: 36,
              color: 'white',
              fontFamily: BRAND.fonts.primary,
              marginTop: 12,
              opacity: fadeIn(frame, 220, 15),
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Manual Processes
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={380} durationInFrames={200}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 120,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono,
              color: '#EF4444',
              opacity: springSlam(frame, fps, 400),
              transform: `scale(${springSlam(frame, fps, 400)})`,
              letterSpacing: -2,
            }}>
              {countUp(frame, 24, 410, 40)}hr
            </div>
            <div style={{
              fontSize: 36,
              color: 'white',
              fontFamily: BRAND.fonts.primary,
              marginTop: 12,
              opacity: fadeIn(frame, 420, 15),
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Average Quote Time
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={580} durationInFrames={200}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 120,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.mono,
              color: '#EF4444',
              opacity: springSlam(frame, fps, 600),
              transform: `scale(${springSlam(frame, fps, 600)})`,
              letterSpacing: -2,
            }}>
              {countUp(frame, 40, 610, 40)}%
            </div>
            <div style={{
              fontSize: 36,
              color: 'white',
              fontFamily: BRAND.fonts.primary,
              marginTop: 12,
              opacity: fadeIn(frame, 620, 15),
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              Leads Lost
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Split-screen: OLD WAY vs MODERN WAY */}
      <Sequence from={780} durationInFrames={1020}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            gap: 60,
            opacity: fadeIn(frame, 780, 20),
          }}>
            {/* OLD WAY */}
            <GlassPanel width={480} padding="40px" borderColor="#EF4444">
              <div style={{
                opacity: fadeIn(frame, 800, 20),
                transform: `scale(${springBouncy(frame, fps, 800)})`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 52,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.headline,
                  color: '#EF4444',
                  marginBottom: 40,
                }}>
                  OLD WAY
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    { label: 'Spreadsheets', delay: 850 },
                    { label: 'Phone Calls', delay: 900 },
                    { label: 'Paper Files', delay: 950 },
                    { label: 'Manual Entry', delay: 1000 },
                  ].map((item) => (
                    <div key={item.label} style={{
                      fontSize: 32,
                      color: BRAND.colors.textSecondary,
                      fontFamily: BRAND.fonts.primary,
                      opacity: fadeIn(frame, item.delay, 15),
                      transform: `translateY(${slideInFromBottom(frame, item.delay, 20)}px)`,
                    }}>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>

            {/* MODERN WAY */}
            <GlassPanel width={480} padding="40px" borderColor={BRAND.colors.primary} glowColor={BRAND.colors.primary}>
              <div style={{
                opacity: fadeIn(frame, 820, 20),
                transform: `scale(${springBouncy(frame, fps, 820)})`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 52,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.headline,
                  color: BRAND.colors.primary,
                  marginBottom: 40,
                  textShadow: `0 0 40px ${BRAND.colors.primary}44`,
                }}>
                  MODERN WAY
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    { label: 'AI Automation', delay: 870 },
                    { label: 'Instant Quotes', delay: 920 },
                    { label: 'Cloud Platform', delay: 970 },
                    { label: 'Real-time Data', delay: 1020 },
                  ].map((item) => (
                    <div key={item.label} style={{
                      fontSize: 32,
                      color: 'white',
                      fontFamily: BRAND.fonts.primary,
                      opacity: fadeIn(frame, item.delay, 15),
                      transform: `translateY(${slideInFromBottom(frame, item.delay, 20)}px)`,
                    }}>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
