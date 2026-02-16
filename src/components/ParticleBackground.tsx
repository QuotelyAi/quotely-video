import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';

interface ParticleBackgroundProps {
  count?: number;
  color?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 30,
  color = `${BRAND.colors.primary}40`,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, index) => {
    const x = ((index * 137.5) % BRAND.video.width);
    const y = ((index * 251.3) % BRAND.video.height);
    const size = 2 + ((index * 17) % 4);
    const speed = 0.5 + ((index * 13) % 1);

    const currentY = (y + frame * speed) % (BRAND.video.height + 50);

    return { x, y: currentY, size };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
