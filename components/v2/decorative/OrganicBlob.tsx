/**
 * Inline SVG organische blob — Merkboek 2026 spoor 02 "Toekomst".
 *
 * Reflectieve, lome vorm met optionele lime → beige gradient. Wordt
 * decoratief geplaatst achter content om het "toekomst"-gevoel te dragen
 * (definitie-sectie, ROI, FAQ-banner).
 *
 * Pure RSC, geen state. Unieke `gradientId` via prop voorkomt collisions
 * als meerdere blobs op één pagina staan.
 */

type OrganicBlobProps = {
  /** Pixelhoogte. Width = size * aspect (default 1.1 voor ietwat horizontaal). */
  size?: number;
  /** Aspect ratio width/height. Default 1.1 — iets breder dan hoog. */
  aspect?: number;
  /** Rotatie in graden. Default 0. */
  rotation?: number;
  /** Gradient van-kleur. CSS-kleur. Default `var(--mk-lime)`. */
  colorFrom?: string;
  /** Gradient naar-kleur. CSS-kleur. Default `var(--mk-beige)`. */
  colorTo?: string;
  /** Verschillende blob-variants — andere path-shapes. */
  variant?: 'a' | 'b' | 'c';
  /** Unieke ID-suffix voor gradient (verplicht als meerdere blobs in dezelfde pagina). */
  idSuffix?: string;
  className?: string;
};

// Drie verschillende organische paden — handgetekende-feel, geen perfecte cirkels.
// Allemaal in viewBox 0 0 200 180 voor consistente coords.
const BLOB_PATHS: Record<NonNullable<OrganicBlobProps['variant']>, string> = {
  a: 'M 110 14 C 162 14 195 56 195 100 C 195 138 168 168 122 172 C 80 176 38 158 18 116 C -2 76 18 30 60 18 C 78 13 92 14 110 14 Z',
  b: 'M 100 12 C 152 8 192 48 196 92 C 200 138 168 166 122 168 C 76 170 30 152 14 110 C 0 72 20 28 60 16 C 76 12 88 12 100 12 Z',
  c: 'M 100 18 C 158 12 188 64 192 108 C 196 148 158 168 110 170 C 60 172 24 144 14 100 C 4 60 30 22 70 14 C 84 12 92 18 100 18 Z',
};

export function OrganicBlob({
  size = 320,
  aspect = 1.1,
  rotation = 0,
  colorFrom = 'var(--mk-lime)',
  colorTo = 'var(--mk-beige)',
  variant = 'a',
  idSuffix = 'default',
  className,
}: OrganicBlobProps) {
  const gradientId = `mk-blob-grad-${idSuffix}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * aspect}
      height={size}
      viewBox="0 0 200 180"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
      </defs>
      <path d={BLOB_PATHS[variant]} fill={`url(#${gradientId})`} />
    </svg>
  );
}
