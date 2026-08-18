export type SitemapRoute = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: string;
  priority?: number;
};

export function generateSitemapXML(routes: SitemapRoute[]): string {
  const urlElements = routes
    .map(route => {
      let xml = `  <url>\n    <loc>${route.url}</loc>`;
      if (route.lastModified) {
        const dateStr =
          route.lastModified instanceof Date
            ? route.lastModified.toISOString()
            : new Date(route.lastModified).toISOString();
        xml += `\n    <lastmod>${dateStr}</lastmod>`;
      }
      if (route.changeFrequency) {
        xml += `\n    <changefreq>${route.changeFrequency}</changefreq>`;
      }
      if (route.priority) {
        xml += `\n    <priority>${route.priority}</priority>`;
      }
      xml += `\n  </url>`;
      return xml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlElements}\n</urlset>`;
}
