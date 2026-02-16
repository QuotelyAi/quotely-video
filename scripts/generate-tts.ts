import 'dotenv/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { NARRATION } from '../src/data/narration';

const openai = new OpenAI();

const OUTPUT_DIR = path.resolve(__dirname, '../public/audio');

async function generateTTS() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const scenes = Object.entries(NARRATION);
  console.log(`Generating TTS for ${scenes.length} scenes...\n`);

  for (const [key, segment] of scenes) {
    const outputPath = path.join(OUTPUT_DIR, segment.audioFile);

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${segment.audioFile} already exists`);
      continue;
    }

    console.log(`[GEN] ${key}: ${segment.audioFile}`);
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
      console.error(`  ✗ Error generating ${key}:`, error);
    }
  }

  console.log('Done! Audio files saved to:', OUTPUT_DIR);
}

generateTTS().catch(console.error);
