import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { ukrainianCities } from '@/data/cities';
import { technologies } from '@/data/technologies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://programist.pp.ua';
  const languages = ['ua', 'ru'];
  
  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  languages.forEach(lang => {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });

  // Static pages
  const staticPages = ['about', 'services', 'portfolio', 'blog', 'contact', 'privacy', 'terms'];
  languages.forEach(lang => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Service pages
  languages.forEach(lang => {
    services.forEach(service => {
      routes.push({
        url: `${baseUrl}/${lang}/service/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // Geo pages
  languages.forEach(lang => {
    ukrainianCities.forEach(city => {
      routes.push({
        url: `${baseUrl}/${lang}/service/geo/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Technology pages
  languages.forEach(lang => {
    technologies.forEach(tech => {
      routes.push({
        url: `${baseUrl}/${lang}/tech/${tech.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
