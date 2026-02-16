import { AbsoluteFill, useCurrentFrame, Sequence, spring, useVideoConfig } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, glowPulse } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene11_CTA: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 80 } });
  const glowIntensity = glowPulse(frame, 0.08);
  const buttonPulse = 1 + Math.sin(frame * 0.12) * 0.03;

  return (
    <SceneContainer
      sceneId="scene11"
      durationInFrames={durationInFrames}
      backgroundVideo="scene11_cta.mp4"
      backgroundImage="scenes/scene11.png"
      overlayMode="vignette"
      overlayIntensity={0.5}
    >
      {/* Q Logo */}
      <Sequence from={20} durationInFrames={880}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 280 }}>
          <div style={{
            fontSize: 140,
            fontWeight: 'bold',
            fontFamily: BRAND.fonts.primary,
            color: BRAND.colors.primary,
            transform: `scale(${logoScale})`,
            textShadow: `0 0 ${40 + glowIntensity * 40}px ${BRAND.colors.primary}66`,
          }}>
            Q
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* "Ready to transform your agency?" in glass panel */}
      <Sequence from={60} durationInFrames={840}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 40 }}>
          <GlassPanel width="auto" delay={60} padding="32px 64px">
            <div style={{
              opacity: fadeIn(frame, 60, 20),
              transform: `translateY(${slideInFromBottom(frame, 60, 25)}px)`,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 52,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                lineHeight: 1.3,
              }}>
                Ready to Transform
                <br />
                Your Agency?
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* CTA Button as glass panel with strong gold */}
      <Sequence from={150} durationInFrames={750}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 140 }}>
          <div style={{
            opacity: fadeIn(frame, 150, 20),
            transform: `scale(${buttonPulse})`,
          }}>
            <div style={{
              backgroundColor: BRAND.colors.primary,
              color: BRAND.colors.background,
              fontSize: 32,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.primary,
              padding: '20px 60px',
              borderRadius: 50,
              boxShadow: `0 0 ${30 + glowIntensity * 30}px ${BRAND.colors.primary}66, 0 4px 20px rgba(0,0,0,0.3)`,
            }}>
              Book a Free Demo
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Website URL */}
      <Sequence from={200} durationInFrames={700}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 280 }}>
          <div style={{
            opacity: fadeIn(frame, 200, 20),
            fontSize: 28,
            color: BRAND.colors.textSecondary,
            fontFamily: BRAND.fonts.primary,
            letterSpacing: 2,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            tryquotely.com
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Arrow pointing down */}
      <Sequence from={590} durationInFrames={310}>
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 120 }}>
          <div style={{
            opacity: fadeIn(frame, 590, 15),
            transform: `translateY(${Math.sin(frame * 0.15) * 5}px)`,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 20,
              color: BRAND.colors.textSecondary,
              fontFamily: BRAND.fonts.primary,
              marginBottom: 8,
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}>
              Link in description
            </div>
            <div style={{ fontSize: 36, color: BRAND.colors.primary }}>↓</div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
