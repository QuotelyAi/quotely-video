import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BRAND, CROSS_FADE } from '../data/brand';
import { VideoBackground } from './VideoBackground';
import { CinematicOverlay } from './CinematicOverlay';
import { AvatarOverlay } from './AvatarOverlay';
import { SubtitleOverlay } from './SubtitleOverlay';
import { ParticleOverlay } from './ParticleOverlay';
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
  crossFade?: number;
  particles?: boolean;
  particleCount?: number;
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
  crossFade = CROSS_FADE,
  particles = true,
  particleCount = 25,
}) => {
  const frame = useCurrentFrame();

  const enterOpacity = interpolate(frame, [0, crossFade], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [durationInFrames - crossFade, durationInFrames], [1, 0], {
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

      {/* Layer 3: Particle overlay */}
      {particles && (
        <ParticleOverlay
          count={particleCount}
          color={`${BRAND.colors.primary}30`}
          opacity={0.3}
          speed={0.3}
        />
      )}

      {/* Layer 4: Content */}
      <AbsoluteFill>
        {children}
      </AbsoluteFill>

      {/* Layer 5: Film grain */}
      <AbsoluteFill
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 6: Avatar */}
      {showAvatar && avatarConfig && (
        <AvatarOverlay
          videoSrc={avatarConfig.clip}
          showFrom={avatarConfig.showFrom}
          showUntil={avatarConfig.showUntil}
          durationInFrames={durationInFrames}
        />
      )}

      {/* Layer 7: Subtitles */}
      <SubtitleOverlay subtitles={subtitles} />
    </AbsoluteFill>
  );
};
