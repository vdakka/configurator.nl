/**
 * Happy Horizon Merkboek 2026 — design tokens als TypeScript-constantes.
 *
 * Spiegelt de waarden uit `tailwind.config.ts` en `app/globals.css` zodat
 * SVG- en canvas-componenten (smile-mark, organische blobs, geometrische
 * accents) dezelfde kleuren kunnen gebruiken zonder via een Tailwind-class
 * te hoeven om te lopen.
 *
 * Single source of truth: bij wijziging van een kleur ook hier aanpassen.
 */

export const merkboekColors = {
  ink: '#11141C',
  paper: '#FAF8F2',
  yellow: '#FFD23F',
  lime: '#D8E84A',
  beige: '#E9DFC9',
  coral: '#E85D3A',
  blue: '#3A5BE8',
  muted: '#6E6F76',
} as const;

export type MerkboekColor = keyof typeof merkboekColors;

/** Twee visuele sporen uit het merkboek (niet mengen binnen één sectie). */
export const merkboekTracks = {
  /** Spoor 01 — "Eerste stap": geel-dominant, geometrisch, activerend.
   *  Voor conversie-momenten (hero-CTA, quickscan, contact). */
  eersteStap: {
    surface: merkboekColors.yellow,
    text: merkboekColors.ink,
    accent: merkboekColors.ink,
  },
  /** Spoor 02 — "Toekomst": lime + beige, organische blobs/gradiënten,
   *  reflectief. Voor verhaal / thought-leadership. */
  toekomst: {
    surface: merkboekColors.beige,
    text: merkboekColors.ink,
    accent: merkboekColors.lime,
  },
} as const;

/**
 * Aanbevolen kleurverhouding per asset (Merkboek 2026, V1.0).
 * Hint voor design-audits — niet code-enforced.
 */
export const merkboekColorRatio = {
  paper: 0.55,
  ink: 0.25,
  yellow: 0.15,
  accent: 0.05,
} as const;

/** Minimaal logoformaat in pixels (digitaal). */
export const merkboekLogoMinSize = 24;
