import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { hireIntents, getHireIntentSlug } from '@/data/hireIntents';

export const dynamic = 'error';

export default function HireIndexPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста', url: `/${lang}/hire` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста'}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? 'Оберіть формат співпраці: програміст на годину або найм розробника під проект.'
              : 'Выберите формат сотрудничества: программист на час или найм разработчика под проект.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hireIntents.map((i) => (
              <Link
                key={i.key}
                href={`/${lang}/hire/${i.slug[lang]}/regions`}
                className="block border border-gray-200 hover:border-primary-300 hover:shadow-md rounded-xl p-5 transition"
              >
                <div className="text-xl font-semibold text-gray-900 mb-2">{i.label[lang]}</div>
                <div className="text-gray-600">{i.description[lang]}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
