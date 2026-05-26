import Image from 'next/image';

/**
 * 3D shapes uit de officiële Happy Horizon brand assets.
 * Geconverteerd via `scripts/build-shapes.py` van PSD-renders naar
 * geoptimaliseerde PNGs in /public/shapes/.
 */

type Shape =
  // bestaand
  | 'sphereY'
  | 'sphereY2'
  | 'sphereB'
  | 'capB'
  // Big Tube (C-arc)
  | 'bigTubeY'
  | 'bigTubeY2'
  | 'bigTubeB'
  // Small Cube (thin slab)
  | 'smallCubeY'
  | 'smallCubeY2'
  | 'smallCubeB'
  // Big Cube
  | 'cubeY';

type ShapeMeta = {
  src: string;
  /** Native aspect ratio (width / height) */
  ratio: number;
};

const SHAPES: Record<Shape, ShapeMeta> = {
  sphereY: { src: '/shapes/sphere-yellow-0.png', ratio: 731 / 729 },
  sphereY2: { src: '/shapes/sphere-yellow-4.png', ratio: 730 / 731 },
  sphereB: { src: '/shapes/sphere-blue-0.png', ratio: 731 / 729 },
  capB: { src: '/shapes/tube-blue-0.png', ratio: 800 / 670 },
  bigTubeY: { src: '/shapes/bigtube-yellow-0.png', ratio: 800 / 840 },
  bigTubeY2: { src: '/shapes/bigtube-yellow-2.png', ratio: 800 / 803 },
  bigTubeB: { src: '/shapes/bigtube-blue-0.png', ratio: 800 / 840 },
  smallCubeY: { src: '/shapes/smallcube-yellow-0.png', ratio: 800 / 596 },
  smallCubeY2: { src: '/shapes/smallcube-yellow-2.png', ratio: 800 / 657 },
  smallCubeB: { src: '/shapes/smallcube-blue-0.png', ratio: 800 / 596 },
  cubeY: { src: '/shapes/cube-yellow-0.png', ratio: 800 / 675 },
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
