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
  const [serviceCategory, setServiceCategory] = useState('');
  
  // Branch A: Web Dev
  const [siteType, setSiteType] = useState('');
  const [design, setDesign] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  
  // Branch B: Maintenance
  const [cms, setCms] = useState('');
  
  // Branch B & C: Maintenance / SEO / Audit / PageSpeed
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Branch D: Hire Developer
  const [hours, setHours] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  // Universal ending
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const t = {
    ua: {
      title: 'Розрахуйте вартість вашого проекту',
      subtitle: 'Дайте відповідь на кілька коротких питань, і ми підготуємо точний кошторис',
      
      // Questions
      qCategory: 'Що вас цікавить?',
      qSiteType: 'Який тип сайту потрібен?',
      qDesign: 'Чи є у вас готовий дизайн?',
      qFeatures: 'Який додатковий функціонал потрібен?',
      qCms: 'На якій системі (CMS) працює ваш сайт?',
      qUrl: 'Вкажіть посилання на ваш сайт',
      qHours: 'Скільки приблизно годин вам потрібно?',
      qProject: 'Коротко опишіть ваш проєкт/завдання',
      qBudget: 'Який орієнтовний бюджет ви розглядаєте?',
      qContact: 'Куди надіслати розрахунок?',

      // Options
      categories: ['Розробка сайту', 'Підтримка сайту', 'Найняти програміста', 'SEO оптимізація', 'PageSpeed оптимізація', 'Аудит сайту', '🦠 Лікування сайту від вірусів', '🛠 Виправлення помилок (Багфікс)', '📦 Перенесення сайту / Хостинг', 'Інше'],
      types: ['Landing Page', 'Корпоративний сайт', 'Інтернет-магазин', 'Кастомний веб-додаток', 'Ще не знаю'],
      designs: ['Так, є макети', 'Є логотип/фірмовий стиль', 'Ні, потрібен дизайн з нуля', 'Потрібен редизайн існуючого'],
      featureOptions: ['Багатомовність', 'Інтеграція з CRM', 'Оплата онлайн', 'Складна фільтрація', 'Особистий кабінет', 'Адмін-панель'],
      cmsOptions: ['WordPress', 'OpenCart', 'PrestaShop', 'Laravel', 'Кастомна / Інше', 'Не знаю'],
      budgets: ['до $500', '$500 - $1000', '$1000 - $3000', '$3000+', 'Не визначився (потрібна оцінка)'],
      hoursOptions: ['до 10 годин', '10 - 40 годин (тиждень)', '40 - 80 годин (2 тижні)', '80+ годин (місяць і більше)', 'Не знаю, потрібна оцінка'],
      
      // Placeholders
      urlPlaceholder: 'https://example.com',
      projectPlaceholder: 'Наприклад: Потрібно доробити функціонал кошика на Laravel...',
      namePlaceholder: "Ваше ім'я",
      contactPlaceholder: 'Телефон або Telegram (@username)',
      emailPlaceholder: 'Ваш Email',
      
      // Buttons
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
      subtitle: 'Ответьте на несколько коротких вопросов, и мы подготовим точную смету',
      
      // Questions
      qCategory: 'Что вас интересует?',
      qSiteType: 'Какой тип сайта нужен?',
      qDesign: 'Есть ли у вас готовый дизайн?',
      qFeatures: 'Какой дополнительный функционал нужен?',
      qCms: 'На какой системе (CMS) работает ваш сайт?',
      qUrl: 'Укажите ссылку на ваш сайт',
      qHours: 'Сколько примерно часов вам нужно?',
      qProject: 'Кратко опишите ваш проект/задачу',
      qBudget: 'Какой ориентировочный бюджет вы рассматриваете?',
      qContact: 'Куда отправить расчет?',

      // Options
      categories: ['Разработка сайта', 'Поддержка сайта', 'Нанять программиста', 'SEO оптимизация', 'PageSpeed оптимизация', 'Аудит сайта', '🦠 Лечение сайта от вирусов', '🛠 Исправление ошибок (Багфикс)', '📦 Перенос сайта / Хостинг', 'Другое'],
      types: ['Landing Page', 'Корпоративный сайт', 'Интернет-магазин', 'Кастомное веб-приложение', 'Еще не знаю'],
      designs: ['Да, есть макеты', 'Есть логотип/фирменный стиль', 'Нет, нужен дизайн с нуля', 'Нужен редизайн существующего'],
      featureOptions: ['Мультиязычность', 'Интеграция с CRM', 'Оплата онлайн', 'Сложная фильтрация', 'Личный кабинет', 'Админ-панель'],
      cmsOptions: ['WordPress', 'OpenCart', 'PrestaShop', 'Laravel', 'Кастомная / Другое', 'Не знаю'],
      budgets: ['до $500', '$500 - $1000', '$1000 - $3000', '$3000+', 'Не определился (нужна оценка)'],
      hoursOptions: ['до 10 часов', '10 - 40 часов (неделя)', '40 - 80 часов (2 недели)', '80+ часов (месяц и более)', 'Не знаю, нужна оценка'],
      
      // Placeholders
      urlPlaceholder: 'https://example.com',
      projectPlaceholder: 'Например: Нужно доработать функционал корзины на Laravel...',
      namePlaceholder: 'Ваше имя',
      contactPlaceholder: 'Телефон или Telegram (@username)',
      emailPlaceholder: 'Ваш Email',
      
      // Buttons
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

  // Logic to determine total steps based on branch
  const getTotalSteps = () => {
    if (serviceCategory === currentT.categories[0]) return 6; // Разработка
    if (serviceCategory === currentT.categories[1]) return 4; // Поддержка
    if (serviceCategory === currentT.categories[2]) return 4; // Нанять программиста
    if (currentT.categories.slice(6, 9).includes(serviceCategory)) return 3; // Вирусы, Багфикс, Перенос
    if (serviceCategory === currentT.categories[9]) return 3; // Другое
    return 4; // SEO, PageSpeed, Audit
  };

  const totalSteps = getTotalSteps();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;

    setIsSubmitting(true);

    let branchDetails = '';
    
    if (serviceCategory === currentT.categories[0]) {
      branchDetails = `
<b>Тип сайту:</b> ${siteType || 'Не вказано'}
<b>Дизайн:</b> ${design || 'Не вказано'}
<b>Функції:</b> ${features.length > 0 ? features.join(', ') : 'Не обрано'}
<b>Бюджет:</b> ${budget || 'Не вказано'}`;
    } else if (serviceCategory === currentT.categories[1]) {
      branchDetails = `
<b>CMS:</b> ${cms || 'Не вказано'}
<b>Сайт:</b> ${websiteUrl || 'Не вказано'}
<b>Бюджет:</b> ${budget || 'Не вказано'}`;
    } else if (serviceCategory === currentT.categories[2]) {
      branchDetails = `
<b>Потрібно годин:</b> ${hours || 'Не вказано'}
<b>Проєкт:</b> ${projectDesc || 'Не вказано'}`;
    } else if (serviceCategory !== currentT.categories[6]) {
      branchDetails = `
<b>Сайт:</b> ${websiteUrl || 'Не вказано'}
<b>Бюджет:</b> ${budget || 'Не вказано'}`;
    } else {
      branchDetails = `
<b>Бюджет:</b> ${budget || 'Не вказано'}`;
    }

    const message = `
🔔 <b>НОВИЙ ЛІД (Квіз)</b>
Послуга: <b>${serviceCategory || serviceName}</b>
${branchDetails}

👤 <b>Ім'я:</b> ${name}
📞 <b>Контакт:</b> ${contact}
📧 <b>Email:</b> ${email || 'Не вказано'}
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

  // Define views dynamically based on step and category
  const renderStep = () => {
    // Step 1: Category (Always the same)
    if (step === 1) {
      return (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qCategory}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentT.categories.map(cat => (
              <button
                key={cat}
                onClick={() => { 
                  setServiceCategory(cat); 
                  setStep(2);
                }}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                  serviceCategory === cat ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                <span className="font-semibold text-lg text-gray-900">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Branch A: Web Development
    if (serviceCategory === currentT.categories[0]) {
      if (step === 2) return (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qSiteType}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentT.types.map(type => (
              <button
                key={type}
                onClick={() => { setSiteType(type); setStep(3); }}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                  siteType === type ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                <span className="font-semibold text-lg text-gray-900">{type}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 3) return (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qDesign}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentT.designs.map(d => (
              <button
                key={d}
                onClick={() => { setDesign(d); setStep(4); }}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                  design === d ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                <span className="font-semibold text-lg text-gray-900">{d}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 4) return (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qFeatures}</h3>
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
            <button onClick={() => setStep(5)} className="btn-primary py-4 px-12 text-lg">
              {currentT.next}
            </button>
          </div>
        </div>
      );
    }

    // Branch B: Maintenance
    if (serviceCategory === currentT.categories[1]) {
      if (step === 2) return (
        <div className="animate-fade-in max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qCms}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentT.cmsOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setCms(opt)}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                  cms === opt ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-400'
                }`}
              >
                <span className="font-medium">{opt}</span>
              </button>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">{currentT.qUrl}</h3>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors mb-8"
            placeholder={currentT.urlPlaceholder}
          />
          
          <div className="flex justify-center">
            <button onClick={() => setStep(3)} className="btn-primary py-4 px-12 text-lg">
              {currentT.next}
            </button>
          </div>
        </div>
      );
    }

    // Branch C: Hire Developer
    if (serviceCategory === currentT.categories[2]) {
      if (step === 2) return (
        <div className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qHours}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentT.hoursOptions.map(opt => (
              <button
                key={opt}
                onClick={() => { setHours(opt); setStep(3); }}
                className={`p-6 rounded-xl border-2 text-center transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                  hours === opt ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                <span className="font-semibold text-lg text-gray-900">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 3) return (
        <div className="animate-fade-in max-w-lg mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qProject}</h3>
          <textarea
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors mb-8 text-lg min-h-[150px] resize-y"
            placeholder={currentT.projectPlaceholder}
          />
          <div className="flex justify-center">
            <button 
              onClick={() => {
                if(projectDesc.length > 5) setStep(4);
                else alert(lang === 'ua' ? 'Будь ласка, опишіть ваш проєкт' : 'Пожалуйста, опишите ваш проект');
              }} 
              className="btn-primary py-4 px-12 text-lg"
            >
              {currentT.next}
            </button>
          </div>
        </div>
      );
    }

    // Branch D: SEO, PageSpeed, Audit
    if (currentT.categories.slice(3, 6).includes(serviceCategory)) {
      if (step === 2) return (
        <div className="animate-fade-in max-w-lg mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qUrl}</h3>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors mb-8 text-lg"
            placeholder={currentT.urlPlaceholder}
          />
          <div className="flex justify-center">
            <button 
              onClick={() => {
                if(websiteUrl.length > 3) setStep(3);
                else alert(lang === 'ua' ? 'Будь ласка, вкажіть посилання' : 'Пожалуйста, укажите ссылку');
              }} 
              className="btn-primary py-4 px-12 text-lg"
            >
              {currentT.next}
            </button>
          </div>
        </div>
      );
    }

    // Branch E: Virus, BugFix, Hosting
    if (currentT.categories.slice(6, 9).includes(serviceCategory)) {
      if (step === 2) return (
        <div className="animate-fade-in max-w-lg mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qProject}</h3>
          <textarea
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors mb-8 text-lg min-h-[150px] resize-y"
            placeholder={currentT.projectPlaceholder}
          />
          <div className="flex justify-center">
            <button 
              onClick={() => {
                if(projectDesc.length > 5) setStep(3);
                else alert(lang === 'ua' ? 'Будь ласка, опишіть проблему' : 'Пожалуйста, опишите проблему');
              }} 
              className="btn-primary py-4 px-12 text-lg"
            >
              {currentT.next}
            </button>
          </div>
        </div>
      );
    }

    // Universal Penultimate Step: Budget (Step 2 for 'Other', Step 3 for Branch B/D, Step 5 for Branch A)
    if (step === totalSteps - 1 && serviceCategory !== currentT.categories[2] && !currentT.categories.slice(6, 9).includes(serviceCategory)) return (
      <div className="animate-fade-in">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">{currentT.qBudget}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentT.budgets.map(b => (
            <button
              key={b}
              onClick={() => { setBudget(b); setStep(totalSteps); }}
              className={`p-6 rounded-xl border-2 text-center transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 ${
                budget === b ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200'
              }`}
            >
              <span className="font-semibold text-lg text-gray-900">{b}</span>
            </button>
          ))}
        </div>
      </div>
    );

    // Universal Final Step: Contact
    if (step === totalSteps) return (
      <div className="animate-fade-in max-w-lg mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">{currentT.qContact}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{currentT.namePlaceholder}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              placeholder={lang === 'ua' ? 'Олександр' : 'Александр'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{currentT.contactPlaceholder} *</label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              placeholder="+380... або @username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{currentT.emailPlaceholder}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
              placeholder="email@example.com"
            />
          </div>
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-4 text-xl font-bold shadow-xl hover:shadow-primary-500/30"
            >
              {isSubmitting ? currentT.submitting : currentT.submit}
            </button>
          </div>
        </form>
      </div>
    );

    return null;
  };

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
            style={{ width: `${((step - 1) / (totalSteps - 1 || 1)) * 100}%` }}
          ></div>
          
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const num = idx + 1;
            return (
              <div 
                key={num} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10 transition-colors duration-300 ${
                  step >= num ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Dynamic Content */}
        {renderStep()}

        {/* Footer Navigation */}
        {step > 1 && step <= totalSteps && (
          <div className={`mt-8 flex ${step === totalSteps ? 'justify-center' : 'justify-start'}`}>
            <button 
              onClick={() => setStep(s => s - 1)}
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
