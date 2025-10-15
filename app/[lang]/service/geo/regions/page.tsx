import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { ukrainianRegions } from '@/data/regions';
import { displayRegionName } from '@/data/geoTranslations';
import { getRegionSlug } from '@/data/slug';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function RegionsIndexPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: lang === 'ua' ? 'Області' : 'Области', url: `/${lang}/service/geo/regions` },
  ];

  const regions = [...ukrainianRegions].sort((a, b) => a.localeCompare(b, 'uk'));

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Області України' : 'Области Украины'}
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            {lang === 'ua'
              ? 'Оберіть область, щоб переглянути доступні міста.'
              : 'Выберите область, чтобы посмотреть доступные города.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regions.map((region) => (
              <Link
                key={region}
                href={`/${lang}/service/geo/region/${getRegionSlug(region, lang)}`}
                className="block border border-gray-200 hover:border-primary-300 hover:shadow-md rounded-xl p-4 transition"
              >
                <div className="text-lg font-semibold text-gray-900">{displayRegionName(region, lang)}</div>
                <div className="text-sm text-gray-500">
                  {lang === 'ua' ? 'Переглянути міста' : 'Посмотреть города'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
