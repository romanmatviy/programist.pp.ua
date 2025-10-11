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
  return (
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
  );
}