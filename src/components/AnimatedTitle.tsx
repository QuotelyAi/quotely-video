import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn, slideInFromLeft, slideInFromBottom, typewriter } from '../utils/animations';

interface AnimatedTitleProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  animation?: 'fade' | 'slide' | 'typewriter';
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  delay = 0,
  fontSize = 72,
  color = BRAND.colors.text,
  animation = 'fade',
}) => {
  const frame = useCurrentFrame();

  let opacity = 1;
  let translateX = 0;
  let translateY = 0;
  let displayText = text;

  if (animation === 'fade') {
    opacity = fadeIn(frame, delay, 20);
    translateY = slideInFromBottom(frame, delay, 20);
  } else if (animation === 'slide') {
    opacity = fadeIn(frame, delay, 25);
    translateX = slideInFromLeft(frame, delay, 25);
  } else if (animation === 'typewriter') {
    displayText = typewriter(text, frame, delay, 1.5);
    opacity = frame >= delay ? 1 : 0;
  }

  return (
    <div
      style={{
        fontFamily: BRAND.fonts.primary,
        fontSize,
        fontWeight: 700,
        color,
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
        textAlign: 'center',
        lineHeight: 1.2,
      }}
    >
      {displayText}
    </div>
  );
};
