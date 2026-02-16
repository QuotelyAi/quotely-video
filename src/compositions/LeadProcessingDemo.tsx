import React, { useState, useEffect } from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile, getRemotionEnvironment } from 'remotion';
import { BRAND } from '../data/brand';
import { DEMO_SCENE_TIMING } from '../data/demoTiming';
import { Demo01_LeadUpload } from '../scenes/Demo01_LeadUpload';
import { Demo02_QuoteProcessing } from '../scenes/Demo02_QuoteProcessing';
import { Demo03_CRMView } from '../scenes/Demo03_CRMView';
import { Demo04_Communications } from '../scenes/Demo04_Communications';
import { Demo05_ResponseDashboard } from '../scenes/Demo05_ResponseDashboard';
import { Demo06_FollowUpQueue } from '../scenes/Demo06_FollowUpQueue';
import { Demo07_ResultsSummary } from '../scenes/Demo07_ResultsSummary';

const scenes = [
  { id: 'demo01', component: Demo01_LeadUpload, timing: DEMO_SCENE_TIMING.demo01, audio: 'audio/demo01_upload.mp3' },
  { id: 'demo02', component: Demo02_QuoteProcessing, timing: DEMO_SCENE_TIMING.demo02, audio: 'audio/demo02_processing.mp3' },
  { id: 'demo03', component: Demo03_CRMView, timing: DEMO_SCENE_TIMING.demo03, audio: 'audio/demo03_crm.mp3' },
  { id: 'demo04', component: Demo04_Communications, timing: DEMO_SCENE_TIMING.demo04, audio: 'audio/demo04_comms.mp3' },
  { id: 'demo05', component: Demo05_ResponseDashboard, timing: DEMO_SCENE_TIMING.demo05, audio: 'audio/demo05_responses.mp3' },
  { id: 'demo06', component: Demo06_FollowUpQueue, timing: DEMO_SCENE_TIMING.demo06, audio: 'audio/demo06_followup.mp3' },
  { id: 'demo07', component: Demo07_ResultsSummary, timing: DEMO_SCENE_TIMING.demo07, audio: 'audio/demo07_summary.mp3' },
] as const;

export const LeadProcessingDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
      {/* Audio sequences — only rendered if audio files exist */}
      {scenes.map(({ id, timing, audio }) => (
        <Sequence key={`audio-${id}`} from={timing.start} durationInFrames={timing.duration}>
          <AudioSafe src={audio} />
        </Sequence>
      ))}

      {/* Scene sequences */}
      {scenes.map(({ id, component: Component, timing }) => (
        <Sequence key={`scene-${id}`} from={timing.start} durationInFrames={timing.duration}>
          <Component durationInFrames={timing.duration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/**
 * Audio component that gracefully handles missing audio files.
 * Checks if the file exists via a HEAD request before rendering.
 */
const AudioSafe: React.FC<{ src: string }> = ({ src }) => {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const url = staticFile(src);
    fetch(url, { method: 'HEAD' })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [src]);

  if (!exists) return null;

  return <Audio src={staticFile(src)} volume={1} />;
};
