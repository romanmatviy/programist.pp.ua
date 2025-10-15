import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { ukrainianCities } from '@/data/cities';
import { displayCityName, displayRegionName } from '@/data/geoTranslations';
import { getCitySlug } from '@/data/slug';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CitiesIndexPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Міста' : 'Города', url: `/${lang}/service/geo` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Розробка сайтів у містах України' : 'Разработка сайтов в городах Украины'}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? 'Оберіть ваше місто зі списку нижче, щоб переглянути послуги та деталі.'
              : 'Выберите ваш город из списка ниже, чтобы посмотреть услуги и детали.'}
          </p>
          <div>
            <Link href={`/${lang}/service/geo/regions`} className="btn-secondary">
              {lang === 'ua' ? 'Області' : 'Области'}
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ukrainianCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${lang}/service/geo/${getCitySlug(city.name, lang)}`}
                className="block border border-gray-200 hover:border-primary-300 hover:shadow-md rounded-xl p-4 transition"
              >
                <div className="text-lg font-semibold text-gray-900">{displayCityName(city.name, lang)}</div>
                <div className="text-sm text-gray-500">{displayRegionName(city.region, lang)}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
