import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../../data/brand';

interface SidePanelProps {
  children: React.ReactNode;
  title: string;
  appearFrame: number;
  width?: number;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  children,
  title,
  appearFrame,
  width = 420,
}) => {
  const frame = useCurrentFrame();

  const slideX = interpolate(
    frame,
    [appearFrame, appearFrame + 20],
    [width, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const opacity = interpolate(
    frame,
    [appearFrame, appearFrame + 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  if (frame < appearFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width,
        backgroundColor: 'rgba(17, 17, 40, 0.98)',
        borderLeft: '1px solid #1e1e3a',
        transform: `translateX(${slideX}px)`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        boxShadow: '-8px 0 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1e1e3a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 16,
            fontWeight: 600,
            color: BRAND.colors.text,
          }}
        >
          {title}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            backgroundColor: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            color: BRAND.colors.textSecondary,
          }}
        >
          ✕
        </div>
      </div>
      {/* Panel content */}
      <div style={{ flex: 1, padding: 24, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};
