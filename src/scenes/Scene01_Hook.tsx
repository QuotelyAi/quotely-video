import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, springSlam, cameraShake, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { ImpactHit, GlitchStatic } from '../audio/SFX';
import type { SceneProps } from '../types';

export const Scene01_Hook: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glitchActive = frame > 180 && frame < 195;
  const glitchOffset = glitchActive ? Math.sin(frame * 15) * 10 : 0;
  const shake = cameraShake(frame, 175, 12, 10);

  const yearSlam1 = springSlam(frame, fps, 5);
  const yearSlam2 = springSlam(frame, fps, 195);

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
      {/* SFX */}
      <ImpactHit at={5} volume={0.6} />
      <GlitchStatic at={180} volume={0.5} />
      <ImpactHit at={195} volume={0.8} />

      {/* "1995" — raw cinema title card, no GlassPanel */}
      <Sequence from={5} durationInFrames={175}>
        <AbsoluteFill style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translate(${shake.x}px, ${shake.y}px)`,
        }}>
          <div style={{
            fontSize: 320,
            fontWeight: 'bold',
            fontFamily: BRAND.fonts.headline,
            color: BRAND.colors.textSecondary,
            opacity: yearSlam1 * 0.85,
            transform: `scale(${yearSlam1})`,
            letterSpacing: -12,
            lineHeight: 1,
            textShadow: '0 4px 60px rgba(0,0,0,0.8)',
          }}>
            1995
          </div>
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
              opacity: (Math.sin(i * 127.1 + 311.7) * 43758.5453 % 1) > 0.5 ? 0.3 : 0,
              transform: `translateX(${(i % 2 === 0 ? 1 : -1) * glitchOffset * (i + 1)}px)`,
            }} />
          ))}
        </AbsoluteFill>
      )}

      {/* "2026" — gold slam, no GlassPanel */}
      <Sequence from={195} durationInFrames={255}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            fontSize: 240,
            fontWeight: 'bold',
            fontFamily: BRAND.fonts.mono,
            color: BRAND.colors.primary,
            opacity: yearSlam2,
            transform: `scale(${yearSlam2})`,
            letterSpacing: -8,
            textShadow: `0 0 80px ${BRAND.colors.primary}88, 0 0 160px ${BRAND.colors.primary}44`,
            lineHeight: 1,
          }}>
            2026
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Stat overlay — raw text, no GlassPanel */}
      <Sequence from={260} durationInFrames={durationInFrames - 260}>
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 180 }}>
          <div style={{
            opacity: fadeIn(frame, 260, 20),
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: BRAND.colors.primary,
              fontFamily: BRAND.fonts.mono,
              textShadow: `0 0 40px ${BRAND.colors.primary}66`,
              letterSpacing: -2,
            }}>
              {countUp(frame, 87, 270, 40)}%
            </div>
            <div style={{
              fontSize: 28,
              color: BRAND.colors.textSecondary,
              fontFamily: BRAND.fonts.primary,
              marginTop: 8,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              of agencies still use manual processes
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
