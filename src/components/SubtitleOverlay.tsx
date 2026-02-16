import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../data/brand';
import { SubtitleEntry } from '../types';

interface SubtitleOverlayProps {
  subtitles: SubtitleEntry[];
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();

  const currentSubtitle = subtitles.find(
    (sub) => frame >= sub.startFrame && frame <= sub.endFrame
  );

  if (!currentSubtitle) {
    return null;
  }

  const fadeInDuration = 5;
  const fadeOutDuration = 5;
  const framesIntoSubtitle = frame - currentSubtitle.startFrame;
  const framesUntilEnd = currentSubtitle.endFrame - frame;

  const opacity = Math.min(
    interpolate(framesIntoSubtitle, [0, fadeInDuration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    interpolate(framesUntilEnd, [0, fadeOutDuration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 80,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '16px 48px',
          borderRadius: 12,
          border: `1px solid ${BRAND.colors.primary}33`,
          maxWidth: 1100,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 32,
            color: BRAND.colors.text,
            textAlign: 'center',
            fontWeight: 500,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {currentSubtitle.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
