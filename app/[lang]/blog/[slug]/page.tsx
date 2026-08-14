import { notFound } from 'next/navigation';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import { generateSEO } from '@/lib/seo';
import { getPostBySlug, getPostSlugs, getAllPosts, Post } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const uaSlugs = getPostSlugs('ua').map(slug => ({ lang: 'ua', slug: slug.replace(/\.mdx$/, '') }));
  const ruSlugs = getPostSlugs('ru').map(slug => ({ lang: 'ru', slug: slug.replace(/\.mdx$/, '') }));
  return [...uaSlugs, ...ruSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const lang = params.lang || 'ua';
  const post = getPostBySlug(params.slug, lang);

  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    canonical: `https://programist.pp.ua/${lang}/blog/${post.slug}`,
    lang,
    ogImage: post.image,
    ogType: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    authors: [post.author],
    section: 'Technology',
    tags: post.tags,
    alternateUrls: {
      ua: `https://programist.pp.ua/ua/blog/${post.slug}`,
      ru: `https://programist.pp.ua/ru/blog/${post.slug}`,
    },
  });
}

function generateArticleSchema(post: Post, lang: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      description: post.authorBio,
      url: 'https://roman.matviy.pp.ua',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Programist',
      logo: {
        '@type': 'ImageObject',
        url: 'https://programist.pp.ua/favicon-96x96.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
    inLanguage: lang === 'ua' ? 'uk' : 'ru',
  };
}

function generateBreadcrumbSchema(lang: string, post: Post) {
  const t = translations[lang as 'ua' | 'ru'];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.nav.home,
        item: `https://programist.pp.ua/${lang}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.nav.blog,
        item: `https://programist.pp.ua/${lang}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://programist.pp.ua/${lang}/blog/${post.slug}/`,
      },
    ],
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const lang = params.lang || 'ua';
  const t = translations[lang];
  const post = getPostBySlug(params.slug, lang);

  if (!post) {
    notFound();
  }

  const currentUrl = `https://programist.pp.ua/${lang}/blog/${post.slug}/`;
  const articleSchema = generateArticleSchema(post, lang, currentUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(lang, post);

  const breadcrumbs = [
    { name: t.nav.home, url: `/${lang}` },
    { name: t.nav.blog, url: `/${lang}/blog` },
    { name: post.title, url: `/${lang}/blog/${post.slug}` },
  ];

  const allPosts = getAllPosts(lang);
  const relatedPosts = allPosts.filter((p) =>
    p.id !== post.id && (post.relatedPosts?.includes(p.id.toString()) || p.tags.some((tag) => post.tags.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} lang={lang} />
          <div className="max-w-3xl mx-auto mt-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-blue-600 text-sm font-medium rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>
                {new Date(post.date).toLocaleDateString(
                  lang === 'ua' ? 'uk-UA' : 'ru-RU',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </span>
              <span>•</span>
              <span>{post.readTime} {lang === 'ua' ? 'хв' : 'мин'}</span>
              {post.updatedAt && (
                <>
                  <span>•</span>
                  <span className="text-sm">
                    {lang === 'ua' ? 'Оновлено: ' : 'Обновлено: '}
                    {new Date(post.updatedAt).toLocaleDateString(
                      lang === 'ua' ? 'uk-UA' : 'ru-RU',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {post.image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            <TableOfContents lang={lang} />
            <MDXRemote source={post.content} />
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'ua' ? 'Потрібна допомога з вашим проектом?' : 'Нужна помощь с вашим проектом?'}
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                {lang === 'ua' 
                  ? 'Якщо у вас виникли питання або потрібна допомога з подібним завданням, я з радістю допоможу. Маю понад 7 років досвіду у веб-розробці та вирішенні складних технічних завдань.'
                  : 'Если у вас возникли вопросы или нужна помощь с подобной задачей, я с радостью помогу. Имею более 7 лет опыта в веб-разработке и решении сложных технических задач.'}
              </p>
              <a 
                href="https://roman.matviy.pp.ua/#contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {lang === 'ua' ? 'Зв\'язатися зі мною' : 'Связаться со мной'}
              </a>
            </div>
          </div>

          <div className="mt-16 border-t border-gray-200 pt-12">
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=630&fit=crop" 
                alt={post.author} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.author}
                </h3>
                <p className="text-gray-600">
                  {post.authorRole} <br />
                  {lang === 'ua' ? 'Програміст PHP' : 'PHP Developer'}
                </p>
                <p className="mt-2 text-gray-600">
                  {post.authorBio} <br />
                  {lang === 'ua' ? 'Досвід роботи: 7+ років' : 'Опыт работы: 7+ лет'}
                </p>
                <p className="mt-2 text-gray-600">
                  {lang === 'ua' ? 'Вебсайт: ' : 'Вебсайт: '}
                  <a 
                    href="https://roman.matviy.pp.ua" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    title={lang === 'ua' 
                      ? `Матвій Роман - ${post.title}` 
                      : `Матвей Роман - ${post.title}`}
                  >
                    {lang === 'ua' 
                      ? post.authorRole + ` Програміст PHP - ${post.title}` 
                      : post.authorRole + ` PHP Developer - ${post.title}`}
                  </a>
                </p>
                <div className="mt-4 flex space-x-4">
                  <a 
                    href="https://roman.matviy.pp.ua/#contact" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {lang === 'ua' ? 'Зв\'язатися' : 'Связаться'}
                  </a>
                  <a 
                    href="https://roman.matviy.pp.ua" 
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {lang === 'ua' ? 'Портфоліо' : 'Портфолио'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {lang === 'ua' ? 'Пов\'язані статті' : 'Похожие статьи'}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <a
                        href={`/${lang}/blog/${relatedPost.slug}`}
                        className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800"
                      >
                        {lang === 'ua' ? 'Читати далі' : 'Читать далее'} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}