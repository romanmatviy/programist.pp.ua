import { NextResponse } from 'next/server';
import { generateSitemapXML, SitemapRoute } from '@/lib/sitemap-utils';
import { ukrainianCities } from '@/data/cities';
import { ukrainianRegions } from '@/data/regions';
import { getCitySlug, getRegionSlug } from '@/data/slug';
import { hireIntents } from '@/data/hireIntents';

export async function GET() {
  const baseUrl = 'https://programist.pp.ua';
  const languages = ['ua', 'ru'] as const;
  const routes: SitemapRoute[] = [];

  function u(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
  }

  languages.forEach(lang => {
    routes.push({
      url: u(`${baseUrl}/${lang}/hire`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    hireIntents.forEach(intent => {
      const slug = intent.slug[lang];

      routes.push({
        url: u(`${baseUrl}/${lang}/hire/${slug}/regions`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      ukrainianRegions.forEach(region => {
        routes.push({
          url: u(`${baseUrl}/${lang}/hire/${slug}/region/${getRegionSlug(region, lang)}`),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });

      ukrainianCities.forEach(city => {
        routes.push({
          url: u(`${baseUrl}/${lang}/hire/${slug}/city/${getCitySlug(city.name, lang)}`),
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
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
