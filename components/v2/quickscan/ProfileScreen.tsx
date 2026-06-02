'use client';

import { Pill } from '@/components/v2/ui/Pill';
import type { Profile } from '@/lib/quickscan-logic';

type Option = { id: Profile; tag: string; label: string; desc: string };

/**
 * Quickscan profielkeuze — Merkboek 2026 stijl.
 * Paper-bg, drie kaarten met Ink-border + Instrument Serif label.
 * Hover/focus: Ink-fill border, lift-translate.
 */
export function ProfileScreen({
  copy,
  onChoose,
}: {
  copy: {
    eyebrow: string;
    title: string;
    lede: string;
    options: Option[];
    foot: string;
  };
  onChoose: (profile: Profile) => void;
}) {
  return (
    <section className="bg-mk-paper px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[920px] text-center">
        <Pill variant="service">{copy.eyebrow}</Pill>
        <h2 className="mk-h2 mt-6 text-balance text-mk-ink">{copy.title}</h2>
        <p className="mx-auto mt-5 max-w-[560px] font-inter text-[16px] leading-[1.6] text-mk-ink/75">
          {copy.lede}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {copy.options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onChoose(o.id)}
              className="group flex flex-col items-start gap-4 rounded-2xl border-2 border-mk-ink/15 bg-mk-paper p-7 text-left transition-all hover:-translate-y-0.5 hover:border-mk-ink hover:bg-mk-beige"
            >
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
                {o.tag}
              </span>
              <span className="font-instrument text-[22px] leading-tight text-mk-ink">
                {o.label}
              </span>
              <span className="font-inter text-[14px] leading-[1.55] text-mk-ink/75">
                {o.desc}
              </span>
              <span
                aria-hidden
                className="mt-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-mk-ink text-mk-paper transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 font-inter text-[12px] text-mk-muted">{copy.foot}</p>
      </div>
    </section>
  );
}
