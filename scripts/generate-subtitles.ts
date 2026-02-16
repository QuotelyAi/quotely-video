import { File } from 'node:buffer';
if (!globalThis.File) {
  (globalThis as any).File = File;
}

import 'dotenv/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { NARRATION } from '../src/data/narration';

const openai = new OpenAI();

const AUDIO_DIR = path.resolve(__dirname, '../public/audio');
const OUTPUT_DIR = path.resolve(__dirname, '../src/data/subtitles');

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

async function generateSubtitles() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const scenes = Object.entries(NARRATION);
  console.log(`Generating subtitles for ${scenes.length} scenes...\n`);

  for (const [key, segment] of scenes) {
    const sceneNum = key.replace('scene', '');
    const outputPath = path.join(OUTPUT_DIR, `scene${sceneNum}.json`);
    const audioPath = path.join(AUDIO_DIR, segment.audioFile);

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] scene${sceneNum}.json already exists`);
      continue;
    }

    if (!fs.existsSync(audioPath)) {
      console.log(`[SKIP] Audio file not found: ${segment.audioFile}`);
      continue;
    }

    console.log(`[GEN] ${key}: scene${sceneNum}.json`);

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
      console.error(`  ✗ Error for ${key}:`, error);
    }
  }

  console.log('Done! Subtitle files saved to:', OUTPUT_DIR);
}

generateSubtitles().catch(console.error);
