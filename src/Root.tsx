import { Composition } from 'remotion';
import { InsuranceAgencyVideo } from './compositions/InsuranceAgencyVideo';
import { LeadProcessingDemo } from './compositions/LeadProcessingDemo';
import { Scene01_Hook } from './scenes/Scene01_Hook';
import { Scene02_Intro } from './scenes/Scene02_Intro';
import { Scene03_Problem } from './scenes/Scene03_Problem';
import { Scene04_Quoting } from './scenes/Scene04_Quoting';
import { Scene05_LeadManagement } from './scenes/Scene05_LeadManagement';
import { Scene06_Communication } from './scenes/Scene06_Communication';
import { Scene07_PolicyManagement } from './scenes/Scene07_PolicyManagement';
import { Scene08_Claims } from './scenes/Scene08_Claims';
import { Scene09_Marketing } from './scenes/Scene09_Marketing';
import { Scene10_Vision } from './scenes/Scene10_Vision';
import { Scene11_CTA } from './scenes/Scene11_CTA';
import { Scene12_Outro } from './scenes/Scene12_Outro';
import { Demo01_LeadUpload } from './scenes/Demo01_LeadUpload';
import { Demo02_QuoteProcessing } from './scenes/Demo02_QuoteProcessing';
import { Demo03_CRMView } from './scenes/Demo03_CRMView';
import { Demo04_Communications } from './scenes/Demo04_Communications';
import { Demo05_ResponseDashboard } from './scenes/Demo05_ResponseDashboard';
import { Demo06_FollowUpQueue } from './scenes/Demo06_FollowUpQueue';
import { Demo07_ResultsSummary } from './scenes/Demo07_ResultsSummary';
import { Cutaway01_ManualQuoting } from './scenes/Cutaway01_ManualQuoting';
import { Cutaway02_SpeedToLead } from './scenes/Cutaway02_SpeedToLead';
import { SCENE_TIMING, BRAND } from './data/brand';
import { DEMO_SCENE_TIMING, DEMO_TOTAL_FRAMES } from './data/demoTiming';

const { width, height, fps } = BRAND.video;

const scenes = [
  { id: 'Scene01-Hook', component: Scene01_Hook, timing: SCENE_TIMING.scene01 },
  { id: 'Scene02-Intro', component: Scene02_Intro, timing: SCENE_TIMING.scene02 },
  { id: 'Scene03-Problem', component: Scene03_Problem, timing: SCENE_TIMING.scene03 },
  { id: 'Scene04-Quoting', component: Scene04_Quoting, timing: SCENE_TIMING.scene04 },
  { id: 'Scene05-LeadManagement', component: Scene05_LeadManagement, timing: SCENE_TIMING.scene05 },
  { id: 'Scene06-Communication', component: Scene06_Communication, timing: SCENE_TIMING.scene06 },
  { id: 'Scene07-PolicyManagement', component: Scene07_PolicyManagement, timing: SCENE_TIMING.scene07 },
  { id: 'Scene08-Claims', component: Scene08_Claims, timing: SCENE_TIMING.scene08 },
  { id: 'Scene09-Marketing', component: Scene09_Marketing, timing: SCENE_TIMING.scene09 },
  { id: 'Scene10-Vision', component: Scene10_Vision, timing: SCENE_TIMING.scene10 },
  { id: 'Scene11-CTA', component: Scene11_CTA, timing: SCENE_TIMING.scene11 },
  { id: 'Scene12-Outro', component: Scene12_Outro, timing: SCENE_TIMING.scene12 },
] as const;

const demoScenes = [
  { id: 'Demo01-LeadUpload', component: Demo01_LeadUpload, timing: DEMO_SCENE_TIMING.demo01 },
  { id: 'Cutaway01-ManualQuoting', component: Cutaway01_ManualQuoting, timing: DEMO_SCENE_TIMING.cutaway01 },
  { id: 'Demo02-QuoteProcessing', component: Demo02_QuoteProcessing, timing: DEMO_SCENE_TIMING.demo02 },
  { id: 'Demo03-CRMView', component: Demo03_CRMView, timing: DEMO_SCENE_TIMING.demo03 },
  { id: 'Cutaway02-SpeedToLead', component: Cutaway02_SpeedToLead, timing: DEMO_SCENE_TIMING.cutaway02 },
  { id: 'Demo04-Communications', component: Demo04_Communications, timing: DEMO_SCENE_TIMING.demo04 },
  { id: 'Demo05-ResponseDashboard', component: Demo05_ResponseDashboard, timing: DEMO_SCENE_TIMING.demo05 },
  { id: 'Demo06-FollowUpQueue', component: Demo06_FollowUpQueue, timing: DEMO_SCENE_TIMING.demo06 },
  { id: 'Demo07-ResultsSummary', component: Demo07_ResultsSummary, timing: DEMO_SCENE_TIMING.demo07 },
] as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InsuranceAgencyVideo"
        component={InsuranceAgencyVideo}
        durationInFrames={BRAND.video.totalFrames}
        fps={fps}
        width={width}
        height={height}
      />

      <Composition
        id="LeadProcessingDemo"
        component={LeadProcessingDemo}
        durationInFrames={DEMO_TOTAL_FRAMES}
        fps={fps}
        width={width}
        height={height}
      />

      {scenes.map(({ id, component, timing }) => (
        <Composition
          key={id}
          id={id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={component as any}
          durationInFrames={timing.duration}
          fps={fps}
          width={width}
          height={height}
          defaultProps={{ durationInFrames: timing.duration }}
        />
      ))}

      {demoScenes.map(({ id, component, timing }) => (
        <Composition
          key={id}
          id={id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={component as any}
          durationInFrames={timing.duration}
          fps={fps}
          width={width}
          height={height}
          defaultProps={{ durationInFrames: timing.duration }}
        />
      ))}
    </>
  );
};
