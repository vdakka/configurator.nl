import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://configurator.nl/sitemap.xml',
    host: 'https://configurator.nl',
  };
}
