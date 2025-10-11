import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return generateSEO({
    title: t.portfolio.title,
    description: t.portfolio.subtitle,
    keywords: 'портфоліо, проекти, роботи, веб-розробка',
    canonical: `https://romandev.com/${lang}/portfolio`,
    lang,
  });
}

export default function PortfolioPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const breadcrumbs = [
    { name: t.nav.portfolio, url: `/${lang}/portfolio` },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: lang === 'ua' ? 'Інтернет-магазин електроніки' : 'Интернет-магазин электроники',
      description: lang === 'ua' 
        ? 'Повнофункціональний інтернет-магазин з інтеграцією платіжних систем та системою управління замовленнями'
        : 'Полнофункциональный интернет-магазин с интеграцией платежных систем и системой управления заказами',
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: lang === 'ua' ? 'Корпоративний портал' : 'Корпоративный портал',
      description: lang === 'ua'
        ? 'Багатомовний корпоративний сайт з системою управління контентом та інтеграцією з CRM'
        : 'Многоязычный корпоративный сайт с системой управления контентом и интеграцией с CRM',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      title: lang === 'ua' ? 'SaaS платформа' : 'SaaS платформа',
      description: lang === 'ua'
        ? 'Платформа для управління проектами з real-time оновленнями та системою підписок'
        : 'Платформа для управления проектами с real-time обновлениями и системой подписок',
      technologies: ['Laravel', 'Livewire', 'PostgreSQL', 'Redis'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      title: lang === 'ua' ? 'Блог-платформа' : 'Блог-платформа',
      description: lang === 'ua'
        ? 'Швидка блог-платформа з SEO-оптимізацією та системою коментарів'
        : 'Быстрая блог-платформа с SEO-оптимизацией и системой комментариев',
      technologies: ['Next.js', 'MDX', 'Vercel', 'Prisma'],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      title: lang === 'ua' ? 'Ресторанний сайт' : 'Ресторанный сайт',
      description: lang === 'ua'
        ? 'Сайт ресторану з онлайн-бронюванням столиків та інтеграцією з системою доставки'
        : 'Сайт ресторана с онлайн-бронированием столиков и интеграцией с системой доставки',
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      title: lang === 'ua' ? 'Освітня платформа' : 'Образовательная платформа',
      description: lang === 'ua'
        ? 'Платформа для онлайн-навчання з відео-курсами та системою тестування'
        : 'Платформа для онлайн-обучения с видео-курсами и системой тестирования',
      technologies: ['Laravel', 'Vue.js', 'Vimeo API', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.portfolio.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? 'Хочете такий же проект?' : 'Хотите такой же проект?'}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {lang === 'ua' 
              ? 'Зв\'яжіться з нами, і ми створимо унікальне рішення для вашого бізнесу'
              : 'Свяжитесь с нами, и мы создадим уникальное решение для вашего бизнеса'}
          </p>
          <a href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
            {t.hero.cta}
          </a>
        </div>
      </div>
    </div>
  );
}