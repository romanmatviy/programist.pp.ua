import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { technologies } from '@/data/technologies';

export const dynamic = 'error';

export async function generateStaticParams() {
  const langs: Language[] = ['ua', 'ru'];
  return langs.map((lang) => ({ lang }));
}

export default function TechnologiesIndexPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Технології' : 'Технологии', url: `/${lang}/tech` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Технології' : 'Технологии'}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? 'Стеки і інструменти, з якими ми працюємо: бекенд, фронтенд, бази даних та DevOps.'
              : 'Стэки и инструменты, с которыми мы работаем: бэкенд, фронтенд, базы данных и DevOps.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <Link
                key={tech.slug}
                href={`/${lang}/tech/${tech.slug}`}
                className="block border border-gray-200 hover:border-primary-300 hover:shadow-md rounded-xl p-5 transition"
              >
                <div className="text-xl font-semibold text-gray-900 mb-1">{tech.name}</div>
                <div className="text-sm text-gray-600 line-clamp-3">{tech.description[lang]}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
