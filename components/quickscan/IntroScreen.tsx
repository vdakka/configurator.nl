'use client';

import { Button } from '@/components/ui/Button';

type Copy = {
  eyebrow: string;
  title: string;
  sub: string;
  metaItems: string[];
  cta: string;
};

export function IntroScreen({
  copy,
  onStart,
}: {
  copy: Copy;
  onStart: () => void;
}) {
  return (
    <section className="relative grid min-h-[640px] items-center gap-12 overflow-hidden bg-white px-6 py-16 sm:px-12 lg:grid-cols-[1.1fr_1fr]">
      {/* Yellow circle decor */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-260px] top-1/2 -translate-y-1/2 rounded-full bg-hy"
        style={{ width: 720, height: 720 }}
      />

      <div className="relative z-10 lg:pl-12">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-eyebrow text-hb">
          <span className="h-1.5 w-1.5 rounded-full bg-hb" /> {copy.eyebrow}
        </span>
        <h1 className="mt-6 text-[40px] font-black leading-[0.96] tracking-display text-hb sm:text-[56px] md:text-[68px] lg:text-[76px]">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-[480px] text-[17px] font-medium text-hb/78 md:text-[19px]">
          {copy.sub}
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {copy.metaItems.map((m, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2 rounded-full bg-hb px-3 py-1.5 text-[12px] font-bold text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-hy" />
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button onClick={onStart} variant="primary">
            {copy.cta} <span aria-hidden>→</span>
          </Button>
        </div>
      </div>

      <div className="relative z-10 hidden h-[480px] items-center justify-center lg:flex">
        <span
          aria-hidden
          className="absolute h-[280px] w-[300px] rounded-3xl bg-hb opacity-90"
          style={{ transform: 'rotate(-12deg) translate(-30px, -10px) scale(0.85)' }}
        />
        <span
          aria-hidden
          className="absolute h-[280px] w-[300px] rounded-3xl bg-white opacity-70 shadow-[0_20px_50px_-15px_rgba(7,7,51,0.25)]"
          style={{ transform: 'rotate(6deg) translate(30px, 20px) scale(0.92)' }}
        />
        <div
          className="relative w-[320px] rounded-3xl bg-white p-8 shadow-[0_30px_70px_-20px_rgba(7,7,51,0.35)]"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <span className="mono-label text-[10px] text-hb-sec">Stelling · 03 / 10</span>
          <p className="mt-5 text-[20px] font-black leading-tight tracking-heading text-hb">
            Een offerte maken kost ons gemiddeld meer dan een uur.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-hg text-hb">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-hy text-hb">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
