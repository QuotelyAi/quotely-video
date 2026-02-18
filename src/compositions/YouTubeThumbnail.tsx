import { AbsoluteFill } from 'remotion';
import { BRAND } from '../data/brand';

export const YouTubeThumbnail: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, #0f172a 0%, #020617 60%, ${BRAND.colors.primary}22 100%)`,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 80,
    }}>
      {/* Gold accent bar at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        background: `linear-gradient(90deg, transparent, ${BRAND.colors.primary}, transparent)`,
      }} />

      {/* Q mark — top left */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 50,
        fontSize: 80,
        fontWeight: 'bold',
        fontFamily: BRAND.fonts.headline,
        color: BRAND.colors.primary,
        textShadow: `0 0 40px ${BRAND.colors.primary}66`,
      }}>
        Q
      </div>

      {/* Main text */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{
          fontSize: 96,
          fontWeight: 'bold',
          fontFamily: BRAND.fonts.headline,
          color: 'white',
          lineHeight: 1.1,
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          marginBottom: 24,
        }}>
          Run Your Agency
          <br />
          <span style={{ color: BRAND.colors.primary }}>with AI</span>
        </div>
        <div style={{
          fontSize: 36,
          fontFamily: BRAND.fonts.primary,
          color: BRAND.colors.textSecondary,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}>
          The Complete Guide
        </div>
      </div>

      {/* Stat badge — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        right: 50,
        backgroundColor: BRAND.colors.primary,
        color: BRAND.colors.background,
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: BRAND.fonts.mono,
        padding: '12px 28px',
        borderRadius: 8,
        boxShadow: `0 4px 20px ${BRAND.colors.primary}66`,
      }}>
        85% FASTER
      </div>

      {/* Decorative glow */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${BRAND.colors.primary}15 0%, transparent 70%)`,
        right: -100,
        bottom: -200,
      }} />
    </AbsoluteFill>
  );
};
