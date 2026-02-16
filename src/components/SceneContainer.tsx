import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../data/brand';
import { VideoBackground } from './VideoBackground';
import { CinematicOverlay } from './CinematicOverlay';
import { AvatarOverlay } from './AvatarOverlay';
import { SubtitleOverlay } from './SubtitleOverlay';
import { SUBTITLES } from '../utils/subtitles';
import { AVATAR_SCHEDULE } from '../data/avatarSchedule';
import type { SubtitleEntry } from '../types';

type OverlayMode = 'vignette' | 'gradient-bottom' | 'gradient-left' | 'uniform';

interface SceneContainerProps {
  sceneId: string;
  children: React.ReactNode;
  durationInFrames: number;
  backgroundVideo?: string;
  backgroundImage?: string;
  overlayMode?: OverlayMode;
  overlayIntensity?: number;
  showAvatar?: boolean;
  avatarSrc?: string;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  sceneId,
  children,
  durationInFrames,
  backgroundVideo,
  backgroundImage,
  overlayMode = 'vignette',
  overlayIntensity = 0.5,
  showAvatar = true,
  avatarSrc,
}) => {
  const frame = useCurrentFrame();

  const enterOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(enterOpacity, exitOpacity);

  const subtitles: SubtitleEntry[] = SUBTITLES[sceneId] || [];
  const avatarConfig = AVATAR_SCHEDULE[sceneId];

  const hasBackground = backgroundVideo || backgroundImage;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Layer 1: Background */}
      {hasBackground ? (
        <VideoBackground
          videoSrc={backgroundVideo}
          imageSrc={backgroundImage}
          durationInFrames={durationInFrames}
          kenBurns={!backgroundVideo}
        />
      ) : (
        <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }} />
      )}

      {/* Layer 2: Cinematic overlay */}
      {hasBackground && (
        <CinematicOverlay mode={overlayMode} intensity={overlayIntensity} />
      )}

      {/* Layer 3: Content */}
      <AbsoluteFill>
        {children}
      </AbsoluteFill>

      {/* Layer 4: Avatar */}
      {showAvatar && avatarConfig && (
        <AvatarOverlay
          videoSrc={avatarConfig.clip}
          showFrom={avatarConfig.showFrom}
          showUntil={avatarConfig.showUntil}
          durationInFrames={durationInFrames}
        />
      )}

      {/* Layer 5: Subtitles */}
      <SubtitleOverlay subtitles={subtitles} />
    </AbsoluteFill>
  );
};
