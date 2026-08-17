import { Language, translations } from '@/data/translations';
import { services } from '@/data/services';
import { ukrainianCities } from '@/data/cities';
import { getCitySlug } from '@/data/slug';
import { hireIntents } from '@/data/hireIntents';
import { getAllPosts } from '@/lib/mdx';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  return generateSEO({
    title: lang === 'ua' ? 'Карта сайту' : 'Карта сайта',
    description: lang === 'ua' ? 'Повна карта сайту RomanDev — всі сторінки, послуги, міста та статті' : 'Полная карта сайта RomanDev — все страницы, услуги, города и статьи',
    keywords: 'карта сайту, sitemap, всі сторінки',
    canonical: `https://programist.pp.ua/${lang}/sitemap`,
    lang,
  });
}

export default function SitemapPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);
  const posts = getAllPosts(lang);

  const breadcrumbs = [
    { name: lang === 'ua' ? 'Карта сайту' : 'Карта сайта', url: `/${lang}/sitemap` },
  ];

  const topCities = ukrainianCities.slice(0, 12);

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Карта сайту' : 'Карта сайта'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'ua' ? 'Швидкий доступ до всіх сторінок нашого сайту' : 'Быстрый доступ ко всем страницам нашего сайта'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Main Pages */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-xl">🏠</div>
              <h2 className="text-xl font-bold text-gray-900">
                {lang === 'ua' ? 'Основні сторінки' : 'Основные страницы'}
              </h2>
            </div>
            <ul className="space-y-3">
              <li><Link href={`/${lang}`} className="text-gray-700 hover:text-primary-600 transition-colors">{t.nav.home}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-gray-700 hover:text-primary-600 transition-colors">{t.nav.about}</Link></li>
              <li><Link href={`/${lang}/services`} className="text-gray-700 hover:text-primary-600 transition-colors">{t.nav.services}</Link></li>
              <li><Link href={`/${lang}/portfolio`} className="text-gray-700 hover:text-primary-600 transition-colors">{t.nav.portfolio}</Link></li>
              <li><Link href={`/${lang}/blog`} className="text-gray-700 hover:text-primary-600 transition-colors">{t.nav.blog}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-gray-700 hover:text-primary-600 transition-colors">{t.nav.contact}</Link></li>
              <li><Link href={`/${lang}/faq`} className="text-gray-700 hover:text-primary-600 transition-colors">{lang === 'ua' ? 'Часті питання' : 'Частые вопросы'}</Link></li>
              <li><Link href={`/${lang}/reviews`} className="text-gray-700 hover:text-primary-600 transition-colors">{lang === 'ua' ? 'Відгуки' : 'Отзывы'}</Link></li>
              <li><Link href={`/${lang}/cases`} className="text-gray-700 hover:text-primary-600 transition-colors">{lang === 'ua' ? 'Кейси' : 'Кейсы'}</Link></li>
              <li><Link href={`/${lang}/hire`} className="text-gray-700 hover:text-primary-600 transition-colors">{lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста'}</Link></li>
              <li><Link href={`/${lang}/privacy`} className="text-gray-700 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href={`/${lang}/terms`} className="text-gray-700 hover:text-primary-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">💼</div>
              <h2 className="text-xl font-bold text-gray-900">{t.footer.services}</h2>
            </div>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.id}>
                  <Link href={`/${lang}/service/${service.slug}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                    {service.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Posts */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">📝</div>
              <h2 className="text-xl font-bold text-gray-900">{t.nav.blog}</h2>
            </div>
            <ul className="space-y-3">
              {posts.map(post => (
                <li key={post.slug}>
                  <Link href={`/${lang}/blog/${post.slug}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hire Developer */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl">👨‍💻</div>
              <h2 className="text-xl font-bold text-gray-900">
                {lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста'}
              </h2>
            </div>
            <ul className="space-y-3">
              {hireIntents.map(intent => (
                <li key={intent.slug[lang]}>
                  <Link href={`/${lang}/hire/${intent.slug[lang]}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                    {intent.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xl">📍</div>
              <h2 className="text-xl font-bold text-gray-900">
                {lang === 'ua' ? 'Міста' : 'Города'}
              </h2>
            </div>
            <ul className="space-y-3">
              {topCities.map(city => (
                <li key={city.name}>
                  <Link href={`/${lang}/service/geo/${getCitySlug(city.name, lang)}`} className="text-gray-700 hover:text-primary-600 transition-colors">
                    {lang === 'ua' ? city.name : (city.nameRu || city.name)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/${lang}/service/geo`} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  {lang === 'ua' ? 'Всі міста →' : 'Все города →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Other */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-xl">🔗</div>
              <h2 className="text-xl font-bold text-gray-900">
                {lang === 'ua' ? 'Партнери' : 'Партнёры'}
              </h2>
            </div>
            <ul className="space-y-3">
              <li><a href="https://apartner.pro" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">Apartner.pro</a></li>
              <li><a href="https://studio.apartner.pro" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">Studio Apartner</a></li>
              <li><a href="https://devRoman.dev" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">DevRoman.dev</a></li>
              <li><a href="https://indexfast.pro" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">IndexFast.pro</a></li>
              <li><a href="https://seo.pp.ua" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">SEO.pp.ua</a></li>
              <li><a href="https://hostpro.apartner.pro" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">{lang === 'ua' ? 'Швидкий хостинг' : 'Быстрый хостинг'}</a></li>
              <li><a href="https://hire-web-developer.com" target="_blank" rel="noopener" className="text-gray-700 hover:text-primary-600 transition-colors">Hire Web Developer</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
