import { Eyebrow } from '@/components/ui/Eyebrow';
import type { AanpakContent } from '@/lib/content';

export function Timeline({ data }: { data: AanpakContent['timeline'] }) {
  return (
    <section id="tijdlijn" className="scroll-mt-32 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-[800px] text-[32px] font-black leading-[1.05] tracking-display sm:text-[44px] md:text-[56px]">
          {data.title}
        </h2>
        <p className="mt-6 max-w-[680px] text-[16px] leading-relaxed text-hb-sec md:text-[17px]">
          {data.lede}
        </p>

        <ol className="mt-16 space-y-6">
          {data.phases.map((p) => (
            <li
              key={p.week}
              className="grid gap-6 sm:grid-cols-[140px_1fr] sm:gap-10"
            >
              <div className="border-r-0 border-hg-line sm:border-r-2 sm:pr-6">
                <span className="text-[24px] font-black tracking-heading text-hb">{p.week}</span>
              </div>
              <article
                className={`rounded-xl p-7 ${
                  p.highlight
                    ? 'bg-hb text-white'
                    : 'border border-hg-line bg-white text-hb'
                }`}
              >
                <h3
                  className={`text-[20px] font-black tracking-heading ${
                    p.highlight ? 'text-hy' : 'text-hb'
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-3 text-[15px] leading-relaxed ${
                    p.highlight ? 'text-white/80' : 'text-hb-sec'
                  }`}
                >
                  {p.body}
                </p>
                <p
                  className={`mt-5 inline-block rounded-sm border border-dashed px-3 py-1 font-mono text-[11px] ${
                    p.highlight ? 'border-white/40 text-white/70' : 'border-hg-line text-hb-sec'
                  }`}
                >
                  {p.who}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
