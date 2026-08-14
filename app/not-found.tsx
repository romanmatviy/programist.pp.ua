import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-xl">
        <p className="text-base font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Сторінку не знайдено
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Вибачте, ми не змогли знайти сторінку, яку ви шукаєте. Можливо, вона була видалена або переміщена.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/ua"
            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            На головну
          </Link>
          <Link href="/ua/contact" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            Зв'язатися з підтримкою <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
        <div className="mt-12 pt-10 border-t border-gray-100 text-left">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Корисні посилання:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/ua/services" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3">
              <span className="text-2xl">💻</span>
              <div>
                <div className="font-medium text-gray-900">Всі послуги</div>
                <div className="text-sm text-gray-500">Веб-розробка та підтримка</div>
              </div>
            </Link>
            <Link href="/ua/service/web-development" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <div className="font-medium text-gray-900">Створення сайтів</div>
                <div className="text-sm text-gray-500">Сучасні та швидкі сайти</div>
              </div>
            </Link>
            <Link href="/ua/blog" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3">
              <span className="text-2xl">📰</span>
              <div>
                <div className="font-medium text-gray-900">IT Блог</div>
                <div className="text-sm text-gray-500">Корисні статті та гайди</div>
              </div>
            </Link>
            <Link href="/ua/portfolio" className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <div className="font-medium text-gray-900">Портфоліо</div>
                <div className="text-sm text-gray-500">Мої останні проєкти</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
           <Link href="/ru" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Русская версия сайта</Link>
        </div>
      </div>
    </div>
  );
}
