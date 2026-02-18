import { Sequence, Audio, staticFile } from 'remotion';
import { AbsoluteFill } from 'remotion';
import { SCENE_TIMING, CROSS_FADE } from '../data/brand';
import { Scene01_Hook } from '../scenes/Scene01_Hook';
import { Scene02_Intro } from '../scenes/Scene02_Intro';
import { Scene03_Problem } from '../scenes/Scene03_Problem';
import { Scene04_Quoting } from '../scenes/Scene04_Quoting';
import { Scene05_LeadManagement } from '../scenes/Scene05_LeadManagement';
import { Scene06_Communication } from '../scenes/Scene06_Communication';
import { Scene07_PolicyManagement } from '../scenes/Scene07_PolicyManagement';
import { Scene08_Claims } from '../scenes/Scene08_Claims';
import { Scene09_Marketing } from '../scenes/Scene09_Marketing';
import { Scene10_Vision } from '../scenes/Scene10_Vision';
import { Scene11_CTA } from '../scenes/Scene11_CTA';
import { Scene12_Outro } from '../scenes/Scene12_Outro';
import { AmbientPad } from '../audio/SFX';
import { SceneTransitionFlash } from '../components/SceneTransitionFlash';

type TransitionType = 'flash' | 'wipe-left' | 'wipe-right' | 'gold-wash';

// Transition effects at each scene boundary
const TRANSITIONS: { from: number; type: TransitionType }[] = [
  { from: 0, type: 'gold-wash' },   // Scene01→02
  { from: 1, type: 'wipe-left' },   // Scene02→03
  { from: 2, type: 'flash' },       // Scene03→04
  { from: 3, type: 'wipe-right' },  // Scene04→05
  { from: 4, type: 'gold-wash' },   // Scene05→06
  { from: 5, type: 'wipe-left' },   // Scene06→07
  { from: 6, type: 'flash' },       // Scene07→08
  { from: 7, type: 'wipe-right' },  // Scene08→09
  { from: 8, type: 'gold-wash' },   // Scene09→10
  { from: 9, type: 'flash' },       // Scene10→11
  { from: 10, type: 'gold-wash' },  // Scene11→12
];

const AUDIO_MAP = [
  { timing: SCENE_TIMING.scene01, file: 'scene01_hook.mp3' },
  { timing: SCENE_TIMING.scene02, file: 'scene02_intro.mp3' },
  { timing: SCENE_TIMING.scene03, file: 'scene03_problem.mp3' },
  { timing: SCENE_TIMING.scene04, file: 'scene04_quoting.mp3' },
  { timing: SCENE_TIMING.scene05, file: 'scene05_leads.mp3' },
  { timing: SCENE_TIMING.scene06, file: 'scene06_communication.mp3' },
  { timing: SCENE_TIMING.scene07, file: 'scene07_policy.mp3' },
  { timing: SCENE_TIMING.scene08, file: 'scene08_claims.mp3' },
  { timing: SCENE_TIMING.scene09, file: 'scene09_marketing.mp3' },
  { timing: SCENE_TIMING.scene10, file: 'scene10_vision.mp3' },
  { timing: SCENE_TIMING.scene11, file: 'scene11_cta.mp3' },
  { timing: SCENE_TIMING.scene12, file: 'scene12_outro.mp3' },
];

// Overlap adjacent scenes by CROSS_FADE frames for smooth dissolves
const overlap = (sceneIndex: number) => sceneIndex * CROSS_FADE;

const SCENES = [
  { Component: Scene01_Hook, timing: SCENE_TIMING.scene01 },
  { Component: Scene02_Intro, timing: SCENE_TIMING.scene02 },
  { Component: Scene03_Problem, timing: SCENE_TIMING.scene03 },
  { Component: Scene04_Quoting, timing: SCENE_TIMING.scene04 },
  { Component: Scene05_LeadManagement, timing: SCENE_TIMING.scene05 },
  { Component: Scene06_Communication, timing: SCENE_TIMING.scene06 },
  { Component: Scene07_PolicyManagement, timing: SCENE_TIMING.scene07 },
  { Component: Scene08_Claims, timing: SCENE_TIMING.scene08 },
  { Component: Scene09_Marketing, timing: SCENE_TIMING.scene09 },
  { Component: Scene10_Vision, timing: SCENE_TIMING.scene10 },
  { Component: Scene11_CTA, timing: SCENE_TIMING.scene11 },
  { Component: Scene12_Outro, timing: SCENE_TIMING.scene12 },
];

export const InsuranceAgencyVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {/* Ambient pad — full video duration */}
      <AmbientPad durationInFrames={18000} volume={0.12} />

      {/* Audio narration for each scene */}
      {AUDIO_MAP.map(({ timing, file }) => (
        <Sequence key={file} from={timing.start} durationInFrames={timing.duration}>
          <Audio src={staticFile(`audio/${file}`)} />
        </Sequence>
      ))}

      {/* Scene sequences with cross-fade overlap */}
      {SCENES.map(({ Component, timing }, i) => (
        <Sequence
          key={i}
          from={timing.start - overlap(i)}
          durationInFrames={timing.duration + CROSS_FADE}
        >
          <Component durationInFrames={timing.duration + CROSS_FADE} />
        </Sequence>
      ))}
      {/* Transition effects at scene boundaries */}
      {TRANSITIONS.map(({ from: fromIdx, type }) => {
        const sceneTiming = SCENES[fromIdx].timing;
        const transitionStart = sceneTiming.start + sceneTiming.duration - CROSS_FADE - overlap(fromIdx);
        return (
          <Sequence
            key={`transition-${fromIdx}`}
            from={transitionStart}
            durationInFrames={CROSS_FADE}
          >
            <SceneTransitionFlash type={type} durationInFrames={CROSS_FADE} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
