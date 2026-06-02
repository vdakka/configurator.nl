/**
 * Icon — wrapper voor merkboek-iconografie.
 *
 * Merkboek 2026: "Iconografie: 2pt stroke, rounded caps, geen vullingen,
 * geen schaduwen." Alle iconen volgen dit voorschrift en gebruiken
 * `currentColor` zodat Tailwind utilities (text-mk-ink / text-mk-lime)
 * de tint sturen.
 *
 * Eerste set (4 iconen voor DiscoveryFramework axes):
 *  - target   — Strategie
 *  - figures  — Mensen
 *  - nodes    — Proces
 *  - chip     — Technologie
 *
 * Uitbreidbaar: voeg nieuwe `IconName` toe + path in `PATHS`.
 */

import type { JSX } from 'react';

export type IconName = 'target' | 'figures' | 'nodes' | 'chip';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const ICON_BODIES: Record<IconName, JSX.Element> = {
  // Target — concentrische cirkels + crosshair, "doel"
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 1 L12 5" />
      <path d="M12 19 L12 23" />
      <path d="M1 12 L5 12" />
      <path d="M19 12 L23 12" />
    </>
  ),
  // Figures — twee personen, het tweede iets achter het eerste
  figures: (
    <>
      <circle cx="8.5" cy="7" r="3" />
      <path d="M3 21 C 3 16.5 5.5 14 8.5 14 C 11.5 14 14 16.5 14 21" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M14.5 21 C 14.5 17.5 16 15.5 18 15.5 C 20 15.5 21.5 17.5 21.5 21" />
    </>
  ),
  // Nodes — netwerk van drie verbonden knopen, "proces"
  nodes: (
    <>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="19" r="2.5" />
      <path d="M7.5 6 L 16.5 6" />
      <path d="M6.5 8 L 10.5 17" />
      <path d="M17.5 8 L 13.5 17" />
    </>
  ),
  // Chip — vierkant met terminals, "technologie"
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M9 10 L9 14" />
      <path d="M12 10 L12 14" />
      <path d="M15 10 L15 14" />
      <path d="M9 3 L9 6" />
      <path d="M12 3 L12 6" />
      <path d="M15 3 L15 6" />
      <path d="M9 18 L9 21" />
      <path d="M12 18 L12 21" />
      <path d="M15 18 L15 21" />
      <path d="M3 9 L6 9" />
      <path d="M3 12 L6 12" />
      <path d="M3 15 L6 15" />
      <path d="M18 9 L21 9" />
      <path d="M18 12 L21 12" />
      <path d="M18 15 L21 15" />
    </>
  ),
};

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {ICON_BODIES[name]}
    </svg>
  );
}
