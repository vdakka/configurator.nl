import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { ThreeDShape } from '@/components/ui/ThreeDShape';
import { SectionId } from '@/components/ui/SectionId';
import type { HomepageContent } from '@/lib/content';

export function QuickscanTeaser({
  data,
}: {
  data: HomepageContent['quickscanTeaser'];
}) {
  return (
    <section className="relative overflow-hidden bg-hy py-24 text-hb sm:py-32">
      <SectionId num="06" label="quickscan" />
      {/* Faint blue background circles */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[720px] w-[720px] rounded-full"
        style={{ background: 'rgba(7,7,51,0.04)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full"
        style={{ background: 'rgba(7,7,51,0.05)' }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[8%] animate-float3 opacity-90"
      >
        <ThreeDShape shape="smallCubeY2" size={130} />
      </div>

      <div className="relative mx-auto grid max-w-page gap-16 px-6 sm:px-8 lg:grid-cols-[6fr_5fr] lg:items-center">
        {/* LEFT: copy */}
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-[40px] font-black leading-[0.98] tracking-display sm:text-[56px] md:text-[72px]">
            {data.title}
          </h2>
          <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-hb/80 md:text-[19px]">
            {data.lede}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            {data.meta.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hb text-[12px] font-bold text-hy">
                  {m.value}
                </span>
                <span className="mono-label text-[12px] text-hb">{m.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/quickscan?start=1" variant="dark">
              {data.cta} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>

        {/* RIGHT: card stack visual */}
        <div className="relative flex h-[420px] items-center justify-center sm:h-[480px]">
          {/* Background card layers */}
          <div
            aria-hidden
            className="absolute h-[260px] w-[300px] -translate-x-12 rounded-3xl bg-hb shadow-[0_25px_60px_-20px_rgba(7,7,51,0.4)]"
            style={{ transform: 'rotate(-10deg) translate(-40px, -10px)' }}
          />
          <div
            aria-hidden
            className="absolute h-[260px] w-[300px] rounded-3xl bg-white opacity-60 shadow-[0_25px_60px_-20px_rgba(7,7,51,0.3)]"
            style={{ transform: 'rotate(8deg) translate(40px, 30px)' }}
          />

          {/* Front card */}
          <Link
            href="/quickscan?start=1"
            aria-label="Start de quickscan (voorbeeldkaart)"
            className="group/card relative block w-[320px] rounded-3xl bg-white p-8 shadow-[0_30px_70px_-20px_rgba(7,7,51,0.35),0_8px_20px_-8px_rgba(7,7,51,0.15)] transition-transform hover:-translate-y-1 hover:rotate-[-1deg] sm:w-[340px]"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <span
              aria-hidden
              className="absolute -right-2 -top-2 rounded-full bg-hb px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-mono text-hy shadow-[0_6px_16px_-4px_rgba(7,7,51,0.35)]"
            >
              Voorbeeld
            </span>
            <span className="mono-label text-[10px] text-hb-sec">{data.exampleLabel}</span>
            <p className="mt-6 text-[20px] font-black leading-snug tracking-heading text-hb sm:text-[22px]">
              {data.exampleStatement}
            </p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-mono text-hb-sec">← Niet</span>
              <div className="flex items-center gap-3">
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
              <span className="text-[10px] font-bold uppercase tracking-mono text-hb-sec">Ja →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
