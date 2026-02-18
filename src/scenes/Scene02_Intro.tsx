import { AbsoluteFill, useCurrentFrame, Sequence, spring, useVideoConfig, interpolate } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { SyncWhoosh } from '../audio/SFX';
import type { SceneProps } from '../types';

export const Scene02_Intro: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 80 } });
  const underlineWidth = interpolate(frame, [50, 80], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleOpacity = fadeIn(frame, 90, 20);
  const titleSlide = slideInFromBottom(frame, 90, 25);
  const subtitleOpacity = fadeIn(frame, 130, 20);

  return (
    <SceneContainer
      sceneId="scene02"
      durationInFrames={durationInFrames}
      backgroundVideo="scene02_intro.mp4"
      backgroundImage="scenes/scene02.png"
      overlayMode="vignette"
      overlayIntensity={0.55}
    >
      {/* SFX */}
      <SyncWhoosh at={10} volume={0.4} />

      {/* Q Logo */}
      <Sequence from={10} durationInFrames={440}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 120 }}>
          <div style={{
            fontSize: 180,
            fontWeight: 'bold',
            fontFamily: BRAND.fonts.headline,
            color: BRAND.colors.primary,
            transform: `scale(${logoScale})`,
            textShadow: `0 0 40px ${BRAND.colors.primary}44, 0 0 80px ${BRAND.colors.primary}22`,
          }}>
            Q
          </div>
          <div style={{
            width: underlineWidth,
            height: 4,
            backgroundColor: BRAND.colors.primary,
            borderRadius: 2,
            marginTop: -10,
            boxShadow: `0 0 20px ${BRAND.colors.primary}66`,
          }} />
        </AbsoluteFill>
      </Sequence>

      {/* Title — raw text, no GlassPanel */}
      <Sequence from={90} durationInFrames={360}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
          <div style={{
            opacity: titleOpacity,
            transform: `translateY(${titleSlide}px)`,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 56, fontWeight: 'bold', color: 'white',
              fontFamily: BRAND.fonts.headline, letterSpacing: -1,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}>
              Run Your Insurance Agency
            </div>
            <div style={{
              fontSize: 56, fontWeight: 'bold',
              fontFamily: BRAND.fonts.headline, letterSpacing: -1, marginTop: 8,
            }}>
              <span style={{ color: 'white' }}>with </span>
              <span style={{
                color: BRAND.colors.primary,
                textShadow: `0 0 40px ${BRAND.colors.primary}44`,
              }}>AI</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Powered by Quotely label */}
      <Sequence from={130} durationInFrames={320}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 300 }}>
          <div style={{
            opacity: subtitleOpacity,
            fontSize: 28, color: BRAND.colors.textSecondary,
            fontFamily: BRAND.fonts.primary, letterSpacing: 6,
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            Powered by Quotely
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
