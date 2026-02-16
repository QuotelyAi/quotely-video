import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, slideInFromLeft, slideInFromRight, scaleIn, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene03_Problem: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      sceneId="scene03"
      durationInFrames={durationInFrames}
      backgroundVideo="scene03_problem.mp4"
      backgroundImage="scenes/scene03.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* Main stat: $1.3 TRILLION */}
      <Sequence from={5} durationInFrames={175}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={5} padding="40px 80px">
            <div style={{
              opacity: fadeIn(frame, 5, 20),
              transform: `scale(${scaleIn(frame, 5, 30)})`,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 140,
                fontWeight: 'bold',
                fontFamily: BRAND.fonts.primary,
                color: BRAND.colors.primary,
                textShadow: `0 0 60px ${BRAND.colors.primary}66`,
                letterSpacing: -4,
              }}>
                $1.3 TRILLION
              </div>
              <div style={{
                fontSize: 48,
                color: BRAND.colors.textSecondary,
                fontFamily: BRAND.fonts.primary,
                marginTop: 20,
                opacity: fadeIn(frame, 35, 20),
              }}>
                Yet still stuck in the 20th century
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Stat counters in glass panels */}
      <Sequence from={180} durationInFrames={600}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            gap: 40,
            opacity: fadeIn(frame, 180, 20),
          }}>
            {/* 87% Manual Processes */}
            <GlassPanel width={320} delay={200} padding="40px">
              <div style={{
                opacity: fadeIn(frame, 200, 20),
                transform: `translateX(${slideInFromLeft(frame, 200, 30)}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 96,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.primary,
                  color: '#EF4444',
                }}>
                  {countUp(frame, 87, 210, 40)}%
                </div>
                <div style={{
                  fontSize: 28,
                  color: 'white',
                  fontFamily: BRAND.fonts.primary,
                  marginTop: 8,
                }}>
                  Manual Processes
                </div>
              </div>
            </GlassPanel>

            {/* 24hr Average Quote Time */}
            <GlassPanel width={320} delay={280} padding="40px">
              <div style={{
                opacity: fadeIn(frame, 280, 20),
                transform: `translateX(${slideInFromRight(frame, 280, 30)}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 96,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.primary,
                  color: '#EF4444',
                }}>
                  {countUp(frame, 24, 290, 40)}hr
                </div>
                <div style={{
                  fontSize: 28,
                  color: 'white',
                  fontFamily: BRAND.fonts.primary,
                  marginTop: 8,
                }}>
                  Average Quote Time
                </div>
              </div>
            </GlassPanel>

            {/* 40% Leads Lost */}
            <GlassPanel width={320} delay={360} padding="40px">
              <div style={{
                opacity: fadeIn(frame, 360, 20),
                transform: `translateX(${slideInFromLeft(frame, 360, 30)}px)`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 96,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.primary,
                  color: '#EF4444',
                }}>
                  {countUp(frame, 40, 370, 40)}%
                </div>
                <div style={{
                  fontSize: 28,
                  color: 'white',
                  fontFamily: BRAND.fonts.primary,
                  marginTop: 8,
                }}>
                  Leads Lost
                </div>
              </div>
            </GlassPanel>
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
            <GlassPanel width={480} delay={800} padding="40px">
              <div style={{
                opacity: fadeIn(frame, 800, 20),
                transform: `scale(${scaleIn(frame, 800, 25)})`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 52,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.primary,
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
            <GlassPanel width={480} delay={820} padding="40px" borderColor={BRAND.colors.primary}>
              <div style={{
                opacity: fadeIn(frame, 820, 20),
                transform: `scale(${scaleIn(frame, 820, 25)})`,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 52,
                  fontWeight: 'bold',
                  fontFamily: BRAND.fonts.primary,
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
