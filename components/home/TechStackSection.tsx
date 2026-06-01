import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionId } from '@/components/ui/SectionId';
import { techStack, type TechStackItem } from '@/data/techstack';

/**
 * §04 stack — Happy Horizon accelerator-stack.
 * Positionering: configurator.nl is integrator, geen tool-bouwer. We koppelen
 * elke configurator aan de stack die de klant al gebruikt of nog kiest.
 */

function LogoTile({ item }: { item: TechStackItem }) {
  return (
    <li
      className="flex h-14 w-[140px] items-center justify-center rounded-md border border-hg-line bg-white px-3"
      aria-label={item.name}
    >
      <Image
        src={`/tech-logos/${item.slug}.png`}
        alt={item.name}
        width={200}
        height={56}
        className="max-h-10 max-w-full object-contain"
      />
    </li>
  );
}

export function TechStackSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <SectionId num="04" label="stack" />
      <div className="pointer-events-none absolute inset-0 dot-grid-dark opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Eyebrow>Tech-stack · accelerator</Eyebrow>
        <h2 className="mt-6 max-w-[900px] text-[36px] font-black leading-[1.04] tracking-display sm:text-[44px] md:text-[56px]">
          Een configurator is zo sterk als zijn koppelingen.
        </h2>
        <p className="mt-6 max-w-[760px] text-[17px] leading-[1.6] text-hb-sec md:text-[19px]">
          Een configurator levert pas waarde als hij praat met het commerce-,
          content-, integratie- en productdata-landschap. Wij koppelen elke
          configurator aan de stack die jij al gebruikt of nog kiest. Eigen
          tools verkopen we niet.
        </p>

        <div className="mt-14 space-y-8">
          {techStack.map((layer) => (
            <div
              key={layer.label}
              className="grid items-start gap-x-10 gap-y-4 border-t border-hg-line pt-6 lg:grid-cols-[140px_1fr]"
            >
              <h3 className="mono-label pt-2 text-[12px] text-hb-sec">
                {layer.label}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {layer.items.map((item) => (
                  <LogoTile key={item.slug} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
