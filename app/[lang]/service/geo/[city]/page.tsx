import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { ukrainianCities } from '@/data/cities';
import { services } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { generateSEO, generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo';
import { t } from '@/lib/i18n';

export async function generateStaticParams() {
  const params = [];
  for (const lang of ['ua', 'ru']) {
    for (const city of ukrainianCities) {
      params.push({ lang, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: Language; city: string } }) {
  const lang = params.lang || 'ua';
  const city = ukrainianCities.find(c => c.slug === params.city);

  if (!city) {
    return {};
  }

  const title = t(lang, 'geo.metaTitle', { city: city.name });
  const description = t(lang, 'geo.metaDescription', { city: city.name });

  return generateSEO({
    title,
    description,
    keywords: `розробка сайтів ${city.name}, веб-розробка ${city.name}, Laravel ${city.name}, WordPress ${city.name}`,
    canonical: `https://programist.pp.ua/${lang}/service/geo/${params.city}`,
    lang,
  });
}

export default function GeoPage({ params }: { params: { lang: Language; city: string } }) {
  const lang = params.lang || 'ua';
  const trans = translations[lang];
  const city = ukrainianCities.find(c => c.slug === params.city);

  if (!city) {
    return <div>City not found</div>;
  }

  const localBusinessSchema = generateLocalBusinessSchema(city.name);
  
  const faqs = [
    {
      question: t(lang, 'geo.faq1Q', { city: city.name }),
      answer: t(lang, 'geo.faq1A', { city: city.name }),
    },
    {
      question: t(lang, 'geo.faq2Q', { city: city.name }),
      answer: t(lang, 'geo.faq2A', { city: city.name }),
    },
    {
      question: t(lang, 'geo.faq3Q', { city: city.name }),
      answer: t(lang, 'geo.faq3A', { city: city.name }),
    },
    {
      question: t(lang, 'geo.faq4Q', { city: city.name }),
      answer: t(lang, 'geo.faq4A', { city: city.name }),
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbs = [
    { name: trans.nav.services, url: `/${lang}/services` },
    { name: city.name, url: `/${lang}/service/geo/${params.city}` },
  ];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} lang={lang} />

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              {t(lang, 'geo.h1', { city: city.name })}
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl">
              {t(lang, 'geo.intro', { city: city.name })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${lang}/contact`} className="btn-primary">
                {trans.hero.cta}
              </Link>
              <a href="tel:+380938800822" className="btn-secondary">
                📞 +38 (093) 880-08-22
              </a>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
              {t(lang, 'geo.whyChoose', { city: city.name })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                  ⭐
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t(lang, 'geo.reason1Title')}</h3>
                  <p className="text-gray-600">{t(lang, 'geo.reason1Text')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t(lang, 'geo.reason2Title')}</h3>
                  <p className="text-gray-600">{t(lang, 'geo.reason2Text')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t(lang, 'geo.reason3Title')}</h3>
                  <p className="text-gray-600">{t(lang, 'geo.reason3Text')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t(lang, 'geo.reason4Title')}</h3>
                  <p className="text-gray-600">{t(lang, 'geo.reason4Text')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
              {t(lang, 'geo.servicesTitle', { city: city.name })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} lang={lang} />
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
              {t(lang, 'geo.faqTitle')}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                {t(lang, 'geo.ctaTitle', { city: city.name })}
              </h2>
              <p className="text-gray-600 mb-6">
                {t(lang, 'geo.ctaText')}
              </p>
              <ContactForm lang={lang} translations={trans} />
            </div>
            <div className="bg-gradient-primary text-white rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">
                {trans.footer.contact}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <div className="text-sm opacity-80">
                      {lang === 'ua' ? 'Телефон' : 'Телефон'}
                    </div>
                    <a href="tel:+380938800822" className="text-lg font-semibold hover:underline">
                      +38 (093) 880-08-22
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    ✉️
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Email</div>
                    <a href="mailto:info@programist.pp.ua" className="text-lg font-semibold hover:underline">
                      info@programist.pp.ua
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <div className="text-sm opacity-80">
                      {lang === 'ua' ? 'Місто' : 'Город'}
                    </div>
                    <div className="text-lg font-semibold">{city.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}