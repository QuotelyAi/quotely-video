import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, interpolate, getStaticFiles } from 'remotion';

interface VideoBackgroundProps {
  videoSrc?: string;
  imageSrc?: string;
  kenBurns?: boolean;
  opacity?: number;
  durationInFrames: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  imageSrc,
  kenBurns = true,
  opacity = 1,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const fadeInOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOutOpacity = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const combinedOpacity = Math.min(fadeInOpacity, fadeOutOpacity) * opacity;

  // Ken Burns: slow zoom from 1.0 to 1.15 over the scene duration
  const kenBurnsScale = kenBurns
    ? interpolate(frame, [0, durationInFrames], [1, 1.15], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transform: `scale(${kenBurnsScale})`,
  };

  // Check if video file exists in the public directory
  let videoExists = false;
  if (videoSrc) {
    try {
      const files = getStaticFiles();
      videoExists = files.some((f) => f.name === `videos/${videoSrc}`);
    } catch {
      videoExists = false;
    }
  }

  const useVideo = videoSrc && videoExists;

  return (
    <AbsoluteFill style={{ opacity: combinedOpacity }}>
      {useVideo && (
        <OffthreadVideo
          src={staticFile(`videos/${videoSrc}`)}
          style={mediaStyle}
          muted
        />
      )}
      {!useVideo && imageSrc && (
        <Img
          src={staticFile(`images/${imageSrc}`)}
          style={mediaStyle}
        />
      )}
    </AbsoluteFill>
  );
};
