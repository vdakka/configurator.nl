import { OrganicBlob } from '@/components/v2/decorative/OrganicBlob';
import { Pill } from '@/components/v2/ui/Pill';
import type { StatsConfig } from '@/lib/content';

/**
 * §05 ROI — Merkboek 2026 spoor 02 "Toekomst".
 *
 * Beige-achtergrond met grote lime-blob op de achtergrond. KPI's gebruiken
 * gevarieerde pill-kleuren: yellow → coral → blue. Per brandbook zijn coral
 * en blue gereserveerd voor "data visualization" — KPI's vallen daar
 * letterlijk onder, en de variatie geeft elke metric eigen visuele identiteit
 * i.p.v. drie identieke gele balken.
 */

// KPI-rotatie: yellow (eerste impact: snelheid) → coral (data: kwaliteit) →
// blue (data: conversie). Past brandbook-regels op data viz.
const KPI_VARIANTS = ['result', 'data', 'dataAlt'] as const;
export function ROIStrip({ stats }: { stats: StatsConfig }) {
  return (
    <section className="relative overflow-hidden bg-mk-beige py-24 text-mk-ink sm:py-28">
      {/* Grote organische blob op achtergrond — reflectieve toon */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 opacity-50"
      >
        <OrganicBlob
          size={520}
          variant="a"
          rotation={42}
          idSuffix="roi"
          colorFrom="var(--mk-lime)"
          colorTo="var(--mk-paper)"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <div className="grid items-end gap-10 border-b border-mk-ink/15 pb-10 md:grid-cols-[1fr_auto]">
          <h2 className="mk-h2 max-w-[760px] text-balance text-mk-ink">
            Wat een goed geïntegreerde configurator{' '}
            <span className="italic">oplevert</span>.
          </h2>
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
            Externe benchmark · Forrester / Gartner / Salesforce
            <SourceFootnote sources={stats.sources} />
          </p>
        </div>

        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {stats.heroStats.map((s, i) => (
            <li key={s.label} className="flex flex-col gap-5">
              <Pill variant={KPI_VARIANTS[i % KPI_VARIANTS.length]} size="sm">
                KPI {String(i + 1).padStart(2, '0')}
              </Pill>
              <div className="font-instrument leading-none text-mk-ink">
                <span className="text-[44px] sm:text-[56px] md:text-[64px]">
                  {s.display}
                </span>
              </div>
              <p className="mk-body max-w-[280px] text-mk-ink/75">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Compact asterisk dat bij hover/focus de bronvermelding toont. Inter +
 * Ink-panel, paper-tekst. Matcht /v2 stijl.
 */
function SourceFootnote({ sources }: { sources: string[] }) {
  return (
    <span className="group relative inline-flex align-baseline">
      <button
        type="button"
        aria-describedby="v2-roi-sources"
        className="ml-1 inline-flex items-baseline font-instrument text-[16px] font-bold text-mk-ink transition-colors hover:text-mk-coral focus-visible:text-mk-coral focus-visible:outline-none"
      >
        *<span className="sr-only">Bronnen</span>
      </button>
      <span
        id="v2-roi-sources"
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-10 mt-2 w-[340px] max-w-[80vw] rounded-2xl bg-mk-ink p-5 text-left font-inter text-[12px] font-medium normal-case leading-[1.55] tracking-normal text-mk-paper opacity-0 shadow-[0_18px_40px_-12px_rgba(17,20,28,0.45)] transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <span className="block font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-yellow">
          Bronnen
        </span>
        <ul className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <li key={src}>{src}</li>
          ))}
        </ul>
      </span>
    </span>
  );
}
