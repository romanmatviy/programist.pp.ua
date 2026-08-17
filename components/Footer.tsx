import Link from 'next/link';
import { Language } from '@/data/translations';

interface FooterProps {
  lang: Language;
  translations: any;
}

export default function Footer({ lang, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold text-white">RomanDev</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              {translations.footer.description}
            </p>
            <div className="flex flex-col space-y-2 text-gray-400">
              <a href="tel:+380938800822" className="hover:text-white transition-colors">
                📞 +38 (093) 880-08-22
              </a>
              <a href="mailto:info@programist.pp.ua" className="hover:text-white transition-colors">
                ✉️ info@programist.pp.ua
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/portfolio`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.nav.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service/geo`} className="text-gray-400 hover:text-white transition-colors">
                  {lang === 'ua' ? 'Міста' : 'Города'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service/geo/regions`} className="text-gray-400 hover:text-white transition-colors">
                  {lang === 'ua' ? 'Області' : 'Области'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translations.footer.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/service/web-development`} className="text-gray-400 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service/php-development`} className="text-gray-400 hover:text-white transition-colors">
                  PHP Development
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service/e-commerce`} className="text-gray-400 hover:text-white transition-colors">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service/wordpress-development`} className="text-gray-400 hover:text-white transition-colors">
                  WordPress
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/tech/php`} className="text-gray-400 hover:text-white transition-colors">
                  PHP
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service/seo-services`} className="text-gray-400 hover:text-white transition-colors">
                  SEO Services
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/hire`} className="text-gray-400 hover:text-white transition-colors">
                  {lang === 'ua' ? 'Найняти програміста' : 'Нанять программиста'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{lang === 'ua' ? 'Партнери' : 'Партнёры'}</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://apartner.pro" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">
                  Apartner.pro
                </a>
              </li>
              <li>
                <a href="https://studio.apartner.pro" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">
                  Studio Apartner
                </a>
              </li>
              <li>
                <a href="https://devroman.dev" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">
                  DevRoman.dev
                </a>
              </li>
              <li>
                <a href="https://indexfast.pro" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">
                  IndexFast.pro
                </a>
              </li>
              <li>
                <a href="https://hire-web-developer.com" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">
                  Hire Web Developer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} RomanDev. {translations.footer.rights}.
            </p>
            <div className="flex items-center space-x-6">
              <Link href={`/${lang}/privacy`} className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href={`/${lang}/terms`} className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <a 
                href="https://t.me/RomanMatviy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/380938800822" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a 
                href="viber://chat?number=+380938800822" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Viber"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.812 2.343C18.398.093 14.47-.333 12.005.177 9.54-.333 5.612.093 3.198 2.343.72 4.654-.254 8.483.07 11.894c.294 3.1 1.472 5.6 3.502 7.467 1.653 1.52 3.8 2.49 6.154 2.62l.001.019.278-.001.278.001.001-.019c2.354-.13 4.501-1.1 6.154-2.62 2.03-1.867 3.208-4.367 3.502-7.467.324-3.411-.65-7.24-3.128-9.551zM17.1 16.609c-.412.89-1.572 1.478-1.572 1.478s-1.075.505-3.523.505c-2.449 0-3.524-.505-3.524-.505s-1.16-.588-1.572-1.478c-.286-.617-.335-1.386-.05-2.394.23-.814.787-1.62 1.36-2.26-.178-.667-.278-1.47-.138-2.35.274-1.722 1.265-2.86 1.265-2.86s.243-.26.723-.52c.484-.262 1.138-.454 1.936-.454.798 0 1.452.192 1.936.454.48.26.723.52.723.52s.991 1.138 1.265 2.86c.14.88.04 1.683-.138 2.35.573.64 1.13 1.446 1.36 2.26.285 1.008.236 1.777-.051 2.394z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/MatviyRoman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}