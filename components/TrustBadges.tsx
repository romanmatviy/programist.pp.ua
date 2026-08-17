import React from 'react';

export default function TrustBadges({ lang }: { lang: 'ua' | 'ru' }) {
  const badges = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      title: {
        ua: 'Підписання NDA',
        ru: 'Подписание NDA'
      },
      description: {
        ua: 'Повна конфіденційність вашого проекту та захист комерційної таємниці.',
        ru: 'Полная конфиденциальность вашего проекта и защита коммерческой тайны.'
      }
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      title: {
        ua: '100% Чистий код',
        ru: '100% Чистый код'
      },
      description: {
        ua: 'Розробка за стандартами SOLID та DRY. Код легко читати та масштабувати.',
        ru: 'Разработка по стандартам SOLID и DRY. Код легко читать и масштабировать.'
      }
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      title: {
        ua: '1 Місяць підтримки',
        ru: '1 Месяц поддержки'
      },
      description: {
        ua: 'Безкоштовна технічна підтримка та виправлення багів після здачі проекту.',
        ru: 'Бесплатная техническая поддержка и исправление багов после сдачи проекта.'
      }
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: {
        ua: 'Дотримання дедлайнів',
        ru: 'Соблюдение дедлайнов'
      },
      description: {
        ua: 'Чітке виконання роботи у встановлені терміни без затримок.',
        ru: 'Четкое выполнение работы в установленные сроки без задержек.'
      }
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-y border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Надійність та Гарантії' : 'Надежность и Гарантии'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'ua' 
              ? 'Я ціную довіру своїх клієнтів, тому працюю прозоро та за високими стандартами індустрії.' 
              : 'Я ценю доверие своих клиентов, поэтому работаю прозрачно и по высоким стандартам индустрии.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                {badge.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {badge.title[lang]}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {badge.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
