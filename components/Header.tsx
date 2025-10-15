'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Language } from '@/data/translations';
import { getCitySlug, resolveCityBySlug, getRegionSlug, resolveRegionUaBySlug } from '@/data/slug';

interface HeaderProps {
  lang: Language;
  translations: any;
}

export default function Header({ lang, translations }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(lang);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const switchLanguage = () => {
    const newLang: Language = currentLang === 'ua' ? 'ru' : 'ua';
    setCurrentLang(newLang);
    const { pathname, search, hash } = window.location;

    // Expecting routes like /ua/... or /ru/...
    const parts = pathname.split('/');
    if (parts.length >= 2 && (parts[1] === 'ua' || parts[1] === 'ru')) {
      parts[1] = newLang; // swap language segment

      // Handle city page: /[lang]/service/geo/[city]
      if (parts[2] === 'service' && parts[3] === 'geo' && parts.length >= 5 && parts[4] && parts[4] !== 'regions' && parts[4] !== 'region') {
        const currentCitySlug = parts[4];
        const city = resolveCityBySlug(currentCitySlug, currentLang);
        if (city) {
          parts[4] = getCitySlug(city.name, newLang);
        }
      }

      // Handle region page: /[lang]/service/geo/region/[region]
      if (parts[2] === 'service' && parts[3] === 'geo' && parts[4] === 'region' && parts.length >= 6 && parts[5]) {
        const currentRegionSlug = parts[5];
        const regionUa = resolveRegionUaBySlug(currentRegionSlug, currentLang);
        if (regionUa) {
          parts[5] = getRegionSlug(regionUa, newLang);
        }
      }

      const newPath = parts.join('/');
      window.location.href = `${newPath}${search}${hash}`;
    } else {
      // Fallback: just prefix with new language
      const newPath = `/${newLang}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
      window.location.href = `${newPath}${search}${hash}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold gradient-text">RomanDev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${lang}`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              {translations.nav.home}
            </Link>
            <Link href={`/${lang}/about`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              {translations.nav.about}
            </Link>
            <Link href={`/${lang}/services`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              {translations.nav.services}
            </Link>
            <Link href={`/${lang}/portfolio`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              {translations.nav.portfolio}
            </Link>
            <Link href={`/${lang}/blog`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              {translations.nav.blog}
            </Link>
            <Link href={`/${lang}/contact`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              {translations.nav.contact}
            </Link>
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={switchLanguage}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              {currentLang === 'ua' ? 'RU' : 'UA'}
            </button>
            <Link href={`/${lang}/contact`} className="btn-primary">
              {translations.hero.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href={`/${lang}`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {translations.nav.home}
              </Link>
              <Link href={`/${lang}/about`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {translations.nav.about}
              </Link>
              <Link href={`/${lang}/services`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {translations.nav.services}
              </Link>
              <Link href={`/${lang}/portfolio`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {translations.nav.portfolio}
              </Link>
              <Link href={`/${lang}/blog`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {translations.nav.blog}
              </Link>
              <Link href={`/${lang}/contact`} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {translations.nav.contact}
              </Link>
              <button
                onClick={switchLanguage}
                className="text-left text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {currentLang === 'ua' ? 'Русский' : 'Українська'}
              </button>
              <Link href={`/${lang}/contact`} className="btn-primary inline-block text-center">
                {translations.hero.cta}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}