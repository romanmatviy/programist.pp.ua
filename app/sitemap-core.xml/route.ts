import { NextResponse } from 'next/server';
import { generateSitemapXML, SitemapRoute } from '@/lib/sitemap-utils';
import { services } from '@/data/services';
import { technologies } from '@/data/technologies';
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  const baseUrl = 'https://programist.pp.ua';
  const languages = ['ua', 'ru'] as const;
  const routes: SitemapRoute[] = [];

  function u(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
  }

  // Home pages
  languages.forEach(lang => {
    routes.push({
      url: u(`${baseUrl}/${lang}`),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });

  // Static pages
  const staticPages = [
    'about',
    'services',
    'portfolio',
    'blog',
    'contact',
    'faq',
    'cases',
    'reviews',
    'sitemap',
    'privacy',
    'terms',
  ];
  languages.forEach(lang => {
    staticPages.forEach(page => {
      routes.push({
        url: u(`${baseUrl}/${lang}/${page}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Blog posts
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
      routes.push({
        url: u(`${baseUrl}/${lang}/service/${service.slug}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // Technology pages
  languages.forEach(lang => {
    technologies.forEach(tech => {
      routes.push({
        url: u(`${baseUrl}/${lang}/tech/${tech.slug}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
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
