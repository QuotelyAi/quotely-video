import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { countUp, fadeIn, glowPulse } from '../utils/animations';

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  fontSize?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix,
  label,
  delay = 0,
  fontSize = 96,
}) => {
  const frame = useCurrentFrame();

  const currentValue = countUp(frame, value, delay, 45);
  const opacity = fadeIn(frame, delay, 20);
  const glowIntensity = glowPulse(frame, 0.08);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize,
          fontWeight: 900,
          color: BRAND.colors.accent,
          textShadow: `0 0 ${20 + glowIntensity * 20}px ${BRAND.colors.accent}`,
          marginBottom: 16,
        }}
      >
        {currentValue}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: fontSize * 0.3,
          fontWeight: 500,
          color: BRAND.colors.text,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
};
