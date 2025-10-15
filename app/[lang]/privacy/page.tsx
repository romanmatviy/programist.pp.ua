import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';

  return generateSEO({
    title: 'Privacy Policy',
    description: 'Політика конфіденційності RomanDev',
    canonical: `https://programist.pp.ua/${lang}/privacy`,
    lang,
  });
}

export default function PrivacyPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const breadcrumbs = [
    { name: 'Privacy Policy', url: `/${lang}/privacy` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            {lang === 'ua' ? 'Політика конфіденційності' : 'Политика конфиденциальности'}
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              {lang === 'ua'
                ? 'Ця політика конфіденційності описує, як RomanDev збирає, використовує та захищає вашу особисту інформацію.'
                : 'Эта политика конфиденциальности описывает, как RomanDev собирает, использует и защищает вашу личную информацию.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '1. Збір інформації' : '1. Сбор информации'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Ми збираємо інформацію, яку ви надаєте нам безпосередньо, включаючи ім\'я, email, номер телефону та повідомлення через контактну форму.'
                : 'Мы собираем информацию, которую вы предоставляете нам напрямую, включая имя, email, номер телефона и сообщения через контактную форму.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '2. Використання інформації' : '2. Использование информации'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Ми використовуємо зібрану інформацію для: відповіді на ваші запити, надання послуг, покращення нашого сайту та комунікації з вами.'
                : 'Мы используем собранную информацию для: ответа на ваши запросы, предоставления услуг, улучшения нашего сайта и коммуникации с вами.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '3. Захист інформації' : '3. Защита информации'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Ми вживаємо відповідних заходів безпеки для захисту вашої особистої інформації від несанкціонованого доступу, зміни або розголошення.'
                : 'Мы принимаем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения или разглашения.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '4. Cookies' : '4. Cookies'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Наш сайт використовує cookies для покращення користувацького досвіду. Ви можете налаштувати свій браузер для відмови від cookies.'
                : 'Наш сайт использует cookies для улучшения пользовательского опыта. Вы можете настроить свой браузер для отказа от cookies.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '5. Контакти' : '5. Контакты'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Якщо у вас є питання щодо цієї політики конфіденційності, зв\'яжіться з нами:'
                : 'Если у вас есть вопросы по этой политике конфиденциальности, свяжитесь с нами:'}
            </p>
            <p className="mb-2">Email: info@programist.pp.ua</p>
            <p className="mb-2">{lang === 'ua' ? 'Телефон' : 'Телефон'}: +38 (093) 880-08-22</p>

            <p className="mt-8 text-sm text-gray-500">
              {lang === 'ua' ? 'Остання оновлення: 15 січня 2025' : 'Последнее обновление: 15 января 2025'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}