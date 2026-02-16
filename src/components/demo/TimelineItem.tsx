import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BRAND } from '../../data/brand';
import { fadeIn, slideInFromLeft } from '../../utils/animations';

interface TimelineItemProps {
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  delay?: number;
  color?: string;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  delay = 0,
  color = BRAND.colors.success,
  isLast = false,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, 15);
  const slideX = slideInFromLeft(frame, delay, 20);

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      {/* Timeline line + icon */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: `${color}22`,
            border: `2px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          {icon}
        </div>
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              backgroundColor: '#1e1e3a',
              minHeight: 20,
            }}
          />
        )}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 24 }}>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 14,
            fontWeight: 600,
            color: BRAND.colors.text,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 12,
            color: BRAND.colors.textSecondary,
            marginBottom: 4,
          }}
        >
          {description}
        </div>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 11,
            color: '#666',
          }}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};
