import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn } from '../utils/animations';

interface GlassPanelProps {
  children: React.ReactNode;
  width?: number | string;
  delay?: number;
  padding?: number | string;
  borderColor?: string;
  style?: React.CSSProperties;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  width = 800,
  delay = 0,
  padding = '40px 48px',
  borderColor = BRAND.colors.primary,
  style,
}) => {
  const frame = useCurrentFrame();

  const opacity = fadeIn(frame, delay, 20);
  const scale = scaleIn(frame, delay, 25);

  return (
    <div
      style={{
        width,
        padding,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 16,
        border: `1px solid ${borderColor}44`,
        borderTop: `2px solid ${borderColor}88`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${borderColor}22`,
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
