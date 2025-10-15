import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { services } from '@/data/services';
import { technologies } from '@/data/technologies';
import ServiceCard from '@/components/ServiceCard';
import TechnologyCard from '@/components/TechnologyCard';
import { generateSEO, generateOrganizationSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return generateSEO({
    title: t.hero.title,
    description: t.hero.description,
    keywords: 'розробка сайтів, веб-розробка, Laravel, Next.js, WordPress, PrestaShop, PHP, React, Vue, Nuxt, Filament',
    canonical: `https://programist.pp.ua/${lang}`,
    lang,
    alternateUrls: {
      ua: 'https://programist.pp.ua/ua',
      ru: 'https://programist.pp.ua/ru',
    },
  });
}

export default function HomePage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 animate-slide-up">
              {t.hero.subtitle}
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-up">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href={`/${lang}/contact`} className="btn-primary">
                {t.hero.cta}
              </Link>
              <Link href={`/${lang}/services`} className="btn-secondary">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10+</div>
              <div className="text-gray-600">{t.about.experience}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-600">{t.about.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">300+</div>
              <div className="text-gray-600">{t.about.clients}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">20+</div>
              <div className="text-gray-600">{t.about.technologies}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t.services.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${lang}/services`} className="btn-primary">
              {t.services.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t.technologies.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.technologies.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.slice(0, 10).map((tech) => (
              <TechnologyCard key={tech.id} technology={tech} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              {t.hero.cta}
            </Link>
            <a href="tel:+380938800822" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
              📞 +38 (093) 880-08-22
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
