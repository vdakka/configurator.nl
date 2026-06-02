import Link from 'next/link';
import {
  Circle,
  Disc,
  Plus,
  RoundedSquare,
} from '@/components/v2/decorative/GeometricShapes';
import type { HomepageContent } from '@/lib/content';

/**
 * Hero §01 — Merkboek 2026 spoor 01 "Eerste stap".
 *
 * Activerend, geel-dominant, geometrisch. Volle yellow-vlakte zodat de
 * eerste-stap-energie meteen leesbaar is. Ink-on-yellow = 14.8:1 contrast
 * (WCAG AAA). Geometrische decoraties (cirkel, vierkant, plus, driehoek)
 * floating rechts.
 *
 * Tekst-bron: bestaande `content/homepage.json` (geen wijzigingen — alleen
 * styling overgezet naar merkboek-tokens).
 */
export function HeroSection({ hero }: { hero: HomepageContent['hero'] }) {
  return (
    <section className="relative overflow-hidden bg-mk-yellow text-mk-ink">
      {/* Decoratieve shapes — gestripte palet: alleen Ink, geen coral/blue
          confetti meer. Eén grote Ink-cirkel + plus + mini-disc. Strakker. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Circle
          size={260}
          color="var(--mk-ink)"
          className="absolute -right-16 top-14 opacity-90"
        />
        <RoundedSquare
          size={120}
          color="var(--mk-ink)"
          className="absolute right-[16%] top-[44%] hidden md:block opacity-25"
        />
        <Plus
          size={70}
          color="var(--mk-ink)"
          className="absolute right-[10%] bottom-[16%] hidden md:block opacity-60"
        />
        <Disc
          size={28}
          color="var(--mk-ink)"
          className="absolute left-[8%] top-[28%] hidden md:block opacity-80"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        {/* Eyebrow meta-strip — Inter caption, scheidings-dot tussen items */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-mk-ink/70">
          {hero.metaStrip.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-mk-ink/40" />
              )}
              {item}
            </span>
          ))}
        </div>

        {/* H1 payoff in Instrument Serif — italic op de hoogtepunt-frase */}
        <h1 className="mk-h1 mt-10 max-w-[920px] text-balance text-mk-ink">
          {hero.headline.pre}{' '}
          <span className="italic">{hero.headline.highlight}</span>{' '}
          {hero.headline.post}
        </h1>

        <p className="mk-lead mt-8 max-w-[640px] text-mk-ink/85">{hero.sub}</p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          {/* Primary CTA — Ink-pill (Ink op yellow = solid stap-1 actie) */}
          <Link
            href="/v2/quickscan?start=1"
            className="inline-flex items-center gap-2 rounded-full bg-mk-ink px-7 py-4 font-inter text-[15px] font-semibold text-mk-paper transition-transform hover:-translate-y-0.5"
          >
            {hero.primaryCta}
            <span aria-hidden>→</span>
          </Link>
          {/* Secondary CTA — Ink underline link. Hover = opacity-darken
              i.p.v. coral (per brandbook is coral data/alert-only). */}
          <Link
            href="/v2/contact"
            className="font-inter text-[15px] font-semibold text-mk-ink underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {hero.secondaryCta} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
