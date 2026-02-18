import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

interface CinematicBackgroundProps {
  image?: string;
  video?: string;
  fallbackGradient?: string;
  overlayOpacity?: number;
  zoomSpeed?: number;
  panDirection?: "left" | "right" | "up" | "down";
  children?: React.ReactNode;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  image,
  video,
  fallbackGradient = "linear-gradient(180deg, #0f172a 0%, #1a0a0a 100%)",
  overlayOpacity = 0.6,
  zoomSpeed = 0.08,
  panDirection = "left",
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1 + zoomSpeed], {
    extrapolateRight: "clamp",
  });

  const panAmount = interpolate(frame, [0, durationInFrames], [0, 2], {
    extrapolateRight: "clamp",
  });

  const panTransform = {
    left: `translateX(-${panAmount}%)`,
    right: `translateX(${panAmount}%)`,
    up: `translateY(-${panAmount}%)`,
    down: `translateY(${panAmount}%)`,
  }[panDirection];

  const hasImage = image && image.trim() !== "";
  const hasVideo = video && video.trim() !== "";

  return (
    <AbsoluteFill>
      {hasVideo ? (
        <AbsoluteFill style={{ transform: `scale(${scale}) ${panTransform}` }}>
          <OffthreadVideo
            src={staticFile(video)}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      ) : hasImage ? (
        <AbsoluteFill style={{ transform: `scale(${scale}) ${panTransform}` }}>
          <Img
            src={staticFile(image)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ background: fallbackGradient }} />
      )}

      <AbsoluteFill style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />

      {children}
    </AbsoluteFill>
  );
};
