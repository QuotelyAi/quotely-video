import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, scaleIn } from '../utils/animations';

interface EndScreenProps {
  delay?: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();

  const opacity = fadeIn(frame, delay, 20);
  const scale = scaleIn(frame, delay, 25);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity,
      }}
    >
      {/* Recommended Videos */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          position: 'absolute',
          bottom: 160,
          left: 100,
        }}
      >
        {/* Video 1 */}
        <div
          style={{
            width: 360,
            height: 200,
            backgroundColor: BRAND.colors.backgroundSecondary,
            border: `3px solid ${BRAND.colors.border}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale})`,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                borderLeft: `32px solid ${BRAND.colors.background}`,
                marginLeft: 8,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              fontFamily: BRAND.fonts.primary,
              fontSize: 16,
              color: BRAND.colors.textSecondary,
            }}
          >
            Recommended
          </div>
        </div>

        {/* Video 2 */}
        <div
          style={{
            width: 360,
            height: 200,
            backgroundColor: BRAND.colors.backgroundSecondary,
            border: `3px solid ${BRAND.colors.border}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale})`,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                borderLeft: `32px solid ${BRAND.colors.background}`,
                marginLeft: 8,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              fontFamily: BRAND.fonts.primary,
              fontSize: 16,
              color: BRAND.colors.textSecondary,
            }}
          >
            Recommended
          </div>
        </div>
      </div>

      {/* Subscribe Button */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          right: 240,
          width: 140,
          height: 140,
          borderRadius: '50%',
          backgroundColor: BRAND.colors.danger,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale})`,
          border: `4px solid ${BRAND.colors.text}`,
        }}
      >
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 24,
            fontWeight: 700,
            color: BRAND.colors.text,
          }}
        >
          Subscribe
        </div>
      </div>

      {/* Quotely Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 80,
          opacity: 0.6,
        }}
      >
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 36,
            fontWeight: 900,
            color: BRAND.colors.accent,
            letterSpacing: 2,
          }}
        >
          QUOTELY
        </div>
      </div>
    </div>
  );
};
