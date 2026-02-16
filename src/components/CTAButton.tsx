import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, pulse, glowPulse } from '../utils/animations';

interface CTAButtonProps {
  text?: string;
  url?: string;
  delay?: number;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text = 'Book a Demo',
  url = 'tryquotely.com',
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = fadeIn(frame, delay, 20);
  const scale = pulse(frame - delay, 0.1);
  const glowIntensity = glowPulse(frame - delay, 0.08);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: BRAND.colors.accent,
          color: BRAND.colors.background,
          padding: '24px 64px',
          borderRadius: 12,
          fontFamily: BRAND.fonts.primary,
          fontSize: 42,
          fontWeight: 700,
          transform: `scale(${scale})`,
          boxShadow: `0 0 ${30 + glowIntensity * 30}px ${BRAND.colors.accent}`,
          cursor: 'pointer',
        }}
      >
        {text}
      </div>

      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: 28,
          color: BRAND.colors.textSecondary,
          letterSpacing: 1,
        }}
      >
        {url}
      </div>
    </div>
  );
};
