import Image from 'next/image';

/**
 * 3D shapes uit de officiële Happy Horizon brand assets.
 * Geconverteerd via `scripts/build-shapes.py` van PSD-renders naar
 * geoptimaliseerde PNGs in /public/shapes/.
 *
 * De call-site API blijft `<ThreeDShape shape="sphereY" size={200} />`
 * voor backwards compatibility — onder de motorkap mappen we naar de juiste PNG.
 */

type Shape = 'sphereY' | 'sphereY2' | 'sphereB' | 'capB';

type ShapeMeta = {
  src: string;
  /** Native aspect ratio (width / height) — bepaalt hoe `size` mapt naar render-afmetingen */
  ratio: number;
};

const SHAPES: Record<Shape, ShapeMeta> = {
  sphereY: { src: '/shapes/sphere-yellow-0.png', ratio: 731 / 729 },
  sphereY2: { src: '/shapes/sphere-yellow-4.png', ratio: 730 / 731 },
  sphereB: { src: '/shapes/sphere-blue-0.png', ratio: 731 / 729 },
  capB: { src: '/shapes/tube-blue-0.png', ratio: 800 / 670 },
};

export function ThreeDShape({
  shape,
  size = 200,
  className = '',
  priority = false,
}: {
  shape: Shape;
  /** Target width in CSS pixels. Height = size / ratio. */
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const meta = SHAPES[shape];
  const w = size;
  const h = Math.round(size / meta.ratio);
  return (
    <Image
      src={meta.src}
      alt=""
      aria-hidden
      width={w}
      height={h}
      priority={priority}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: `${w}px`, height: `${h}px` }}
    />
  );
}
