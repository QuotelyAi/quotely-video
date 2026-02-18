import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence, spring } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, glowPulse, springConfident } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { BrandSting } from '../audio/SFX';
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
      {/* SFX */}
      <BrandSting at={20} volume={0.5} />

      {/* "Quotely" brand name — 140px Georgia serif */}
      <Sequence from={20} durationInFrames={880}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 280 }}>
          <div style={{
            fontSize: 140,
            fontWeight: 'bold',
            fontFamily: BRAND.fonts.headline,
            color: BRAND.colors.primary,
            transform: `scale(${logoScale})`,
            textShadow: `0 0 ${40 + glowIntensity * 40}px ${BRAND.colors.primary}66`,
            letterSpacing: -4,
          }}>
            Quotely
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* "Ready to transform your agency?" */}
      <Sequence from={60} durationInFrames={840}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 40 }}>
          <div style={{
            opacity: springConfident(frame, fps, 60),
            transform: `translateY(${slideInFromBottom(frame, 60, 25)}px)`,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 52, fontWeight: 'bold', color: 'white',
              fontFamily: BRAND.fonts.headline, lineHeight: 1.3,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}>
              Ready to Transform
              <br />
              Your Agency?
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* CTA Button — gradient gold */}
      <Sequence from={150} durationInFrames={750}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 140 }}>
          <div style={{
            opacity: fadeIn(frame, 150, 20),
            transform: `scale(${buttonPulse})`,
          }}>
            <div style={{
              background: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, #FFA500 100%)`,
              color: BRAND.colors.background,
              fontSize: 32, fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline,
              padding: '24px 72px',
              borderRadius: 50,
              boxShadow: `0 0 ${30 + glowIntensity * 30}px ${BRAND.colors.primary}66, 0 8px 30px rgba(0,0,0,0.4)`,
              letterSpacing: 1,
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
            fontSize: 28, color: BRAND.colors.textSecondary,
            fontFamily: BRAND.fonts.mono, letterSpacing: 2,
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
              fontSize: 20, color: BRAND.colors.textSecondary,
              fontFamily: BRAND.fonts.primary, marginBottom: 8,
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
