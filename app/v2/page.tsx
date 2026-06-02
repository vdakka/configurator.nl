import type { Metadata } from 'next';
import Link from 'next/link';
import { getHomepage, getStats } from '@/lib/content';
import { HeroSection } from '@/components/v2/home/HeroSection';
import { TrustStrip } from '@/components/v2/home/TrustStrip';
import { MarketShiftSection } from '@/components/v2/home/MarketShiftSection';
import { TechStackSection } from '@/components/v2/home/TechStackSection';
import { ROIStrip } from '@/components/v2/home/ROIStrip';
import { QuickscanTeaser } from '@/components/v2/home/QuickscanTeaser';
import { DiscoveryFramework } from '@/components/v2/home/DiscoveryFramework';

export const metadata: Metadata = {
  title: 'Merkboek 2026 · work in progress',
};

/**
 * /v2 homepage — Fase 4 voegt §03 (definitie) + §04 (tech-stack) + §05
 * (ROI) toe, alle drie in spoor 02 "Toekomst" (lime/beige/blobs).
 *
 * §06–§09 (quickscan-teaser, aanpak, FAQ, contact) volgen in fase 5/6.
 */
export default function V2Home() {
  const content = getHomepage();
  const stats = getStats();
  return (
    <>
      <HeroSection hero={content.hero} />
      <TrustStrip trust={content.trustStrip} />
      <MarketShiftSection data={content.marketShift} />
      <TechStackSection />
      <ROIStrip stats={stats} />
      <QuickscanTeaser data={content.quickscanTeaser} />
      <DiscoveryFramework data={content.discovery} />

      {/* WIP-banner & vergelijk-link */}
      <section className="mx-auto w-full max-w-page px-6 py-16 sm:px-8">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-mk-ink/10 bg-mk-paper p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-livePulse rounded-full bg-mk-coral" />
            <p className="font-inter text-[13px] text-mk-muted">
              Merkboek 2026 — fase 5/7. §01–§07 zijn live. §08–§09 volgen.
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
