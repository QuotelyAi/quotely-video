import React from 'react';
import { BRAND } from '../../data/brand';

interface BrowserChromeProps {
  children: React.ReactNode;
  url?: string;
}

export const BrowserChrome: React.FC<BrowserChromeProps> = ({
  children,
  url = 'app.quotely.com',
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #2a2a4a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 44,
          backgroundColor: '#16162a',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
          borderBottom: '1px solid #2a2a4a',
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 8, marginRight: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28ca42' }} />
        </div>
        {/* Address bar */}
        <div
          style={{
            flex: 1,
            height: 28,
            backgroundColor: '#0f0f1e',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill="#666"
            />
          </svg>
          <span
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 13,
              color: '#888',
              letterSpacing: 0.3,
            }}
          >
            https://{url}
          </span>
        </div>
      </div>
      {/* Browser content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};
