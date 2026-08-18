import { NextResponse } from 'next/server';
import { generateSitemapXML, SitemapRoute } from '@/lib/sitemap-utils';
import { ukrainianCities } from '@/data/cities';
import { ukrainianRegions } from '@/data/regions';
import { getCitySlug, getRegionSlug } from '@/data/slug';

export async function GET() {
  const baseUrl = 'https://programist.pp.ua';
  const languages = ['ua', 'ru'] as const;
  const routes: SitemapRoute[] = [];

  function u(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
  }

  languages.forEach(lang => {
    routes.push({
      url: u(`${baseUrl}/${lang}/service/geo`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
    routes.push({
      url: u(`${baseUrl}/${lang}/service/geo/regions`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    ukrainianRegions.forEach(region => {
      routes.push({
        url: u(`${baseUrl}/${lang}/service/geo/region/${getRegionSlug(region, lang)}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    ukrainianCities.forEach(city => {
      routes.push({
        url: u(`${baseUrl}/${lang}/service/geo/${getCitySlug(city.name, lang)}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  const xml = generateSitemapXML(routes);
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
