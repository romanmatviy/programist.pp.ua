import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { ukrainianCities } from '@/data/cities';
import { technologies } from '@/data/technologies';
import { ukrainianRegions } from '@/data/regions';
import { getCitySlug, getRegionSlug } from '@/data/slug';
import { hireIntents } from '@/data/hireIntents';
import { getAllPosts } from '@/lib/mdx';

const baseUrl = 'https://programist.pp.ua';
const languages = ['ua', 'ru'] as const;

function u(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  languages.forEach(lang => {
    routes.push({ url: u(`${baseUrl}/${lang}`), lastModified: new Date(), changeFrequency: 'daily', priority: 1 });
  });

  // Static pages
  const staticPages = ['about', 'services', 'portfolio', 'blog', 'contact', 'faq', 'cases', 'reviews', 'sitemap', 'privacy', 'terms'];
  languages.forEach(lang => {
    staticPages.forEach(page => {
      routes.push({ url: u(`${baseUrl}/${lang}/${page}`), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
    });
  });

  // Blog pages
  languages.forEach(lang => {
    const posts = getAllPosts(lang);
    posts.forEach(post => {
      routes.push({
        url: u(`${baseUrl}/${lang}/blog/${post.slug}`),
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Service pages
  languages.forEach(lang => {
    services.forEach(service => {
      routes.push({ url: u(`${baseUrl}/${lang}/service/${service.slug}`), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
    });
  });

  // Geo pages
  languages.forEach(lang => {
    routes.push({ url: u(`${baseUrl}/${lang}/service/geo`), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
    routes.push({ url: u(`${baseUrl}/${lang}/service/geo/regions`), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });

    ukrainianRegions.forEach(region => {
      routes.push({ url: u(`${baseUrl}/${lang}/service/geo/region/${getRegionSlug(region, lang)}`), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
    });

    ukrainianCities.forEach(city => {
      routes.push({ url: u(`${baseUrl}/${lang}/service/geo/${getCitySlug(city.name, lang)}`), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
      services.forEach(service => {
        routes.push({ url: u(`${baseUrl}/${lang}/service/geo/${getCitySlug(city.name, lang)}/${service.slug}`), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
      });
    });
  });

  // Hire pages
  languages.forEach(lang => {
    routes.push({ url: u(`${baseUrl}/${lang}/hire`), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });

    hireIntents.forEach(intent => {
      const slug = intent.slug[lang];
      routes.push({ url: u(`${baseUrl}/${lang}/hire/${slug}/regions`), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });

      ukrainianRegions.forEach(region => {
        routes.push({ url: u(`${baseUrl}/${lang}/hire/${slug}/region/${getRegionSlug(region, lang)}`), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
      });

      ukrainianCities.forEach(city => {
        routes.push({ url: u(`${baseUrl}/${lang}/hire/${slug}/city/${getCitySlug(city.name, lang)}`), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
      });
    });
  });

  // Technology pages
  languages.forEach(lang => {
    technologies.forEach(tech => {
      routes.push({ url: u(`${baseUrl}/${lang}/tech/${tech.slug}`), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
    });
  });

  return routes;
}
