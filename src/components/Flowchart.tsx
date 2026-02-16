import { useCurrentFrame } from 'remotion';
import { BRAND } from '../data/brand';
import { FlowchartStep } from '../types';
import { fadeIn, scaleIn } from '../utils/animations';

interface FlowchartProps {
  steps: FlowchartStep[];
  delay?: number;
  direction?: 'horizontal' | 'vertical';
}

export const Flowchart: React.FC<FlowchartProps> = ({
  steps,
  delay = 0,
  direction = 'horizontal',
}) => {
  const frame = useCurrentFrame();

  const boxWidth = 220;
  const boxHeight = 140;
  const spacing = 80;
  const arrowSize = 40;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing,
      }}
    >
      {steps.map((step, index) => {
        const stagger = delay + index * 15;
        const opacity = fadeIn(frame, stagger, 15);
        const scale = scaleIn(frame, stagger, 20);

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: direction === 'horizontal' ? 'row' : 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: boxWidth,
                height: boxHeight,
                backgroundColor: BRAND.colors.backgroundSecondary,
                border: `3px solid ${BRAND.colors.accent}`,
                borderRadius: 8,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              {step.icon && (
                <div
                  style={{
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 36,
                    marginBottom: 12,
                  }}
                >
                  {step.icon}
                </div>
              )}
              <div
                style={{
                  fontFamily: BRAND.fonts.primary,
                  fontSize: 22,
                  fontWeight: 700,
                  color: BRAND.colors.text,
                  textAlign: 'center',
                  marginBottom: step.description ? 8 : 0,
                }}
              >
                {step.label}
              </div>
              {step.description && (
                <div
                  style={{
                    fontFamily: BRAND.fonts.primary,
                    fontSize: 14,
                    color: BRAND.colors.textSecondary,
                    textAlign: 'center',
                  }}
                >
                  {step.description}
                </div>
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                style={{
                  opacity: fadeIn(frame, stagger + 10, 10),
                }}
              >
                {direction === 'horizontal' ? (
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: `${arrowSize / 2}px solid transparent`,
                      borderBottom: `${arrowSize / 2}px solid transparent`,
                      borderLeft: `${arrowSize}px solid ${BRAND.colors.accent}`,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: `${arrowSize / 2}px solid transparent`,
                      borderRight: `${arrowSize / 2}px solid transparent`,
                      borderTop: `${arrowSize}px solid ${BRAND.colors.accent}`,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
