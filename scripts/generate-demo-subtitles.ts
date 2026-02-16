import { File } from 'node:buffer';
if (!globalThis.File) {
  (globalThis as any).File = File;
}

import 'dotenv/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { DEMO_NARRATION } from '../src/data/demoNarration';

const openai = new OpenAI();

const AUDIO_DIR = path.resolve(__dirname, '../public/audio');
const OUTPUT_DIR = path.resolve(__dirname, '../src/data/demoSubtitles');

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

interface SubtitleEntry {
  text: string;
  startFrame: number;
  endFrame: number;
}

const FPS = 30;

function wordsToSubtitleEntries(words: WordTimestamp[]): SubtitleEntry[] {
  const entries: SubtitleEntry[] = [];
  const WORDS_PER_SUBTITLE = 8;

  for (let i = 0; i < words.length; i += WORDS_PER_SUBTITLE) {
    const chunk = words.slice(i, i + WORDS_PER_SUBTITLE);
    const text = chunk.map((w) => w.word).join(' ');
    const startFrame = Math.round(chunk[0].start * FPS);
    const endFrame = Math.round(chunk[chunk.length - 1].end * FPS);
    entries.push({ text, startFrame, endFrame });
  }

  return entries;
}

async function generateDemoSubtitles() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating subtitles for ${DEMO_NARRATION.length} demo scenes...\n`);

  for (const segment of DEMO_NARRATION) {
    const sceneNum = segment.sceneId.replace('demo', '');
    const outputPath = path.join(OUTPUT_DIR, `demo${sceneNum}.json`);
    const audioFileName = path.basename(segment.audioFile);
    const audioPath = path.join(AUDIO_DIR, audioFileName);

    if (!fs.existsSync(audioPath)) {
      console.log(`[SKIP] Audio file not found: ${audioFileName}`);
      continue;
    }

    console.log(`[GEN] ${segment.sceneId}: demo${sceneNum}.json`);

    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: 'whisper-1',
        response_format: 'verbose_json',
        timestamp_granularities: ['word'],
      });

      const words: WordTimestamp[] = (transcription as any).words || [];
      const entries = wordsToSubtitleEntries(words);

      fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2));
      console.log(`  ✓ ${entries.length} subtitle entries\n`);
    } catch (error) {
      console.error(`  ✗ Error for ${segment.sceneId}:`, error);
    }
  }

  console.log('Done! Subtitle files saved to:', OUTPUT_DIR);
}

generateDemoSubtitles().catch(console.error);
