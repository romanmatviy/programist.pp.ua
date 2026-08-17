import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO, generatePortfolioSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  return generateSEO({
    title: t.portfolio.title,
    description: t.portfolio.subtitle,
    keywords: 'портфоліо, проекти, роботи, веб-розробка',
    canonical: `https://programist.pp.ua/${lang}/portfolio`,
    lang,
  });
}

export default function PortfolioPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  const breadcrumbs = [
    { name: t.nav.portfolio, url: `/${lang}/portfolio` },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: lang === 'ua' ? 'Інтернет-магазин електроніки' : 'Интернет-магазин электроники',
      client: lang === 'ua' ? 'B2C Retail' : 'B2C Retail',
      description: lang === 'ua' 
        ? 'Повнофункціональний інтернет-магазин з інтеграцією платіжних систем та системою управління замовленнями.'
        : 'Полнофункциональный интернет-магазин с интеграцией платежных систем и системой управления заказами.',
      metrics: [
        lang === 'ua' ? '+150% онлайн продажів' : '+150% онлайн продаж',
        lang === 'ua' ? '< 1с час завантаження' : '< 1с время загрузки'
      ],
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: lang === 'ua' ? 'Корпоративний портал' : 'Корпоративный портал',
      client: lang === 'ua' ? 'B2B Services' : 'B2B Services',
      description: lang === 'ua'
        ? 'Багатомовний корпоративний сайт з системою управління контентом та інтеграцією з CRM.'
        : 'Многоязычный корпоративный сайт с системой управления контентом и интеграцией с CRM.',
      metrics: [
        lang === 'ua' ? '+40% конверсії у лід' : '+40% конверсии в лид',
        lang === 'ua' ? 'Автоматизація збору даних' : 'Автоматизация сбора данных'
      ],
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      title: lang === 'ua' ? 'SaaS платформа' : 'SaaS платформа',
      client: lang === 'ua' ? 'Tech Startup' : 'Tech Startup',
      description: lang === 'ua'
        ? 'Платформа для управління проектами з real-time оновленнями та системою підписок.'
        : 'Платформа для управления проектами с real-time обновлениями и системой подписок.',
      metrics: [
        lang === 'ua' ? '10 000+ активних юзерів' : '10 000+ активных юзеров',
        lang === 'ua' ? 'Масштабована архітектура' : 'Масштабируемая архитектура'
      ],
      technologies: ['Laravel', 'Livewire', 'PostgreSQL', 'Redis'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      title: lang === 'ua' ? 'Блог-платформа' : 'Блог-платформа',
      client: lang === 'ua' ? 'Media Agency' : 'Media Agency',
      description: lang === 'ua'
        ? 'Швидка блог-платформа з SEO-оптимізацією та системою коментарів.'
        : 'Быстрая блог-платформа с SEO-оптимизацией и системой комментариев.',
      metrics: [
        lang === 'ua' ? '100/100 Google PageSpeed' : '100/100 Google PageSpeed',
        lang === 'ua' ? 'x3 зростання трафіку' : 'x3 рост трафика'
      ],
      technologies: ['Next.js', 'MDX', 'Vercel', 'Prisma'],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      title: lang === 'ua' ? 'Ресторанний сайт' : 'Ресторанный сайт',
      client: lang === 'ua' ? 'HoReCa' : 'HoReCa',
      description: lang === 'ua'
        ? 'Сайт ресторану з онлайн-бронюванням столиків та інтеграцією з системою доставки.'
        : 'Сайт ресторана с онлайн-бронированием столиков и интеграцией с системой доставки.',
      metrics: [
        lang === 'ua' ? '+300 бронювань/міс' : '+300 бронирований/мес',
        lang === 'ua' ? 'Інтеграція з кур\'єрами' : 'Интеграция с курьерами'
      ],
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      title: lang === 'ua' ? 'Освітня платформа' : 'Образовательная платформа',
      client: lang === 'ua' ? 'EdTech' : 'EdTech',
      description: lang === 'ua'
        ? 'Платформа для онлайн-навчання з відео-курсами та системою тестування.'
        : 'Платформа для онлайн-обучения с видео-курсами и системой тестирования.',
      metrics: [
        lang === 'ua' ? '50+ відеокурсів' : '50+ видеокурсов',
        lang === 'ua' ? 'Безпека відеоконтенту' : 'Безопасность видеоконтента'
      ],
      technologies: ['Laravel', 'Vue.js', 'Vimeo API', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    },
  ];

  const portfolioSchema = generatePortfolioSchema(portfolioItems, lang);

  return (
    <div className="section-padding bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {lang === 'ua' ? 'Наші Кейси та Результати' : 'Наши Кейсы и Результаты'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {lang === 'ua' 
              ? 'Ми не просто пишемо код. Ми вирішуємо бізнес-задачі, збільшуємо продажі та оптимізуємо процеси. Подивіться на реальні цифри наших клієнтів.' 
              : 'Мы не просто пишем код. Мы решаем бизнес-задачи, увеличиваем продажи и оптимизируем процессы. Посмотрите на реальные цифры наших клиентов.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {portfolioItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-64 bg-gray-200 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                  {item.client}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {item.title}
                </h3>
                
                {/* Metrics Highlight */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {item.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <div className="text-green-700 font-bold text-lg leading-tight">
                        {metric}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 mb-6 flex-1 text-lg leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-gray-100">
                  {item.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
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
        <div className="mt-20 bg-gradient-primary text-white rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {lang === 'ua' ? 'Хочете таких же результатів для вашого бізнесу?' : 'Хотите таких же результатов для вашего бизнеса?'}
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              {lang === 'ua' 
                ? 'Зв\'яжіться з нами для безкоштовного аудиту та оцінки вашого проекту. Ми розробимо план, який принесе реальні гроші.'
                : 'Свяжитесь с нами для бесплатного аудита и оценки вашего проекта. Мы разработаем план, который принесет реальные деньги.'}
            </p>
            <a href={`/${lang}/contact`} className="bg-white text-primary-700 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              {lang === 'ua' ? 'Обговорити проект' : 'Обсудить проект'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}