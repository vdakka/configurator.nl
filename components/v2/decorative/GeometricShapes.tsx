/**
 * Inline SVG geometrische primitieven voor spoor 01 "Eerste stap".
 *
 * Merkboek 2026: geometrisch, activerend, geel-dominant. Stroke-only shapes
 * (geen vullingen) volgens iconografie-spec: 2pt stroke, rounded caps.
 *
 * Pure RSC, geen state, geen hooks. Hergebruikt overal in spoor 01-secties
 * (hero, quickscan-teaser, contact CTA).
 *
 * Gebruik `currentColor` standaard zodat `text-mk-ink` / `text-mk-coral`
 * Tailwind utilities werken.
 */

type ShapeProps = {
  size?: number;
  color?: string;
  stroke?: number;
  className?: string;
};

/** Cirkel — pure stroke ring. */
export function Circle({
  size = 80,
  color = 'currentColor',
  stroke = 2,
  className,
}: ShapeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        r={50 - stroke}
        stroke={color}
        strokeWidth={stroke * 3}
        fill="none"
      />
    </svg>
  );
}

/** Cirkel-disc — gevulde cirkel. Voor solide accents. */
export function Disc({
  size = 80,
  color = 'currentColor',
  className,
}: Omit<ShapeProps, 'stroke'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="50" cy="50" r="50" fill={color} />
    </svg>
  );
}

/** Vierkant met afgeronde hoeken — stroke-only. */
export function RoundedSquare({
  size = 80,
  color = 'currentColor',
  stroke = 2,
  className,
}: ShapeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x={stroke}
        y={stroke}
        width={100 - 2 * stroke}
        height={100 - 2 * stroke}
        rx="18"
        ry="18"
        stroke={color}
        strokeWidth={stroke * 3}
        fill="none"
      />
    </svg>
  );
}

/** Plus-teken — kruis met rounded caps. */
export function Plus({
  size = 60,
  color = 'currentColor',
  stroke = 2,
  className,
}: ShapeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <line
        x1="50"
        y1="15"
        x2="50"
        y2="85"
        stroke={color}
        strokeWidth={stroke * 4}
        strokeLinecap="round"
      />
      <line
        x1="15"
        y1="50"
        x2="85"
        y2="50"
        stroke={color}
        strokeWidth={stroke * 4}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Driehoek (omhoog) — stroke-only. Voor speech-bubble-achtige accents. */
export function Triangle({
  size = 60,
  color = 'currentColor',
  stroke = 2,
  className,
}: ShapeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M 50 12 L 88 80 L 12 80 Z"
        stroke={color}
        strokeWidth={stroke * 3}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
