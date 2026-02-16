import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { BRAND } from '../../data/brand';
import { fadeIn, scaleIn } from '../../utils/animations';

interface FileUploadZoneProps {
  state: 'idle' | 'hover' | 'uploading' | 'done';
  delay?: number;
  uploadStartFrame?: number;
  uploadDuration?: number;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  state,
  delay = 0,
  uploadStartFrame = 0,
  uploadDuration = 60,
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, delay, 20);
  const scale = scaleIn(frame, delay, 20);

  const isHover = state === 'hover' || state === 'uploading' || state === 'done';
  const borderColor = isHover ? BRAND.colors.primary : '#2a2a4a';
  const bgColor = isHover ? 'rgba(255, 215, 0, 0.05)' : 'rgba(17, 17, 40, 0.5)';

  // Upload progress
  const uploadProgress =
    state === 'uploading' || state === 'done'
      ? interpolate(
          frame,
          [uploadStartFrame, uploadStartFrame + uploadDuration],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        )
      : 0;

  // Bounce animation for the file icon when hovering
  const iconBounce =
    isHover
      ? Math.sin(frame * 0.15) * 4
      : 0;

  return (
    <div
      style={{
        width: 500,
        padding: '48px 40px',
        backgroundColor: bgColor,
        border: `2px dashed ${borderColor}`,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* File icon */}
      <div
        style={{
          fontSize: 48,
          transform: `translateY(${iconBounce}px)`,
        }}
      >
        {state === 'done' ? '✅' : '📄'}
      </div>

      {state === 'done' ? (
        <div
          style={{
            fontFamily: BRAND.fonts.primary,
            fontSize: 18,
            fontWeight: 600,
            color: BRAND.colors.success,
          }}
        >
          50 leads imported successfully!
        </div>
      ) : state === 'uploading' ? (
        <>
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 16,
              color: BRAND.colors.text,
            }}
          >
            Importing leads...
          </div>
          <div
            style={{
              width: '80%',
              height: 6,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${uploadProgress * 100}%`,
                height: '100%',
                backgroundColor: BRAND.colors.primary,
                borderRadius: 3,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 13,
              color: BRAND.colors.textSecondary,
            }}
          >
            {Math.round(uploadProgress * 50)}/50 leads
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 16,
              color: isHover ? BRAND.colors.primary : BRAND.colors.text,
              fontWeight: 500,
            }}
          >
            {isHover ? 'Drop leads_batch_50.csv' : 'Drag & drop your CSV file here'}
          </div>
          <div
            style={{
              fontFamily: BRAND.fonts.primary,
              fontSize: 13,
              color: BRAND.colors.textSecondary,
            }}
          >
            or click to browse
          </div>
        </>
      )}
    </div>
  );
};
