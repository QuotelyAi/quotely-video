import { Sequence, Audio, staticFile } from 'remotion';
import { AbsoluteFill } from 'remotion';
import { SCENE_TIMING } from '../data/brand';
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

export const InsuranceAgencyVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {/* Audio narration for each scene */}
      {AUDIO_MAP.map(({ timing, file }) => (
        <Sequence key={file} from={timing.start} durationInFrames={timing.duration}>
          <Audio src={staticFile(`audio/${file}`)} />
        </Sequence>
      ))}

      {/* Scene sequences */}
      <Sequence from={SCENE_TIMING.scene01.start} durationInFrames={SCENE_TIMING.scene01.duration}>
        <Scene01_Hook durationInFrames={SCENE_TIMING.scene01.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene02.start} durationInFrames={SCENE_TIMING.scene02.duration}>
        <Scene02_Intro durationInFrames={SCENE_TIMING.scene02.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene03.start} durationInFrames={SCENE_TIMING.scene03.duration}>
        <Scene03_Problem durationInFrames={SCENE_TIMING.scene03.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene04.start} durationInFrames={SCENE_TIMING.scene04.duration}>
        <Scene04_Quoting durationInFrames={SCENE_TIMING.scene04.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene05.start} durationInFrames={SCENE_TIMING.scene05.duration}>
        <Scene05_LeadManagement durationInFrames={SCENE_TIMING.scene05.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene06.start} durationInFrames={SCENE_TIMING.scene06.duration}>
        <Scene06_Communication durationInFrames={SCENE_TIMING.scene06.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene07.start} durationInFrames={SCENE_TIMING.scene07.duration}>
        <Scene07_PolicyManagement durationInFrames={SCENE_TIMING.scene07.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene08.start} durationInFrames={SCENE_TIMING.scene08.duration}>
        <Scene08_Claims durationInFrames={SCENE_TIMING.scene08.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene09.start} durationInFrames={SCENE_TIMING.scene09.duration}>
        <Scene09_Marketing durationInFrames={SCENE_TIMING.scene09.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene10.start} durationInFrames={SCENE_TIMING.scene10.duration}>
        <Scene10_Vision durationInFrames={SCENE_TIMING.scene10.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene11.start} durationInFrames={SCENE_TIMING.scene11.duration}>
        <Scene11_CTA durationInFrames={SCENE_TIMING.scene11.duration} />
      </Sequence>

      <Sequence from={SCENE_TIMING.scene12.start} durationInFrames={SCENE_TIMING.scene12.duration}>
        <Scene12_Outro durationInFrames={SCENE_TIMING.scene12.duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
