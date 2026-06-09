import type { Metadata } from 'next';
import { getAanpak, getAanpakFAQ, getGerke } from '@/lib/content';
import { AanpakHero } from '@/components/v2/aanpak/AanpakHero';
import { DefinitionBlock } from '@/components/v2/aanpak/DefinitionBlock';
import { AxesGrid } from '@/components/v2/aanpak/AxesGrid';
import { Timeline } from '@/components/v2/aanpak/Timeline';
import { DeliverablesList } from '@/components/v2/aanpak/DeliverablesList';
import { FAQ as HomeFAQ } from '@/components/v2/home/FAQ';
import { ContactCTABlock } from '@/components/v2/home/ContactCTABlock';

export function generateMetadata(): Metadata {
  const { seo } = getAanpak();
  return {
    title: `${seo.title} (v2)`,
    description: seo.description,
    // /v2 noindex/nofollow erft van app/v2/layout.tsx — geen canonical naar
    // /aanpak om duplicate-content signal te voorkomen.
  };
}

export default function AanpakV2Page() {
  const content = getAanpak();
  const faqs = getAanpakFAQ();
  const gerke = getGerke();

  // Map aanpak-FAQ items naar het home FAQ-component shape (q/a/open).
  const faqData = {
    eyebrow: 'Veelgestelde vragen',
    title: content.faq.title,
    lede: content.faq.note,
    linkLabel: content.faq.linkLabel,
    linkHref: '/v2#contact',
    items: faqs.map((f) => ({ q: f.q, a: f.a, open: false })),
  };

  return (
    <>
      <AanpakHero hero={content.hero} stats={content.stats} />
      <DefinitionBlock
        definition={content.definition}
        audiences={content.audiences}
      />
      <AxesGrid intro={content.axesIntro} axes={content.axes} />
      <Timeline data={content.timeline} />
      <DeliverablesList data={content.deliverables} />
      <HomeFAQ data={faqData} />
      <ContactCTABlock
        eyebrow={content.finalCta.eyebrow}
        title={content.finalCta.title}
        body={content.finalCta.body}
        gerke={gerke}
      />
    </>
  );
}
