import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { ukrainianCities } from '@/data/cities';
import { ukrainianRegions } from '@/data/regions';
import { displayCityName, displayRegionName } from '@/data/geoTranslations';
import { getRegionSlug, resolveRegionUaBySlug, getCitySlug } from '@/data/slug';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const langs: Language[] = ['ua', 'ru'];
  const params: { lang: Language; region: string }[] = [];
  for (const lang of langs) {
    for (const regionUa of ukrainianRegions) {
      params.push({ lang, region: getRegionSlug(regionUa, lang) });
    }
  }
  return params;
}

export default function RegionCitiesPage({ params }: { params: { lang: Language; region: string } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];
  const regionUa = resolveRegionUaBySlug(params.region, lang as 'ua' | 'ru');
  if (!regionUa) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="container-custom">Region not found</div>
      </div>
    );
  }
  const cities = ukrainianCities.filter(c => c.region === regionUa);

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Області' : 'Области', url: `/${lang}/service/geo/regions` },
    { name: displayRegionName(regionUa, lang), url: `/${lang}/service/geo/region/${params.region}` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? `Міста — ${regionUa}` : `Города — ${displayRegionName(regionUa, lang)}`}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? 'Оберіть ваше місто зі списку нижче, щоб переглянути послуги та деталі.'
              : 'Выберите ваш город из списка ниже, чтобы посмотреть услуги и детали.'}
          </p>
          <div className="flex gap-3">
            <Link href={`/${lang}/service/geo/regions`} className="btn-secondary">
              {lang === 'ua' ? 'Області' : 'Области'}
            </Link>
            <Link href={`/${lang}/service/geo`} className="btn-secondary">
              {lang === 'ua' ? 'Всі міста' : 'Все города'}
            </Link>
          </div>
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
                  href={`/${lang}/service/geo/${getCitySlug(city.name, lang as 'ua' | 'ru')}`}
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
