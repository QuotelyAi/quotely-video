import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BRAND } from '../../data/brand';
import { fadeIn, scaleIn, countUp } from '../../utils/animations';

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  color?: string;
  countDuration?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  suffix = '',
  prefix = '',
  delay = 0,
  color = BRAND.colors.primary,
  countDuration = 45,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, 20);
  const scale = scaleIn(frame, delay, 25);
  const count = countUp(frame, value, delay + 10, countDuration);

  return (
    <div
      style={{
        backgroundColor: 'rgba(17, 17, 40, 0.8)',
        border: `1px solid ${color}33`,
        borderRadius: 12,
        padding: '24px 28px',
        opacity,
        transform: `scale(${scale})`,
        minWidth: 200,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: `${color}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 13,
            color: BRAND.colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: BRAND.fonts.primary,
          fontSize: 36,
          fontWeight: 700,
          color,
        }}
      >
        {prefix}{count}{suffix}
      </div>
    </div>
  );
};
