import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { hireIntents, resolveHireIntentBySlug } from '@/data/hireIntents';
import { ukrainianRegions } from '@/data/regions';
import { displayCityName, displayRegionName } from '@/data/geoTranslations';
import { getCitySlug, getRegionSlug, resolveRegionUaBySlug } from '@/data/slug';
import { ukrainianCities } from '@/data/cities';

export const dynamic = 'error';

export async function generateStaticParams() {
  const langs: Language[] = ['ua', 'ru'];
  const params: { lang: Language; intent: string; region: string }[] = [];
  for (const lang of langs) {
    for (const intent of hireIntents) {
      for (const regionUa of ukrainianRegions) {
        params.push({ lang, intent: intent.slug[lang], region: getRegionSlug(regionUa, lang) });
      }
    }
  }
  return params;
}

export default function HireIntentRegionCitiesPage({ params }: { params: { lang: Language; intent: string; region: string } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];
  const intent = resolveHireIntentBySlug(params.intent, lang);
  const regionUa = resolveRegionUaBySlug(params.region, lang);

  if (!intent || !regionUa) {
    return <div className="section-padding bg-gray-50"><div className="container-custom">Not found</div></div>;
  }

  const cities = ukrainianCities.filter(c => c.region === regionUa);

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста', url: `/${lang}/hire` },
    { name: intent.label[lang], url: `/${lang}/hire/${params.intent}/regions` },
    { name: displayRegionName(regionUa, lang), url: `/${lang}/hire/${params.intent}/region/${params.region}` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {intent.label[lang]} — {displayRegionName(regionUa, lang)}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? 'Оберіть ваше місто зі списку нижче, щоб продовжити.'
              : 'Выберите ваш город из списка ниже, чтобы продолжить.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {cities.length === 0 ? (
            <div className="text-gray-600">
              {lang === 'ua' ? 'Немає міст для цієї області.' : 'Нет городов для этой области.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${lang}/hire/${params.intent}/city/${getCitySlug(city.name, lang)}`}
                  className="block border border-gray-200 hover:border-primary-300 hover:shadow-md rounded-xl p-4 transition"
                >
                  <div className="text-lg font-semibold text-gray-900">{displayCityName(city.name, lang)}</div>
                  <div className="text-sm text-gray-500">{displayRegionName(city.region, lang)}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
