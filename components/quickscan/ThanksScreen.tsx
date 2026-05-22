'use client';

import Link from 'next/link';

export function ThanksScreen({
  copy,
  onReplay,
}: {
  copy: { title: string; sub: string; replay: string; home: string };
  onReplay: () => void;
}) {
  return (
    <section className="flex min-h-[640px] items-center justify-center bg-white px-6 py-20">
      <div className="max-w-[560px] text-center">
        <span aria-hidden className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-hy text-hb">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 className="text-[36px] font-black leading-tight tracking-display text-hb sm:text-[44px] md:text-[52px]">
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[440px] text-[17px] leading-relaxed text-hb-sec">
          {copy.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-full bg-hy px-6 py-3.5 text-[14px] font-bold text-hb transition-transform hover:-translate-y-0.5"
          >
            {copy.replay} <span aria-hidden>↻</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-hg-line bg-white px-6 py-3.5 text-[14px] font-bold text-hb hover:border-hb"
          >
            {copy.home} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
