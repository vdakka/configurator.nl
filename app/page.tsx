import type { Metadata } from 'next';
import { getHomepage, getStats, getGerke } from '@/lib/content';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ROIStrip } from '@/components/home/ROIStrip';
import { MarketShiftSection } from '@/components/home/MarketShiftSection';
import { QuickscanTeaser } from '@/components/home/QuickscanTeaser';
import { DiscoveryFramework } from '@/components/home/DiscoveryFramework';
import { ContactCTABlock } from '@/components/home/ContactCTABlock';
import { ServiceSchema } from '@/lib/schema-org';

export function generateMetadata(): Metadata {
  const { seo } = getHomepage();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: '/',
      images: ['/og/homepage.jpg'],
    },
  };
}

export default function HomePage() {
  const content = getHomepage();
  const stats = getStats();
  const gerke = getGerke();
  return (
    <>
      <ServiceSchema />
      <HeroSection hero={content.hero} />
      <TrustStrip trust={content.trustStrip} />
      <MarketShiftSection data={content.marketShift} />
      <ROIStrip stats={stats} />
      <DiscoveryFramework data={content.discovery} />
      <QuickscanTeaser data={content.quickscanTeaser} />
      <ContactCTABlock
        eyebrow={content.contactCta.eyebrow}
        title={content.contactCta.title}
        body={content.contactCta.body}
        gerke={gerke}
      />
    </>
  );
}
