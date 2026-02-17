import React, { useState, useEffect } from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { BRAND } from '../data/brand';
import { DEMO_SCENE_TIMING, DEMO_TOTAL_FRAMES } from '../data/demoTiming';
import { Demo01_LeadUpload } from '../scenes/Demo01_LeadUpload';
import { Demo02_QuoteProcessing } from '../scenes/Demo02_QuoteProcessing';
import { Demo03_CRMView } from '../scenes/Demo03_CRMView';
import { Demo04_Communications } from '../scenes/Demo04_Communications';
import { Demo05_ResponseDashboard } from '../scenes/Demo05_ResponseDashboard';
import { Demo06_FollowUpQueue } from '../scenes/Demo06_FollowUpQueue';
import { Demo07_ResultsSummary } from '../scenes/Demo07_ResultsSummary';
import { Cutaway01_ManualQuoting } from '../scenes/Cutaway01_ManualQuoting';
import { Cutaway02_SpeedToLead } from '../scenes/Cutaway02_SpeedToLead';
import { AvatarOverlay } from '../components/AvatarOverlay';

const scenes = [
  { id: 'demo01', component: Demo01_LeadUpload, timing: DEMO_SCENE_TIMING.demo01, audio: 'audio/demo01_upload.mp3' },
  { id: 'cutaway01', component: Cutaway01_ManualQuoting, timing: DEMO_SCENE_TIMING.cutaway01, audio: 'audio/cutaway01_manual.mp3' },
  { id: 'demo02', component: Demo02_QuoteProcessing, timing: DEMO_SCENE_TIMING.demo02, audio: 'audio/demo02_processing.mp3' },
  { id: 'demo03', component: Demo03_CRMView, timing: DEMO_SCENE_TIMING.demo03, audio: 'audio/demo03_crm.mp3' },
  { id: 'cutaway02', component: Cutaway02_SpeedToLead, timing: DEMO_SCENE_TIMING.cutaway02, audio: 'audio/cutaway02_speed.mp3' },
  { id: 'demo04', component: Demo04_Communications, timing: DEMO_SCENE_TIMING.demo04, audio: 'audio/demo04_comms.mp3' },
  { id: 'demo05', component: Demo05_ResponseDashboard, timing: DEMO_SCENE_TIMING.demo05, audio: 'audio/demo05_responses.mp3' },
  { id: 'demo06', component: Demo06_FollowUpQueue, timing: DEMO_SCENE_TIMING.demo06, audio: 'audio/demo06_followup.mp3' },
  { id: 'demo07', component: Demo07_ResultsSummary, timing: DEMO_SCENE_TIMING.demo07, audio: 'audio/demo07_summary.mp3' },
] as const;

export const LeadProcessingDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      {/* Background music — plays for entire video at low volume */}
      <AudioSafe src="audio/bg_music.mp3" volume={0.12} />

      {/* Narration audio sequences */}
      {scenes.map(({ id, timing, audio }) =>
        audio ? (
          <Sequence key={`audio-${id}`} from={timing.start} durationInFrames={timing.duration}>
            <AudioSafe src={audio} volume={0.9} />
          </Sequence>
        ) : null
      )}

      {/* Glitch SFX at cutaway transitions */}
      <Sequence from={DEMO_SCENE_TIMING.cutaway01.start} durationInFrames={15}>
        <AudioSafe src="audio/sfx_glitch.mp3" volume={0.35} />
      </Sequence>
      <Sequence from={DEMO_SCENE_TIMING.cutaway01.start + DEMO_SCENE_TIMING.cutaway01.duration - 8} durationInFrames={15}>
        <AudioSafe src="audio/sfx_whoosh.mp3" volume={0.3} />
      </Sequence>
      <Sequence from={DEMO_SCENE_TIMING.cutaway02.start} durationInFrames={15}>
        <AudioSafe src="audio/sfx_glitch.mp3" volume={0.35} />
      </Sequence>
      <Sequence from={DEMO_SCENE_TIMING.cutaway02.start + DEMO_SCENE_TIMING.cutaway02.duration - 8} durationInFrames={15}>
        <AudioSafe src="audio/sfx_whoosh.mp3" volume={0.3} />
      </Sequence>

      {/* Notification ding in Demo05 when Maria Johnson alert appears */}
      <Sequence from={DEMO_SCENE_TIMING.demo05.start + 450} durationInFrames={30}>
        <AudioSafe src="audio/sfx_ding.mp3" volume={0.4} />
      </Sequence>

      {/* Scene sequences */}
      {scenes.map(({ id, component: Component, timing }) => (
        <Sequence key={`scene-${id}`} from={timing.start} durationInFrames={timing.duration}>
          <Component durationInFrames={timing.duration} />
        </Sequence>
      ))}

      {/* AI Avatar presenter — visible during demo scenes (not cutaways) */}
      <AvatarOverlay
        videoSrc="greeting.mp4"
        imageSrc="presenter.png"
        showFrom={30}
        showUntil={DEMO_TOTAL_FRAMES - 30}
        durationInFrames={DEMO_TOTAL_FRAMES}
      />
    </AbsoluteFill>
  );
};

/**
 * Audio component that gracefully handles missing audio files.
 * Checks if the file exists via a HEAD request before rendering.
 */
const AudioSafe: React.FC<{ src: string; volume?: number }> = ({ src, volume = 1 }) => {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const url = staticFile(src);
    fetch(url, { method: 'HEAD' })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [src]);

  if (!exists) return null;

  return <Audio src={staticFile(src)} volume={volume} />;
};
