import { BRAND } from '../data/brand';

interface GlassPanelProps {
  children: React.ReactNode;
  width?: number | string;
  delay?: number;
  padding?: number | string;
  borderColor?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  width = 800,
  delay: _delay,
  padding = '40px 48px',
  borderColor = BRAND.colors.primary,
  glowColor,
  style,
}) => {
  void _delay; // kept for backward-compatible call-sites
  const glow = glowColor || borderColor;

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
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${glow}22`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
