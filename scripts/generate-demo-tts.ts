import 'dotenv/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { DEMO_NARRATION } from '../src/data/demoNarration';

const openai = new OpenAI();

const OUTPUT_DIR = path.resolve(__dirname, '../public/audio');

async function generateDemoTTS() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating TTS for ${DEMO_NARRATION.length} demo scenes...\n`);

  for (const segment of DEMO_NARRATION) {
    const outputPath = path.join(OUTPUT_DIR, path.basename(segment.audioFile));

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${segment.audioFile} already exists`);
      continue;
    }

    console.log(`[GEN] ${segment.sceneId}: ${segment.audioFile}`);
    console.log(`  Text: "${segment.text.slice(0, 80)}..."`);

    try {
      const response = await openai.audio.speech.create({
        model: 'tts-1-hd',
        voice: 'onyx',
        input: segment.text,
        response_format: 'mp3',
        speed: 1.0,
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(outputPath, buffer);
      console.log(`  ✓ Saved (${(buffer.length / 1024).toFixed(1)} KB)\n`);
    } catch (error) {
      console.error(`  ✗ Error generating ${segment.sceneId}:`, error);
    }
  }

  console.log('Done! Audio files saved to:', OUTPUT_DIR);
}

generateDemoTTS().catch(console.error);
