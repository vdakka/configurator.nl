import type { Metadata } from 'next';
import Link from 'next/link';
import { SmileMark } from '@/components/v2/brand/SmileMark';

export const metadata: Metadata = {
  title: 'Merkboek 2026 · work in progress',
};

/**
 * /v2 homepage — placeholder voor Fase 2.
 *
 * Toont alleen genoeg om de chrome (header + footer + brand-primitives) te
 * kunnen reviewen. Volgende fasen vullen de echte secties §01–§09 in.
 */
export default function V2Home() {
  return (
    <section className="mx-auto flex w-full max-w-page flex-col gap-12 px-8 py-24">
      <div className="flex items-center gap-3 font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-mk-coral" />
        Merkboek 2026 · work in progress
      </div>

      <h1 className="mk-h1 text-balance text-mk-ink">
        Productconfiguratoren voor bedrijven met{' '}
        <span className="italic">complexe producten</span>, regels en
        integraties.
      </h1>

      <p className="mk-lead max-w-[680px] text-mk-ink/80">
        Dit is de parallelle Merkboek 2026-versie. Fase 2 zet alleen de chrome
        (header, footer, logo, smile-mark) op. Volgende fasen vullen de echte
        inhoud — hero, klantlogo&apos;s, definitie, quickscan, FAQ en contact.
      </p>

      {/* Brand-primitives showcase voor visuele review */}
      <div className="grid gap-8 rounded-2xl border border-mk-ink/10 bg-mk-paper p-8 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
            Smile-mark · klein
          </p>
          <SmileMark size={16} color="var(--mk-ink)" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
            Smile-mark · medium
          </p>
          <SmileMark size={28} color="var(--mk-coral)" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
            Smile-mark · groot
          </p>
          <SmileMark size={48} color="var(--mk-blue)" />
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border border-mk-ink/10 bg-mk-beige p-8 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
            Type-scale · display
          </p>
          <p className="mk-h2 text-mk-ink">
            <span className="italic">Toekomst</span> begint vandaag.
          </p>
          <p className="mk-h3 text-mk-ink">Een H3 in Instrument Serif</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-mk-muted">
            Type-scale · body
          </p>
          <p className="mk-lead text-mk-ink">
            Lead — Inter 19/28. Voor introductie-paragrafen onder een H1 of H2.
          </p>
          <p className="mk-body text-mk-ink">
            Body — Inter 16/26. Voor lopende tekst. Lezer komt ver, zonder
            ruis.
          </p>
          <p className="mk-caption">Caption — Inter 13/18, muted grey.</p>
        </div>
      </div>

      <p className="font-inter text-[13px] text-mk-muted">
        Vergelijk met de huidige versie:{' '}
        <Link
          href="/"
          className="font-semibold text-mk-ink underline decoration-mk-yellow decoration-2 underline-offset-4 hover:text-mk-coral"
        >
          configurator.nl
        </Link>
      </p>
    </section>
  );
}
