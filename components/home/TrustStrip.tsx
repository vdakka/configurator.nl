import Image from 'next/image';
import { SectionId } from '@/components/ui/SectionId';
import type { HomepageContent } from '@/lib/content';

/**
 * Klantlogo-strip met oneindige marquee. Bronnen liggen in /public/logos/
 * (gegenereerd via scripts/build-logos.py — monochrome Happy Blue silhouettes).
 *
 * Logo-data komt uit content/homepage.json `trustStrip.logos` (slug + name +
 * ext) zodat product owner orde en set kan aanpassen zonder code-deploy.
 */

type Logo = { slug: string; name: string; ext: 'svg' | 'png' };

function LogoTile({ logo, ariaHidden = false }: { logo: Logo; ariaHidden?: boolean }) {
  return (
    <li
      className="mr-12 flex h-12 shrink-0 items-center"
      aria-label={ariaHidden ? undefined : logo.name}
      aria-hidden={ariaHidden || undefined}
    >
      <Image
        src={`/logos/${logo.slug}.${logo.ext}`}
        alt={ariaHidden ? '' : logo.name}
        width={200}
        height={48}
        className="h-12 w-auto"
        unoptimized={logo.ext === 'svg'}
      />
    </li>
  );
}

export function TrustStrip({ trust }: { trust: HomepageContent['trustStrip'] }) {
  return (
    <section className="relative border-b border-hg bg-white py-12">
      <SectionId num="02" label="klanten" />
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <span className="mono-label mb-6 block text-[11px] text-hb-sec">
          {trust.label}
        </span>
      </div>

      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
        aria-label="Klantlogo's"
      >
        <ul className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {trust.logos.map((logo) => (
            <LogoTile key={`a-${logo.slug}`} logo={logo} />
          ))}
          {trust.logos.map((logo) => (
            <LogoTile key={`b-${logo.slug}`} logo={logo} ariaHidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
