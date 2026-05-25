import Link from 'next/link';
import { Language, translations } from '@/data/translations';
import { technologies, getTechnologyBySlug, getRandomTechnologies } from '@/data/technologies';
import TechnologyCard from '@/components/TechnologyCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { getTechSEOData } from '@/lib/techSEO';

export async function generateStaticParams() {
  const params = [];
  for (const lang of ['ua', 'ru']) {
    for (const tech of technologies) {
      params.push({ lang, slug: tech.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { lang: Language; slug: string } }) {
  const lang = params.lang || 'ua';
  const tech = getTechnologyBySlug(params.slug);

  if (!tech) {
    return {};
  }

  return generateSEO({
    title: `${tech.name} - ${tech.category}`,
    description: tech.description[lang],
    keywords: `${tech.name}, ${tech.category}, ${tech.relatedTechnologies.join(', ')}`,
    canonical: `https://programist.pp.ua/${lang}/tech/${params.slug}`,
    lang,
  });
}

export default function TechnologyPage({ params }: { params: { lang: Language; slug: string } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];
  const tech = getTechnologyBySlug(params.slug);

  if (!tech) {
    notFound();
  }

  const relatedTechs = getRandomTechnologies(5, tech.slug);
  const seoData = getTechSEOData(tech.slug, tech.category, lang, tech.name);

  const breadcrumbs = [
    { name: t.technologies.title, url: `/${lang}/#technologies` },
    { name: tech.name, url: `/${lang}/tech/${params.slug}` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        {/* Technology Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{tech.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                {tech.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{tech.category}</p>
              <p className="text-gray-700 mb-6">
                {tech.description[lang]}
              </p>
              <Link href={`/${lang}/contact`} className="btn-primary">
                {t.hero.cta}
              </Link>
            </div>
          </div>
        </div>

        {/* Rich SEO Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
            {lang === 'ua' ? `Професійна веб-розробка на базі ${tech.name}` : `Профессиональная веб-разработка на базе ${tech.name}`}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {seoData.intro}
          </p>
        </div>

        {/* Key Advantages */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
            {seoData.advantagesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seoData.advantages.map((adv, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition bg-gray-50/50">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{adv.title}</h3>
                <p className="text-gray-600 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
            {seoData.useCasesTitle}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoData.useCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-primary-500 font-bold">✓</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Technologies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
            {lang === 'ua' ? 'Пов\'язані технології' : 'Связанные технологии'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {tech.relatedTechnologies.map((relatedTech, index) => {
              const matchedTech = technologies.find(t => 
                t.name.toLowerCase() === relatedTech.toLowerCase() ||
                t.name.toLowerCase().replace(' css', '') === relatedTech.toLowerCase().replace(' css', '') ||
                t.slug === relatedTech.toLowerCase().replace(' ', '').replace('.', '')
              );

              if (matchedTech) {
                return (
                  <Link
                    key={index}
                    href={`/${lang}/tech/${matchedTech.slug}`}
                    className="px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800 rounded-full text-sm font-medium transition duration-300"
                  >
                    {relatedTech}
                  </Link>
                );
              }

              return (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {relatedTech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Similar Technologies */}
        {relatedTechs.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
              {lang === 'ua' ? 'Схожі технології' : 'Похожие технологии'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {relatedTechs.map((relatedTech) => (
                <TechnologyCard key={relatedTech.id} technology={relatedTech} lang={lang} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === 'ua' ? `Потрібен проект на ${tech.name}?` : `Нужен проект на ${tech.name}?`}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {lang === 'ua' 
              ? 'Зв\'яжіться з нами для безкоштовної консультації'
              : 'Свяжитесь с нами для бесплатной консультации'}
          </p>
          <Link href={`/${lang}/contact`} className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
            {t.hero.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}