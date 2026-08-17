'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitIntentPopupProps {
  lang: 'ua' | 'ru';
}

export default function ExitIntentPopup({ lang }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem('exit_intent_seen');
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // If the mouse leaves from the top of the window
      if (e.clientY <= 0) {
        setIsOpen(true);
        localStorage.setItem('exit_intent_seen', 'true');
        // Remove the event listener once the popup is triggered
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Безкоштовний аудит (Exit Popup)' }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } else {
        console.error('Failed to send lead');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const texts = {
    ua: {
      title: 'Зачекайте! Отримайте безкоштовний аудит вашого сайту 🚀',
      subtitle: 'Дізнайтеся, чому ваш сайт втрачає клієнтів та як збільшити конверсію. Залиште email і ми надішлемо детальний звіт.',
      placeholder: 'Ваш email',
      button: 'Отримати аудит',
      successTitle: 'Дякуємо!',
      successMsg: "Ми скоро зв'яжемося з вами.",
    },
    ru: {
      title: 'Подождите! Получите бесплатный аудит вашего сайта 🚀',
      subtitle: 'Узнайте, почему ваш сайт теряет клиентов и как увеличить конверсию. Оставьте email, и мы пришлем подробный отчет.',
      placeholder: 'Ваш email',
      button: 'Получить аудит',
      successTitle: 'Спасибо!',
      successMsg: 'Мы скоро свяжемся с вами.',
    }
  };

  const t = texts[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            {!isSubmitted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {t.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {t.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (lang === 'ua' ? 'Відправка...' : 'Отправка...') : t.button}
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-4">
                  {lang === 'ua' ? 'Ваші дані у безпеці. Ніякого спаму.' : 'Ваши данные в безопасности. Никакого спама.'}
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
                <p className="text-gray-600">{t.successMsg}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
