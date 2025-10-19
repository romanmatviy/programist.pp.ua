import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { services, getServiceBySlug, getRandomServices } from '@/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceCard from '@/components/ServiceCard';
import { generateSEO, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import { displayCityName, displayRegionName } from '@/data/geoTranslations';
import { ukrainianCities } from '@/data/cities';
import { getCitySlug, resolveCityBySlug } from '@/data/slug';

export const dynamic = 'error';

export async function generateStaticParams() {
  const params: { lang: Language; city: string; slug: string }[] = [];
  const langs: Language[] = ['ua', 'ru'];
  for (const lang of langs) {
    for (const city of ukrainianCities) {
      for (const service of services) {
        params.push({ lang, city: getCitySlug(city.name, lang), slug: service.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: Language; city: string; slug: string } }) {
  const lang = params.lang || 'ua';
  const city = resolveCityBySlug(params.city, lang as 'ua' | 'ru');
  const service = getServiceBySlug(params.slug);
  if (!city || !service) return {};

  const cityDisplay = displayCityName(city.name, lang);
  const title = `${service.title[lang]} — ${cityDisplay}`;
  const description = `${service.shortDescription[lang]} — ${cityDisplay}. ${service.description[lang].slice(0, 160)}`;

  const base = 'https://programist.pp.ua';
  const uaUrl = `${base}/ua/service/geo/${getCitySlug(city.name, 'ua')}/${params.slug}`;
  const ruUrl = `${base}/ru/service/geo/${getCitySlug(city.name, 'ru')}/${params.slug}`;

  return generateSEO({
    title,
    description,
    keywords: `${service.title[lang]} ${cityDisplay}, ${service.technologies.join(', ')}, ${cityDisplay}`,
    canonical: `https://programist.pp.ua/${lang}/service/geo/${params.city}/${params.slug}`,
    lang,
    alternateUrls: { ua: uaUrl, ru: ruUrl },
  });
}

export default function CityServicePage({ params }: { params: { lang: Language; city: string; slug: string } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];
  const city = resolveCityBySlug(params.city, lang as 'ua' | 'ru');
  const service = getServiceBySlug(params.slug);

  if (!city || !service) {
    return <div className="section-padding bg-gray-50"><div className="container-custom">Not found</div></div>;
  }

  const cityDisplay = displayCityName(city.name, lang);
  const regionDisplay = displayRegionName(city.region, lang);

  const serviceSchema = generateServiceSchema(service, lang);
  const faqs = [
    {
      question: lang === 'ua' ? `Скільки коштує ${service.title[lang]} у ${cityDisplay}?` : `Сколько стоит ${service.title[lang]} в ${cityDisplay}?`,
      answer: lang === 'ua'
        ? 'Вартість залежить від обсягу та складності. Зазвичай старт від базової ціни на сторінці послуги.'
        : 'Стоимость зависит от объема и сложности. Обычно старт от базовой цены на странице услуги.'
    },
    {
      question: lang === 'ua' ? `Які терміни виконання у ${cityDisplay} (${regionDisplay})?` : `Каковы сроки выполнения в ${cityDisplay} (${regionDisplay})?`,
      answer: lang === 'ua'
        ? 'Лендінги 1–2 тижні, корпоративні сайти 2–4 тижні, e-commerce 4–8 тижнів.'
        : 'Лендинги 1–2 недели, корпоративные сайты 2–4 недели, e-commerce 4–8 недель.'
    },
  ];
  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: cityDisplay, url: `/${lang}/service/geo/${params.city}` },
    { name: service.title[lang], url: `/${lang}/service/geo/${params.city}/${params.slug}` },
  ];

  const related = getRandomServices(3, service.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} lang={lang} />

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{service.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  {service.title[lang]} — {cityDisplay}
                </h1>
                <p className="text-gray-600 mb-4">{regionDisplay}</p>
                <p className="text-lg text-gray-700 mb-6">{service.description[lang]}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {service.technologies.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-gray-600">{trans.common.price}: </span>
                    <span className="text-2xl font-bold text-primary-600">{service.price[lang]}</span>
                  </div>
                  <Link href={`/${lang}/contact`} className="btn-primary">{trans.hero.cta}</Link>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">{lang === 'ua' ? 'Схожі послуги' : 'Похожие услуги'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((s) => (
                  <ServiceCard key={s.id} service={s} lang={lang} href={`/${lang}/service/geo/${params.city}/${s.slug}`} />
                ))}
              </div>
            </div>
          )}

          {/* Top Cities Interlinking for this Service */}
          <div className="mb-12 bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">{lang === 'ua' ? 'Популярні міста' : 'Популярные города'}</h3>
            <div className="flex flex-wrap gap-3">
              {ukrainianCities.slice(0,5).map((c) => (
                <Link
                  key={c.slug}
                  href={`/${lang}/service/geo/${getCitySlug(c.name, lang as 'ua' | 'ru')}/${params.slug}`}
                  className="btn-secondary"
                >
                  {displayCityName(c.name, lang)}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === 'ua' ? 'Готові замовити послугу?' : 'Готовы заказать услугу?'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'ua' ? `Працюємо у місті ${cityDisplay}. Зв'яжіться з нами для консультації.` : `Работаем в городе ${cityDisplay}. Свяжитесь с нами для консультации.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
                {trans.hero.cta}
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
