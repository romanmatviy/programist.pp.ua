import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  return generateSEO({
    title: lang === 'ua' ? 'Кейси — Наші роботи детально' : 'Кейсы — Наши работы детально',
    description: lang === 'ua' ? 'Детальні кейси наших проектів: проблема, рішення, результат' : 'Детальные кейсы наших проектов: проблема, решение, результат',
    keywords: 'кейси, проекти, портфоліо, результати, веб-розробка',
    canonical: `https://programist.pp.ua/${lang}/cases`,
    lang,
  });
}

export default function CasesPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';

  const breadcrumbs = [
    { name: lang === 'ua' ? 'Кейси' : 'Кейсы', url: `/${lang}/cases` },
  ];

  const cases = lang === 'ua' ? [
    {
      id: 1,
      title: 'Інтернет-магазин електроніки',
      client: 'B2C Retail Company',
      problem: 'Клієнт мав застарілий інтернет-магазин на OpenCart із повільним завантаженням (6+ секунд), низькою конверсією (0.8%) та відсутністю мобільної версії. Продажі онлайн становили лише 15% від загального обороту.',
      solution: 'Ми повністю переписали магазин на Laravel + Vue.js з кастомною адмін-панеллю на Filament. Реалізували: PWA, розумну фільтрацію товарів, інтеграцію з CRM (KeyCRM), підключення Stripe та LiqPay, систему рекомендацій "Схожі товари".',
      results: ['+150% онлайн продажів за 3 місяці', 'PageSpeed: 95/100 (було 32/100)', 'Час завантаження: 0.8с (було 6.2с)', 'Конверсія: 2.4% (було 0.8%)', 'Зменшення відмов на 40%'],
      technologies: ['Laravel', 'Vue.js', 'Filament', 'MySQL', 'Stripe', 'Redis'],
      duration: '8 тижнів',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop',
    },
    {
      id: 2,
      title: 'Корпоративний портал логістичної компанії',
      client: 'B2B Logistics',
      problem: 'Компанія не мала сайту взагалі. Ліди приходили виключно через холодні дзвінки. Потрібен був сучасний сайт із формою заявки, калькулятором вартості доставки та CRM-інтеграцією.',
      solution: 'Розробили багатомовний (UA/RU/EN) корпоративний сайт на Next.js із SEO-оптимізацією з першого дня. Інтегрували калькулятор вартості, онлайн-трекінг вантажу, форми заявок з автоматичним потраплянням у CRM.',
      results: ['+40% нових клієнтів через сайт', 'TOP-5 Google за ключовими запитами', '200+ лідів на місяць через форми', 'Автоматизація обробки заявок на 70%'],
      technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Salesforce'],
      duration: '6 тижнів',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    },
    {
      id: 3,
      title: 'SaaS-платформа для управління проектами',
      client: 'StartUp',
      problem: 'Стартап мав MVP на WordPress, який не витримував навантаження вже при 50 одночасних користувачах. Потрібна була масштабована платформа з реальним часом та підпискою.',
      solution: 'Побудували SaaS з нуля на Laravel (backend) + React (frontend). Реалізували: real-time оновлення через WebSockets, систему підписок (Stripe), канбан-дошки, тайм-трекінг, звіти та дашборди. Деплой на AWS з автоскейлінгом.',
      results: ['1000+ активних користувачів за перші 6 місяців', '99.9% uptime', 'Витримує 500+ одночасних користувачів', 'MRR $8,000 за 6 місяців'],
      technologies: ['Laravel', 'React', 'WebSockets', 'Redis', 'AWS', 'Stripe'],
      duration: '12 тижнів',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
    },
    {
      id: 4,
      title: 'SEO-оптимізація стоматологічної клініки',
      client: 'MedClinic',
      problem: 'Сайт клініки не був в TOP-100 Google за жодним запитом. PageSpeed — 18/100. Органічний трафік — менше 30 відвідувачів на день.',
      solution: 'Провели повний технічний аудит, оптимізували швидкість (стиснення зображень, lazy loading, CDN), створили 25 SEO-оптимізованих сторінок послуг, налаштували Schema.org розмітку, Google Business Profile та локальне SEO.',
      results: ['Трафік: з 30 до 450 відвідувачів/день', 'PageSpeed: з 18 до 94/100', 'TOP-3 за 12 ключовими запитами', '+60% дзвінків через сайт'],
      technologies: ['WordPress', 'PHP', 'Google Search Console', 'Schema.org'],
      duration: '4 тижні (оптимізація) + 3 місяці (SEO)',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    },
  ] : [
    {
      id: 1,
      title: 'Интернет-магазин электроники',
      client: 'B2C Retail Company',
      problem: 'Клиент имел устаревший интернет-магазин на OpenCart с медленной загрузкой (6+ секунд), низкой конверсией (0.8%) и отсутствием мобильной версии. Продажи онлайн составляли лишь 15% от общего оборота.',
      solution: 'Мы полностью переписали магазин на Laravel + Vue.js с кастомной админ-панелью на Filament. Реализовали: PWA, умную фильтрацию товаров, интеграцию с CRM (KeyCRM), подключение Stripe и LiqPay, систему рекомендаций "Похожие товары".',
      results: ['+150% онлайн продаж за 3 месяца', 'PageSpeed: 95/100 (было 32/100)', 'Время загрузки: 0.8с (было 6.2с)', 'Конверсия: 2.4% (было 0.8%)', 'Уменьшение отказов на 40%'],
      technologies: ['Laravel', 'Vue.js', 'Filament', 'MySQL', 'Stripe', 'Redis'],
      duration: '8 недель',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop',
    },
    {
      id: 2,
      title: 'Корпоративный портал логистической компании',
      client: 'B2B Logistics',
      problem: 'Компания не имела сайта вообще. Лиды приходили исключительно через холодные звонки. Нужен был современный сайт с формой заявки, калькулятором стоимости доставки и CRM-интеграцией.',
      solution: 'Разработали многоязычный (UA/RU/EN) корпоративный сайт на Next.js с SEO-оптимизацией с первого дня. Интегрировали калькулятор стоимости, онлайн-трекинг груза, формы заявок с автоматическим попаданием в CRM.',
      results: ['+40% новых клиентов через сайт', 'TOP-5 Google по ключевым запросам', '200+ лидов в месяц через формы', 'Автоматизация обработки заявок на 70%'],
      technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Salesforce'],
      duration: '6 недель',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    },
    {
      id: 3,
      title: 'SaaS-платформа для управления проектами',
      client: 'StartUp',
      problem: 'Стартап имел MVP на WordPress, который не выдерживал нагрузки уже при 50 одновременных пользователях. Нужна была масштабируемая платформа с реальным временем и подпиской.',
      solution: 'Построили SaaS с нуля на Laravel (backend) + React (frontend). Реализовали: real-time обновления через WebSockets, систему подписок (Stripe), канбан-доски, тайм-трекинг, отчеты и дашборды. Деплой на AWS с автоскейлингом.',
      results: ['1000+ активных пользователей за первые 6 месяцев', '99.9% uptime', 'Выдерживает 500+ одновременных пользователей', 'MRR $8,000 за 6 месяцев'],
      technologies: ['Laravel', 'React', 'WebSockets', 'Redis', 'AWS', 'Stripe'],
      duration: '12 недель',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
    },
    {
      id: 4,
      title: 'SEO-оптимизация стоматологической клиники',
      client: 'MedClinic',
      problem: 'Сайт клиники не был в TOP-100 Google ни по одному запросу. PageSpeed — 18/100. Органический трафик — менее 30 посетителей в день.',
      solution: 'Провели полный технический аудит, оптимизировали скорость (сжатие изображений, lazy loading, CDN), создали 25 SEO-оптимизированных страниц услуг, настроили Schema.org разметку, Google Business Profile и локальное SEO.',
      results: ['Трафик: с 30 до 450 посетителей/день', 'PageSpeed: с 18 до 94/100', 'TOP-3 по 12 ключевым запросам', '+60% звонков через сайт'],
      technologies: ['WordPress', 'PHP', 'Google Search Console', 'Schema.org'],
      duration: '4 недели (оптимизация) + 3 месяца (SEO)',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    },
  ];

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Кейси та результати' : 'Кейсы и результаты'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'ua' ? 'Детальний розбір наших проектів: від проблеми до результату' : 'Детальный разбор наших проектов: от проблемы до результата'}
          </p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {cases.map((caseItem, idx) => (
            <article key={caseItem.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={caseItem.image} alt={caseItem.title} className="w-full h-64 md:h-80 object-cover" />
              
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{caseItem.client}</span>
                  <span className="text-sm text-gray-500">⏱️ {caseItem.duration}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{caseItem.title}</h2>

                {/* Problem */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                    ❌ {lang === 'ua' ? 'Проблема' : 'Проблема'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{caseItem.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-2 flex items-center gap-2">
                    💡 {lang === 'ua' ? 'Рішення' : 'Решение'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{caseItem.solution}</p>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                    📈 {lang === 'ua' ? 'Результати' : 'Результаты'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {caseItem.results.map((result, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-lg">
                        <span className="text-green-500 font-bold">✓</span>
                        <span className="text-gray-800 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {caseItem.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? 'Хочете такий самий результат?' : 'Хотите такой же результат?'}
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            {lang === 'ua' ? 'Розкажіть про ваш проект — ми підготуємо індивідуальну пропозицію' : 'Расскажите о вашем проекте — мы подготовим индивидуальное предложение'}
          </p>
          <Link href={`/${lang}/contact`} className="inline-block bg-white text-primary-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
            {lang === 'ua' ? 'Обговорити проект' : 'Обсудить проект'}
          </Link>
        </div>
      </div>
    </div>
  );
}
