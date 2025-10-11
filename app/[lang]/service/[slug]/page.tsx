import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { services, getServiceBySlug, getRandomServices } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO, generateServiceSchema } from '@/lib/seo';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const params = [];
  for (const lang of ['ua', 'ru']) {
    for (const service of services) {
      params.push({ lang, slug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: Language; slug: string } }) {
  const lang = params.lang || 'ua';
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {};
  }

  return generateSEO({
    title: service.title[lang],
    description: service.description[lang],
    keywords: `${service.title[lang]}, ${service.technologies.join(', ')}`,
    canonical: `https://romandev.com/${lang}/service/${params.slug}`,
    lang,
  });
}

export default function ServicePage({ params }: { params: { lang: Language; slug: string } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRandomServices(5, service.slug);
  const serviceSchema = generateServiceSchema(service, lang);

  const breadcrumbs = [
    { name: t.nav.services, url: `/${lang}/services` },
    { name: service.title[lang], url: `/${lang}/service/${params.slug}` },
  ];

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbs} lang={lang} />

          {/* Service Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{service.icon}</div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  {service.title[lang]}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {service.description[lang]}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-gray-600">{t.common.price}: </span>
                    <span className="text-2xl font-bold text-primary-600">
                      {service.price[lang]}
                    </span>
                  </div>
                  <Link href={`/${lang}/contact`} className="btn-primary">
                    {t.hero.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
              {lang === 'ua' ? 'Що входить у послугу' : 'Что входит в услугу'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features[lang].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
                {lang === 'ua' ? 'Схожі послуги' : 'Похожие услуги'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedServices.map((relatedService) => (
                  <ServiceCard key={relatedService.id} service={relatedService} lang={lang} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === 'ua' ? 'Готові замовити послугу?' : 'Готовы заказать услугу?'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'ua' 
                ? 'Зв\'яжіться з нами для безкоштовної консультації'
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