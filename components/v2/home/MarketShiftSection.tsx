import { OrganicBlob } from '@/components/v2/decorative/OrganicBlob';
import { Pill } from '@/components/v2/ui/Pill';
import type { HomepageContent } from '@/lib/content';

/**
 * §03 definitie — Merkboek 2026 spoor 02 "Toekomst".
 *
 * Reflectief, beige-dominant, organische blob op de achtergrond. Lime
 * accent op de discipline-pills. Geen geometrie hier (die is spoor 01).
 *
 * Tekst-bron: bestaande content/homepage.json `marketShift` — zelfde
 * H2 / lede / drie blokken, alleen anders gestyled.
 */
export function MarketShiftSection({
  data,
}: {
  data: HomepageContent['marketShift'];
}) {
  return (
    <section className="relative overflow-hidden bg-mk-beige py-24 sm:py-32">
      {/* Organische blob rechtsonder — reflectief, weids */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-12 opacity-70"
      >
        <OrganicBlob
          size={460}
          variant="b"
          rotation={-18}
          idSuffix="marketshift"
          colorFrom="var(--mk-lime)"
          colorTo="var(--mk-paper)"
        />
      </div>
      {/* Tweede, kleinere blob linksboven voor visuele balans */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-12 opacity-50"
      >
        <OrganicBlob
          size={240}
          variant="c"
          rotation={28}
          idSuffix="marketshift-b"
          colorFrom="var(--mk-paper)"
          colorTo="var(--mk-lime)"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">{data.eyebrow}</Pill>

        <div className="mt-10 grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
          {/* LEFT: H2 statement + Inter lede */}
          <div>
            <h2 className="mk-h2 max-w-[720px] text-balance text-mk-ink">
              {data.title}
            </h2>
            <p className="mk-body mt-8 max-w-[640px] text-[18px] leading-[1.6] text-mk-ink/80 md:text-[19px]">
              {data.lede}
            </p>
          </div>

          {/* RIGHT: drie disciplines met num + title + body */}
          <div className="flex flex-col lg:pt-2">
            <dl className="space-y-6">
              {data.blocks.map((b) => (
                <div
                  key={b.title}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-mk-ink/15 pb-6 last:border-b-0 last:pb-0"
                >
                  {/* Categorische nummers — coral/blue zijn per brandbook
                      gereserveerd voor data-viz, dus lime (spoor 02 accent). */}
                  <dt className="row-span-2 self-start font-instrument text-[20px] italic leading-none text-mk-ink">
                    <span className="rounded bg-mk-lime px-1.5">{b.num}</span>
                  </dt>
                  <dt className="font-instrument text-[22px] leading-tight text-mk-ink">
                    {b.title}
                  </dt>
                  <dd className="font-inter text-[15px] leading-[1.55] text-mk-ink/75">
                    {b.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
