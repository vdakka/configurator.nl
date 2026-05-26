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

      {/* Subtiele background-shape linksonder, blijft op alle viewports */}
      <div
        className="pointer-events-none absolute -left-10 bottom-[10%] animate-float2 opacity-30 lg:opacity-50"
        aria-hidden
      >
        <ThreeDShape shape="capB" size={120} />
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

        {/* Right-side 3D-compositie — hero anker, alleen desktop */}
        <div className="relative hidden h-[440px] lg:block" aria-hidden>
          {/* Lens-flare achter sphere */}
          <div
            className="pointer-events-none absolute right-[6%] top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full opacity-50"
            style={{
              background:
                'radial-gradient(circle, rgba(252,229,18,0.18) 0%, rgba(252,229,18,0) 60%)',
            }}
          />
          {/* Big Tube Blue (secundair, achter sphere) */}
          <div className="absolute right-[2%] top-[8%] animate-float2">
            <ThreeDShape shape="bigTubeB" size={200} />
          </div>
          {/* Sphere Yellow (groot, primair anker) */}
          <div className="absolute right-[18%] top-1/2 -translate-y-1/2 animate-float1-slow">
            <ThreeDShape shape="sphereY" size={300} priority />
          </div>
          {/* Small Cube Yellow (foreground accent) */}
          <div className="absolute bottom-[6%] right-[42%] animate-float3">
            <ThreeDShape shape="smallCubeY" size={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
