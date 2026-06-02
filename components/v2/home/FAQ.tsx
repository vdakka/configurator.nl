import Link from 'next/link';
import { Pill } from '@/components/v2/ui/Pill';
import type { HomepageContent } from '@/lib/content';

/**
 * §08 faq — Merkboek 2026 stijl.
 *
 * Rustig Paper/Ink, editorial sticky-sidebar layout (eyebrow + H2 + lede +
 * link links, vragen rechts). Native <details>-elementen voor zero-JS
 * accordion, identiek aan origineel.
 *
 * Visueel: bg-mk-beige als zachte differentiatie t.o.v. §07 Paper.
 * Card-frame met Ink-border helpt het sticky-sidebar-blok groeperen.
 */
export function FAQ({ data }: { data: HomepageContent['faq'] }) {
  return (
    <section className="relative bg-mk-beige py-24 sm:py-32">
      <div className="mx-auto grid max-w-page gap-16 px-6 sm:px-8 lg:grid-cols-[4fr_7fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <Pill variant="category">{data.eyebrow}</Pill>
          <h2 className="mk-h2 mt-6 text-balance text-mk-ink">{data.title}</h2>
          <p className="mk-body mt-6 text-mk-ink/75">
            {data.lede}{' '}
            <Link
              href={data.linkHref}
              className="font-semibold text-mk-ink underline decoration-mk-yellow decoration-[3px] underline-offset-4 hover:decoration-mk-ink"
            >
              {data.linkLabel}
            </Link>
          </p>
        </aside>

        <div className="rounded-2xl border border-mk-ink/15 bg-mk-paper p-6 sm:p-8">
          {data.items.map((it, i) => (
            <details
              key={i}
              open={it.open}
              className="group border-b border-mk-ink/10 py-6 last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[48px_1fr_32px] items-start gap-4">
                <span className="font-inter text-[12px] font-bold uppercase tracking-[0.15em] text-mk-coral group-open:text-mk-ink">
                  Q.
                </span>
                <span className="font-instrument text-[20px] leading-tight text-mk-ink sm:text-[22px]">
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className="font-instrument text-[26px] leading-none text-mk-ink/50 transition-transform group-open:rotate-45 group-open:text-mk-ink"
                >
                  +
                </span>
              </summary>
              <div className="mk-body ml-[64px] mt-4 max-w-[680px] text-[15px] text-mk-ink/75 sm:text-[16px]">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
