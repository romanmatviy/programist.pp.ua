import { Language, translations } from '@/data/translations';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  return generateSEO({
    title: t.contact.title,
    description: t.contact.subtitle,
    keywords: 'контакти, зв\'язатися, консультація, розробка сайтів',
    canonical: `https://programist.pp.ua/${lang}/contact`,
    lang,
  });
}

export default function ContactPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = (translations[lang as keyof typeof translations] || translations['ua']);

  const breadcrumbs = [
    { name: t.nav.contact, url: `/${lang}/contact` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.contact.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              {lang === 'ua' ? 'Напишіть нам' : 'Напишите нам'}
            </h2>
            <ContactForm lang={lang} translations={t} />
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-gradient-primary text-white rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">
                {lang === 'ua' ? 'Контактна інформація' : 'Контактная информация'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">
                      {lang === 'ua' ? 'Телефон' : 'Телефон'}
                    </div>
                    <a href="tel:+380938800822" className="text-lg font-semibold hover:underline">
                      +38 (093) 880-08-22
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">Email</div>
                    <a href="mailto:info@programist.pp.ua" className="text-lg font-semibold hover:underline break-all">
                      info@programist.pp.ua
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">Telegram</div>
                    <a href="https://t.me/RomanMatviy" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline">
                      @RomanMatviy
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    🐙
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">GitHub</div>
                    <a href="https://github.com/matviyroman" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline">
                      github.com/matviyroman
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">
                {lang === 'ua' ? 'Графік роботи' : 'График работы'}
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>{lang === 'ua' ? 'Понеділок - П\'ятниця' : 'Понедельник - Пятница'}</span>
                  <span className="font-semibold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'ua' ? 'Субота' : 'Суббота'}</span>
                  <span className="font-semibold">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'ua' ? 'Неділя' : 'Воскресенье'}</span>
                  <span className="font-semibold">{lang === 'ua' ? 'Вихідний' : 'Выходной'}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  {lang === 'ua' 
                    ? '💡 Ми відповідаємо на повідомлення протягом 1 години в робочий час'
                    : '💡 Мы отвечаем на сообщения в течение 1 часа в рабочее время'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}