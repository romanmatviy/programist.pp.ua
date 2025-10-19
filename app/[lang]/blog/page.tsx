import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';
import { blogPosts } from '@/data/blogPosts';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return generateSEO({
    title: t.blog.title,
    description: t.blog.subtitle,
    keywords: 'блог, статті, веб-розробка, SEO, технології, blog, articles, web development',
    canonical: `https://programist.pp.ua/${lang}/blog`,
    lang,
    alternateUrls: {
      ua: 'https://programist.pp.ua/ua/blog',
      ru: 'https://programist.pp.ua/ru/blog'
    },
  });
}

export default function BlogPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const breadcrumbs = [
    { name: t.nav.blog, url: `/${lang}/blog` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t.blog.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{t.blog.subtitle}</p>
          
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/${lang}/blog/${post.slug}`}
                className="block hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img 
                        className="h-48 w-full object-cover md:w-48" 
                        src={post.image} 
                        alt={post.title[lang]}
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {post.title[lang]}
                      </h2>
                      <p className="mt-3 text-gray-600">
                        {post.excerpt[lang]}
                      </p>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                            <div className="flex space-x-1 text-sm text-gray-500">
                              <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString(lang === 'ua' ? 'uk-UA' : 'ru-RU', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </time>
                              <span>•</span>
                              <span>{Math.floor(Math.random() * 10) + 5} {lang === 'ua' ? 'хв' : 'мин'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          <div className="mt-12 bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === 'ua' ? 'Отримуйте корисні статті' : 'Получайте полезные статьи'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'ua' 
                ? 'Підпишіться на розсилку, щоб отримувати останні статті про веб-розробку' 
                : 'Подпишитесь на рассылку, чтобы получать последние статьи о веб-разработке'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                {lang === 'ua' ? 'Підписатися' : 'Подписаться'}
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}