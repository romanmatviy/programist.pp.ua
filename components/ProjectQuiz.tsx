'use client';

import { useState } from 'react';

interface ProjectQuizProps {
  lang: 'ua' | 'ru';
  serviceName: string;
}

export default function ProjectQuiz({ lang, serviceName }: ProjectQuizProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // State for user answers
  const [siteType, setSiteType] = useState('');
  const [design, setDesign] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const t = {
    ua: {
      title: 'Розрахуйте вартість вашого проекту',
      subtitle: 'Дайте відповідь на 3 коротких питання, і ми підготуємо точний кошторис',
      step1: 'Який тип сайту потрібен?',
      step2: 'Чи є у вас готовий дизайн?',
      step3: 'Який додатковий функціонал потрібен?',
      step4: 'Який орієнтовний бюджет ви розглядаєте?',
      step5: 'Куди надіслати розрахунок?',
      types: ['Landing Page', 'Корпоративний сайт', 'Інтернет-магазин', 'Кастомний веб-додаток', 'SEO-оптимізація та аудит', 'Ще не знаю'],
      designs: ['Так, є макети', 'Є логотип/фірмовий стиль', 'Ні, потрібен дизайн з нуля', 'Потрібен редизайн існуючого'],
      featureOptions: ['Багатомовність', 'Інтеграція з CRM', 'Оплата онлайн', 'SEO-оптимізація базова', 'Складна фільтрація', 'Адмін-панель'],
      budgets: ['до $500', '$500 - $1000', '$1000 - $3000', '$3000+', 'Не визначився (потрібна оцінка)'],
      namePlaceholder: "Ваше ім'я",
      contactPlaceholder: 'Телефон або Telegram (@username)',
      next: 'Далі',
      prev: 'Назад',
      submit: 'Отримати розрахунок',
      submitting: 'Відправляємо...',
      successTitle: 'Дякуємо!',
      successText: 'Ми отримали вашу заявку і скоро зв\'яжемося з вами.',
      error: 'Сталася помилка. Спробуйте ще раз.',
    },
    ru: {
      title: 'Рассчитайте стоимость вашего проекта',
      subtitle: 'Ответьте на 3 коротких вопроса, и мы подготовим точную смету',
      step1: 'Какой тип сайта нужен?',
      step2: 'Есть ли у вас готовый дизайн?',
      step3: 'Какой дополнительный функционал нужен?',
      step4: 'Какой ориентировочный бюджет вы рассматриваете?',
      step5: 'Куда отправить расчет?',
      types: ['Landing Page', 'Корпоративный сайт', 'Интернет-магазин', 'Кастомное веб-приложение', 'SEO-оптимизация и аудит', 'Еще не знаю'],
      designs: ['Да, есть макеты', 'Есть логотип/фирменный стиль', 'Нет, нужен дизайн с нуля', 'Нужен редизайн существующего'],
      featureOptions: ['Мультиязычность', 'Интеграция с CRM', 'Оплата онлайн', 'SEO-оптимизация базовая', 'Сложная фильтрация', 'Админ-панель'],
      budgets: ['до $500', '$500 - $1000', '$1000 - $3000', '$3000+', 'Не определился (нужна оценка)'],
      namePlaceholder: 'Ваше имя',
      contactPlaceholder: 'Телефон или Telegram (@username)',
      next: 'Далее',
      prev: 'Назад',
      submit: 'Получить расчет',
      submitting: 'Отправляем...',
      successTitle: 'Спасибо!',
      successText: 'Мы получили вашу заявку и скоро свяжемся с вами.',
      error: 'Произошла ошибка. Попробуйте еще раз.',
    }
  };

  const currentT = t[lang];

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;

    setIsSubmitting(true);

    const message = `
🔔 <b>НОВИЙ ЛІД (Квіз)</b>
Послуга: <b>${serviceName}</b>

<b>Тип сайту:</b> ${siteType || 'Не вказано'}
<b>Дизайн:</b> ${design || 'Не вказано'}
<b>Функції:</b> ${features.length > 0 ? features.join(', ') : 'Не обрано'}
<b>Бюджет:</b> ${budget || 'Не вказано'}

👤 <b>Ім'я:</b> ${name}
📞 <b>Контакт:</b> ${contact}
    `;

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert(currentT.error);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert(currentT.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-3xl mx-auto my-12 border-t-4 border-green-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentT.successTitle}</h3>
        <p className="text-xl text-gray-600">{currentT.successText}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto my-16 border border-gray-100">
      <div className="bg-gradient-primary p-8 md:p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{currentT.title}</h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto">{currentT.subtitle}</p>
      </div>
      
      <div className="p-8 md:p-12">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 rounded-full z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          ></div>
          
          {[1, 2, 3, 4, 5].map(num => (
            <div 
              key={num} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10 transition-colors duration-300 ${
                step >= num ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Step 1: Site Type */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.step1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentT.types.map(type => (
                <button
                  key={type}
                  onClick={() => { 
                    setSiteType(type); 
                    if (type.includes('SEO')) {
                      setStep(4);
                    } else {
                      setStep(2); 
                    }
                  }}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                    siteType === type ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                  }`}
                >
                  <span className="font-semibold text-lg text-gray-900">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Design */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.step2}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentT.designs.map(d => (
                <button
                  key={d}
                  onClick={() => { setDesign(d); setStep(3); }}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                    design === d ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                  }`}
                >
                  <span className="font-semibold text-lg text-gray-900">{d}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Features */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.step3}</h3>
            <p className="text-center text-gray-500 mb-6">{lang === 'ua' ? '(Оберіть кілька варіантів)' : '(Выберите несколько вариантов)'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {currentT.featureOptions.map(feature => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                    features.includes(feature) 
                      ? 'border-primary-600 bg-primary-600 text-white shadow-md' 
                      : 'border-gray-200 text-gray-700 hover:border-primary-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{feature}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setStep(4)}
                className="btn-primary py-4 px-12 text-lg"
              >
                {currentT.next}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.step4}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentT.budgets.map(b => (
                <button
                  key={b}
                  onClick={() => { setBudget(b); setStep(5); }}
                  className={`p-6 rounded-xl border-2 text-center transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                    budget === b ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                  }`}
                >
                  <span className="font-semibold text-lg text-gray-900">{b}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Contact */}
        {step === 5 && (
          <div className="animate-fade-in max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">{currentT.step5}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{currentT.namePlaceholder}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow text-lg"
                  placeholder="Олександр"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{currentT.contactPlaceholder}</label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow text-lg"
                  placeholder="+380 99 000 00 00 / @username"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-xl font-bold shadow-xl hover:shadow-primary-500/30"
              >
                {isSubmitting ? currentT.submitting : currentT.submit}
              </button>
            </form>
          </div>
        )}

        {/* Footer Navigation */}
        {step > 1 && step < 5 && (
          <div className="mt-8 flex justify-start">
            <button 
              onClick={() => {
                if (step === 4 && siteType.includes('SEO')) {
                  setStep(1);
                } else {
                  setStep(s => s - 1);
                }
              }}
              className="text-gray-500 hover:text-primary-600 font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {currentT.prev}
            </button>
          </div>
        )}
        {step === 5 && (
          <div className="mt-8 flex justify-center">
             <button 
              onClick={() => setStep(siteType.includes('SEO') ? 1 : 4)}
              className="text-gray-500 hover:text-primary-600 font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {currentT.prev}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
