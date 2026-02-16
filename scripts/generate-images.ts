import 'dotenv/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { NARRATION } from '../src/data/narration';

const openai = new OpenAI();

const OUTPUT_DIR = path.resolve(__dirname, '../public/images/scenes');

async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function generateImages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const scenes = Object.entries(NARRATION).filter(([, segment]) => segment.imagePrompt);
  console.log(`Generating DALL-E images for ${scenes.length} scenes...\n`);

  for (const [key, segment] of scenes) {
    if (!segment.imageFile) continue;

    const outputPath = path.join(
      path.resolve(__dirname, '../public/images'),
      segment.imageFile,
    );

    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${segment.imageFile} already exists`);
      continue;
    }

    console.log(`[GEN] ${key}: ${segment.imageFile}`);
    console.log(`  Prompt: "${segment.imagePrompt!.slice(0, 80)}..."`);

    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: segment.imagePrompt!,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
      });

      const imageUrl = response.data?.[0]?.url;
      if (!imageUrl) {
        throw new Error('No image URL in response');
      }

      await downloadImage(imageUrl, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ Saved (${(stats.size / 1024).toFixed(1)} KB)\n`);
    } catch (error) {
      console.error(`  ✗ Error generating ${key}:`, error);
    }
  }

  console.log('Done! Images saved to:', OUTPUT_DIR);
}

generateImages().catch(console.error);
