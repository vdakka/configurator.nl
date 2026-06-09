import type { ReactNode } from 'react';
import { Pill } from '@/components/v2/ui/Pill';
import type { AanpakContent } from '@/lib/content';

type DeliverableTag =
  | 'document'
  | 'diagram'
  | 'planning'
  | 'prototype'
  | 'presentatie';

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
      className="text-mk-ink"
    >
      {body}
    </svg>
  );
}

/**
 * Discovery-deliverables — spoor 02 "Toekomst".
 *
 * Beige-bg, 6 deliverables als grid van compacte kaarten met icoon-top +
 * tag-pill + Instrument Serif title + 1-zin body. Vervangt de eerdere
 * paragraaf-zware lijst.
 */
export function DeliverablesList({
  data,
}: {
  data: AanpakContent['deliverables'];
}) {
  return (
    <section className="relative bg-mk-beige py-24 sm:py-28">
      <div className="relative mx-auto max-w-page px-6 sm:px-8">
        <Pill variant="service">Deliverables</Pill>
        <h2 className="mk-h2 mt-7 max-w-[760px] text-balance text-mk-ink">
          {data.title}
        </h2>
        <p className="mk-body mt-7 max-w-[680px] text-[17px] leading-[1.6] text-mk-ink/75 md:text-[18px]">
          {data.lede}
        </p>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <li
              key={item.num}
              className="group flex flex-col gap-4 rounded-2xl border border-mk-ink/12 bg-mk-paper p-6 transition-all hover:-translate-y-1 hover:border-mk-ink/30"
            >
              <header className="flex items-center justify-between gap-3">
                <DeliverableIcon tag={item.tag} />
                <Pill variant="category" size="sm">
                  {item.tag}
                </Pill>
              </header>
              <div>
                <span className="font-instrument text-[22px] italic leading-none text-mk-lime">
                  {item.num}
                </span>
                <h3 className="mt-2 font-instrument text-[20px] leading-tight text-mk-ink">
                  {item.title}
                </h3>
                <p className="mt-2 font-inter text-[14px] leading-[1.55] text-mk-ink/75">
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
