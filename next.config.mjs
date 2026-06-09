import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    mdxRs: false,
  },
  /**
   * 301-redirects voor verwijderde /contact routes. ContactCTABlock op de
   * homepage met id="contact" vangt nu de "Plan een gesprek"-flow op.
   * Externe links en bookmarks van /contact (en /v2/contact) blijven werken
   * via anchor naar de juiste homepage-sectie.
   */
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/v2/contact',
        destination: '/v2#contact',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
