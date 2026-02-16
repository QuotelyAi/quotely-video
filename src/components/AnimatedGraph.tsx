import { useCurrentFrame, interpolate } from 'remotion';
import { BRAND } from '../data/brand';
import { fadeIn } from '../utils/animations';

interface GraphData {
  label: string;
  value: number;
  color?: string;
}

interface AnimatedGraphProps {
  data: GraphData[];
  delay?: number;
}

export const AnimatedGraph: React.FC<AnimatedGraphProps> = ({ data, delay = 0 }) => {
  const frame = useCurrentFrame();

  const maxValue = Math.max(...data.map((d) => d.value));
  const barHeight = 60;
  const barSpacing = 20;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: barSpacing,
        padding: 40,
      }}
    >
      {data.map((item, index) => {
        const stagger = delay + index * 10;
        const opacity = fadeIn(frame, stagger, 15);
        const growProgress = interpolate(
          frame,
          [stagger, stagger + 30],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const barWidth = (item.value / maxValue) * 800 * growProgress;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity,
            }}
          >
            <div
              style={{
                fontFamily: BRAND.fonts.primary,
                fontSize: 24,
                color: BRAND.colors.text,
                width: 200,
                textAlign: 'right',
                marginRight: 24,
                fontWeight: 500,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                height: barHeight,
                width: barWidth,
                backgroundColor: item.color || BRAND.colors.accent,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 16,
                transition: 'width 0.3s ease-out',
              }}
            >
              <span
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: 20,
                  fontWeight: 700,
                  color: BRAND.colors.background,
                }}
              >
                {Math.round(item.value * growProgress)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
