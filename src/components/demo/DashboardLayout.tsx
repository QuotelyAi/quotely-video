import React from 'react';
import { useCurrentFrame } from 'remotion';
import { BRAND } from '../../data/brand';
import { fadeIn } from '../../utils/animations';

interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNav?: string;
  headerTitle?: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '👥', label: 'Leads' },
  { icon: '💰', label: 'Quotes' },
  { icon: '📋', label: 'Policies' },
  { icon: '📧', label: 'Communications' },
  { icon: '📈', label: 'Analytics' },
  { icon: '⚙️', label: 'Settings' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeNav = 'Dashboard',
  headerTitle = 'Dashboard',
}) => {
  const frame = useCurrentFrame();
  const sidebarOpacity = fadeIn(frame, 0, 15);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#0c0c1d',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          backgroundColor: '#111128',
          borderRight: '1px solid #1e1e3a',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 0',
          opacity: sidebarOpacity,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '0 20px 24px',
            borderBottom: '1px solid #1e1e3a',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 22,
              fontWeight: 700,
              color: BRAND.colors.primary,
              letterSpacing: 1,
            }}
          >
            Quotely
          </span>
        </div>
        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
          const isActive = item.label === activeNav;
          return (
            <div
              key={item.label}
              style={{
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: isActive ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                borderLeft: isActive ? `3px solid ${BRAND.colors.primary}` : '3px solid transparent',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: 14,
                  color: isActive ? BRAND.colors.primary : BRAND.colors.textSecondary,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            height: 56,
            backgroundColor: '#111128',
            borderBottom: '1px solid #1e1e3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 18,
              fontWeight: 600,
              color: BRAND.colors.text,
            }}
          >
            {headerTitle}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: BRAND.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#000',
              }}
            >
              JD
            </div>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: 32, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
