'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionId } from '@/components/ui/SectionId';
import { techStack, type TechStackItem } from '@/data/techstack';

/**
 * §04 stack — Happy Horizon accelerator-stack.
 * Compact default: 5 hero-logos. Klik op de CTA onthult de complete grid
 * met alle 5 lagen.
 */

// Slugs van de 5 meest herkenbare partners voor de compact-view
const HIGHLIGHT_SLUGS = [
  'shopify',
  'adobe-commerce',
  'commercetools',
  'akeneo',
  'algolia',
];

function LogoTile({ item, size = 'md' }: { item: TechStackItem; size?: 'sm' | 'md' }) {
  const dims = size === 'md'
    ? { tile: 'h-16 w-[180px]', image: 'max-h-12' }
    : { tile: 'h-14 w-[140px]', image: 'max-h-10' };
  return (
    <li
      className={`flex ${dims.tile} items-center justify-center rounded-md border border-hg-line bg-white px-4`}
      aria-label={item.name}
    >
      <Image
        src={`/tech-logos/${item.slug}.png`}
        alt={item.name}
        width={240}
        height={56}
        className={`${dims.image} max-w-full object-contain`}
      />
    </li>
  );
}

export function TechStackSection() {
  const [expanded, setExpanded] = useState(false);

  // Bouw highlight-array door de slugs op te zoeken in de volledige stack.
  const allItems: TechStackItem[] = techStack.flatMap((layer) => layer.items);
  const highlights = HIGHLIGHT_SLUGS
    .map((slug) => allItems.find((item) => item.slug === slug))
    .filter((item): item is TechStackItem => Boolean(item));

  return (
    <section className="relative overflow-hidden bg-hg py-20 sm:py-24">
      <SectionId num="04" label="stack" />

      <div className="relative mx-auto max-w-page px-6 sm:px-8">
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

        {/* Compact highlights row */}
        <ul className="mt-10 flex flex-wrap gap-3">
          {highlights.map((item) => (
            <LogoTile key={item.slug} item={item} size="md" />
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="techstack-full-grid"
          className="mt-8 inline-flex items-center gap-2 text-[14px] font-bold text-hb underline decoration-2 underline-offset-4 hover:text-hb-soft"
        >
          {expanded ? 'Verberg volledige tech-stack' : 'Ontdek onze volledige tech-stack'}
          <span aria-hidden className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>

        {/* Expanded full grid */}
        <div
          id="techstack-full-grid"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
            expanded ? 'mt-10 grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0">
            <div className="space-y-6">
              {techStack.map((layer) => (
                <div
                  key={layer.label}
                  className="grid items-start gap-x-10 gap-y-3 border-t border-hg-line pt-5 lg:grid-cols-[120px_1fr]"
                >
                  <h3 className="mono-label pt-2 text-[11px] text-hb-sec">
                    {layer.label}
                  </h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {layer.items.map((item) => (
                      <LogoTile key={item.slug} item={item} size="sm" />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
