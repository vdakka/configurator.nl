import Image from 'next/image';

/**
 * Happy Horizon wordmark.
 *
 * Source: officiële brand assets (Happy_Horizon_Woordmerk RGB blue),
 * uitgesneden tot enkel het wordmark (zonder "CREATIVE DIGITAL AGENCY" tagline).
 * Tonal variant in donker → transparant PNG in /public/happy-horizon-logo.png.
 *
 * Voor witte uitlijning op donkere achtergronden (footer): wrap in een
 * container met `[&_img]:brightness-0 [&_img]:invert` of geef een eigen
 * `variant="white"` als dat nodig wordt.
 */

const NATIVE_W = 1260;
const NATIVE_H = 445;
const RATIO = NATIVE_W / NATIVE_H;

export function HappyHorizonLogo({
  className = '',
  height = 40,
  variant = 'blue',
}: {
  className?: string;
  /** Display height in px (logo schaalt mee op aspect-ratio) */
  height?: number;
  variant?: 'blue' | 'white';
}) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src="/happy-horizon-logo.png"
      alt="Happy Horizon"
      width={width}
      height={height}
      priority
      className={
        variant === 'white'
          ? `block brightness-0 invert ${className}`
          : `block ${className}`
      }
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}
