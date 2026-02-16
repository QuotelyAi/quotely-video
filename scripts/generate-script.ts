import 'dotenv/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const openai = new OpenAI();

const OUTPUT_FILE = path.resolve(__dirname, '../src/data/narration.ts');

interface GeneratedScene {
  sceneId: string;
  text: string;
  audioFile: string;
  imagePrompt: string;
  imageFile: string;
}

const SCENE_STRUCTURE = [
  { id: 'scene01', audioFile: 'scene01_hook.mp3', role: 'Hook - grab attention with a bold statement about the problem' },
  { id: 'scene02', audioFile: 'scene02_intro.mp3', role: 'Introduction - introduce the presenter and what they will show' },
  { id: 'scene03', audioFile: 'scene03_problem.mp3', role: 'Problem Deep Dive - detailed look at industry pain points with statistics' },
  { id: 'scene04', audioFile: 'scene04_quoting.mp3', role: 'Feature 1: AI Quoting - explain how AI speeds up the quoting process' },
  { id: 'scene05', audioFile: 'scene05_leads.mp3', role: 'Feature 2: Lead Management - AI-powered lead scoring and nurturing' },
  { id: 'scene06', audioFile: 'scene06_communication.mp3', role: 'Feature 3: 24/7 Communication - AI handles all client communications' },
  { id: 'scene07', audioFile: 'scene07_policy.mp3', role: 'Feature 4: Policy Management - automated document processing and compliance' },
  { id: 'scene08', audioFile: 'scene08_claims.mp3', role: 'Feature 5: Claims Processing - conversational AI claims filing' },
  { id: 'scene09', audioFile: 'scene09_marketing.mp3', role: 'Feature 6: AI Marketing - automated campaigns and optimization' },
  { id: 'scene10', audioFile: 'scene10_vision.mp3', role: 'Vision - paint the picture of the AI-powered future' },
  { id: 'scene11', audioFile: 'scene11_cta.mp3', role: 'Call to Action - direct viewers to book a demo at tryquotely.com' },
  { id: 'scene12', audioFile: 'scene12_outro.mp3', role: 'Outro - ask for subscribe, like, and notification bell' },
];

async function generateScript() {
  const topic = process.argv[2] || 'Quotely - AI-powered insurance agency automation platform';

  console.log(`Generating script for: "${topic}"\n`);
  console.log('Calling GPT-4...\n');

  const prompt = `You are a professional video scriptwriter. Write narration for a 12-scene promotional video about: "${topic}".

This is for an insurance technology company called Quotely that automates insurance agency operations with AI.

For each scene, provide:
1. "text" - The narration text (spoken by a confident, knowledgeable presenter)
2. "imagePrompt" - A detailed DALL-E image prompt for the scene's background image (photorealistic, cinematic)

Scene structure:
${SCENE_STRUCTURE.map((s, i) => `Scene ${i + 1} (${s.id}): ${s.role}`).join('\n')}

Requirements:
- Each scene's narration should be 2-4 sentences for short scenes, 4-8 sentences for detailed feature scenes
- Use compelling statistics and specific numbers
- Maintain a professional but energetic tone
- Image prompts should be vivid, detailed, and suitable for DALL-E 3 generation
- Image prompts should end with "photorealistic" style

Respond in JSON format as an array of objects with fields: sceneId, text, imagePrompt`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in GPT-4 response');
    }

    const parsed = JSON.parse(content);
    const scenes: GeneratedScene[] = (parsed.scenes || parsed).map((scene: any, index: number) => ({
      sceneId: SCENE_STRUCTURE[index].id,
      text: scene.text,
      audioFile: SCENE_STRUCTURE[index].audioFile,
      imagePrompt: scene.imagePrompt,
      imageFile: `scenes/${SCENE_STRUCTURE[index].id}.png`,
    }));

    console.log('Generated scenes:\n');
    for (const scene of scenes) {
      console.log(`[${scene.sceneId}]`);
      console.log(`  Text: "${scene.text.slice(0, 100)}..."`);
      console.log(`  Image: "${scene.imagePrompt.slice(0, 80)}..."\n`);
    }

    // Build the narration.ts file content
    const entries = scenes.map((scene) => {
      const textEscaped = scene.text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const promptEscaped = scene.imagePrompt.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `  ${scene.sceneId}: {
    sceneId: '${scene.sceneId}',
    text: "${textEscaped}",
    audioFile: '${scene.audioFile}',
    imagePrompt: "${promptEscaped}",
    imageFile: '${scene.imageFile}',
  }`;
    });

    const fileContent = `import type { NarrationSegment } from '../types';

export const NARRATION: Record<string, NarrationSegment> = {
${entries.join(',\n')},
};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`\nScript saved to: ${OUTPUT_FILE}`);
    console.log(`Total scenes: ${scenes.length}`);
  } catch (error) {
    console.error('Error generating script:', error);
    process.exit(1);
  }
}

generateScript().catch(console.error);
