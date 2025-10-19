import { notFound } from 'next/navigation';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';
import { blogPosts } from '@/data/blogPosts';

interface BlogPost {
  id: number;
  slug: string;
  title: {
    ua: string;
    ru: string;
  };
  content: {
    ua: string;
    ru: string;
  };
  excerpt: {
    ua: string;
    ru: string;
  };
  date: string;
  updatedAt: string;
  author: string;
  authorRole: string;
  authorBio: string;
  image: string;
  tags: string[];
  readTime: string;
  relatedPosts: number[];
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const lang = params.lang || 'ua';
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.title[lang as 'ua' | 'ru'],
    description: post.excerpt[lang as 'ua' | 'ru'],
    keywords: post.tags.join(', '),
    canonical: `https://programist.pp.ua/${lang}/blog/${post.slug}`,
    lang,
    ogImage: post.image,
    type: 'article',
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

function generateStructuredData(post: BlogPost, lang: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[lang as 'ua' | 'ru'],
    description: post.excerpt[lang as 'ua' | 'ru'],
    image: post.image,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      description: post.authorBio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Programist',
      logo: {
        '@type': 'ImageObject',
        url: 'https://programist.pp.ua/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const lang = params.lang || 'ua';
  const t = translations[lang];
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const currentUrl = `https://programist.pp.ua/${lang}/blog/${post.slug}`;
  const structuredData = generateStructuredData(post, lang, currentUrl);

  const breadcrumbs = [
    { name: t.nav.home, url: `/${lang}` },
    { name: t.nav.blog, url: `/${lang}/blog` },
    { name: post.title[lang as 'ua' | 'ru'], url: `/${lang}/blog/${post.slug}` },
  ];

  const relatedPosts = blogPosts.filter((p) =>
    p.id !== post.id && (post.relatedPosts?.includes(p.id) || p.tags.some((tag) => post.tags.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
              {post.title[lang as 'ua' | 'ru']}
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
          <div className="prose prose-lg max-w-none">
            <div
              className="prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content[lang as 'ua' | 'ru'] }}
            />
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

          {/* <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {lang === 'ua' ? 'Потрібна допомога?' : 'Нужна помощь?'}
            </h3>
            <p className="text-gray-700 mb-4">
              {lang === 'ua' 
                ? 'Якщо у вас виникли питання або потрібна допомога з подібним завданням, я з радістю допоможу.'
                : 'Если у вас возникли вопросы или нужна помощь с подобной задачей, я с радостью помогу.'}
            </p>
            <a 
              href="https://roman.matviy.pp.ua/#contact" 
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {lang === 'ua' ? 'Написати мені' : 'Написать мне'}
            </a>
          </div> */}

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
                      ? `Матвій Роман - ${post.title[lang as 'ua' | 'ru']}` 
                      : `Матвей Роман - ${post.title[lang as 'ua' | 'ru']}`}
                  >
                    {lang === 'ua' 
                      ? post.authorRole + ` Програміст PHP - ${post.title[lang as 'ua' | 'ru']}` 
                      : post.authorRole + ` PHP Developer - ${post.title[lang as 'ua' | 'ru']}`}
                  </a>
                </p>
                <p className="mt-2 text-gray-600">
                  {lang === 'ua' 
                    ? 'Досвідчений розробник з 7-річним досвідом роботи. Спеціалізуюсь на створенні сучасних веб-додатків з використанням сучасних технологій. Зв\'яжіться зі мною для обговорення вашого проекту.'
                    : 'Опытный разработчик с 7-летним стажем. Специализируюсь на создании современных веб-приложений с использованием современных технологий. Свяжитесь со мной для обсуждения вашего проекта.'}
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
                      alt={relatedPost.title[lang as 'ua' | 'ru']}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {relatedPost.title[lang as 'ua' | 'ru']}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {relatedPost.excerpt[lang as 'ua' | 'ru']}
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