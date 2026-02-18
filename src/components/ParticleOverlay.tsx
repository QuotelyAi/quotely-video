import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

interface ParticleOverlayProps {
  count?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  sizeRange?: [number, number];
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export const ParticleOverlay: React.FC<ParticleOverlayProps> = ({
  count = 30,
  speed = 0.3,
  color = "rgba(255,255,255,0.15)",
  opacity = 1,
  sizeRange = [2, 6],
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = Array.from({ length: count }, (_, i) => {
    const seed = pseudoRandom(i);
    const seed2 = pseudoRandom(i + 100);
    const seed3 = pseudoRandom(i + 200);
    const seed4 = pseudoRandom(i + 300);

    const size = sizeRange[0] + seed3 * (sizeRange[1] - sizeRange[0]);
    const startX = seed * width;
    const startY = seed2 * height;

    const driftX = (seed3 - 0.5) * speed * 2;
    const driftY = -speed * (0.5 + seed4 * 0.5);

    const x = ((startX + frame * driftX) % width + width) % width;
    const y = ((startY + frame * driftY) % height + height) % height;

    const flickerOpacity = 0.4 + Math.sin(frame * 0.03 + i * 1.7) * 0.3;

    return { x, y, size, flickerOpacity };
  });

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            opacity: p.flickerOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
