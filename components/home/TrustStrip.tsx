/**
 * Trust strip — auto-scrolling marquee van klantlogo's.
 * Tekst-tiles fungeren als placeholder; vervang door echte SVGs in /public/logos/
 * en pas de map hieronder aan om met <Image> te renderen.
 */

import { SectionId } from '@/components/ui/SectionId';
import type { HomepageContent } from '@/lib/content';

const LOGO_STYLES: Record<string, string> = {
  Gamma: 'bg-[#005ca9] text-white font-black tracking-wider',
  Karwei: 'bg-black text-white font-black uppercase tracking-widest text-[15px]',
  Praxis: 'bg-[#ffd400] text-[#e30613] font-black uppercase italic tracking-tight',
  'Leen Bakker': 'bg-[#e6007e] text-white font-bold tracking-tight',
  'Van Raam': 'bg-white text-[#e30613] font-black uppercase tracking-tight border border-hg-line',
  FETIM: 'bg-white text-[#3a3a3a] font-bold tracking-wider border border-hg-line',
  Skantrae: 'bg-white text-[#003c71] font-black uppercase tracking-tight border border-hg-line',
  CanDo: 'bg-[#ff8c1a] text-[#1a1a1a] font-black uppercase tracking-tight',
};

const FALLBACK_STYLE = 'bg-white text-hb border border-hg-line font-bold';

function LogoTile({ name, ariaHidden = false }: { name: string; ariaHidden?: boolean }) {
  const style = LOGO_STYLES[name] ?? FALLBACK_STYLE;
  // margin-right (not gap) keeps the marquee seamless: -50% translate matches
  // the duplicate position exactly, including the trailing right margin.
  return (
    <li
      className={`mr-4 flex h-12 min-w-[120px] shrink-0 items-center justify-center rounded-md px-5 text-[15px] ${style}`}
      aria-label={ariaHidden ? undefined : name}
      aria-hidden={ariaHidden || undefined}
    >
      {name}
    </li>
  );
}

export function TrustStrip({ trust }: { trust: HomepageContent['trustStrip'] }) {
  // First half is read by screenreaders; the second half is a visual duplicate
  // for seamless marquee loop and is hidden from assistive tech.
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
          {trust.logos.map((name) => (
            <LogoTile key={`a-${name}`} name={name} />
          ))}
          {trust.logos.map((name) => (
            <LogoTile key={`b-${name}`} name={name} ariaHidden />
          ))}
        </ul>
      </div>

      {trust.quote && (
        <div className="mx-auto mt-12 max-w-page px-6 sm:px-8">
          <figure className="mx-auto max-w-[820px] border-l-2 border-hy pl-6">
            <blockquote className="text-[19px] font-semibold leading-[1.45] text-hb md:text-[22px]">
              &ldquo;{trust.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-eyebrow text-hb-sec">
              {trust.quote.name} · {trust.quote.role} · {trust.quote.company}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
