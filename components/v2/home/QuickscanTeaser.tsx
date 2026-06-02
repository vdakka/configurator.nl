import Link from 'next/link';
import {
  Circle,
  Plus,
  RoundedSquare,
} from '@/components/v2/decorative/GeometricShapes';
import { Pill } from '@/components/v2/ui/Pill';
import type { HomepageContent } from '@/lib/content';

/**
 * §06 quickscan-teaser — Merkboek 2026 spoor 01 "Eerste stap".
 *
 * Conversie-moment: geel-dominant, ink-typografie, geometrische accents.
 * Match met §01 hero zodat het CTA-ritme van de pagina helder is.
 *
 * Bewust strakker dan het origineel: één heldere example-card op Paper
 * met statement-preview, geen card-stack-illusie. Less kleur, meer focus.
 */
export function QuickscanTeaser({
  data,
}: {
  data: HomepageContent['quickscanTeaser'];
}) {
  return (
    <section className="relative overflow-hidden bg-mk-yellow py-24 text-mk-ink sm:py-32">
      {/* Subtiele geometrische accents — alleen op grotere viewports */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Circle
          size={200}
          color="var(--mk-ink)"
          className="absolute -left-16 top-12 opacity-40"
        />
        <RoundedSquare
          size={140}
          color="var(--mk-ink)"
          className="absolute -right-10 -bottom-10 opacity-40"
        />
        <Plus
          size={60}
          color="var(--mk-ink)"
          className="absolute right-[12%] top-[12%] hidden md:block"
        />
      </div>

      <div className="relative mx-auto grid max-w-page gap-16 px-6 sm:px-8 lg:grid-cols-[6fr_5fr] lg:items-center">
        {/* LEFT — payoff + meta + CTA */}
        <div>
          <Pill variant="category" className="bg-mk-paper">
            {data.eyebrow}
          </Pill>
          <h2 className="mk-h2 mt-7 max-w-[560px] text-balance text-mk-ink">
            {data.title}
          </h2>
          <p className="mk-body mt-7 max-w-[480px] text-[17px] leading-relaxed text-mk-ink/80 md:text-[19px]">
            {data.lede}
          </p>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {data.meta.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mk-ink font-instrument text-[14px] text-mk-yellow">
                  {m.value}
                </span>
                <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.15em] text-mk-ink/80">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/v2/quickscan?start=1"
              className="inline-flex items-center gap-2 rounded-full bg-mk-ink px-7 py-4 font-inter text-[15px] font-semibold text-mk-paper transition-transform hover:-translate-y-0.5"
            >
              {data.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT — example statement card */}
        <Link
          href="/v2/quickscan?start=1"
          aria-label="Start de quickscan (voorbeeldkaart)"
          className="group/card relative block w-full max-w-[400px] justify-self-center rounded-3xl bg-mk-paper p-9 shadow-[0_30px_70px_-20px_rgba(17,20,28,0.20),0_8px_20px_-8px_rgba(17,20,28,0.10)] transition-transform hover:-translate-y-1 hover:rotate-[-1deg]"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <span
            aria-hidden
            className="absolute -right-3 -top-3 rounded-full bg-mk-ink px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-yellow shadow-[0_6px_16px_-4px_rgba(17,20,28,0.35)]"
          >
            Voorbeeld
          </span>
          <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
            {data.exampleLabel}
          </span>
          <p className="mt-6 font-instrument text-[22px] leading-snug text-mk-ink sm:text-[26px]">
            {data.exampleStatement}
          </p>
          <div className="mt-9 flex items-center justify-between border-t border-mk-ink/10 pt-5">
            <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
              ← Niet
            </span>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-mk-ink/15 bg-mk-paper text-mk-ink">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mk-yellow text-mk-ink">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
            </div>
            <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-mk-muted">
              Ja →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
