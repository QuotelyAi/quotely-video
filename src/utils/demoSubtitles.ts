import type { SubtitleEntry } from '../types';

import demo01 from '../data/demoSubtitles/demo01.json';
import demo02 from '../data/demoSubtitles/demo02.json';
import demo03 from '../data/demoSubtitles/demo03.json';
import demo04 from '../data/demoSubtitles/demo04.json';
import demo05 from '../data/demoSubtitles/demo05.json';
import demo06 from '../data/demoSubtitles/demo06.json';
import demo07 from '../data/demoSubtitles/demo07.json';

export const DEMO_SUBTITLES: Record<string, SubtitleEntry[]> = {
  demo01: demo01 as SubtitleEntry[],
  demo02: demo02 as SubtitleEntry[],
  demo03: demo03 as SubtitleEntry[],
  demo04: demo04 as SubtitleEntry[],
  demo05: demo05 as SubtitleEntry[],
  demo06: demo06 as SubtitleEntry[],
  demo07: demo07 as SubtitleEntry[],
};
