/**
 * Smile-mark — inline SVG semi-cirkel-arc.
 *
 * Merkboek 2026 (V1.0) regels:
 *  - Curve onder het woordmerk, gecentreerd, nooit losgekoppeld
 *  - Strak, 2pt-stroke (rounded caps)
 *  - Geen vulling, geen schaduw
 *
 * Hergebruikt voor:
 *  - In `MerkboekLogo` onder de wordmark
 *  - In de footer-merkbalk (smile links, claim rechts)
 *  - Decoratief in spoor-01 secties (geel/geometrisch)
 *
 * Pure SVG, geen state, geen hooks → renderbaar als RSC.
 */

type SmileMarkProps = {
  /** Hoogte in pixels. Breedte schaalt mee via viewBox (2.5:1 ratio). Default 16. */
  size?: number;
  /** Strokekleur. Default `currentColor` zodat `text-*` Tailwind utilities werken. */
  color?: string;
  /** Stroke-breedte in viewBox-eenheden (viewBox = 100x40). Default 6 = ~2.4px op size 16. */
  stroke?: number;
  className?: string;
};

export function SmileMark({
  size = 16,
  color = 'currentColor',
  stroke = 6,
  className,
}: SmileMarkProps) {
  const viewBoxW = 100;
  const viewBoxH = 40;
  // Width volgt aspect-ratio van viewBox (2.5:1)
  const width = (size * viewBoxW) / viewBoxH;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={size}
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Quadratic Bezier: (8,8) → (92,8) met controlepunt (50,60).
          Curve dipt naar y≈26 in het midden = ronde smile met natuurlijke
          curvature. linecap=round voldoet aan merkboek-spec. */}
      <path
        d="M 8 8 Q 50 60 92 8"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
