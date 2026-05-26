import { SectionId } from '@/components/ui/SectionId';
import type { StatsConfig } from '@/lib/content';

export function ROIStrip({ stats }: { stats: StatsConfig }) {
  return (
    <section className="relative bg-hg py-20 text-hb sm:py-24">
      <SectionId num="04" label="kpi" />
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <div className="grid items-end gap-10 border-b border-hg-line pb-10 md:grid-cols-[1fr_auto]">
          <h2 className="max-w-[760px] text-[28px] font-black leading-[1.06] tracking-display sm:text-[36px] md:text-[42px]">
            Wat een goed geïntegreerde configurator oplevert.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-hb-sec">
            Cijfers uit de praktijk
            <SourceFootnote sources={stats.sources} />
          </p>
        </div>

        <ul className="mt-12 grid gap-12 md:grid-cols-3">
          {stats.heroStats.map((s, i) => (
            <li key={s.label} className="border-l-2 border-hy pl-6">
              <span className="mono-label block text-[10px] text-hb-sec">
                KPI {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-4 font-black leading-none tracking-display text-hb">
                <span className="text-[44px] sm:text-[60px] md:text-[68px]">
                  {s.display}
                </span>
              </div>
              <p className="mt-6 max-w-[280px] text-[15px] leading-[1.5] text-hb-sec">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Klein asterisk-symbool dat bij hover (of focus, voor toetsenbord-toegang)
 * de volledige bronvermelding toont in een tooltip. Compact ritme in de sectie.
 */
function SourceFootnote({ sources }: { sources: string[] }) {
  return (
    <span className="group relative inline-flex align-baseline">
      <button
        type="button"
        aria-describedby="roi-sources"
        className="ml-0.5 inline-flex items-baseline text-[14px] font-black text-hb transition-colors hover:text-hy focus-visible:text-hy focus-visible:outline-none"
      >
        *
        <span className="sr-only">Bronnen</span>
      </button>
      <span
        id="roi-sources"
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-10 mt-2 w-[340px] max-w-[80vw] rounded-md bg-hb p-4 text-left text-[12px] font-medium normal-case leading-[1.55] tracking-normal text-white opacity-0 shadow-[0_18px_40px_-12px_rgba(7,7,51,0.45)] transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <span className="mono-label block text-[10px] text-hy">Bronnen</span>
        <ul className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <li key={src}>{src}</li>
          ))}
        </ul>
      </span>
    </span>
  );
}
