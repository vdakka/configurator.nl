/**
 * Pill — kleur-gecodeerde tag-component volgens Merkboek 2026.
 *
 * "Pill-systeem: ronde uiteinden, één regel, kleur = categorie."
 *
 * Varianten:
 *  - `category`: Ink op Paper (border) — neutraal, voor service-tags
 *  - `result`:   Ink op Yellow — voor KPI / result-tags (+38% CVR)
 *  - `service`: Ink op Lime — voor toekomst-spoor service-tags
 *  - `data`:    Paper op Coral — voor data-/accent-tags
 *  - `dataAlt`: Paper op Blue — alternatieve data-tag
 *  - `outline`: Paper-tekst, Paper-border — voor donkere achtergronden
 */

import { type ReactNode } from 'react';

type PillVariant =
  | 'category'
  | 'result'
  | 'service'
  | 'data'
  | 'dataAlt'
  | 'outline';

type PillProps = {
  variant?: PillVariant;
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
};

const VARIANT_CLASSES: Record<PillVariant, string> = {
  category: 'border border-mk-ink/15 bg-mk-paper text-mk-ink',
  result: 'bg-mk-yellow text-mk-ink',
  service: 'bg-mk-lime text-mk-ink',
  data: 'bg-mk-coral text-mk-paper',
  dataAlt: 'bg-mk-blue text-mk-paper',
  outline: 'border border-mk-paper/30 text-mk-paper',
};

const SIZE_CLASSES = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3.5 py-1.5 text-[12px]',
} as const;

export function Pill({
  variant = 'category',
  size = 'md',
  children,
  className,
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full font-inter font-semibold leading-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
