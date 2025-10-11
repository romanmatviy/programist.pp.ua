import { Language, translations } from '@/data/translations';
import { services } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return generateSEO({
    title: t.services.title,
    description: t.services.subtitle,
    keywords: 'послуги веб-розробки, розробка сайтів, Laravel, PHP, WordPress, PrestaShop, Next.js',
    canonical: `https://romandev.com/${lang}/services`,
    lang,
  });
}

export default function ServicesPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const breadcrumbs = [
    { name: t.nav.services, url: `/${lang}/services` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.services.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} lang={lang} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? 'Не знайшли потрібну послугу?' : 'Не нашли нужную услугу?'}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {lang === 'ua' 
              ? 'Зв\'яжіться з нами, і ми підберемо рішення для вашого проекту'
              : 'Свяжитесь с нами, и мы подберем решение для вашего проекта'}
          </p>
          <a href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
            {t.hero.cta}
          </a>
        </div>
      </div>
    </div>
  );
}