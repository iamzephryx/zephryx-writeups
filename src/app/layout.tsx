import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { PROFILES, SITE } from '@/lib/site';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Backdrop from '@/components/Backdrop';
import './globals.css';

/**
 * Person structured data, with this site declared as a sub-site of the parent.
 *
 * The same Person entity is published on `zephryx.in`; repeating it here with
 * identical `name`/`sameAs` is what lets a search engine resolve the two hosts
 * to one author rather than two similarly-named strangers. Built entirely from
 * first-party constants, so the inline script carries no injection risk.
 */
const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.legalName,
  alternateName: SITE.aliases,
  url: SITE.parentUrl,
  jobTitle: SITE.role,
  knowsAbout: [
    'Penetration Testing',
    'Active Directory Security',
    'Adversary Emulation',
    'Offensive Security',
    'Detection Engineering',
    'Threat Hunting',
  ],
  sameAs: PROFILES,
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.parentUrl }],
  creator: SITE.legalName,
  keywords: [
    'security writeups',
    'CTF writeups',
    'active directory attacks',
    'sigma rules',
    'detection engineering',
    'MITRE ATT&CK coverage',
    'adversary emulation',
    'purple team',
    'Zephryx',
  ],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iamzephryx',
    creator: '@iamzephryx',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE.url,
    types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
  },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#06070a' },
    { media: '(prefers-color-scheme: light)', color: '#f5f6f8' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * Sets data-theme on <html> before first paint, so there's no flash of the
 * wrong theme. Runs as the first thing in <body> — synchronous scripts block
 * rendering until they finish, so nothing has painted yet by the time this
 * decides light vs dark. Reads a stored preference first, then falls back to
 * the visitor's OS setting.
 *
 * The storage key is shared with the sibling sites on purpose: it is
 * per-origin storage either way, but keeping one key means a reader who
 * follows a link from `zephryx.in` does not have to re-pick their theme if
 * the sites ever move under one origin.
 */
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('zephryx-theme');
    var wantsLight = stored === 'light' || (stored !== 'dark' && window.matchMedia('(prefers-color-scheme: light)').matches);
    if (wantsLight) document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-red-core focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-white"
        >
          skip to content
        </a>

        <Backdrop />
        <Nav />

        {/* tabIndex lets the skip link move focus here, not just scroll here —
            without it the next Tab lands back in the nav it was meant to skip. */}
        <main id="main" tabIndex={-1} className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
