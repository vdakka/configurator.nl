'use client';

import type { Profile } from '@/lib/quickscan-logic';

type Option = { id: Profile; tag: string; label: string; desc: string };

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
    <section className="bg-hg px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-[880px] text-center">
        <span className="mono-label text-[11px] text-hb-sec">{copy.eyebrow}</span>
        <h2 className="mt-4 text-[32px] font-black leading-tight tracking-display text-hb sm:text-[40px] md:text-[44px]">
          {copy.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[16px] text-hb-sec">{copy.lede}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {copy.options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onChoose(o.id)}
              className="group flex flex-col items-start gap-4 rounded-xl border-2 border-transparent bg-white p-7 text-left transition-all hover:-translate-y-0.5 hover:border-hb hover:shadow-[0_20px_40px_-15px_rgba(7,7,51,0.2)]"
            >
              <span className="mono-label text-[10px] text-hb-sec">{o.tag}</span>
              <span className="text-[20px] font-black tracking-heading text-hb">{o.label}</span>
              <span className="text-[13px] leading-relaxed text-hb-sec">{o.desc}</span>
              <span aria-hidden className="mt-auto text-[20px] font-bold text-hb transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] text-hb-sec">{copy.foot}</p>
      </div>
    </section>
  );
}
