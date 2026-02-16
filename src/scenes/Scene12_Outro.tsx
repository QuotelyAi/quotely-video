import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import type { SceneProps } from '../types';

export const Scene12_Outro: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      sceneId="scene12"
      durationInFrames={durationInFrames}
      backgroundVideo="scene12_outro.mp4"
      backgroundImage="scenes/scene12.png"
      overlayMode="vignette"
      overlayIntensity={0.45}
    >
      {/* Subscribe button in glass panel */}
      <Sequence from={10} durationInFrames={440}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
          <GlassPanel width="auto" delay={10} padding="32px 60px">
            <div style={{
              opacity: fadeIn(frame, 10, 20),
              transform: `scale(${scaleIn(frame, 10, 25)})`,
              textAlign: 'center',
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#FF0000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 20px rgba(255,0,0,0.3)',
                transform: `scale(${1 + Math.sin(frame * 0.1) * 0.05})`,
              }}>
                <div style={{
                  width: 0,
                  height: 0,
                  borderLeft: '22px solid white',
                  borderTop: '14px solid transparent',
                  borderBottom: '14px solid transparent',
                  marginLeft: 6,
                }} />
              </div>
              <div style={{
                fontSize: 20,
                color: 'white',
                fontFamily: BRAND.fonts.primary,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}>
                Subscribe
              </div>
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Two recommended video placeholders */}
      <Sequence from={30} durationInFrames={420}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
          <div style={{
            display: 'flex',
            gap: 40,
            opacity: fadeIn(frame, 30, 20),
          }}>
            {[0, 1].map((i) => (
              <GlassPanel key={i} width={400} delay={30 + i * 15} padding="0" style={{ height: 225, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '18px solid white',
                    borderTop: '11px solid transparent',
                    borderBottom: '11px solid transparent',
                    marginLeft: 4,
                    opacity: 0.7,
                  }} />
                </div>
              </GlassPanel>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Quotely watermark */}
      <Sequence from={50} durationInFrames={400}>
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 40 }}>
          <div style={{
            opacity: fadeIn(frame, 50, 20) * 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: BRAND.colors.primary,
              fontFamily: BRAND.fonts.primary,
            }}>
              Q
            </div>
            <div style={{
              fontSize: 18,
              color: BRAND.colors.textSecondary,
              fontFamily: BRAND.fonts.primary,
            }}>
              Quotely
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* "See you in the next one" */}
      <Sequence from={200} durationInFrames={250}>
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 120 }}>
          <div style={{
            opacity: fadeIn(frame, 200, 20),
            fontSize: 24,
            color: BRAND.colors.textSecondary,
            fontFamily: BRAND.fonts.primary,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            See you in the next one
          </div>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
