import { getAllPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

const baseUrl = 'https://programist.pp.ua';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRssFeed(lang: 'ua' | 'ru'): string {
  const posts = getAllPosts(lang);
  const isUa = lang === 'ua';

  const title = isUa
    ? 'Programist.pp.ua — IT блог Романа Матвія'
    : 'Programist.pp.ua — IT блог Романа Матвія';
  const description = isUa
    ? 'Статті про веб-розробку, PHP, Laravel, Next.js, WordPress та SEO від Senior Web Developer Романа Матвія'
    : 'Статьи о веб-разработке, PHP, Laravel, Next.js, WordPress и SEO от Senior Web Developer Романа Матвия';
  const feedUrl = `${baseUrl}/${lang}/feed.xml`;
  const siteUrl = `${baseUrl}/${lang}`;

  const items = posts
    .slice(0, 20)
    .map((post) => {
      const postUrl = `${baseUrl}/${lang}/blog/${post.slug}/`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('\n      ');

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>info@programist.pp.ua (${escapeXml(post.author)})</author>
      ${categories}
      ${post.image ? `<enclosure url="${escapeXml(post.image)}" type="image/jpeg" length="0" />` : ''}
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteUrl}/</link>
    <description>${escapeXml(description)}</description>
    <language>${isUa ? 'uk' : 'ru'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/favicon-96x96.png</url>
      <title>${escapeXml(title)}</title>
      <link>${siteUrl}/</link>
    </image>
    ${items}
  </channel>
</rss>`;
}

export async function GET(
  _req: Request,
  { params }: { params: { lang: string } }
) {
  const lang = params.lang === 'ru' ? 'ru' : 'ua';
  const feed = generateRssFeed(lang);

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
