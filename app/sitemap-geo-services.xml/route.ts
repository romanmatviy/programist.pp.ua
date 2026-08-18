import { NextResponse } from 'next/server';
import { generateSitemapXML, SitemapRoute } from '@/lib/sitemap-utils';
import { ukrainianCities } from '@/data/cities';
import { services } from '@/data/services';
import { getCitySlug } from '@/data/slug';

export async function GET() {
  const baseUrl = 'https://programist.pp.ua';
  const languages = ['ua', 'ru'] as const;
  const routes: SitemapRoute[] = [];

  function u(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
  }

  languages.forEach(lang => {
    ukrainianCities.forEach(city => {
      services.forEach(service => {
        routes.push({
          url: u(`${baseUrl}/${lang}/service/geo/${getCitySlug(city.name, lang)}/${service.slug}`),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  });

  const xml = generateSitemapXML(routes);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
