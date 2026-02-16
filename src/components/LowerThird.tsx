import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromLeft } from '../utils/animations';

interface LowerThirdProps {
  title: string;
  subtitle?: string;
  delay?: number;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  title,
  subtitle,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = fadeIn(frame, delay, 20);
  const translateX = slideInFromLeft(frame, delay, 30);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 60,
        display: 'flex',
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          width: 6,
          backgroundColor: BRAND.colors.accent,
          marginRight: 16,
        }}
      />
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '16px 32px',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 36,
            fontWeight: 700,
            color: BRAND.colors.text,
            marginBottom: subtitle ? 4 : 0,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 24,
              color: BRAND.colors.textSecondary,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
