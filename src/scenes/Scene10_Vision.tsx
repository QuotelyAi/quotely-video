import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence, interpolate, Easing } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromBottom, springSlam, springBouncy, countUp } from '../utils/animations';
import { SceneContainer } from '../components/SceneContainer';
import { GlassPanel } from '../components/GlassPanel';
import { ImpactHit, SuccessChime } from '../audio/SFX';
import type { SceneProps } from '../types';

const features = [
  { label: 'AI Quoting', icon: '⚡' },
  { label: 'Lead Management', icon: '🎯' },
  { label: '24/7 Communication', icon: '💬' },
  { label: 'Policy Management', icon: '📋' },
  { label: 'Claims Processing', icon: '✅' },
  { label: 'AI Marketing', icon: '📈' },
];

const metrics = [
  { label: 'Faster Quotes', value: 85, suffix: '%' },
  { label: 'More Conversions', value: 45, suffix: '%' },
  { label: 'Client Satisfaction', value: 92, suffix: '%' },
  { label: 'Less Admin Time', value: 73, suffix: '%' },
];

export const Scene10_Vision: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneContainer
      sceneId="scene10"
      durationInFrames={durationInFrames}
      backgroundVideo="scene10_growth.mp4"
      backgroundImage="scenes/scene10.png"
      overlayMode="vignette"
      overlayIntensity={0.45}
    >
      {/* SFX */}
      <ImpactHit at={10} volume={0.6} />
      <SuccessChime at={700} volume={0.4} />

      {/* "This is happening NOW" */}
      <Sequence from={10} durationInFrames={200}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            opacity: springSlam(frame, fps, 10),
            transform: `scale(${springSlam(frame, fps, 10)})`,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 72, fontWeight: 'bold', color: 'white',
              fontFamily: BRAND.fonts.headline,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}>
              This Is Happening{' '}
              <span style={{ color: BRAND.colors.primary }}>Now</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Feature montage */}
      <Sequence from={250} durationInFrames={450}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 20, maxWidth: 1200, padding: '0 60px',
          }}>
            {features.map((feature, i) => {
              const delay = 250 + i * 15;
              return (
                <GlassPanel key={i} width={340} padding="24px">
                  <div style={{
                    textAlign: 'center',
                    opacity: springBouncy(frame, fps, delay),
                    transform: `scale(${springBouncy(frame, fps, delay)})`,
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>{feature.icon}</div>
                    <div style={{
                      fontSize: 22, fontWeight: 600, color: 'white',
                      fontFamily: BRAND.fonts.primary,
                    }}>
                      {feature.label}
                    </div>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Growth metrics row */}
      <Sequence from={700} durationInFrames={550}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GlassPanel width={1200} padding="40px 60px">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{
                fontSize: 48, fontWeight: 'bold', color: 'white',
                fontFamily: BRAND.fonts.headline,
                opacity: fadeIn(frame, 700, 20),
              }}>
                The Results Speak for Themselves
              </div>
            </div>
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center' }}>
              {metrics.map((metric, i) => {
                const delay = 750 + i * 20;
                return (
                  <div key={i} style={{
                    textAlign: 'center',
                    opacity: fadeIn(frame, delay, 15),
                    transform: `translateY(${slideInFromBottom(frame, delay, 20)}px)`,
                  }}>
                    <div style={{
                      fontSize: 72, fontWeight: 'bold',
                      color: BRAND.colors.primary,
                      fontFamily: BRAND.fonts.mono,
                      textShadow: `0 0 30px ${BRAND.colors.primary}44`,
                      letterSpacing: -2,
                    }}>
                      {countUp(frame, metric.value, delay, 40)}{metric.suffix}
                    </div>
                    <div style={{
                      fontSize: 20, color: BRAND.colors.textSecondary,
                      fontFamily: BRAND.fonts.primary, marginTop: 8,
                    }}>
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </AbsoluteFill>
      </Sequence>

      {/* Rising graph line */}
      <Sequence from={900} durationInFrames={450}>
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 160 }}>
          <svg width={1400} height={200} style={{ opacity: fadeIn(frame, 900, 20) }}>
            <defs>
              <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BRAND.colors.primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={BRAND.colors.primary} stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const progress = interpolate(frame, [900, 1200], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              const points = Array.from({ length: 20 }, (_, i) => {
                const x = (i / 19) * 1400;
                const y = 180 - (Math.pow(i / 19, 1.5) * 160 + Math.sin(i * 0.8) * 10);
                return { x, y };
              });
              const visiblePoints = points.slice(0, Math.ceil(progress * points.length));
              if (visiblePoints.length < 2) return null;
              const linePath = visiblePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
              const areaPath = linePath + ` L${visiblePoints[visiblePoints.length - 1].x},200 L${visiblePoints[0].x},200 Z`;
              return (
                <>
                  <path d={areaPath} fill="url(#graphGrad)" />
                  <path d={linePath} fill="none" stroke={BRAND.colors.primary} strokeWidth={3} />
                </>
              );
            })()}
          </svg>
        </AbsoluteFill>
      </Sequence>
    </SceneContainer>
  );
};
