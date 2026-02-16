import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../../data/brand';

interface NotificationToastProps {
  message: string;
  icon?: string;
  appearFrame: number;
  duration?: number;
  color?: string;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  icon = '🔔',
  appearFrame,
  duration = 90,
  color = BRAND.colors.success,
}) => {
  const frame = useCurrentFrame();

  const slideIn = interpolate(
    frame,
    [appearFrame, appearFrame + 15],
    [120, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) }
  );

  const fadeOut = interpolate(
    frame,
    [appearFrame + duration - 15, appearFrame + duration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = interpolate(
    frame,
    [appearFrame, appearFrame + 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) * fadeOut;

  if (frame < appearFrame || frame > appearFrame + duration) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(17, 17, 40, 0.95)',
        border: `1px solid ${color}44`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 10,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transform: `translateX(${slideIn}px)`,
        opacity,
        zIndex: 100,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: 14,
          color: BRAND.colors.text,
          fontWeight: 500,
        }}
      >
        {message}
      </span>
    </div>
  );
};
