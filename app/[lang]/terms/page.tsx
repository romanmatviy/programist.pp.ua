import { Language, translations } from '@/data/translations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';

  return generateSEO({
    title: 'Terms of Service',
    description: 'Умови надання послуг RomanDev',
    canonical: `https://romandev.com/${lang}/terms`,
    lang,
  });
}

export default function TermsPage({ params }: { params: { lang: Language } }) {
  const lang = params.lang || 'ua';
  const t = translations[lang];

  const breadcrumbs = [
    { name: 'Terms of Service', url: `/${lang}/terms` },
  ];

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={breadcrumbs} lang={lang} />

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            {lang === 'ua' ? 'Умови надання послуг' : 'Условия предоставления услуг'}
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              {lang === 'ua'
                ? 'Ці умови регулюють використання наших послуг та веб-сайту. Використовуючи наші послуги, ви погоджуєтесь з цими умовами.'
                : 'Эти условия регулируют использование наших услуг и веб-сайта. Используя наши услуги, вы соглашаетесь с этими условиями.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '1. Надання послуг' : '1. Предоставление услуг'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'RomanDev надає послуги веб-розробки відповідно до узгодженої специфікації та термінів. Ми зобов\'язуємось виконувати роботу якісно та в строк.'
                : 'RomanDev предоставляет услуги веб-разработки в соответствии с согласованной спецификацией и сроками. Мы обязуемся выполнять работу качественно и в срок.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '2. Оплата' : '2. Оплата'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Оплата здійснюється згідно з узгодженим графіком платежів. Зазвичай це передоплата 50% та оплата 50% після завершення робіт.'
                : 'Оплата осуществляется согласно согласованному графику платежей. Обычно это предоплата 50% и оплата 50% после завершения работ.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '3. Авторські права' : '3. Авторские права'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Після повної оплати всі авторські права на розроблений продукт переходять до клієнта. До цього моменту права залишаються за RomanDev.'
                : 'После полной оплаты все авторские права на разработанный продукт переходят к клиенту. До этого момента права остаются за RomanDev.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '4. Гарантії' : '4. Гарантии'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Ми надаємо гарантію на виконані роботи терміном 30 днів з моменту здачі проекту. Гарантія покриває виправлення помилок та недоліків.'
                : 'Мы предоставляем гарантию на выполненные работы сроком 30 дней с момента сдачи проекта. Гарантия покрывает исправление ошибок и недостатков.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '5. Відповідальність' : '5. Ответственность'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'RomanDev не несе відповідальності за непрямі збитки, втрату прибутку або даних. Наша відповідальність обмежена вартістю наданих послуг.'
                : 'RomanDev не несет ответственности за косвенные убытки, потерю прибыли или данных. Наша ответственность ограничена стоимостью предоставленных услуг.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '6. Розірвання договору' : '6. Расторжение договора'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'Будь-яка сторона може розірвати договір з письмовим повідомленням за 14 днів. У разі розірвання оплачується виконана робота.'
                : 'Любая сторона может расторгнуть договор с письменным уведомлением за 14 дней. В случае расторжения оплачивается выполненная работа.'}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              {lang === 'ua' ? '7. Контакти' : '7. Контакты'}
            </h2>
            <p className="mb-4">
              {lang === 'ua'
                ? 'З питань щодо умов надання послуг звертайтесь:'
                : 'По вопросам условий предоставления услуг обращайтесь:'}
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