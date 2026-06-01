import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionId } from '@/components/ui/SectionId';
import { techStack, type TechStackItem } from '@/data/techstack';

/**
 * §04 stack — Happy Horizon accelerator-stack als doorlopende slider.
 * Zelfde marquee-pattern als TrustStrip (§02 klanten) zodat partner-logos
 * en klant-logos visueel rijmen.
 */

// Slugs die als SVG geserveerd worden ipv PNG (externe bron of handmatige
// override, zie scripts/build-tech-logos.py SKIP_SLUGS).
const SVG_SLUGS = new Set(['strapi']);

function LogoTile({ item, ariaHidden = false }: { item: TechStackItem; ariaHidden?: boolean }) {
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
        unoptimized={ext === 'svg'}
      />
    </li>
  );
}

export function TechStackSection() {
  // Flatten alle 20 items volgens laag-volgorde (Commerce → Experience → … → PXM)
  const allItems: TechStackItem[] = techStack.flatMap((layer) => layer.items);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <SectionId num="04" label="stack" />

      <div className="mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>Tech-stack · accelerator</Eyebrow>
        <h2 className="mt-6 max-w-[900px] text-[32px] font-black leading-[1.05] tracking-display sm:text-[40px] md:text-[48px]">
          Een configurator is zo sterk als zijn koppelingen.
        </h2>
        <p className="mt-5 max-w-[720px] text-[16px] leading-[1.6] text-hb-sec md:text-[17px]">
          Een configurator levert pas waarde als hij praat met het commerce-,
          content-, integratie- en productdata-landschap. Wij koppelen elke
          configurator aan de stack die jij al gebruikt of nog kiest. Eigen
          tools verkopen we niet.
        </p>

        {/* Layer-labels als kleine context onder de lede */}
        <p className="mono-label mt-6 text-[11px] text-hb-sec">
          {techStack.map((layer) => layer.label).join(' · ')}
        </p>
      </div>

      {/* Marquee — zelfde aanpak als TrustStrip */}
      <div
        className="group relative mt-12 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
        aria-label="Tech-stack partners"
      >
        <ul className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
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
