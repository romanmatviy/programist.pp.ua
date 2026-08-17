import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  lang: string;
}

export default function Breadcrumbs({ items, lang }: BreadcrumbsProps) {
  const base = 'https://programist.pp.ua';

  const allItems = [
    { name: lang === 'ua' ? 'Головна' : 'Главная', url: `/${lang}` },
    ...items,
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${base}${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <Link href={`/${lang}`} className="hover:text-primary-600 transition-colors">
          🏠
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-primary-600 transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}