import { useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../data/brand';
import { springIn, fadeIn } from '../utils/animations';

interface LogoAnimationProps {
  delay?: number;
}

export const LogoAnimation: React.FC<LogoAnimationProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();

  const springScale = springIn(frame, BRAND.video.fps, delay);

  const underlineWidth = interpolate(
    frame,
    [delay + 20, delay + 40],
    [0, 200],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const textOpacity = fadeIn(frame, delay + 40, 20);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: 200,
          fontWeight: 900,
          color: BRAND.colors.accent,
          transform: `scale(${springScale})`,
          textShadow: `0 0 40px ${BRAND.colors.accent}`,
        }}
      >
        Q
      </div>

      <div
        style={{
          height: 6,
          width: underlineWidth,
          backgroundColor: BRAND.colors.accent,
          marginTop: -20,
          marginBottom: 20,
        }}
      />

      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: 64,
          fontWeight: 700,
          color: BRAND.colors.text,
          letterSpacing: 8,
          textTransform: 'uppercase',
          opacity: textOpacity,
        }}
      >
        Quotely
      </div>
    </div>
  );
};
