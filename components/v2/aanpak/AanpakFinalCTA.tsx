import Link from 'next/link';
import {
  Circle,
  RoundedSquare,
} from '@/components/v2/decorative/GeometricShapes';
import { Pill } from '@/components/v2/ui/Pill';
import type { AanpakContent } from '@/lib/content';

/**
 * Slot-CTA — spoor 01 "Eerste stap". Twee conversie-opties: sparren of
 * doorpakken. Geel-dominant zoals §09 ContactCTA op de homepage.
 */
export function AanpakFinalCTA({
  data,
}: {
  data: AanpakContent['finalCta'];
}) {
  return (
    <section className="relative overflow-hidden bg-mk-yellow py-24 text-mk-ink sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Circle
          size={220}
          color="var(--mk-ink)"
          className="absolute -left-12 bottom-10 opacity-40"
        />
        <RoundedSquare
          size={140}
          color="var(--mk-ink)"
          className="absolute -right-10 top-14 opacity-40"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="category" className="bg-mk-paper">
          {data.eyebrow}
        </Pill>
        <h2 className="mk-h2 mt-7 max-w-[820px] text-balance text-mk-ink">
          {data.title}
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {data.options.map((o) => (
            <Link
              key={o.title}
              href={o.href.replace(/^\/(contact|aanpak|quickscan)/, '/v2/$1')}
              className="group flex flex-col gap-4 rounded-2xl border-2 border-mk-ink bg-mk-paper p-8 transition-transform hover:-translate-y-1"
            >
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-mk-coral">
                {o.tag}
              </span>
              <h3 className="font-instrument text-[24px] leading-tight text-mk-ink">
                {o.title}
              </h3>
              <p className="font-inter text-[15px] leading-[1.55] text-mk-ink/75">
                {o.body}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 font-inter text-[14px] font-semibold text-mk-ink">
                Volgende stap
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
