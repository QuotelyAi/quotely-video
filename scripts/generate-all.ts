import { execSync } from 'child_process';
import * as path from 'path';

const SCRIPTS_DIR = __dirname;

interface Step {
  name: string;
  file: string;
  shell?: boolean;
}

const STEPS: Step[] = [
  { name: 'Script Generation (GPT-4)', file: 'generate-script.ts' },
  { name: 'Image Generation (DALL-E 3)', file: 'generate-images.ts' },
  { name: 'TTS Generation (OpenAI TTS)', file: 'generate-tts.ts' },
  { name: 'Subtitle Generation (Whisper)', file: 'generate-subtitles.ts' },
  { name: 'B-roll Video Generation (Veo 3.1)', file: 'generate-veo-videos.sh', shell: true },
  { name: 'Avatar Video Generation (Veo 3.1)', file: 'generate-avatar-videos.sh', shell: true },
];

function run() {
  console.log('='.repeat(60));
  console.log('  Quotely AI Video Pipeline');
  console.log('='.repeat(60));
  console.log();

  const startTime = Date.now();

  for (let i = 0; i < STEPS.length; i++) {
    const step = STEPS[i];
    const stepNum = i + 1;
    const scriptPath = path.join(SCRIPTS_DIR, step.file);

    console.log(`[${stepNum}/${STEPS.length}] ${step.name}`);
    console.log('-'.repeat(40));

    try {
      const cmd = step.shell
        ? `bash "${scriptPath}"`
        : `npx tsx "${scriptPath}"`;
      execSync(cmd, {
        stdio: 'inherit',
        cwd: path.resolve(SCRIPTS_DIR, '..'),
      });
      console.log(`\n✓ Step ${stepNum} complete\n`);
    } catch (error) {
      console.error(`\n✗ Step ${stepNum} failed: ${step.name}`);
      console.error('Pipeline halted.');
      process.exit(1);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('='.repeat(60));
  console.log(`  Pipeline complete! (${elapsed}s)`);
  console.log('='.repeat(60));
  console.log('\nNext steps:');
  console.log('  npm run dev    - Preview in Remotion Studio');
  console.log('  npm run build  - Render final video');
}

run();
