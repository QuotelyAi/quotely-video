import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../../data/brand';

interface ProgressBarProps {
  progress: number; // 0-1
  delay?: number;
  duration?: number;
  label?: string;
  height?: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  delay = 0,
  duration = 60,
  label,
  height = 8,
  color = BRAND.colors.primary,
}) => {
  const frame = useCurrentFrame();

  const animatedProgress = interpolate(
    frame,
    [delay, delay + duration],
    [0, progress],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 13,
            color: BRAND.colors.textSecondary,
            marginBottom: 6,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{label}</span>
          <span>{Math.round(animatedProgress * 100)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: height / 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${animatedProgress * 100}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: height / 2,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};
