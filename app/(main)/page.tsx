import type { Metadata } from 'next';
import { getHomepage, getStats, getGerke } from '@/lib/content';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ROIStrip } from '@/components/home/ROIStrip';
import { MarketShiftSection } from '@/components/home/MarketShiftSection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { QuickscanTeaser } from '@/components/home/QuickscanTeaser';
import { DiscoveryFramework } from '@/components/home/DiscoveryFramework';
import { FAQ } from '@/components/home/FAQ';
import { ContactCTABlock } from '@/components/home/ContactCTABlock';
import { ServiceSchema, FAQPageSchema } from '@/lib/schema-org';

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
      <FAQPageSchema items={content.faq.items} />
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
    </>
  );
}
