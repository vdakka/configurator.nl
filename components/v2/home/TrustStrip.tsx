import Image from 'next/image';
import type { HomepageContent } from '@/lib/content';

/**
 * TrustStrip §02 — Merkboek 2026 stijl.
 *
 * Neutraal op Paper, géén kleur-spoor (intermezzo tussen hero spoor 01 en
 * definitie-sectie spoor 02). Klantlogo's komen uit `public/logos/` als
 * monochrome Happy Blue silhouettes — voor /v2 tinten we ze naar Ink via
 * `filter: brightness(0)` (alle pixels → zwart ≈ #11141C-equivalent).
 *
 * Marquee gebruikt dezelfde dubbele-rij + translateX(-50%) trick als het
 * origineel (zie components/home/TrustStrip.tsx) zodat de loop seamless is.
 *
 * Quote eronder = Fetim-quote, klein editorial-blok met yellow accent.
 */

type Logo = { slug: string; name: string; ext: 'svg' | 'png' };

function LogoTile({
  logo,
  ariaHidden = false,
}: {
  logo: Logo;
  ariaHidden?: boolean;
}) {
  return (
    <li
      className="mr-12 flex h-14 w-[140px] shrink-0 items-center justify-center"
      aria-label={ariaHidden ? undefined : logo.name}
      aria-hidden={ariaHidden || undefined}
    >
      <Image
        src={`/logos/${logo.slug}.${logo.ext}`}
        alt={ariaHidden ? '' : logo.name}
        width={200}
        height={56}
        className="max-h-14 max-w-full object-contain"
        style={{
          // Tint Happy-Blue silhouettes → near-Ink. Pure black is praktisch
          // identiek aan #11141C voor het oog (delta = 1.2% lichtheid).
          filter: 'brightness(0)',
        }}
        unoptimized={logo.ext === 'svg'}
      />
    </li>
  );
}

export function TrustStrip({
  trust,
}: {
  trust: HomepageContent['trustStrip'];
}) {
  return (
    <section className="relative border-y border-mk-ink/8 bg-mk-paper py-14">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
          {trust.label}
        </span>
      </div>

      <div
        className="group relative mt-8 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
        aria-label="Klantlogo's"
      >
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {trust.logos.map((logo) => (
            <LogoTile key={`a-${logo.slug}`} logo={logo} />
          ))}
          {trust.logos.map((logo) => (
            <LogoTile key={`b-${logo.slug}`} logo={logo} ariaHidden />
          ))}
        </ul>
      </div>

      {trust.quote && (
        <div className="mx-auto mt-14 max-w-page px-6 sm:px-8">
          <figure className="mx-auto max-w-[820px] border-l-[3px] border-mk-yellow pl-7">
            <blockquote className="font-instrument text-[22px] leading-[1.35] text-mk-ink md:text-[26px]">
              <span className="italic text-mk-ink/60">&ldquo;</span>
              {trust.quote.text}
              <span className="italic text-mk-ink/60">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-5 font-inter text-[12px] font-medium uppercase tracking-[0.15em] text-mk-muted">
              {trust.quote.name} · {trust.quote.role} · {trust.quote.company}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
