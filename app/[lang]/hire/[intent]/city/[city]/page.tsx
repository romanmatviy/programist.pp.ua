import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { hireIntents, resolveHireIntentBySlug } from '@/data/hireIntents';
import { displayCityName, displayRegionName } from '@/data/geoTranslations';
import { getCitySlug, resolveCityBySlug } from '@/data/slug';
import { ukrainianCities } from '@/data/cities';
import { generateFAQSchema } from '@/lib/seo';

export const dynamic = 'error';

export async function generateStaticParams() {
  const langs: Language[] = ['ua', 'ru'];
  const params: { lang: Language; intent: string; city: string }[] = [];
  for (const lang of langs) {
    for (const intent of hireIntents) {
      for (const city of ukrainianCities) {
        params.push({ lang, intent: intent.slug[lang], city: getCitySlug(city.name, lang) });
      }
    }
  }
  return params;
}

export default function HireIntentCityPage({ params }: { params: { lang: Language; intent: string; city: string } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];
  const intent = resolveHireIntentBySlug(params.intent, lang);
  const city = resolveCityBySlug(params.city, lang);

  if (!intent || !city) {
    return <div className="section-padding bg-gray-50"><div className="container-custom">Not found</div></div>;
  }

  const cityDisplay = displayCityName(city.name, lang);
  const regionDisplay = displayRegionName(city.region, lang);

  const faqs = [
    {
      question:
        lang === 'ua'
          ? `${intent.label[lang]} у місті ${cityDisplay}: як швидко стартуємо?`
          : `${intent.label[lang]} в городе ${cityDisplay}: как быстро стартуем?`,
      answer:
        lang === 'ua'
          ? 'Зазвичай старт протягом 24–48 годин після узгодження задач і доступів.'
          : 'Обычно старт в течение 24–48 часов после согласования задач и доступов.'
    },
    {
      question:
        lang === 'ua'
          ? `Які технології підтримуються у ${cityDisplay} (${regionDisplay})?`
          : `Какие технологии поддерживаются в ${cityDisplay} (${regionDisplay})?`,
      answer:
        lang === 'ua'
          ? 'Laravel, WordPress, React, Next.js, PHP, TailwindCSS та інші популярні стекі.'
          : 'Laravel, WordPress, React, Next.js, PHP, TailwindCSS и другие популярные стеки.'
    },
    {
      question:
        lang === 'ua'
          ? 'Чи можливі погодинні роботи і фіксована вартість?'
          : 'Возможны ли почасовые работы и фиксированная стоимость?',
      answer:
        lang === 'ua'
          ? 'Так. Працюємо як погодинно, так і за фіксованою оцінкою — залежить від задач.'
          : 'Да. Работаем как почасово, так и по фиксированной оценке — зависит от задач.'
    },
    {
      question:
        lang === 'ua'
          ? 'Як відбувається комунікація та звітність?'
          : 'Как строится коммуникация и отчетность?',
      answer:
        lang === 'ua'
          ? 'План/спринти, щотижневі оновлення, прозорий трекінг задач і витрат часу.'
          : 'План/спринты, еженедельные апдейты, прозрачный трекинг задач и затраченного времени.'
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста', url: `/${lang}/hire` },
    { name: intent.label[lang], url: `/${lang}/hire/${params.intent}/regions` },
    { name: regionDisplay, url: `/${lang}/hire/${params.intent}/regions` },
    { name: cityDisplay, url: `/${lang}/hire/${params.intent}/city/${params.city}` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {intent.label[lang]} — {cityDisplay}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? `Найміть розробника у місті ${cityDisplay} (${regionDisplay}). Працюємо з Laravel, WordPress, React, Next.js та ін.`
              : `Нанимайте разработчика в городе ${cityDisplay} (${regionDisplay}). Работаем с Laravel, WordPress, React, Next.js и др.`}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${lang}/service/geo/${getCitySlug(city.name, lang)}`} className="btn-secondary">
              {lang === 'ua' ? 'Про місто і послуги' : 'О городе и услугах'}
            </Link>
            <Link href={`/${lang}/contact`} className="btn-primary">
              {trans.hero.cta}
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">{lang === 'ua' ? 'Що входить' : 'Что входит'}</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>{lang === 'ua' ? 'Погодинна або фіксована співпраця' : 'Почасовое или фиксированное сотрудничество'}</li>
            <li>{lang === 'ua' ? 'Робота з популярними CMS та фреймворками' : 'Работа с популярными CMS и фреймворками'}</li>
            <li>{lang === 'ua' ? 'Оперативний старт та прозорі умови' : 'Оперативный старт и прозрачные условия'}</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">{item.question}</div>
                <div className="text-gray-700">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* JSON-LD FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
