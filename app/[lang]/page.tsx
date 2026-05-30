import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { services } from '@/data/services';
import { technologies } from '@/data/technologies';
import ServiceCard from '@/components/ServiceCard';
import TechnologyCard from '@/components/TechnologyCard';
import {
  generateSEO,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generatePersonSchema
} from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return generateSEO({
    title: t.hero.title,
    description: t.hero.description,
    keywords: 'розробка сайтів, веб-розробка, Laravel, Next.js, WordPress, PrestaShop, PHP, React, Vue, Nuxt, Filament',
    canonical: `https://programist.pp.ua/${lang}`,
    lang,
    alternateUrls: {
      ua: 'https://programist.pp.ua/ua',
      ru: 'https://programist.pp.ua/ru',
    },
  });
}

export default function HomePage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema(lang as 'ua' | 'ru');
  const personSchema = generatePersonSchema();

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 animate-slide-up">
              {t.hero.subtitle}
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-up">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href={`/${lang}/contact`} className="btn-primary">
                {t.hero.cta}
              </Link>
              <Link href={`/${lang}/services`} className="btn-secondary">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10+</div>
              <div className="text-gray-600">{t.about.experience}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-600">{t.about.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">300+</div>
              <div className="text-gray-600">{t.about.clients}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">20+</div>
              <div className="text-gray-600">{t.about.technologies}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t.services.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${lang}/services`} className="btn-primary">
              {t.services.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t.technologies.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.technologies.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.slice(0, 10).map((tech) => (
              <TechnologyCard key={tech.id} technology={tech} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              {t.hero.cta}
            </Link>
            <a href="tel:+380938800822" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
              📞 +38 (093) 880-08-22
            </a>
          </div>
        </div>
      </section>

      {/* Useful Projects & Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              {lang === 'ua' ? 'Корисні сервіси та проєкти' : 'Полезные сервисы и проекты'}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {lang === 'ua'
                ? 'Інструменти та ресурси, які ми розробили для спрощення вашої роботи'
                : 'Инструменты и ресурсы, которые мы разработали для упрощения вашей работы'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { href: 'https://monitortest.pp.ua', icon: '🖥️', name: 'Monitor Test', desc: lang === 'ua' ? 'Тестування монітора онлайн' : 'Тестирование монитора онлайн', linkText: lang === 'ua' ? 'Тест монітора онлайн' : 'Тест монитора онлайн' },
              { href: 'https://keytest.pp.ua', icon: '⌨️', name: 'Key Test', desc: lang === 'ua' ? 'Тестування клавіатури онлайн' : 'Тестирование клавиатуры онлайн', linkText: lang === 'ua' ? 'Тест клавіатури онлайн' : 'Тест клавиатуры онлайн' },
              { href: 'https://pctest.pp.ua', icon: '💻', name: 'PC Test', desc: lang === 'ua' ? 'Тестування комп\'ютера онлайн' : 'Тестирование компьютера онлайн', linkText: lang === 'ua' ? 'Тест комп\'ютера онлайн' : 'Тест компьютера онлайн' },
              { href: 'https://php.apartner.pro', icon: '🐘', name: 'PHP Course', desc: lang === 'ua' ? 'Безкоштовний курс PHP програмування' : 'Бесплатный курс PHP программирования', linkText: lang === 'ua' ? 'Курс PHP програмування' : 'Курс PHP программирования' },
              { href: 'https://invoicemaker.me', icon: '🧾', name: 'Invoice Maker', desc: lang === 'ua' ? 'Створення інвойсів онлайн' : 'Создание инвойсов онлайн', linkText: lang === 'ua' ? 'Створити інвойс онлайн' : 'Создать инвойс онлайн' },
              { href: 'https://indexfast.pp.ua', icon: '🚀', name: 'IndexFast', desc: lang === 'ua' ? 'Швидка індексація сторінок у Google' : 'Быстрая индексация страниц в Google', linkText: lang === 'ua' ? 'Індексація сайту в Google' : 'Индексация сайта в Google' },
              { href: 'https://hostings.pp.ua', icon: '🌐', name: 'Hostings.pp.ua', desc: lang === 'ua' ? 'Огляди та порівняння хостингів' : 'Обзоры и сравнения хостингов', linkText: lang === 'ua' ? 'Порівняння хостингів' : 'Сравнение хостингов' },
              { href: 'https://hostpro.apartner.pro/', icon: '🛡️', name: 'HostPro', desc: lang === 'ua' ? 'Надійний хостинг для сайтів' : 'Надёжный хостинг для сайтов', linkText: lang === 'ua' ? 'Надійний хостинг для сайту' : 'Надёжный хостинг для сайта' },
              { href: 'https://apartner.pro', icon: '🏢', name: 'Apartner.pro', desc: lang === 'ua' ? 'Студія розробки сайтів' : 'Студия разработки сайтов', linkText: lang === 'ua' ? 'Розробка сайтів під ключ' : 'Разработка сайтов под ключ' },
              { href: 'https://hire-web-developer.com', icon: '👨‍💻', name: 'Hire Web Developer', desc: lang === 'ua' ? 'Найняти веб-розробника' : 'Нанять веб-разработчика', linkText: lang === 'ua' ? 'Найняти веб-розробника' : 'Нанять веб-разработчика' },
              { href: 'https://hirewebdeveloper.pp.ua', icon: '💼', name: 'HireWebDeveloper.pp.ua', desc: lang === 'ua' ? 'Послуги веб-розробника' : 'Услуги веб-разработчика', linkText: lang === 'ua' ? 'Послуги веб-розробника' : 'Услуги веб-разработчика' },
              { href: 'https://programist.pp.ua', icon: '⚡', name: 'Programist.pp.ua', desc: lang === 'ua' ? 'Послуги програміста в Україні' : 'Услуги программиста в Украине', linkText: lang === 'ua' ? 'Програміст на замовлення' : 'Программист на заказ' },
              { href: 'https://bookmark.apartner.pro/', icon: '🔖', name: 'Bookmark Manager', desc: lang === 'ua' ? 'Менеджер закладок для розробників' : 'Менеджер закладок для разработчиков', linkText: lang === 'ua' ? 'Менеджер закладок онлайн' : 'Менеджер закладок онлайн' },
              { href: 'https://devroman.pl', icon: '🇵🇱', name: 'DevRoman.pl', desc: lang === 'ua' ? 'Веб-розробка для Польщі' : 'Веб-разработка для Польши', linkText: lang === 'ua' ? 'Веб-розробник у Польщі' : 'Веб-разработчик в Польше' },
              { href: 'https://programista.devroman.pl', icon: '👨‍💻', name: 'Programista DevRoman', desc: lang === 'ua' ? 'Програміст для польського ринку' : 'Программист для польского рынка', linkText: lang === 'ua' ? 'Programista na zamówienie' : 'Programista na zamówienie' },
              { href: 'https://programist.matviy.pp.ua', icon: '🧑‍💻', name: 'Programist Matviy', desc: lang === 'ua' ? 'Особистий сайт програміста' : 'Личный сайт программиста', linkText: lang === 'ua' ? 'Програміст Матвій — портфоліо' : 'Программист Матвий — портфолио' },
            ].map((project) => (
              <a
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noopener"
                className="group flex flex-col gap-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{project.icon}</span>
                  <span className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-200 text-sm leading-tight">
                    {project.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{project.desc}</p>
                <div className="mt-auto pt-2 border-t border-gray-100 flex items-center gap-1 text-primary-500 text-xs font-medium">
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {lang === 'ua' ? 'Перейти' : 'Перейти'}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
