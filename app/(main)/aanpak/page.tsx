import type { Metadata } from 'next';
import { getAanpak, getAanpakFAQ } from '@/lib/content';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SlimHero } from '@/components/aanpak/SlimHero';
import { AnchoredStats } from '@/components/aanpak/AnchoredStats';
import { DefinitionAudienceBlock } from '@/components/aanpak/DefinitionAudienceBlock';
import { AxesDeepdive } from '@/components/aanpak/AxesDeepdive';
import { Timeline } from '@/components/aanpak/Timeline';
import { DeliverablesSpec } from '@/components/aanpak/DeliverablesSpec';
import { EditorialFAQ } from '@/components/aanpak/EditorialFAQ';
import { FinalCTASection } from '@/components/aanpak/FinalCTASection';
import { BreadcrumbListSchema, FAQPageSchema } from '@/lib/schema-org';

export function generateMetadata(): Metadata {
  const { seo } = getAanpak();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/aanpak' },
    openGraph: { title: seo.title, description: seo.description, url: '/aanpak' },
  };
}

export default function AanpakPage() {
  const content = getAanpak();
  const faqs = getAanpakFAQ();
  return (
    <>
      <BreadcrumbListSchema items={content.breadcrumb} />
      <FAQPageSchema items={faqs} />
      <Breadcrumb items={content.breadcrumb} />
      <SlimHero hero={content.hero} />
      <AnchoredStats stats={content.stats} />
      <DefinitionAudienceBlock definition={content.definition} audiences={content.audiences} />
      <AxesDeepdive intro={content.axesIntro} axes={content.axes} />
      <Timeline data={content.timeline} />
      <DeliverablesSpec data={content.deliverables} />
      <EditorialFAQ meta={content.faq} items={faqs} />
      <FinalCTASection data={content.finalCta} />
    </>
  );
}
