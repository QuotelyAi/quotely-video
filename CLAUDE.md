# Quotely Video — Claude Code Context

## Project Overview
AI-generated promotional and demo videos for Quotely, the insurance quoting platform. Built with Remotion (React-based video framework) and powered by OpenAI, Google Gemini, and Google Veo for content generation.

**Founder**: Dustin Wyzard
**Repo**: `QuotelyAi/quotely-video`
**Tech Stack**: Remotion 4, React 19, TypeScript, OpenAI (GPT-4o, DALL-E 3, TTS, Whisper), Google Gemini TTS, Google Veo 3.1

---

## Project Structure
```
my-video/
├── src/
│   ├── index.ts                  # Remotion entry point (registerRoot)
│   ├── Root.tsx                  # Registers all Compositions
│   ├── compositions/
│   │   ├── InsuranceAgencyVideo.tsx  # 10-min promo video (12 scenes, 18000 frames)
│   │   └── LeadProcessingDemo.tsx   # 166s product demo (9 scenes + 2 cutaways)
│   ├── components/               # Shared UI (SceneContainer, GlassPanel, AvatarOverlay, etc.)
│   │   └── demo/                 # Demo-specific UI (BrowserChrome, DashboardLayout, etc.)
│   ├── scenes/                   # Scene01-12 (main) + Demo01-07 + Cutaway01-02
│   ├── data/                     # Narration, subtitles, timing, brand config, mock data
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Animation helpers, subtitle loaders
├── scripts/                      # AI content generation pipeline
│   ├── generate-all.ts           # Orchestrates full pipeline
│   ├── generate-script.ts        # GPT-4o → narration.ts
│   ├── generate-images.ts        # DALL-E 3 → background images
│   ├── generate-tts.ts           # OpenAI TTS → main narration MP3s
│   ├── generate-demo-tts.ts      # OpenAI TTS → demo narration MP3s
│   ├── generate-demo-tts-gemini.ts  # Gemini TTS → demo narration MP3s
│   ├── generate-subtitles.ts     # Whisper → main subtitle JSONs
│   ├── generate-demo-subtitles.ts   # Whisper → demo subtitle JSONs
│   ├── generate-veo-videos.sh    # Veo 3.1 → B-roll video clips
│   └── generate-avatar-videos.sh # Veo 3.1 → AI presenter avatar clips
├── public/
│   ├── audio/                    # MP3 narration, music, SFX
│   ├── images/scenes/            # DALL-E generated backgrounds
│   └── videos/                   # Veo B-roll + avatar clips
├── out/                          # Rendered video outputs
├── remotion.config.ts            # JPEG format, overwrite, port 3000
└── .env                          # API keys (gitignored)
```

---

## Two Video Compositions

### InsuranceAgencyVideo
- **Duration**: 600 seconds (18,000 frames @ 30fps)
- **Scenes**: 12 scenes (Hook → Intro → Problem → Quoting → Lead Management → Communication → Policy → Claims → Marketing → Vision → CTA → Outro)
- **No avatar overlay**

### LeadProcessingDemo
- **Duration**: 166 seconds (4,980 frames @ 30fps)
- **Scenes**: 7 demo scenes + 2 "Big Short"-style cutaway scenes
- **AI avatar presenter** (bottom-right PIP)
- **Simulates** the Quotely app UI (`app.quotely.info`) with BrowserChrome + DashboardLayout
- **Narrative**: Quotely vs EZLynx comparison — 50 leads quoted in 42 seconds

---

## AI Content Pipeline

Run the full pipeline:
```bash
npm run generate:all
```

Or individual steps:
```bash
npm run generate:script      # GPT-4o → narration text
npm run generate:images      # DALL-E 3 → scene backgrounds
npm run generate:tts         # OpenAI TTS (voice: onyx) → main MP3s
npm run generate:subtitles   # Whisper → word-timed subtitle JSONs
```

Shell scripts for video generation:
```bash
bash scripts/generate-veo-videos.sh      # Veo 3.1 → B-roll clips
bash scripts/generate-avatar-videos.sh   # Veo 3.1 → avatar clips
```

### Pipeline Order
1. `generate-script.ts` → `src/data/narration.ts`
2. `generate-images.ts` → `public/images/scenes/`
3. `generate-tts.ts` → `public/audio/`
4. `generate-subtitles.ts` → `src/data/subtitles/`
5. `generate-veo-videos.sh` → `public/videos/`
6. `generate-avatar-videos.sh` → `public/videos/avatar/`

---

## External Service Integrations

| Service | Purpose | Files |
|---------|---------|-------|
| **OpenAI GPT-4o** | Narration script generation | `scripts/generate-script.ts` |
| **OpenAI DALL-E 3** | Background images (1792x1024) | `scripts/generate-images.ts` |
| **OpenAI TTS** (`tts-1-hd`, voice: `onyx`) | MP3 narration | `scripts/generate-tts.ts`, `scripts/generate-demo-tts.ts` |
| **OpenAI Whisper** | Word-level subtitles from MP3 | `scripts/generate-subtitles.ts`, `scripts/generate-demo-subtitles.ts` |
| **Google Gemini TTS** (`gemini-2.5-flash-preview-tts`, voice: `Kore`) | Alternative TTS for demo scenes | `scripts/generate-demo-tts-gemini.ts` |
| **Google Veo 3.1** | AI B-roll video generation (8s clips) | `scripts/generate-veo-videos.sh`, `generate-video.sh` |
| **Google Imagen 3** | Image generation | `generate-image.sh` |
| **ffmpeg** | WAV→MP3 conversion | `scripts/generate-demo-tts-gemini.ts` |

---

## Environment Variables

Required in `.env` (gitignored):
```
OPENAI_API_KEY=...     # GPT-4o, DALL-E 3, TTS, Whisper
GEMINI_API_KEY=...     # Gemini TTS, Veo 3.1, Imagen 3
GROK_API_KEY=...       # Reserved for future use
```

---

## Brand Constants (`src/data/brand.ts`)

- **Primary**: `#FFD700` (gold)
- **Background**: `#0F172A` (dark navy)
- **Resolution**: 1920x1080 @ 30fps
- **Fonts**: Inter (headings), system sans-serif

---

## Key Architectural Patterns

- **SceneContainer** — Universal 5-layer wrapper for main scenes: background → cinematic overlay → content → avatar → subtitles
- **Demo scenes** render directly (no SceneContainer) with `BrowserChrome` + `DashboardLayout` to simulate the real app UI
- **Graceful degradation** — `VideoBackground` and `AudioSafe` check file existence before rendering to prevent crashes when assets are missing
- **All scripts** use `dotenv/config` to load API keys from `.env`

---

## Development Commands

```bash
npm run dev          # Remotion Studio (localhost:3000)
npm run build        # Bundle for production
npm run lint         # ESLint + TypeScript check
```

### Rendering
```bash
npx remotion render InsuranceAgencyVideo    # Full promo video
npx remotion render LeadProcessingDemo      # Product demo video
```

---

## Related Projects
- **quotely** — Main platform repo (`QuotelyAi/quotely`)
- **quotely.info** — Marketing/info site
- **tryquotely.com** — SaaS platform (live product)
