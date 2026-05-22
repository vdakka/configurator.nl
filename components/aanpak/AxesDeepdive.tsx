import { Eyebrow } from '@/components/ui/Eyebrow';
import { ThreeDShape } from '@/components/ui/ThreeDShape';
import type { AanpakContent } from '@/lib/content';

export function AxesDeepdive({
  intro,
  axes,
}: {
  intro: AanpakContent['axesIntro'];
  axes: AanpakContent['axes'];
}) {
  return (
    <section className="bg-hb py-24 text-white sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow tone="yellow">{intro.eyebrow}</Eyebrow>
        <h2 className="mt-6 text-[36px] font-black leading-[1.05] tracking-display sm:text-[52px] md:text-[68px]">
          {intro.title}
          <br />
          <span className="text-white/60">{intro.titleSub}</span>
        </h2>
        <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-white/70 md:text-[19px]">
          {intro.lede}
        </p>

        <div className="mt-20 space-y-20">
          {axes.map((axis, i) => (
            <AxisArticle key={axis.id} axis={axis} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AxisArticle({
  axis,
  reverse,
}: {
  axis: AanpakContent['axes'][number];
  reverse: boolean;
}) {
  return (
    <article
      id={axis.id}
      className="relative grid scroll-mt-32 gap-12 border-t border-white/10 pt-16 lg:grid-cols-[1fr_2fr] lg:gap-16"
    >
      <div className={`relative ${reverse ? 'lg:order-2' : ''}`}>
        <div className="relative inline-flex items-center justify-center">
          <ThreeDShape shape={axis.shape} size={220} className="animate-float1" />
          <span
            aria-hidden
            className="absolute -right-3 -top-2 rounded-full border border-hb1/40 bg-hb-soft px-3 py-1 font-mono text-[10px] uppercase tracking-mono text-hb1"
          >
            {axis.tag}
          </span>
        </div>
      </div>

      <div className={reverse ? 'lg:order-1' : ''}>
        <h3 className="text-[28px] font-black leading-tight tracking-heading sm:text-[36px] md:text-[40px]">
          {axis.title}
          <br />
          <span className="text-white/60">{axis.titleSub}</span>
        </h3>
        <p className="mt-5 max-w-[720px] text-[16px] leading-relaxed text-white/78 md:text-[17px]">
          {axis.intro}
        </p>

        <div className="mt-10 grid gap-12 sm:grid-cols-2">
          <div>
            <h4 className="mono-label text-[11px] text-hy">Vragen die we beantwoorden</h4>
            <ul className="mt-4 space-y-3">
              {axis.questions.map((q) => (
                <li key={q} className="flex items-start gap-3 text-[14px] leading-relaxed text-white/85">
                  <span aria-hidden className="mt-0.5 font-mono font-bold text-hy">?</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mono-label text-[11px] text-hy">Wat krijg je</h4>
            <ul className="mt-4 space-y-3">
              {axis.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[14px] leading-relaxed text-white/85">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hy" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
