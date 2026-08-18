export type SitemapRoute = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: string;
  priority?: number;
  images?: string[];
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
      if (route.images && route.images.length > 0) {
        route.images.forEach(imgUrl => {
          // ensure valid XML entities for ampersands etc.
          const cleanImgUrl = imgUrl.replace(/&/g, '&amp;');
          xml += `\n    <image:image>\n      <image:loc>${cleanImgUrl}</image:loc>\n    </image:image>`;
        });
      }
      xml += `\n  </url>`;
      return xml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlElements}\n</urlset>`;
}
