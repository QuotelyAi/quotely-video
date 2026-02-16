import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../../data/brand';
import { fadeIn } from '../../utils/animations';

interface Column {
  key: string;
  label: string;
  width?: number | string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, string | number>[];
  delay?: number;
  scrollStartFrame?: number;
  scrollEndFrame?: number;
  visibleRows?: number;
}

const STATUS_COLORS: Record<string, string> = {
  Quoted: '#22C55E',
  New: '#3B82F6',
  Contacted: '#F59E0B',
  Responded: '#A855F7',
};

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  delay = 0,
  scrollStartFrame = 200,
  scrollEndFrame = 500,
  visibleRows = 12,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, 20);

  // Scroll offset animation
  const rowHeight = 44;
  const maxScroll = Math.max(0, (rows.length - visibleRows) * rowHeight);
  const scrollOffset = interpolate(
    frame,
    [scrollStartFrame, scrollEndFrame],
    [0, maxScroll],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'rgba(17, 17, 40, 0.6)',
        borderRadius: 12,
        border: '1px solid #1e1e3a',
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #1e1e3a',
          backgroundColor: 'rgba(17, 17, 40, 0.9)',
        }}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            style={{
              flex: col.width ? `0 0 ${typeof col.width === 'number' ? `${col.width}px` : col.width}` : 1,
              padding: '12px 16px',
              fontFamily: BRAND.fonts.primary,
              fontSize: 12,
              fontWeight: 600,
              color: BRAND.colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
            }}
          >
            {col.label}
          </div>
        ))}
      </div>
      {/* Body */}
      <div style={{ height: visibleRows * rowHeight, overflow: 'hidden' }}>
        <div style={{ transform: `translateY(-${scrollOffset}px)` }}>
          {rows.map((row, i) => {
            const rowOpacity = fadeIn(frame, delay + i * 2, 10);
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  height: rowHeight,
                  alignItems: 'center',
                  borderBottom: '1px solid #1e1e3a22',
                  opacity: rowOpacity,
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                }}
              >
                {columns.map((col) => {
                  const cellValue = row[col.key];
                  const isStatus = col.key === 'status';
                  const statusColor = isStatus ? STATUS_COLORS[String(cellValue)] || '#9CA3AF' : undefined;

                  return (
                    <div
                      key={col.key}
                      style={{
                        flex: col.width ? `0 0 ${typeof col.width === 'number' ? `${col.width}px` : col.width}` : 1,
                        padding: '0 16px',
                        fontFamily: BRAND.fonts.primary,
                        fontSize: 13,
                        color: BRAND.colors.text,
                      }}
                    >
                      {isStatus ? (
                        <span
                          style={{
                            backgroundColor: `${statusColor}22`,
                            color: statusColor,
                            padding: '3px 10px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {cellValue}
                        </span>
                      ) : (
                        String(cellValue)
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
