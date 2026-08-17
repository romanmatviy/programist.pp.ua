import { Language, translations } from '@/data/translations';
import { services } from '@/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  return generateSEO({
    title: lang === 'ua' ? 'Часті питання (FAQ)' : 'Частые вопросы (FAQ)',
    description: lang === 'ua' ? 'Відповіді на часті питання про розробку сайтів, SEO, підтримку та ціни' : 'Ответы на частые вопросы о разработке сайтов, SEO, поддержке и ценах',
    keywords: 'FAQ, часті питання, розробка сайтів, вартість, терміни',
    canonical: `https://programist.pp.ua/${lang}/faq`,
    lang,
  });
}

export default function FAQPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  const breadcrumbs = [
    { name: lang === 'ua' ? 'Часті питання' : 'Частые вопросы', url: `/${lang}/faq` },
  ];

  const generalFaqs = lang === 'ua' ? [
    { q: 'Скільки коштує розробка сайту?', a: 'Вартість залежить від типу проекту. Landing page — від $300, корпоративний сайт — від $800, інтернет-магазин — від $1500, кастомний веб-додаток — від $3000. Для точної оцінки скористайтесь нашим калькулятором або зв\'яжіться з нами.' },
    { q: 'Скільки часу займає розробка?', a: 'Landing page — 1-2 тижні, корпоративний сайт — 2-4 тижні, інтернет-магазин — 4-8 тижнів, складний веб-додаток — 2-4 місяці. Точні терміни залежать від обсягу та складності.' },
    { q: 'Які технології ви використовуєте?', a: 'Ми працюємо з Laravel, PHP, Next.js, React, Vue.js, Nuxt.js, WordPress, PrestaShop, OpenCart, TypeScript, MySQL, PostgreSQL та іншими сучасними інструментами.' },
    { q: 'Чи надаєте ви підтримку після запуску?', a: 'Так! Ми надаємо технічну підтримку, оновлення, виправлення помилок та консультації. Є різні пакети підтримки від почасової до абонентської.' },
    { q: 'Чи можна найняти програміста на годину?', a: 'Так, ви можете найняти нашого розробника погодинно від $15/год. Ідеально підходить для невеликих доробок, виправлення помилок або консультацій.' },
    { q: 'Чи робите ви SEO-оптимізацію?', a: 'Так! Кожен наш проект включає базову SEO-оптимізацію. Також ми надаємо окремі послуги з SEO-аудиту, оптимізації PageSpeed та просування сайту в Google.' },
    { q: 'Як відбувається оплата?', a: 'Ми працюємо за передоплатою 50%. Оплата на картку, PayPal або криптовалюта. Після виконання 50% робіт — фінальна оплата.' },
    { q: 'Чи працюєте ви з іноземними клієнтами?', a: 'Так, ми працюємо з клієнтами з усього світу. Спілкуємося українською, російською та англійською мовами.' },
  ] : [
    { q: 'Сколько стоит разработка сайта?', a: 'Стоимость зависит от типа проекта. Landing page — от $300, корпоративный сайт — от $800, интернет-магазин — от $1500, кастомное веб-приложение — от $3000. Для точной оценки воспользуйтесь нашим калькулятором или свяжитесь с нами.' },
    { q: 'Сколько времени занимает разработка?', a: 'Landing page — 1-2 недели, корпоративный сайт — 2-4 недели, интернет-магазин — 4-8 недель, сложное веб-приложение — 2-4 месяца. Точные сроки зависят от объема и сложности.' },
    { q: 'Какие технологии вы используете?', a: 'Мы работаем с Laravel, PHP, Next.js, React, Vue.js, Nuxt.js, WordPress, PrestaShop, OpenCart, TypeScript, MySQL, PostgreSQL и другими современными инструментами.' },
    { q: 'Предоставляете ли вы поддержку после запуска?', a: 'Да! Мы предоставляем техническую поддержку, обновления, исправление ошибок и консультации. Есть разные пакеты поддержки от почасовой до абонентской.' },
    { q: 'Можно ли нанять программиста на час?', a: 'Да, вы можете нанять нашего разработчика почасово от $15/час. Идеально подходит для небольших доработок, исправления ошибок или консультаций.' },
    { q: 'Делаете ли вы SEO-оптимизацию?', a: 'Да! Каждый наш проект включает базовую SEO-оптимизацию. Также мы предоставляем отдельные услуги по SEO-аудиту, оптимизации PageSpeed и продвижению сайта в Google.' },
    { q: 'Как происходит оплата?', a: 'Мы работаем по предоплате 50%. Оплата на карту, PayPal или криптовалюта. После выполнения 50% работ — финальная оплата.' },
    { q: 'Работаете ли вы с иностранными клиентами?', a: 'Да, мы работаем с клиентами со всего мира. Общаемся на украинском, русском и английском языках.' },
  ];

  // Collect FAQ from services
  const serviceFaqs = services
    .filter(s => s.faqs)
    .map(s => ({
      serviceName: s.title[lang],
      slug: s.slug,
      faqs: s.faqs![lang],
    }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Часті питання' : 'Частые вопросы'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'ua' ? 'Відповіді на найпопулярніші запитання наших клієнтів' : 'Ответы на самые популярные вопросы наших клиентов'}
          </p>
        </div>

        {/* General FAQ */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {lang === 'ua' ? '🔹 Загальні питання' : '🔹 Общие вопросы'}
          </h2>
          <div className="space-y-4">
            {generalFaqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Service-specific FAQ */}
        {serviceFaqs.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {lang === 'ua' ? '🔹 Питання по послугах' : '🔹 Вопросы по услугам'}
            </h2>
            {serviceFaqs.map(sf => (
              <div key={sf.slug} className="mb-8">
                <h3 className="text-lg font-bold text-primary-600 mb-4">{sf.serviceName}</h3>
                <div className="space-y-3">
                  {sf.faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? 'Не знайшли відповідь?' : 'Не нашли ответ?'}
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            {lang === 'ua' ? 'Зв\'яжіться з нами, і ми відповімо на всі ваші питання' : 'Свяжитесь с нами, и мы ответим на все ваши вопросы'}
          </p>
          <a href={`/${lang}/contact`} className="inline-block bg-white text-primary-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
            {lang === 'ua' ? 'Задати питання' : 'Задать вопрос'}
          </a>
        </div>
      </div>
    </div>
  );
}
