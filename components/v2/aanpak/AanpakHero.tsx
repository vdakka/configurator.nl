import Link from 'next/link';
import { Circle, Plus } from '@/components/v2/decorative/GeometricShapes';
import { Pill } from '@/components/v2/ui/Pill';
import type { AanpakContent } from '@/lib/content';

/**
 * Slim hero voor /v2/aanpak — Merkboek 2026 spoor 01 "Eerste stap".
 *
 * Compactere variant van home-hero: minder hoog, lichtere geometrische
 * accents. Stats-strip onder de CTAs.
 */
export function AanpakHero({
  hero,
  stats,
}: {
  hero: AanpakContent['hero'];
  stats: AanpakContent['stats'];
}) {
  return (
    <section className="relative overflow-hidden bg-mk-yellow text-mk-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Circle
          size={180}
          color="var(--mk-ink)"
          className="absolute -right-8 top-10 opacity-40"
        />
        <Plus
          size={50}
          color="var(--mk-ink)"
          className="absolute right-[28%] bottom-[18%] hidden md:block opacity-60"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 py-20 sm:px-8 sm:py-24">
        <Pill variant="category" className="bg-mk-paper">
          {hero.eyebrow}
        </Pill>
        <h1 className="mk-h1 mt-8 max-w-[920px] text-balance text-mk-ink">
          {hero.headline.pre}{' '}
          <span className="italic">{hero.headline.highlight}</span>{' '}
          {hero.headline.post}
        </h1>
        <p className="mk-lead mt-7 max-w-[640px] text-mk-ink/85">{hero.sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="/v2/contact"
            className="inline-flex items-center gap-2 rounded-full bg-mk-ink px-7 py-4 font-inter text-[15px] font-semibold text-mk-paper transition-transform hover:-translate-y-0.5"
          >
            {hero.primaryCta}
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#timeline"
            className="font-inter text-[15px] font-semibold text-mk-ink underline decoration-2 underline-offset-4 transition-colors hover:text-mk-coral"
          >
            {hero.secondaryCta} <span aria-hidden>↓</span>
          </a>
        </div>

        {/* Stats strip — 4 KPI's anchor onder de hero */}
        <dl className="mt-14 grid gap-6 border-t border-mk-ink/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-instrument text-[32px] leading-none text-mk-ink sm:text-[40px]">
                {s.value}
              </dt>
              <dd className="mt-2 font-inter text-[12px] font-semibold uppercase tracking-[0.15em] text-mk-ink/70">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
