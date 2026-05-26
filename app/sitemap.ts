import type { MetadataRoute } from 'next';
import { getCaseList } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://configurator.nl';
  const routes = ['/', '/aanpak', '/cases', '/quickscan', '/contact', '/branches', '/branches/b2b', '/branches/b2c'];
  const cases = getCaseList().map((c) => `/cases/${c.slug}`);
  const now = new Date();
  return [...routes, ...cases].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
