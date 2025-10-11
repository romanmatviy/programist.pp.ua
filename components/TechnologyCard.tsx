import Link from 'next/link';
import { Technology } from '@/data/technologies';
import { Language } from '@/data/translations';

interface TechnologyCardProps {
  technology: Technology;
  lang: Language;
}

export default function TechnologyCard({ technology, lang }: TechnologyCardProps) {
  return (
    <Link
      href={`/${lang}/tech/${technology.slug}`}
      className="bg-white rounded-xl shadow-md p-6 card-hover border border-gray-100 block"
    >
      <div className="text-4xl mb-3">{technology.icon}</div>
      <h3 className="text-lg font-bold mb-2 text-gray-900">
        {technology.name}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{technology.category}</p>
      <p className="text-gray-600 text-sm line-clamp-2">
        {technology.description[lang]}
      </p>
    </Link>
  );
}