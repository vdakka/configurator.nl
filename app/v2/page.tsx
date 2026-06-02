import type { Metadata } from 'next';
import Link from 'next/link';
import { getHomepage } from '@/lib/content';
import { HeroSection } from '@/components/v2/home/HeroSection';
import { TrustStrip } from '@/components/v2/home/TrustStrip';

export const metadata: Metadata = {
  title: 'Merkboek 2026 · work in progress',
};

/**
 * /v2 homepage — Fase 3 voegt §01 hero + §02 klantsectie toe.
 *
 * Volgende fasen vullen §03–§09 (definitie, tech-stack, ROI, quickscan,
 * aanpak, FAQ, contact). De vergelijk-link onderaan blijft staan zodat
 * je per fase visueel kunt switchen tussen de huidige en nieuwe versie.
 */
export default function V2Home() {
  const content = getHomepage();
  return (
    <>
      <HeroSection hero={content.hero} />
      <TrustStrip trust={content.trustStrip} />

      {/* WIP-banner & vergelijk-link */}
      <section className="mx-auto w-full max-w-page px-6 py-16 sm:px-8">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-mk-ink/10 bg-mk-paper p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-livePulse rounded-full bg-mk-coral" />
            <p className="font-inter text-[13px] text-mk-muted">
              Merkboek 2026 — fase 3/7. Hero + klantsectie zijn live op /v2.
              §03–§09 volgen.
            </p>
          </div>
          <Link
            href="/"
            className="font-inter text-[13px] font-semibold text-mk-ink underline decoration-mk-yellow decoration-2 underline-offset-4 hover:text-mk-coral"
          >
            ← Naar huidige versie
          </Link>
        </div>
      </section>
    </>
  );
}
