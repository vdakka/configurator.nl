/**
 * Happy Horizon accelerator-stack — partners die we koppelen aan de
 * configurator-laag. Logos liggen in /public/tech-logos/{slug}.png
 * (gegenereerd via scripts/build-tech-logos.py).
 *
 * Volgorde per laag: van meest bekend → meer niche. Niet alfabetisch.
 */

export type TechStackItem = {
  slug: string;
  name: string;
};

export type TechStackLayer = {
  label: string;
  items: TechStackItem[];
};

export const techStack: TechStackLayer[] = [
  {
    label: 'Commerce',
    items: [
      { slug: 'shopify', name: 'Shopify' },
      { slug: 'commercetools', name: 'commercetools' },
      { slug: 'adobe-commerce', name: 'Adobe Commerce' },
      { slug: 'bigcommerce', name: 'BigCommerce' },
      { slug: 'medusa', name: 'Medusa' },
      { slug: 'shopware', name: 'Shopware' },
    ],
  },
  {
    label: 'Experience',
    items: [
      { slug: 'storyblok', name: 'Storyblok' },
      { slug: 'strapi', name: 'Strapi' },
      { slug: 'aem', name: 'Adobe Experience Manager' },
      { slug: 'umbraco', name: 'Umbraco' },
    ],
  },
  {
    label: 'iPaaS',
    items: [
      { slug: 'alumio', name: 'Alumio' },
      { slug: 'xcore', name: 'Xcore' },
      { slug: 'tinxit', name: 'tinX-it' },
    ],
  },
  {
    label: 'Search',
    items: [
      { slug: 'tweakwise', name: 'Tweakwise' },
      { slug: 'algolia', name: 'Algolia' },
      { slug: 'meilisearch', name: 'Meilisearch' },
      { slug: 'voyado', name: 'Voyado' },
    ],
  },
  {
    label: 'PXM',
    items: [
      { slug: 'akeneo', name: 'Akeneo' },
      { slug: 'katana-pim', name: 'Katana PIM' },
      { slug: 'bluestone-pim', name: 'Bluestone PIM' },
    ],
  },
];
