import { AbsoluteFill } from 'remotion';

type OverlayMode = 'vignette' | 'gradient-bottom' | 'gradient-left' | 'uniform';

interface CinematicOverlayProps {
  mode?: OverlayMode;
  intensity?: number;
}

const getBackground = (mode: OverlayMode, intensity: number): string => {
  const alpha = Math.round(intensity * 255).toString(16).padStart(2, '0');
  const darkColor = `#0F172A${alpha}`;

  switch (mode) {
    case 'vignette':
      return `radial-gradient(ellipse at center, transparent 30%, ${darkColor} 100%)`;
    case 'gradient-bottom':
      return `linear-gradient(to bottom, transparent 20%, ${darkColor} 80%)`;
    case 'gradient-left':
      return `linear-gradient(to right, ${darkColor} 0%, transparent 50%, ${darkColor} 100%)`;
    case 'uniform':
      return darkColor;
    default:
      return `radial-gradient(ellipse at center, transparent 30%, ${darkColor} 100%)`;
  }
};

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  mode = 'vignette',
  intensity = 0.5,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: getBackground(mode, intensity),
        pointerEvents: 'none',
      }}
    />
  );
};
