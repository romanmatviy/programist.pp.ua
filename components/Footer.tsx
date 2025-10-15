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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <Link href={`/${lang}/service/seo-services`} className="text-gray-400 hover:text-white transition-colors">
                  SEO Services
                </Link>
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