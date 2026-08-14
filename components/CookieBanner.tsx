'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Language } from '@/data/translations';

export default function CookieBanner({ lang }: { lang: Language }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const content = {
    ua: {
      text: "Ми використовуємо файли cookie (включаючи cookie DART від Google) для персоналізації контенту, показу релевантної реклами та аналізу трафіку. Продовжуючи використовувати сайт, ви погоджуєтесь з нашою ",
      policy: "Політикою конфіденційності",
      button: "Зрозуміло",
    },
    ru: {
      text: "Мы используем файлы cookie (включая cookie DART от Google) для персонализации контента, показа релевантной рекламы и анализа трафика. Продолжая использовать сайт, вы соглашаетесь с нашей ",
      policy: "Политикой конфиденциальности",
      button: "Понятно",
    }
  };

  const t = content[lang] || content.ua;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 animate-slide-up">
      <div className="container-custom mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base text-gray-300 flex-1 leading-relaxed">
          {t.text}
          <Link href={`/${lang}/privacy`} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
            {t.policy}
          </Link>.
        </div>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors whitespace-nowrap w-full sm:w-auto shadow-lg"
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}
