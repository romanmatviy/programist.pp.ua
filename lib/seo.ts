import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  lang?: 'ua' | 'ru';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  alternateUrls?: {
    ua?: string;
    ru?: string;
  };
}

export function generateSEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  lang = 'ua',
  alternateUrls,
}: SEOProps): Metadata {
  const siteName = 'RomanDev';
  const fullTitle = `${title} | ${siteName}`;

  let derivedAlternates = alternateUrls;
  if (!derivedAlternates && canonical) {
    if (canonical.includes('/ua/')) {
      derivedAlternates = {
        ua: canonical,
        ru: canonical.replace('/ua/', '/ru/'),
      };
    } else if (canonical.includes('/ru/')) {
      derivedAlternates = {
        ua: canonical.replace('/ru/', '/ua/'),
        ru: canonical,
      };
    } else if (canonical.endsWith('/ua') || canonical.endsWith('/ua/')) {
      const cleanCanonical = canonical.endsWith('/') ? canonical.slice(0, -1) : canonical;
      derivedAlternates = {
        ua: cleanCanonical,
        ru: cleanCanonical.slice(0, -3) + '/ru',
      };
    } else if (canonical.endsWith('/ru') || canonical.endsWith('/ru/')) {
      const cleanCanonical = canonical.endsWith('/') ? canonical.slice(0, -1) : canonical;
      derivedAlternates = {
        ua: cleanCanonical.slice(0, -3) + '/ua',
        ru: cleanCanonical,
      };
    }
  }
  
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords || 'розробка сайтів, веб-розробка, Laravel, Next.js, WordPress, PrestaShop, PHP, React, Vue',
    authors: [{ name: 'RomanDev' }],
    creator: 'RomanDev',
    publisher: 'RomanDev',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: ogType as any,
      locale: lang === 'ua' ? 'uk_UA' : 'ru_RU',
      url: canonical,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical,
      languages: derivedAlternates ? {
        'uk-UA': derivedAlternates.ua || '',
        'ru-RU': derivedAlternates.ru || '',
        'x-default': derivedAlternates.ua || '',
      } : undefined,
    },
  };

  return metadata;
}

export function generateLocalBusinessSchema(city?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://programist.pp.ua',
    name: 'RomanDev',
    description: 'Професійна розробка сайтів в Україні',
    url: 'https://programist.pp.ua',
    telephone: '+380938800822',
    email: 'info@programist.pp.ua',
    address: city ? {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'UA',
    } : undefined,
    geo: city ? {
      '@type': 'GeoCoordinates',
      addressCountry: 'UA',
    } : undefined,
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-23:59',
    sameAs: [
      'https://github.com/MatviyRoman',
      'https://t.me/RomanMatviy',
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RomanDev',
    url: 'https://programist.pp.ua',
    logo: 'https://programist.pp.ua/logo.png',
    description: 'Професійна розробка сайтів в Україні. Laravel, Next.js, WordPress, PrestaShop.',
    telephone: '+380938800822',
    email: 'info@programist.pp.ua',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
    },
    sameAs: [
      'https://github.com/MatviyRoman',
      'https://t.me/RomanMatviy',
    ],
  };
}

export function generateServiceSchema(service: any, lang: 'ua' | 'ru') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title[lang],
    description: service.description[lang],
    provider: {
      '@type': 'Organization',
      name: 'RomanDev',
      telephone: '+380938800822',
      email: 'info@programist.pp.ua',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    offers: {
      '@type': 'Offer',
      price: service.price[lang],
      priceCurrency: 'UAH',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}