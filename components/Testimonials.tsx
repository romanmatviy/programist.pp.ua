import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: { ua: string; ru: string };
  company: string;
  content: { ua: string; ru: string };
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Олександр Коваленко',
    role: { ua: 'CEO', ru: 'CEO' },
    company: 'TechStart Solutions',
    content: {
      ua: 'Роман розробив для нас CRM-систему з нуля. Проект був зданий вчасно, а код написаний дуже чисто. Особливо вразила увага до деталей та швидкість комунікації.',
      ru: 'Роман разработал для нас CRM-систему с нуля. Проект был сдан вовремя, а код написан очень чисто. Особенно впечатлило внимание к деталям и скорость коммуникации.',
    },
    rating: 5,
  },
  {
    id: 2,
    name: 'Марія Мельник',
    role: { ua: 'CMO', ru: 'CMO' },
    company: 'EcoShop',
    content: {
      ua: 'Після перенесення нашого інтернет-магазину на нову платформу, швидкість завантаження зросла вдвічі, а конверсія збільшилась на 40%. Дуже задоволені результатом!',
      ru: 'После переноса нашего интернет-магазина на новую платформу, скорость загрузки выросла вдвое, а конверсия увеличилась на 40%. Очень довольны результатом!',
    },
    rating: 5,
  },
  {
    id: 3,
    name: 'Ігор Шевчук',
    role: { ua: 'Засновник', ru: 'Основатель' },
    company: 'EduPro Platform',
    content: {
      ua: 'Співпрацюємо з Романом вже більше року. Він не тільки виконує поставлені задачі, але й завжди пропонує кращі архітектурні рішення. Справжній професіонал.',
      ru: 'Сотрудничаем с Романом уже больше года. Он не только выполняет поставленные задачи, но и всегда предлагает лучшие архитектурные решения. Настоящий профессионал.',
    },
    rating: 5,
  }
];

export default function Testimonials({ lang }: { lang: 'ua' | 'ru' }) {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {lang === 'ua' ? 'Що кажуть клієнти' : 'Что говорят клиенты'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'ua' 
              ? 'Реальні відгуки від замовників з Upwork, Clutch та прямих контрактів.' 
              : 'Реальные отзывы от заказчиков с Upwork, Clutch и прямых контрактов.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-8 relative shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              {/* Quote icon */}
              <div className="absolute top-6 right-8 text-primary-200">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 mb-8 italic relative z-10 leading-relaxed text-lg">
                "{testimonial.content[lang]}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role[lang]}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
