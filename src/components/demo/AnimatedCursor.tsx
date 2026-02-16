import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface CursorWaypoint {
  x: number;
  y: number;
  frame: number;
  click?: boolean;
}

interface AnimatedCursorProps {
  waypoints: CursorWaypoint[];
  visible?: boolean;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  waypoints,
  visible = true,
}) => {
  const frame = useCurrentFrame();

  if (!visible || waypoints.length === 0) return null;

  // Find current segment
  let x = waypoints[0].x;
  let y = waypoints[0].y;
  let isClicking = false;

  if (frame <= waypoints[0].frame) {
    x = waypoints[0].x;
    y = waypoints[0].y;
  } else if (frame >= waypoints[waypoints.length - 1].frame) {
    x = waypoints[waypoints.length - 1].x;
    y = waypoints[waypoints.length - 1].y;
  } else {
    for (let i = 0; i < waypoints.length - 1; i++) {
      const curr = waypoints[i];
      const next = waypoints[i + 1];
      if (frame >= curr.frame && frame <= next.frame) {
        const progress = interpolate(
          frame,
          [curr.frame, next.frame],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.cubic),
          }
        );
        x = curr.x + (next.x - curr.x) * progress;
        y = curr.y + (next.y - curr.y) * progress;
        break;
      }
    }
  }

  // Check for click animation
  for (const wp of waypoints) {
    if (wp.click && Math.abs(frame - wp.frame) < 8) {
      isClicking = true;
      break;
    }
  }

  const clickScale = isClicking ? 0.85 : 1;
  const clickRingOpacity = isClicking
    ? interpolate(
        frame % 16,
        [0, 8, 16],
        [0.6, 0, 0],
        { extrapolateRight: 'clamp' }
      )
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: `scale(${clickScale})`,
        transition: 'transform 0.05s',
      }}
    >
      {/* Click ring */}
      {isClicking && (
        <div
          style={{
            position: 'absolute',
            left: -15,
            top: -15,
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: `2px solid ${isClicking ? '#FFD700' : 'transparent'}`,
            opacity: clickRingOpacity,
          }}
        />
      )}
      {/* Cursor SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
      >
        <path
          d="M5 3l14 8-6 2-4 6z"
          fill="white"
          stroke="#333"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
