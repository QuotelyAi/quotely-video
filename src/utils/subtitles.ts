import type { SubtitleEntry } from '../types';

import scene01 from '../data/subtitles/scene01.json';
import scene02 from '../data/subtitles/scene02.json';
import scene03 from '../data/subtitles/scene03.json';
import scene04 from '../data/subtitles/scene04.json';
import scene05 from '../data/subtitles/scene05.json';
import scene06 from '../data/subtitles/scene06.json';
import scene07 from '../data/subtitles/scene07.json';
import scene08 from '../data/subtitles/scene08.json';
import scene09 from '../data/subtitles/scene09.json';
import scene10 from '../data/subtitles/scene10.json';
import scene11 from '../data/subtitles/scene11.json';
import scene12 from '../data/subtitles/scene12.json';

export const SUBTITLES: Record<string, SubtitleEntry[]> = {
  scene01: scene01 as SubtitleEntry[],
  scene02: scene02 as SubtitleEntry[],
  scene03: scene03 as SubtitleEntry[],
  scene04: scene04 as SubtitleEntry[],
  scene05: scene05 as SubtitleEntry[],
  scene06: scene06 as SubtitleEntry[],
  scene07: scene07 as SubtitleEntry[],
  scene08: scene08 as SubtitleEntry[],
  scene09: scene09 as SubtitleEntry[],
  scene10: scene10 as SubtitleEntry[],
  scene11: scene11 as SubtitleEntry[],
  scene12: scene12 as SubtitleEntry[],
};
