import Image from 'next/image';
import { Pill } from '@/components/v2/ui/Pill';
import { techStack, type TechStackItem } from '@/data/techstack';

/**
 * §04 tech-stack — Merkboek 2026 spoor 02 "Toekomst".
 *
 * Paper-bg met subtiele lime-accent in de pills + intro. Marquee met
 * partner-logos (zelfde data als / -site, gedeeld via `data/techstack.ts`).
 * Logo-tint near-Ink via filter brightness(0), matchend met /v2 klantstrip.
 */

const SVG_SLUGS = new Set(['strapi']);

function LogoTile({
  item,
  ariaHidden = false,
}: {
  item: TechStackItem;
  ariaHidden?: boolean;
}) {
  const ext = SVG_SLUGS.has(item.slug) ? 'svg' : 'png';
  return (
    <li
      className="mr-12 flex h-14 w-[140px] shrink-0 items-center justify-center"
      aria-label={ariaHidden ? undefined : item.name}
      aria-hidden={ariaHidden || undefined}
    >
      <Image
        src={`/tech-logos/${item.slug}.${ext}`}
        alt={ariaHidden ? '' : item.name}
        width={200}
        height={56}
        className="max-h-14 max-w-full object-contain"
        style={{ filter: 'brightness(0)' }}
        unoptimized={ext === 'svg'}
      />
    </li>
  );
}

export function TechStackSection() {
  const allItems: TechStackItem[] = techStack.flatMap((layer) => layer.items);
  return (
    <section className="relative overflow-hidden bg-mk-paper py-24 sm:py-28">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">Tech-stack · accelerator</Pill>
        <h2 className="mk-h2 mt-7 max-w-[820px] text-balance text-mk-ink">
          Een configurator is zo sterk als zijn{' '}
          <span className="italic">koppelingen</span>.
        </h2>
        <p className="mk-body mt-7 max-w-[680px] text-[16px] leading-[1.6] text-mk-ink/75 md:text-[17px]">
          Een configurator levert pas waarde als hij praat met het commerce-,
          content-, integratie- en productdata-landschap. Wij koppelen elke
          configurator aan de stack die jij al gebruikt of nog kiest. Eigen
          tools verkopen we niet.
        </p>

        {/* Layer-labels als kleur-gecodeerde pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {techStack.map((layer) => (
            <Pill key={layer.label} variant="category" size="sm">
              {layer.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Marquee — zelfde aanpak als TrustStrip */}
      <div
        className="group relative mt-14 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
        aria-label="Tech-stack partners"
      >
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {allItems.map((item) => (
            <LogoTile key={`a-${item.slug}`} item={item} />
          ))}
          {allItems.map((item) => (
            <LogoTile key={`b-${item.slug}`} item={item} ariaHidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
