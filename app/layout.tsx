import type { Metadata } from 'next';
import {
  Montserrat,
  JetBrains_Mono,
  Instrument_Serif,
  Inter,
} from 'next/font/google';
import './globals.css';
import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';
import { OrganizationSchema, WebSiteSchema } from '@/lib/schema-org';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Merkboek 2026 — display (H1–H3 payoff & sectie-titels)
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

// Merkboek 2026 — body/UI/captions
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://configurator.nl'),
  title: {
    default: 'Productconfigurator laten bouwen | configurator.nl',
    template: '%s | configurator.nl',
  },
  description:
    'Configurators die werken voor je klant én je bedrijfsproces. Guided selling, configuratie en visualisatie in één, geïntegreerd in je systeemlandschap.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'configurator.nl',
    images: [
      {
        url: '/og/homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'configurator.nl — Configuratoren die werken voor jouw business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/homepage.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${montserrat.variable} ${jetbrains.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <OrganizationSchema />
        <WebSiteSchema />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
