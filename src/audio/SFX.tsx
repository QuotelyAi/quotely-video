import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";

// Centralized SFX components — drop these into any scene

export const Whoosh: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.6,
}) => (
  <Sequence from={at} durationInFrames={18}>
    <Audio src={staticFile("audio/whoosh.wav")} volume={volume} />
  </Sequence>
);

export const Ding: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.5,
}) => (
  <Sequence from={at} durationInFrames={36}>
    <Audio src={staticFile("audio/ding.wav")} volume={volume} />
  </Sequence>
);

export const Tick: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.3,
}) => (
  <Sequence from={at} durationInFrames={3}>
    <Audio src={staticFile("audio/tick.wav")} volume={volume} />
  </Sequence>
);

export const Tension: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.4,
}) => (
  <Sequence from={at} durationInFrames={15}>
    <Audio src={staticFile("audio/tension.wav")} volume={volume} />
  </Sequence>
);

export const Success: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.5,
}) => (
  <Sequence from={at} durationInFrames={30}>
    <Audio src={staticFile("audio/success.wav")} volume={volume} />
  </Sequence>
);

export const TypeClick: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.2,
}) => (
  <Sequence from={at} durationInFrames={2}>
    <Audio src={staticFile("audio/type-click.wav")} volume={volume} />
  </Sequence>
);

// === Brand Hype SFX (mp3 assets) ===

export const ImpactHit: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.7,
}) => (
  <Sequence from={at} durationInFrames={10}>
    <Audio src={staticFile("audio/impact-hit.mp3")} volume={volume} />
  </Sequence>
);

export const GlitchStatic: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.4,
}) => (
  <Sequence from={at} durationInFrames={20}>
    <Audio src={staticFile("audio/glitch-static.mp3")} volume={volume} />
  </Sequence>
);

export const SyncWhoosh: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.5,
}) => (
  <Sequence from={at} durationInFrames={30}>
    <Audio src={staticFile("audio/sync-whoosh.mp3")} volume={volume} />
  </Sequence>
);

export const DataLoad: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.4,
}) => (
  <Sequence from={at} durationInFrames={30}>
    <Audio src={staticFile("audio/data-load.mp3")} volume={volume} />
  </Sequence>
);

export const DramaticRise: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.5,
}) => (
  <Sequence from={at} durationInFrames={60}>
    <Audio src={staticFile("audio/dramatic-rise.mp3")} volume={volume} />
  </Sequence>
);

export const SuccessChime: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.5,
}) => (
  <Sequence from={at} durationInFrames={40}>
    <Audio src={staticFile("audio/success-chime.mp3")} volume={volume} />
  </Sequence>
);

export const ErrorBuzz: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.35,
}) => (
  <Sequence from={at} durationInFrames={30}>
    <Audio src={staticFile("audio/error-buzz.mp3")} volume={volume} />
  </Sequence>
);

export const ParticlesFlow: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.3,
}) => (
  <Sequence from={at} durationInFrames={60}>
    <Audio src={staticFile("audio/particles-flow.mp3")} volume={volume} />
  </Sequence>
);

export const CounterTick: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.3,
}) => (
  <Sequence from={at} durationInFrames={15}>
    <Audio src={staticFile("audio/counter-tick.mp3")} volume={volume} />
  </Sequence>
);

export const BrandSting: React.FC<{ at?: number; volume?: number }> = ({
  at = 0,
  volume = 0.6,
}) => (
  <Sequence from={at} durationInFrames={150}>
    <Audio src={staticFile("audio/brand-sting.mp3")} volume={volume} />
  </Sequence>
);

// Looping ambient pad — place once, covers entire composition
export const AmbientPad: React.FC<{
  durationInFrames: number;
  volume?: number;
}> = ({ durationInFrames, volume = 0.15 }) => {
  const { fps } = useVideoConfig();
  const loopFrames = 15 * fps; // 15-second loop
  const loops = Math.ceil(durationInFrames / loopFrames);

  return (
    <>
      {Array.from({ length: loops }).map((_, i) => (
        <Sequence key={i} from={i * loopFrames} durationInFrames={loopFrames}>
          <Audio src={staticFile("audio/ambient-pad.wav")} volume={volume} />
        </Sequence>
      ))}
    </>
  );
};
