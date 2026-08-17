import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  return generateSEO({
    title: lang === 'ua' ? 'Відгуки клієнтів' : 'Отзывы клиентов',
    description: lang === 'ua' ? 'Реальні відгуки наших клієнтів про розробку сайтів, SEO та підтримку' : 'Реальные отзывы наших клиентов о разработке сайтов, SEO и поддержке',
    keywords: 'відгуки, клієнти, рекомендації, веб-розробка',
    canonical: `https://programist.pp.ua/${lang}/reviews`,
    lang,
  });
}

export default function ReviewsPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';

  const breadcrumbs = [
    { name: lang === 'ua' ? 'Відгуки' : 'Отзывы', url: `/${lang}/reviews` },
  ];

  const reviews = lang === 'ua' ? [
    {
      id: 1,
      name: 'Олександр К.',
      company: 'TechRetail',
      role: 'CEO',
      rating: 5,
      service: 'Інтернет-магазин на Laravel',
      text: 'Роман зробив неймовірну роботу з нашим інтернет-магазином. Сайт став значно швидшим, продажі зросли на 150% за перші 3 місяці. Особливо вразила увага до деталей та SEO-оптимізація з першого дня. Рекомендую!',
      date: '2024-11-15',
    },
    {
      id: 2,
      name: 'Марина С.',
      company: 'MedClinic',
      role: 'Маркетолог',
      rating: 5,
      service: 'SEO-оптимізація',
      text: 'Після SEO-аудиту та оптимізації наш трафік виріс з 30 до 450 відвідувачів на день. Ми потрапили в TOP-3 Google за 12 ключовими запитами. Роман дуже професійний та завжди на зв\'язку.',
      date: '2024-10-20',
    },
    {
      id: 3,
      name: 'Дмитро В.',
      company: 'LogisticsPro',
      role: 'Засновник',
      rating: 5,
      service: 'Корпоративний сайт на Next.js',
      text: 'Нам потрібен був сучасний багатомовний сайт з інтеграцією CRM. Роман зробив все в термін і навіть більше. Зараз отримуємо 200+ лідів на місяць через форми на сайті. Дуже задоволені!',
      date: '2024-09-05',
    },
    {
      id: 4,
      name: 'Ірина Л.',
      company: 'FashionStore',
      role: 'Власниця',
      rating: 5,
      service: 'WordPress + WooCommerce',
      text: 'Замовляла редизайн та прискорення мого WordPress магазину. Раніше сайт завантажувався 5 секунд, тепер менше секунди. Конверсія зросла на 80%. Однозначно раджу звертатися до Романа.',
      date: '2024-08-12',
    },
    {
      id: 5,
      name: 'Андрій П.',
      company: 'StartupHub',
      role: 'CTO',
      rating: 5,
      service: 'SaaS платформа',
      text: 'Розробили з Романом SaaS-платформу з нуля. Архітектура продумана, код чистий, деплой автоматизований. За 6 місяців набрали 1000+ користувачів. Планую продовжувати співпрацю.',
      date: '2024-07-28',
    },
    {
      id: 6,
      name: 'Олена М.',
      company: 'BeautyStudio',
      role: 'Директорка',
      rating: 4,
      service: 'Landing Page',
      text: 'Замовила лендінг для салону краси. Результат перевершив очікування — красивий, швидкий, з анімаціями. Форма заявки працює ідеально, клієнти приходять щодня. Дякую за роботу!',
      date: '2024-06-10',
    },
    {
      id: 7,
      name: 'Віктор Г.',
      company: 'ConstructionCo',
      role: 'Менеджер',
      rating: 5,
      service: 'Підтримка сайту',
      text: 'Вже рік на підтримці у Романа. Будь-які проблеми вирішуються протягом кількох годин. Регулярно оновлює плагіни, робить бекапи, моніторить безпеку. Надійний партнер.',
      date: '2024-05-22',
    },
    {
      id: 8,
      name: 'Наталія Т.',
      company: 'EduPlatform',
      role: 'Product Manager',
      rating: 5,
      service: 'Веб-додаток на React',
      text: 'Роман допоміг перенести наш освітній портал з застарілого PHP на React + Laravel API. Швидкість роботи зросла в рази, UX покращився, студенти задоволені. Відмінна робота!',
      date: '2024-04-18',
    },
  ] : [
    {
      id: 1,
      name: 'Александр К.',
      company: 'TechRetail',
      role: 'CEO',
      rating: 5,
      service: 'Интернет-магазин на Laravel',
      text: 'Роман сделал невероятную работу с нашим интернет-магазином. Сайт стал значительно быстрее, продажи выросли на 150% за первые 3 месяца. Особенно впечатлило внимание к деталям и SEO-оптимизация с первого дня. Рекомендую!',
      date: '2024-11-15',
    },
    {
      id: 2,
      name: 'Марина С.',
      company: 'MedClinic',
      role: 'Маркетолог',
      rating: 5,
      service: 'SEO-оптимизация',
      text: 'После SEO-аудита и оптимизации наш трафик вырос с 30 до 450 посетителей в день. Мы попали в TOP-3 Google по 12 ключевым запросам. Роман очень профессиональный и всегда на связи.',
      date: '2024-10-20',
    },
    {
      id: 3,
      name: 'Дмитрий В.',
      company: 'LogisticsPro',
      role: 'Основатель',
      rating: 5,
      service: 'Корпоративный сайт на Next.js',
      text: 'Нам нужен был современный многоязычный сайт с интеграцией CRM. Роман сделал все в срок и даже больше. Сейчас получаем 200+ лидов в месяц через формы на сайте. Очень довольны!',
      date: '2024-09-05',
    },
    {
      id: 4,
      name: 'Ирина Л.',
      company: 'FashionStore',
      role: 'Владелица',
      rating: 5,
      service: 'WordPress + WooCommerce',
      text: 'Заказывала редизайн и ускорение моего WordPress магазина. Раньше сайт загружался 5 секунд, теперь менее секунды. Конверсия выросла на 80%. Однозначно советую обращаться к Роману.',
      date: '2024-08-12',
    },
    {
      id: 5,
      name: 'Андрей П.',
      company: 'StartupHub',
      role: 'CTO',
      rating: 5,
      service: 'SaaS платформа',
      text: 'Разработали с Романом SaaS-платформу с нуля. Архитектура продумана, код чистый, деплой автоматизирован. За 6 месяцев набрали 1000+ пользователей. Планирую продолжать сотрудничество.',
      date: '2024-07-28',
    },
    {
      id: 6,
      name: 'Елена М.',
      company: 'BeautyStudio',
      role: 'Директор',
      rating: 4,
      service: 'Landing Page',
      text: 'Заказала лендинг для салона красоты. Результат превзошел ожидания — красивый, быстрый, с анимациями. Форма заявки работает идеально, клиенты приходят каждый день. Спасибо за работу!',
      date: '2024-06-10',
    },
    {
      id: 7,
      name: 'Виктор Г.',
      company: 'ConstructionCo',
      role: 'Менеджер',
      rating: 5,
      service: 'Поддержка сайта',
      text: 'Уже год на поддержке у Романа. Любые проблемы решаются в течение нескольких часов. Регулярно обновляет плагины, делает бекапы, мониторит безопасность. Надежный партнер.',
      date: '2024-05-22',
    },
    {
      id: 8,
      name: 'Наталья Т.',
      company: 'EduPlatform',
      role: 'Product Manager',
      rating: 5,
      service: 'Веб-приложение на React',
      text: 'Роман помог перенести наш образовательный портал с устаревшего PHP на React + Laravel API. Скорость работы выросла в разы, UX улучшился, студенты довольны. Отличная работа!',
      date: '2024-04-18',
    },
  ];

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RomanDev',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: reviews.length,
      bestRating: '5',
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating },
      reviewBody: r.text,
    })),
  };

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Відгуки клієнтів' : 'Отзывы клиентов'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {lang === 'ua' ? 'Що говорять наші клієнти про співпрацю' : 'Что говорят наши клиенты о сотрудничестве'}
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="bg-white rounded-xl shadow-sm px-6 py-4">
              <div className="text-3xl font-bold text-primary-600">{avgRating}</div>
              <div className="flex gap-0.5 justify-center my-1">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-sm text-gray-500">{lang === 'ua' ? 'середня оцінка' : 'средняя оценка'}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-6 py-4">
              <div className="text-3xl font-bold text-primary-600">{reviews.length}</div>
              <div className="text-sm text-gray-500 mt-2">{lang === 'ua' ? 'відгуків' : 'отзывов'}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-6 py-4">
              <div className="text-3xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-gray-500 mt-2">{lang === 'ua' ? 'рекомендують' : 'рекомендуют'}</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.role}, {review.company}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">{review.service}</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-3">{review.text}</p>

              <div className="text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString(lang === 'ua' ? 'uk-UA' : 'ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? 'Станьте нашим наступним задоволеним клієнтом' : 'Станьте нашим следующим довольным клиентом'}
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            {lang === 'ua' ? 'Розпочніть свій проект сьогодні' : 'Начните свой проект сегодня'}
          </p>
          <Link href={`/${lang}/contact`} className="inline-block bg-white text-primary-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
            {lang === 'ua' ? 'Замовити консультацію' : 'Заказать консультацию'}
          </Link>
        </div>
      </div>
    </div>
  );
}
