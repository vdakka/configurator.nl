import { OrganicBlob } from '@/components/v2/decorative/OrganicBlob';
import { Pill } from '@/components/v2/ui/Pill';
import type { AanpakContent } from '@/lib/content';

/**
 * Definitie + 3 doelgroepen — spoor 02 "Toekomst".
 *
 * Paper-bg met één subtiele lime blob. Definition statement in Instrument
 * Serif H2, drie doelgroep-kaarten met genummerde lime-accents.
 */
export function DefinitionBlock({
  definition,
  audiences,
}: {
  definition: AanpakContent['definition'];
  audiences: AanpakContent['audiences'];
}) {
  return (
    <section className="relative overflow-hidden bg-mk-paper py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 opacity-40"
      >
        <OrganicBlob
          size={460}
          variant="b"
          rotation={20}
          idSuffix="aanpak-def"
          colorFrom="var(--mk-lime)"
          colorTo="var(--mk-paper)"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">Definitie</Pill>
        <h2 className="mk-h2 mt-7 max-w-[820px] text-balance text-mk-ink">
          {definition.title}
        </h2>
        <p className="mk-body mt-7 max-w-[680px] text-[17px] leading-[1.6] text-mk-ink/75 md:text-[18px]">
          {definition.body}
        </p>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {audiences.map((a) => (
            <li
              key={a.title}
              className="flex flex-col gap-4 rounded-2xl border border-mk-ink/12 bg-mk-paper p-7"
            >
              <span className="font-instrument text-[36px] italic leading-none text-mk-lime">
                {a.num}
              </span>
              <h3 className="font-instrument text-[22px] leading-tight text-mk-ink">
                {a.title}
              </h3>
              <p className="font-inter text-[14px] leading-[1.55] text-mk-ink/75">
                {a.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
