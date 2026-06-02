'use client';

import Link from 'next/link';

/**
 * Quickscan thanks — Merkboek 2026 stijl.
 * Paper-bg, geel check-icon, Instrument Serif H2.
 */
export function ThanksScreen({
  copy,
  onReplay,
}: {
  copy: { title: string; sub: string; replay: string; home: string };
  onReplay: () => void;
}) {
  return (
    <section className="flex min-h-[640px] items-center justify-center bg-mk-paper px-6 py-20">
      <div className="max-w-[560px] text-center">
        <span
          aria-hidden
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-mk-yellow text-mk-ink"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 className="mk-h2 text-mk-ink">{copy.title}</h2>
        <p className="mk-body mx-auto mt-5 max-w-[440px] text-[17px] leading-relaxed text-mk-ink/75">
          {copy.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-full bg-mk-yellow px-6 py-3.5 font-inter text-[14px] font-semibold text-mk-ink transition-transform hover:-translate-y-0.5"
          >
            {copy.replay} <span aria-hidden>↻</span>
          </button>
          <Link
            href="/v2"
            className="inline-flex items-center gap-2 rounded-full border border-mk-ink/20 bg-mk-paper px-6 py-3.5 font-inter text-[14px] font-semibold text-mk-ink hover:border-mk-ink"
          >
            {copy.home} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
