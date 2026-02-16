import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../../data/brand';
import { fadeIn } from '../../utils/animations';

interface LeadCardProps {
  name: string;
  status: 'New' | 'Processing' | 'Quoted';
  carrier?: string;
  rate?: number;
  delay?: number;
  flipFrame?: number; // frame when status flips from New to Quoted
}

const STATUS_COLORS: Record<string, string> = {
  New: '#3B82F6',
  Processing: '#F59E0B',
  Quoted: '#22C55E',
};

export const LeadCard: React.FC<LeadCardProps> = ({
  name,
  status,
  carrier,
  rate,
  delay = 0,
  flipFrame,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, 15);

  // Determine displayed status based on flip animation
  let displayStatus = status;
  let flipProgress = 1;

  if (flipFrame !== undefined && frame < flipFrame) {
    displayStatus = 'New';
  } else if (flipFrame !== undefined && frame >= flipFrame) {
    displayStatus = 'Quoted';
    flipProgress = interpolate(
      frame,
      [flipFrame, flipFrame + 10],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) }
    );
  }

  const statusColor = STATUS_COLORS[displayStatus] || '#3B82F6';
  const initials = name.split(' ').map((n) => n[0]).join('');

  return (
    <div
      style={{
        backgroundColor: 'rgba(17, 17, 40, 0.7)',
        border: `1px solid #1e1e3a`,
        borderRadius: 10,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity,
        transform: `scale(${flipProgress})`,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: `${statusColor}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: BRAND.fonts.primary,
          fontSize: 12,
          fontWeight: 600,
          color: statusColor,
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 13,
            fontWeight: 500,
            color: BRAND.colors.text,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </div>
        {carrier && rate && (
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 11,
              color: BRAND.colors.textSecondary,
            }}
          >
            {carrier} · ${rate}/mo
          </div>
        )}
      </div>
      {/* Status badge */}
      <div
        style={{
          backgroundColor: `${statusColor}22`,
          color: statusColor,
          padding: '3px 8px',
          borderRadius: 6,
          fontFamily: BRAND.fonts.primary,
          fontSize: 11,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {displayStatus}
      </div>
    </div>
  );
};
