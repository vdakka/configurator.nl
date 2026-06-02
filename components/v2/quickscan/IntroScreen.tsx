'use client';

import { Pill } from '@/components/v2/ui/Pill';

type Copy = {
  eyebrow: string;
  title: string;
  sub: string;
  metaItems: string[];
  cta: string;
};

/**
 * Quickscan intro — Merkboek 2026 stijl.
 * Spoor 01 hero met geel-disc decor links, voorbeeld-card rechts.
 */
export function IntroScreen({
  copy,
  onStart,
}: {
  copy: Copy;
  onStart: () => void;
}) {
  return (
    <section className="relative grid min-h-[640px] items-center gap-12 overflow-hidden bg-mk-paper px-6 py-16 sm:px-12 lg:grid-cols-[1.1fr_1fr]">
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-260px] top-1/2 -translate-y-1/2 rounded-full bg-mk-yellow"
        style={{ width: 720, height: 720 }}
      />

      <div className="relative z-10 lg:pl-12">
        <Pill variant="category" className="bg-mk-paper">
          {copy.eyebrow}
        </Pill>
        <h1 className="mk-h1 mt-7 max-w-[640px] text-balance text-mk-ink">
          {copy.title}
        </h1>
        <p className="mk-lead mt-7 max-w-[480px] text-mk-ink/80">{copy.sub}</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {copy.metaItems.map((m, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2 rounded-full bg-mk-ink px-3 py-1.5 font-inter text-[12px] font-semibold text-mk-paper"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mk-yellow" />
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-full bg-mk-ink px-7 py-4 font-inter text-[15px] font-semibold text-mk-paper transition-transform hover:-translate-y-0.5"
          >
            {copy.cta}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 hidden h-[480px] items-center justify-center lg:flex">
        <span
          aria-hidden
          className="absolute h-[280px] w-[300px] rounded-3xl bg-mk-ink opacity-90"
          style={{ transform: 'rotate(-12deg) translate(-30px, -10px) scale(0.85)' }}
        />
        <span
          aria-hidden
          className="absolute h-[280px] w-[300px] rounded-3xl bg-mk-paper opacity-70 shadow-[0_20px_50px_-15px_rgba(17,20,28,0.25)]"
          style={{ transform: 'rotate(6deg) translate(30px, 20px) scale(0.92)' }}
        />
        <div
          className="relative w-[320px] rounded-3xl bg-mk-paper p-8 shadow-[0_30px_70px_-20px_rgba(17,20,28,0.35)]"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
            Stelling · 03 / 10
          </span>
          <p className="mt-5 font-instrument text-[22px] leading-tight text-mk-ink">
            Een offerte maken kost ons gemiddeld meer dan een uur.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-mk-ink/15 bg-mk-paper text-mk-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mk-yellow text-mk-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
