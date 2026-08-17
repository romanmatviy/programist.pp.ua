import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO, generateFAQSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  return generateSEO({
    title: t.about.title,
    description: t.about.description,
    keywords: 'про нас, команда, веб-розробка, досвід',
    canonical: `https://programist.pp.ua/${lang}/about`,
    lang,
  });
}

export default function AboutPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  const breadcrumbs = [
    { name: t.nav.about, url: `/${lang}/about` },
  ];

  const faqs = lang === 'ua' ? [
    { question: 'Які технології ви використовуєте?', answer: 'Ми працюємо з Laravel, Next.js, React, Vue.js, WordPress, PrestaShop, OpenCart та іншими сучасними технологіями. Вибір стеку залежить від потреб вашого проекту.' },
    { question: 'Скільки коштує розробка сайту?', answer: 'Ціна залежить від складності проекту. Прості лендінги — від $300, інтернет-магазини — від $800, кастомні рішення на фреймворках — від $2000. Зверніться до нас для точного розрахунку.' },
    { question: 'Який термін розробки сайту?', answer: 'Лендінг — 3-7 днів, корпоративний сайт — 2-4 тижні, інтернет-магазин — 3-6 тижнів. Складні кастомні проекти — від 1 місяця.' },
    { question: 'Чи надаєте ви підтримку після запуску?', answer: 'Так, ми надаємо 1 місяць безкоштовної технічної підтримки після здачі проекту. Далі ви можете обрати тарифний план для постійної підтримки.' },
    { question: 'Чи підписуєте ви NDA?', answer: 'Так, ми підписуємо договір NDA (Non-Disclosure Agreement) за вашим запитом для повної конфіденційності проекту.' },
  ] : [
    { question: 'Какие технологии вы используете?', answer: 'Мы работаем с Laravel, Next.js, React, Vue.js, WordPress, PrestaShop, OpenCart и другими современными технологиями. Выбор стека зависит от потребностей вашего проекта.' },
    { question: 'Сколько стоит разработка сайта?', answer: 'Цена зависит от сложности проекта. Простые лендинги — от $300, интернет-магазины — от $800, кастомные решения на фреймворках — от $2000. Обратитесь к нам для точного расчета.' },
    { question: 'Какой срок разработки сайта?', answer: 'Лендинг — 3-7 дней, корпоративный сайт — 2-4 недели, интернет-магазин — 3-6 недель. Сложные кастомные проекты — от 1 месяца.' },
    { question: 'Предоставляете ли вы поддержку после запуска?', answer: 'Да, мы предоставляем 1 месяц бесплатной технической поддержки после сдачи проекта. Далее вы можете выбрать тарифный план для постоянной поддержки.' },
    { question: 'Подписываете ли вы NDA?', answer: 'Да, мы подписываем договор NDA (Non-Disclosure Agreement) по вашему запросу для полной конфиденциальности проекта.' },
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.about.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* About Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {lang === 'ua' 
                ? 'RomanDev — це команда професійних веб-розробників з понад 10-річним досвідом створення високоякісних веб-рішень. Ми спеціалізуємося на розробці сайтів будь-якої складності, від простих лендінгів до складних корпоративних порталів та інтернет-магазинів.'
                : 'RomanDev — это команда профессиональных веб-разработчиков с более чем 10-летним опытом создания высококачественных веб-решений. Мы специализируемся на разработке сайтов любой сложности, от простых лендингов до сложных корпоративных порталов и интернет-магазинов.'}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {lang === 'ua'
                ? 'Наша місія — допомагати бізнесу досягати успіху в цифровому світі через створення ефективних, швидких та зручних веб-додатків. Ми використовуємо найсучасніші технології та інструменти: Laravel, Next.js, React, Vue, WordPress, PrestaShop та багато інших.'
                : 'Наша миссия — помогать бизнесу достигать успеха в цифровом мире через создание эффективных, быстрых и удобных веб-приложений. Мы используем самые современные технологии и инструменты: Laravel, Next.js, React, Vue, WordPress, PrestaShop и многие другие.'}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {lang === 'ua'
                ? 'Кожен проект для нас унікальний. Ми уважно вивчаємо потреби клієнта, аналізуємо ринок та конкурентів, щоб створити рішення, яке дійсно працює та приносить результат. Наш підхід базується на прозорості, якості та постійній комунікації з клієнтом.'
                : 'Каждый проект для нас уникален. Мы внимательно изучаем потребности клиента, анализируем рынок и конкурентов, чтобы создать решение, которое действительно работает и приносит результат. Наш подход основан на прозрачности, качестве и постоянной коммуникации с клиентом.'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10+</div>
            <div className="text-gray-600">{t.about.experience}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">500+</div>
            <div className="text-gray-600">{t.about.projects}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">300+</div>
            <div className="text-gray-600">{t.about.clients}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">20+</div>
            <div className="text-gray-600">{t.about.technologies}</div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text text-center">
            {lang === 'ua' ? 'Наші цінності' : 'Наши ценности'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                💎
              </div>
              <h3 className="text-xl font-bold mb-3">
                {lang === 'ua' ? 'Якість' : 'Качество'}
              </h3>
              <p className="text-gray-600">
                {lang === 'ua'
                  ? 'Ми не йдемо на компроміси з якістю. Кожен рядок коду проходить ретельну перевірку.'
                  : 'Мы не идем на компромиссы с качеством. Каждая строка кода проходит тщательную проверку.'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-3">
                {lang === 'ua' ? 'Інновації' : 'Инновации'}
              </h3>
              <p className="text-gray-600">
                {lang === 'ua'
                  ? 'Постійно вивчаємо нові технології та впроваджуємо найкращі практики.'
                  : 'Постоянно изучаем новые технологии и внедряем лучшие практики.'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-3">
                {lang === 'ua' ? 'Партнерство' : 'Партнерство'}
              </h3>
              <p className="text-gray-600">
                {lang === 'ua'
                  ? 'Ми не просто виконавці, а ваші партнери на шляху до успіху.'
                  : 'Мы не просто исполнители, а ваши партнеры на пути к успеху.'}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text text-center">
            {lang === 'ua' ? 'Часті питання' : 'Часто задаваемые вопросы'}
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? 'Готові почати співпрацю?' : 'Готовы начать сотрудничество?'}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {lang === 'ua' 
              ? "Зв'яжіться з нами для безкоштовної консультації"
              : 'Свяжитесь с нами для бесплатной консультации'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
              {t.hero.cta}
            </Link>
            <a href="tel:+380938800822" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 inline-block">
              📞 +38 (093) 880-08-22
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}