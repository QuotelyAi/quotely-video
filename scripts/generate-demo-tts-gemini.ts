import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { DEMO_NARRATION } from '../src/data/demoNarration';

const API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.resolve(__dirname, '../public/audio');
const MODEL = 'gemini-2.5-flash-preview-tts';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function generateTTS(text: string, outputPath: string): Promise<boolean> {
  const body = {
    contents: [
      {
        parts: [{ text }],
      },
    ],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: 'Kore',
          },
        },
      },
    },
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err.slice(0, 200)}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) {
    throw new Error('No audio parts in response');
  }

  const audioPart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('audio/'));
  if (!audioPart) {
    throw new Error('No audio data found in response parts');
  }

  const audioBase64 = audioPart.inlineData.data;
  const mimeType = audioPart.inlineData.mimeType;

  // Gemini returns PCM/WAV, we need to convert to MP3
  const rawBuffer = Buffer.from(audioBase64, 'base64');

  if (mimeType.includes('wav') || mimeType.includes('pcm') || mimeType.includes('L16')) {
    // Write temp WAV then convert to MP3 via ffmpeg
    const tempPath = outputPath.replace('.mp3', '.wav');
    fs.writeFileSync(tempPath, rawBuffer);

    const { execSync } = await import('child_process');
    execSync(`ffmpeg -y -i "${tempPath}" -codec:a libmp3lame -qscale:a 2 "${outputPath}" 2>/dev/null`);
    fs.unlinkSync(tempPath);
  } else if (mimeType.includes('mp3') || mimeType.includes('mpeg')) {
    fs.writeFileSync(outputPath, rawBuffer);
  } else {
    // Unknown format — write raw and convert
    const tempPath = outputPath.replace('.mp3', '.raw');
    fs.writeFileSync(tempPath, rawBuffer);
    const { execSync } = await import('child_process');
    try {
      execSync(`ffmpeg -y -i "${tempPath}" -codec:a libmp3lame -qscale:a 2 "${outputPath}" 2>/dev/null`);
      fs.unlinkSync(tempPath);
    } catch {
      // If ffmpeg fails, just rename
      fs.renameSync(tempPath, outputPath);
    }
  }

  return true;
}

async function main() {
  if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY not set');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Generating TTS for ${DEMO_NARRATION.length} scenes using Gemini...\n`);

  for (const segment of DEMO_NARRATION) {
    const outputPath = path.join(OUTPUT_DIR, path.basename(segment.audioFile));

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${segment.audioFile} already exists`);
      continue;
    }

    console.log(`[GEN] ${segment.sceneId}: ${segment.audioFile}`);
    console.log(`  Text: "${segment.text.slice(0, 80)}..."`);

    try {
      await generateTTS(segment.text, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`  Done (${(stats.size / 1024).toFixed(1)} KB)\n`);
    } catch (error: any) {
      console.error(`  Error: ${error.message}\n`);

      // Rate limit — wait and retry once
      if (error.message.includes('429')) {
        console.log('  Rate limited, waiting 30s...');
        await new Promise((r) => setTimeout(r, 30000));
        try {
          await generateTTS(segment.text, outputPath);
          const stats = fs.statSync(outputPath);
          console.log(`  Retry succeeded (${(stats.size / 1024).toFixed(1)} KB)\n`);
        } catch (retryErr: any) {
          console.error(`  Retry failed: ${retryErr.message}\n`);
        }
      }
    }

    // Small delay between requests to avoid rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log('Done! Audio files saved to:', OUTPUT_DIR);
}

main().catch(console.error);
