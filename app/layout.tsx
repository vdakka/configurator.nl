import type { Metadata } from 'next';
import { Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';
import { OrganizationSchema } from '@/lib/schema-org';

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
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-screen flex-col">
        <OrganizationSchema />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
