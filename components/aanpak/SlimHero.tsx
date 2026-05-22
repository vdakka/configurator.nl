import { Eyebrow } from '@/components/ui/Eyebrow';
import { YellowHighlight } from '@/components/ui/YellowHighlight';
import { Button } from '@/components/ui/Button';
import { ThreeDShape } from '@/components/ui/ThreeDShape';
import type { AanpakContent } from '@/lib/content';

export function SlimHero({ hero }: { hero: AanpakContent['hero'] }) {
  return (
    <section className="relative overflow-hidden bg-hb py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute right-[4%] top-[12%] animate-float1" aria-hidden>
        <ThreeDShape shape="sphereY" size={200} />
      </div>
      <div className="pointer-events-none absolute -left-4 bottom-[14%] animate-float2 opacity-70" aria-hidden>
        <ThreeDShape shape="capB" size={150} />
      </div>

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[1100px] text-[40px] font-black leading-[1.02] tracking-display sm:text-[56px] md:text-[76px]">
          {hero.headline.pre}{' '}
          <YellowHighlight>{hero.headline.highlight}</YellowHighlight>{' '}
          {hero.headline.post}
        </h1>
        <p className="mt-8 max-w-[760px] text-[17px] leading-relaxed text-white/78 md:text-[19px]">
          {hero.sub}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            {hero.primaryCta} <span aria-hidden>→</span>
          </Button>
          <Button href="#tijdlijn" variant="ghost">
            {hero.secondaryCta} <span aria-hidden>↓</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
