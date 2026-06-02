import type { Metadata } from 'next';
import Link from 'next/link';
import { getHomepage, getStats, getGerke } from '@/lib/content';
import { HeroSection } from '@/components/v2/home/HeroSection';
import { TrustStrip } from '@/components/v2/home/TrustStrip';
import { MarketShiftSection } from '@/components/v2/home/MarketShiftSection';
import { TechStackSection } from '@/components/v2/home/TechStackSection';
import { ROIStrip } from '@/components/v2/home/ROIStrip';
import { QuickscanTeaser } from '@/components/v2/home/QuickscanTeaser';
import { DiscoveryFramework } from '@/components/v2/home/DiscoveryFramework';
import { FAQ } from '@/components/v2/home/FAQ';
import { ContactCTABlock } from '@/components/v2/home/ContactCTABlock';

export const metadata: Metadata = {
  title: 'Merkboek 2026 · work in progress',
};

/**
 * /v2 homepage — Fase 6 voegt §08 (FAQ) + §09 (contact) toe. Daarmee is
 * de homepage volledig over op merkboek-stijl; fase 7 doet de subpagina's
 * (aanpak / quickscan / contact-route) en de eindcontrole (responsive,
 * contrast, 55/25/15-verhouding).
 */
export default function V2Home() {
  const content = getHomepage();
  const stats = getStats();
  const gerke = getGerke();
  return (
    <>
      <HeroSection hero={content.hero} />
      <TrustStrip trust={content.trustStrip} />
      <MarketShiftSection data={content.marketShift} />
      <TechStackSection />
      <ROIStrip stats={stats} />
      <QuickscanTeaser data={content.quickscanTeaser} />
      <DiscoveryFramework data={content.discovery} />
      <FAQ data={content.faq} />
      <ContactCTABlock
        eyebrow={content.contactCta.eyebrow}
        title={content.contactCta.title}
        body={content.contactCta.body}
        gerke={gerke}
      />

      {/* WIP-banner & vergelijk-link */}
      <section className="mx-auto w-full max-w-page px-6 py-16 sm:px-8">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-mk-ink/10 bg-mk-paper p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-livePulse rounded-full bg-mk-coral" />
            <p className="font-inter text-[13px] text-mk-muted">
              Merkboek 2026 — alle 7 fases live. Klaar voor review &amp; cut-over.
            </p>
          </div>
          <Link
            href="/"
            className="font-inter text-[13px] font-semibold text-mk-ink underline decoration-mk-yellow decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            ← Naar huidige versie
          </Link>
        </div>
      </section>
    </>
  );
}
