import Link from 'next/link';

/**
 * Mid-page CTA — compacte aanjager tussen ROI-cijfers (§05) en de
 * Quickscan-teaser (§06). Voor wie genoeg gelezen heeft en direct met
 * Gerke wil praten i.p.v. eerst de scan te doen.
 *
 * Bewust geen visueel-zwaarder section dan ROI of QuickscanTeaser zelf —
 * subtiel wit-blok met Ink-pill, dat het ritme van de pagina niet
 * onderbreekt maar wel een snelle exit-ramp biedt voor warme leads.
 */
export function MidPageCTA() {
  return (
    <section className="bg-white px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto flex max-w-page flex-col items-start gap-6 rounded-2xl border border-hg-line bg-hg px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <p className="text-[20px] font-black leading-tight tracking-heading text-hb sm:text-[22px]">
            Genoeg gelezen? Plan een gesprek met Gerke.
          </p>
          <p className="mt-2 text-[14px] text-hb-sec">
            30 minuten sparren — geen pitch, wel concrete adviezen.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-hb px-6 py-3.5 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
        >
          Plan een gesprek
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
