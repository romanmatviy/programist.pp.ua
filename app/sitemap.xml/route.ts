import { NextResponse } from 'next/server';
import { escapeXml } from '@/lib/sitemap-utils';

export async function GET() {
  const baseUrl = 'https://programist.pp.ua';
  const sitemaps = [
    `${baseUrl}/sitemap-core.xml`,
    `${baseUrl}/sitemap-geo.xml`,
    `${baseUrl}/sitemap-geo-services.xml`,
    `${baseUrl}/sitemap-hire.xml`,
  ];

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    url => `  <sitemap>
    <loc>${escapeXml(url)}</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new NextResponse(sitemapIndexXML, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
