import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return generateSEO({
    title: t.blog.title,
    description: t.blog.subtitle,
    keywords: 'блог, статті, веб-розробка, SEO, технології',
    canonical: `https://programist.pp.ua/${lang}/blog`,
    lang,
  });
}

export default function BlogPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const breadcrumbs = [
    { name: t.nav.blog, url: `/${lang}/blog` },
  ];

  const blogPosts = [
    {
      id: 1,
      title: lang === 'ua' ? 'Як оптимізувати швидкість завантаження сайту' : 'Как оптимизировать скорость загрузки сайта',
      excerpt: lang === 'ua'
        ? 'Практичні поради щодо покращення продуктивності веб-сайтів. Розглянемо техніки оптимізації зображень, кешування та мінімізації коду.'
        : 'Практические советы по улучшению производительности веб-сайтов. Рассмотрим техники оптимизации изображений, кеширования и минимизации кода.',
      date: '2025-01-15',
      author: 'Roman',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Performance', 'Optimization', 'Web Development'],
    },
    {
      id: 2,
      title: lang === 'ua' ? 'Laravel 11: Що нового?' : 'Laravel 11: Что нового?',
      excerpt: lang === 'ua'
        ? 'Огляд нових можливостей Laravel 11. Покращення продуктивності, нові функції та зміни в архітектурі фреймворку.'
        : 'Обзор новых возможностей Laravel 11. Улучшение производительности, новые функции и изменения в архитектуре фреймворка.',
      date: '2025-01-10',
      author: 'Roman',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      tags: ['Laravel', 'PHP', 'Backend'],
    },
    {
      id: 3,
      title: lang === 'ua' ? 'SEO для Next.js: Повний гайд' : 'SEO для Next.js: Полный гайд',
      excerpt: lang === 'ua'
        ? 'Як правильно налаштувати SEO в Next.js додатках. Мета-теги, structured data, sitemap та інші важливі аспекти.'
        : 'Как правильно настроить SEO в Next.js приложениях. Мета-теги, structured data, sitemap и другие важные аспекты.',
      date: '2025-01-05',
      author: 'Roman',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop',
      tags: ['Next.js', 'SEO', 'React'],
    },
    {
      id: 4,
      title: lang === 'ua' ? 'Безпека веб-додатків: Топ-10 вразливостей' : 'Безопасность веб-приложений: Топ-10 уязвимостей',
      excerpt: lang === 'ua'
        ? 'OWASP Top 10 вразливостей та як їх уникнути. SQL-ін\'єкції, XSS, CSRF та інші загрози безпеці.'
        : 'OWASP Top 10 уязвимостей и как их избежать. SQL-инъекции, XSS, CSRF и другие угрозы безопасности.',
      date: '2024-12-28',
      author: 'Roman',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
      tags: ['Security', 'OWASP', 'Web Development'],
    },
    {
      id: 5,
      title: lang === 'ua' ? 'Tailwind CSS vs Bootstrap: Що обрати?' : 'Tailwind CSS vs Bootstrap: Что выбрать?',
      excerpt: lang === 'ua'
        ? 'Порівняння двох популярних CSS фреймворків. Переваги, недоліки та випадки використання кожного з них.'
        : 'Сравнение двух популярных CSS фреймворков. Преимущества, недостатки и случаи использования каждого из них.',
      date: '2024-12-20',
      author: 'Roman',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
      tags: ['CSS', 'Tailwind', 'Bootstrap'],
    },
    {
      id: 6,
      title: lang === 'ua' ? 'API Design: Best Practices' : 'API Design: Best Practices',
      excerpt: lang === 'ua'
        ? 'Як створити зручний та масштабований API. RESTful принципи, версіонування, документація та безпека.'
        : 'Как создать удобный и масштабируемый API. RESTful принципы, версионирование, документация и безопасность.',
      date: '2024-12-15',
      author: 'Roman',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      tags: ['API', 'REST', 'Backend'],
    },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.blog.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 transition-colors">
                  <span>{t.blog.readArticle}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-primary text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === 'ua' ? 'Підпишіться на наш блог' : 'Подпишитесь на наш блог'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'ua' 
                ? 'Отримуйте корисні статті про веб-розробку прямо на вашу пошту'
                : 'Получайте полезные статьи о веб-разработке прямо на вашу почту'}
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
  );
}