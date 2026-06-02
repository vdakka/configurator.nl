import { Pill } from '@/components/v2/ui/Pill';
import type { AanpakContent } from '@/lib/content';

/**
 * Discovery-tijdlijn — spoor 02 "Toekomst".
 *
 * Paper-bg, 5 fases als verticale gebeurtenis-rij met week-label links en
 * inhoud rechts. Highlight-fase (week 5 go/no-go) krijgt geel-accent.
 */
export function Timeline({ data }: { data: AanpakContent['timeline'] }) {
  return (
    <section id="timeline" className="relative bg-mk-paper py-24 sm:py-28">
      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">{data.eyebrow}</Pill>
        <h2 className="mk-h2 mt-7 max-w-[820px] text-balance text-mk-ink">
          {data.title}
        </h2>
        <p className="mk-body mt-7 max-w-[700px] text-[17px] leading-[1.6] text-mk-ink/75 md:text-[18px]">
          {data.lede}
        </p>

        <ol className="mt-14 space-y-5">
          {data.phases.map((phase) => (
            <li
              key={phase.week}
              className={`grid gap-6 rounded-2xl border p-7 transition-colors sm:grid-cols-[180px_1fr] sm:gap-10 sm:p-8 ${
                phase.highlight
                  ? 'border-mk-ink bg-mk-yellow'
                  : 'border-mk-ink/12 bg-mk-paper'
              }`}
            >
              <div>
                <span
                  className={`font-inter text-[11px] font-semibold uppercase tracking-[0.15em] ${phase.highlight ? 'text-mk-ink/75' : 'text-mk-muted'}`}
                >
                  {phase.week}
                </span>
                <p
                  className={`mt-2 font-instrument text-[20px] leading-tight sm:text-[22px] ${phase.highlight ? 'text-mk-ink' : 'text-mk-ink'}`}
                >
                  {phase.title}
                </p>
              </div>
              <div>
                <p
                  className={`font-inter text-[15px] leading-[1.6] ${phase.highlight ? 'text-mk-ink/85' : 'text-mk-ink/75'}`}
                >
                  {phase.body}
                </p>
                <p
                  className={`mt-3 font-inter text-[12px] font-medium ${phase.highlight ? 'text-mk-ink/70' : 'text-mk-muted'}`}
                >
                  {phase.who}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
