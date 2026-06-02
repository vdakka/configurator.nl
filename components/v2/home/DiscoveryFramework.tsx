import Link from 'next/link';
import { OrganicBlob } from '@/components/v2/decorative/OrganicBlob';
import { Pill } from '@/components/v2/ui/Pill';
import { Icon, type IconName } from '@/components/v2/ui/Icon';
import type { HomepageContent } from '@/lib/content';

/**
 * §07 aanpak — Merkboek 2026 spoor 02 "Toekomst".
 *
 * Reflectief, Paper-dominant, één subtiele lime blob op de achtergrond.
 * Vier kaarten (Strategie / Mensen / Proces / Technologie) met merkboek-
 * iconografie (2pt stroke, geen vulling), Instrument Serif step-nummers
 * in lime, Inter body, category-pills voor chips.
 *
 * Bewust statisch (geen IntersectionObserver / auto-cycle) — rustig
 * tempo past bij thought-leadership spoor 02.
 */
export function DiscoveryFramework({
  data,
}: {
  data: HomepageContent['discovery'];
}) {
  return (
    <section className="relative overflow-hidden bg-mk-paper py-24 sm:py-28">
      {/* Eén grote, subtiele blob — geen visual noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 opacity-50"
      >
        <OrganicBlob
          size={520}
          variant="c"
          rotation={12}
          idSuffix="discovery"
          colorFrom="var(--mk-lime)"
          colorTo="var(--mk-paper)"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <div className="max-w-[900px]">
          <Pill variant="service">{data.eyebrow}</Pill>
          <h2 className="mk-h2 mt-7 text-balance text-mk-ink">
            Wij nemen de regie. In{' '}
            <span className="italic">deze volgorde</span>.
          </h2>
          <p className="mk-body mt-7 max-w-[700px] text-[17px] leading-[1.6] text-mk-ink/75 md:text-[18px]">
            {data.lede}
          </p>
        </div>

        <ol className="mt-16 grid gap-7 lg:grid-cols-4 lg:gap-5">
          {data.axes.map((axis, i) => (
            <StepCard key={axis.id} axis={axis} index={i} />
          ))}
        </ol>

        <div className="mt-14 flex justify-end">
          <Link
            href="/v2/aanpak"
            className="inline-flex items-center gap-2 rounded-full border-2 border-mk-ink px-6 py-3.5 font-inter text-[14px] font-semibold text-mk-ink transition-colors hover:bg-mk-ink hover:text-mk-paper"
          >
            {data.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  axis,
  index,
}: {
  axis: HomepageContent['discovery']['axes'][number];
  index: number;
}) {
  return (
    <li className="group relative flex flex-col gap-5 rounded-2xl border border-mk-ink/10 bg-mk-paper p-7 transition-colors hover:border-mk-ink/30">
      {/* Step-nummer als groot italic display, lime accent */}
      <div className="flex items-start justify-between">
        <span className="font-instrument text-[44px] italic leading-none text-mk-lime">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon
          name={axis.glyph as IconName}
          size={32}
          className="text-mk-ink/70 transition-colors group-hover:text-mk-ink"
        />
      </div>

      <div>
        <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
          Stap {String(index + 1).padStart(2, '0')}
        </span>
        <p className="mt-2 font-instrument text-[24px] leading-tight text-mk-ink">
          {axis.label}
        </p>
      </div>

      <p className="mk-body text-[14px] leading-[1.55] text-mk-ink/75">
        {axis.detailBody}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5">
        {axis.chips.slice(0, 3).map((chip) => (
          <li key={chip}>
            <Pill variant="category" size="sm">
              {chip}
            </Pill>
          </li>
        ))}
      </ul>
    </li>
  );
}
