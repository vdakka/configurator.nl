import type { AanpakContent } from '@/lib/content';
import type { ReactNode } from 'react';

type DeliverableTag = 'document' | 'diagram' | 'planning' | 'prototype' | 'presentatie';

/**
 * Per item-type een inline SVG-icoon. Strak, stroke-only, currentColor
 * zodat we ze via `text-hb`-utilities kunnen tinten. Vermijdt extra assets
 * en past in de mono/spec-sheet aesthetic.
 */
const ICONS: Record<DeliverableTag, ReactNode> = {
  document: (
    <>
      <path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M15 4v5h5" />
      <path d="M9 13h7" />
      <path d="M9 17h7" />
    </>
  ),
  diagram: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6 H 15.5" />
      <path d="M7 8 L 10.5 16" />
      <path d="M17 8 L 13.5 16" />
    </>
  ),
  planning: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M4 10 H 20" />
      <path d="M8 3 V 7" />
      <path d="M16 3 V 7" />
      <path d="M8 14 H 10" />
      <path d="M13 14 H 16" />
      <path d="M8 17 H 12" />
    </>
  ),
  prototype: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M3 14 H 21" />
      <path d="M9 20 H 15" />
      <path d="M12 17 V 20" />
    </>
  ),
  presentatie: (
    <>
      <rect x="3" y="4" width="18" height="11" rx="1" />
      <path d="M12 15 V 19" />
      <path d="M8 19 H 16" />
      <path d="M8 9 L 11 11 L 16 7" />
    </>
  ),
};

function DeliverableIcon({ tag }: { tag: string }) {
  const body = ICONS[tag as DeliverableTag] ?? ICONS.document;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-hb"
    >
      {body}
    </svg>
  );
}

/**
 * Discovery-deliverables — grid van 6 cards met icoon + 1-zin.
 * Vervangt de eerdere paragraaf-zware verticale lijst.
 */
export function DeliverablesSpec({
  data,
}: {
  data: AanpakContent['deliverables'];
}) {
  return (
    <section className="bg-hg py-24 sm:py-28">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <div className="max-w-[760px]">
          <h2 className="text-[32px] font-black leading-[1.05] tracking-display sm:text-[40px] md:text-[44px]">
            {data.title}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-hb-sec">
            {data.lede}
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <li
              key={item.num}
              className="group flex flex-col gap-4 rounded-2xl border border-hg-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-hb"
            >
              <header className="flex items-center justify-between gap-3">
                <DeliverableIcon tag={item.tag} />
                <span className="rounded-sm border border-hg-line bg-hg px-2 py-1 font-mono text-[10px] uppercase tracking-mono text-hb-sec">
                  {item.tag}
                </span>
              </header>
              <div>
                <span className="font-mono text-[12px] font-bold text-hb-sec">
                  {item.num}
                </span>
                <h3 className="mt-1 text-[18px] font-black tracking-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-hb-sec">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
