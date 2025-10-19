import Link from 'next/link';
import { Service } from '@/data/services';
import { Language } from '@/data/translations';

interface ServiceCardProps {
  service: Service;
  lang: Language;
  href?: string;
}

export default function ServiceCard({ service, lang, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">
        {service.title[lang]}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {service.shortDescription[lang]}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {service.technologies.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
          >
            {tech}
          </span>
        ))}
        {service.technologies.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            +{service.technologies.length - 3}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <span className="text-primary-600 font-semibold">
          {service.price[lang]}
        </span>
        <Link
          href={href || `/${lang}/service/${service.slug}`}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 transition-colors"
        >
          <span>{lang === 'ua' ? 'Детальніше' : 'Подробнее'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}