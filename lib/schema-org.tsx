import type { FAQItem } from './content';

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'configurator.nl',
    url: 'https://configurator.nl',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Happy Horizon',
      url: 'https://happyhorizon.com',
    },
    sameAs: ['https://www.linkedin.com/company/happy-horizon'],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Productconfigurator laten bouwen',
    provider: { '@type': 'Organization', name: 'configurator.nl' },
    serviceType: 'Configurator design + development',
    areaServed: 'NL',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQPageSchema({ items }: { items: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function QuizSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Quickscan: past een configurator bij jouw bedrijf?',
    about: 'Productconfigurator readiness',
    educationalLevel: 'beginner',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbListSchema({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: `https://configurator.nl${it.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
