import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://configurator.nl';
  // /cases en /branches zijn tijdelijk verborgen (zie robots: noindex op
  // de pagina's). Niet opnemen in sitemap tot ze wel publiek mogen zijn.
  const routes = ['/', '/aanpak', '/quickscan', '/contact'];
  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
