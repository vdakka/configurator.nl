import Link from 'next/link';

/**
 * Mid-page CTA — Merkboek 2026 stijl.
 *
 * Tussen §05 ROIStrip en §06 QuickscanTeaser. Voor wie genoeg gelezen
 * heeft en direct met Gerke wil praten i.p.v. eerst de quickscan.
 *
 * Visueel: Paper-blok met Ink/15-border, Ink-pill CTA. Bewust rustig zodat
 * het de twee gele conversie-blokken (hero + quickscan-teaser) niet
 * overschreeuwt, maar voor warme leads wel een snelle exit-ramp biedt.
 */
export function MidPageCTA() {
  return (
    <section className="bg-mk-paper px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto flex max-w-page flex-col items-start gap-6 rounded-2xl border border-mk-ink/15 bg-mk-paper px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <p className="font-instrument text-[22px] leading-tight text-mk-ink sm:text-[24px]">
            Genoeg gelezen? Plan een gesprek met{' '}
            <span className="italic">Gerke</span>.
          </p>
          <p className="mt-2 font-inter text-[14px] text-mk-ink/70">
            30 minuten sparren — geen pitch, wel concrete adviezen.
          </p>
        </div>
        <Link
          href="/v2/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mk-ink px-6 py-3.5 font-inter text-[14px] font-semibold text-mk-paper transition-transform hover:-translate-y-0.5"
        >
          Plan een gesprek
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
