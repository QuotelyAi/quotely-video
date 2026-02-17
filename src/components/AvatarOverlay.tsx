import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, interpolate, getStaticFiles } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn } from '../utils/animations';

interface AvatarOverlayProps {
  videoSrc?: string;
  imageSrc?: string;
  showFrom?: number;
  showUntil?: number;
  durationInFrames: number;
}

export const AvatarOverlay: React.FC<AvatarOverlayProps> = ({
  videoSrc,
  imageSrc,
  showFrom = 0,
  showUntil,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const endFrame = showUntil ?? durationInFrames;

  if (frame < showFrom || frame > endFrame) return null;

  // Check if avatar files exist
  let videoExists = false;
  let imageExists = false;
  try {
    const files = getStaticFiles();
    if (videoSrc) {
      videoExists = files.some((f) => f.name === `videos/avatar/${videoSrc}`);
    }
    if (imageSrc) {
      imageExists = files.some((f) => f.name === `videos/avatar/${imageSrc}`);
    }
  } catch {
    // getStaticFiles not available in render context
  }

  const showPlaceholder = !videoExists && !imageExists;

  const enterOpacity = fadeIn(frame, showFrom, 15);
  const exitOpacity = interpolate(
    frame,
    [endFrame - 15, endFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = Math.min(enterOpacity, exitOpacity);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          right: 40,
          bottom: 140,
          width: 300,
          height: 380,
          borderRadius: 16,
          overflow: 'hidden',
          border: `3px solid ${BRAND.colors.primary}`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${BRAND.colors.primary}33`,
          opacity,
        }}
      >
        {videoExists && videoSrc && (
          <OffthreadVideo
            src={staticFile(`videos/avatar/${videoSrc}`)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            muted
          />
        )}
        {!videoExists && imageExists && imageSrc && (
          <Img
            src={staticFile(`videos/avatar/${imageSrc}`)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        {showPlaceholder && (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0a0a1a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: `${BRAND.colors.primary}22`,
                border: `2px solid ${BRAND.colors.primary}44`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 36,
              }}
            >
              <span style={{ color: BRAND.colors.primary }}>Q</span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: BRAND.colors.textSecondary,
                fontFamily: BRAND.fonts.primary,
                textAlign: 'center',
                padding: '0 20px',
              }}
            >
              AI Agent
            </div>
          </div>
        )}
      </div>
      {/* Name label */}
      <div
        style={{
          position: 'absolute',
          right: 40,
          bottom: 108,
          width: 300,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          padding: '6px 12px',
          textAlign: 'center',
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: BRAND.colors.primary,
            fontFamily: BRAND.fonts.primary,
          }}
        >
          Quotely AI
        </div>
        <div
          style={{
            fontSize: 11,
            color: BRAND.colors.textSecondary,
            fontFamily: BRAND.fonts.primary,
          }}
        >
          Powered by Claude
        </div>
      </div>
    </AbsoluteFill>
  );
};
