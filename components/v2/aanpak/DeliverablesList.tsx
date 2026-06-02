import { Pill } from '@/components/v2/ui/Pill';
import type { AanpakContent } from '@/lib/content';

/**
 * Discovery-deliverables — spoor 02 "Toekomst".
 *
 * Beige-bg, 6 deliverables als grid van compacte kaarten met itemtype-pill
 * (document/diagram/prototype/etc.) als kleur-tag.
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
              className="flex flex-col gap-4 rounded-2xl border border-mk-ink/12 bg-mk-paper p-6"
            >
              <header className="flex items-center justify-between gap-3">
                <span className="font-instrument text-[28px] italic leading-none text-mk-lime">
                  {item.num}
                </span>
                <Pill variant="category" size="sm">
                  {item.tag}
                </Pill>
              </header>
              <h3 className="font-instrument text-[20px] leading-tight text-mk-ink">
                {item.title}
              </h3>
              <p className="font-inter text-[14px] leading-[1.55] text-mk-ink/75">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
