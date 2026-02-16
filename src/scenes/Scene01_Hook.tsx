import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene01_Hook: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const yearOpacity = fadeIn(frame, 5, 15);
  const yearScale = scaleIn(frame, 5, 20);

  const glitchActive = frame > 180 && frame < 195;
  const glitchOffset = glitchActive ? Math.sin(frame * 15) * 10 : 0;

  const statOpacity = fadeIn(frame, 220, 20);

  return (
    <SceneContainer
      sceneId="scene01"
      durationInFrames={durationInFrames}
      backgroundVideo="scene01_hook.mp4"
      backgroundImage="scenes/scene01.png"
      overlayMode="vignette"
      overlayIntensity={0.6}
      showAvatar={false}
    >
      {/* "1995" big year text as glass overlay */}
      <Sequence from={5} durationInFrames={175}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={5} padding="40px 80px">
            <div style={{
              fontSize: 280,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.primary,
              color: BRAND.colors.textSecondary,
              opacity: yearOpacity * 0.8,
              transform: `scale(${yearScale})`,
              letterSpacing: -10,
              lineHeight: 1,
            }}>
              1995
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Glitch transition */}
      {glitchActive && (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${i * 12.5}%`,
              left: 0,
              width: '100%',
              height: '12.5%',
              backgroundColor: BRAND.colors.primary,
              opacity: Math.random() > 0.5 ? 0.3 : 0,
              transform: `translateX(${(i % 2 === 0 ? 1 : -1) * glitchOffset * (i + 1)}px)`,
            }} />
          ))}
        </AbsoluteFill>
      )}

      {/* Post-glitch: Modern AI text as glass overlay */}
      <Sequence from={195} durationInFrames={255}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width="auto" delay={195} padding="40px 80px">
            <div style={{
              fontSize: 200,
              fontWeight: 'bold',
              fontFamily: BRAND.fonts.primary,
              color: BRAND.colors.primary,
              opacity: fadeIn(frame, 195, 15),
              letterSpacing: -8,
              textShadow: `0 0 60px ${BRAND.colors.primary}66`,
              lineHeight: 1,
            }}>
              2026
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Stat overlay in glass panel */}
      <Sequence from={220} durationInFrames={210}>
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 180 }}>
          <GlassPanel width="auto" delay={220} padding="24px 48px">
            <div style={{
              opacity: statOpacity,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: BRAND.colors.primary,
                fontFamily: BRAND.fonts.primary,
                textShadow: `0 0 30px ${BRAND.colors.primary}44`,
              }}>
                87%
              </div>
              <div style={{
                fontSize: 28,
                color: BRAND.colors.textSecondary,
                fontFamily: BRAND.fonts.primary,
                marginTop: 8,
              }}>
                of agencies still use manual processes
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
