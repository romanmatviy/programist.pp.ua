import type { Metadata } from 'next';
import './globals.css';
import LangSetter from '@/components/LangSetter';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://programist.pp.ua'),
  title: 'RomanDev - Web Development',
  description: 'Професійна розробка сайтів в Україні',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Programist" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title="Programist Blog UA" href="/ua/feed.xml" />
        <link rel="alternate" type="application/rss+xml" title="Programist Blog RU" href="/ru/feed.xml" />
      </head>
      <body>
        <LangSetter />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
