import { ThreeDShape } from '@/components/ui/ThreeDShape';
import { YellowHighlight } from '@/components/ui/YellowHighlight';
import { Button } from '@/components/ui/Button';
import { SectionId } from '@/components/ui/SectionId';
import type { HomepageContent } from '@/lib/content';

export function HeroSection({ hero }: { hero: HomepageContent['hero'] }) {
  return (
    <section className="relative overflow-hidden bg-hb py-20 text-white sm:py-24">
      <SectionId num="01" label="hero" tone="light" />
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />

      {/* Floating shapes */}
      <div className="pointer-events-none absolute -right-8 top-[6%] animate-float1" aria-hidden>
        <ThreeDShape shape="bigTubeY" size={260} />
      </div>
      <div className="pointer-events-none absolute -left-6 bottom-[14%] animate-float2 opacity-90" aria-hidden>
        <ThreeDShape shape="capB" size={140} />
      </div>
      <div className="pointer-events-none absolute right-[24%] bottom-[8%] animate-float3 opacity-70" aria-hidden>
        <ThreeDShape shape="smallCubeY" size={110} />
      </div>

      <div className="relative mx-auto grid max-w-page gap-10 px-6 sm:px-8 lg:grid-cols-[7fr_5fr] lg:items-center">
        <div>
          <h1 className="max-w-[820px] text-[36px] font-black leading-[1.02] tracking-display sm:text-[44px] md:text-[56px] lg:text-[64px]">
            {hero.headline.pre}{' '}
            <YellowHighlight>{hero.headline.highlight}</YellowHighlight>{' '}
            {hero.headline.post}
          </h1>

          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.6] text-white/80 sm:text-[16px]">
            {hero.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href="/quickscan?start=1" variant="primary">
              {hero.primaryCta} <span aria-hidden>→</span>
            </Button>
            <Button href="/contact" variant="ghost">
              {hero.secondaryCta} <span aria-hidden>→</span>
            </Button>
          </div>

          <p
            className="mt-10 font-mono text-[11px] uppercase tracking-eyebrow text-white/45"
            aria-hidden
          >
            // configurator.nl — discovery → build → integratie
          </p>
        </div>

        {/* Right-side visual breathing room — keeps the hero from feeling text-heavy */}
        <div className="relative hidden h-[280px] lg:block" aria-hidden>
          <div className="absolute right-12 top-1/2 -translate-y-1/2 animate-float3">
            <ThreeDShape shape="sphereY2" size={120} />
          </div>
        </div>
      </div>
    </section>
  );
}
