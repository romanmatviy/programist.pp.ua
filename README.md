# RomanDev - Web Development Website

Професійний багатомовний сайт для веб-розробки з повною SEO-оптимізацією та гео-сторінками для всіх міст України.

## 🚀 Технології

- **Next.js 14** - React фреймворк з SSG
- **TypeScript** - Типізований JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Framer Motion** - Анімації
- **React Hook Form** - Управління формами

## 📋 Особливості

- ✅ Багатомовність (Українська/Російська)
- ✅ SEO-оптимізація з structured data
- ✅ Гео-сторінки для всіх міст України
- ✅ Адаптивний дизайн
- ✅ Швидкість завантаження (PageSpeed 90+)
- ✅ Sitemap та robots.txt
- ✅ OpenGraph та Twitter Cards
- ✅ Контактна форма з валідацією

## 🛠️ Встановлення

```bash
# Встановити залежності
npm install

# Запустити dev сервер
npm run dev

# Зібрати для продакшену
npm run build

# Запустити продакшен сервер
npm start
```

## 📁 Структура проекту

```
romandev-website/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Багатомовні маршрути
│   │   ├── page.tsx       # Головна сторінка
│   │   ├── about/         # Про нас
│   │   ├── services/      # Послуги
│   │   ├── service/       # Детальні сторінки послуг
│   │   │   ├── [slug]/    # Послуга за slug
│   │   │   └── geo/       # Гео-сторінки
│   │   │       └── [city]/
│   │   ├── tech/          # Технології
│   │   ├── portfolio/     # Портфоліо
│   │   ├── blog/          # Блог
│   │   ├── contact/       # Контакти
│   │   ├── privacy/       # Політика конфіденційності
│   │   └── terms/         # Умови використання
│   ├── sitemap.ts         # Генерація sitemap
│   ├── robots.ts          # Генерація robots.txt
│   └── globals.css        # Глобальні стилі
├── components/            # React компоненти
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   ├── TechnologyCard.tsx
│   ├── ContactForm.tsx
│   └── Breadcrumbs.tsx
├── data/                  # Дані
│   ├── services.ts        # Послуги
│   ├── cities.ts          # Міста України
│   ├── technologies.ts    # Технології
│   └── translations.ts    # Переклади
├── lib/                   # Утиліти
│   ├── seo.ts            # SEO функції
│   └── i18n.ts           # Інтернаціоналізація
└── public/               # Статичні файли
```

## 🌍 Гео-сторінки

Сайт автоматично генерує SEO-оптимізовані сторінки для всіх міст України:

- `/ua/service/geo/kyiv` - Київ
- `/ua/service/geo/lviv` - Львів
- `/ua/service/geo/odesa` - Одеса
- ... та інші міста

Кожна гео-сторінка містить:
- Унікальні Title та Description
- LocalBusiness Schema
- FAQ Schema
- Контактну форму
- Список послуг

## 📱 Контакти

- **Телефон:** +38 (093) 880-08-22
- **Email:** info@programist.pp.ua
- **Telegram:** @RomanMatviy
- **GitHub:** github.com/matviyroman

## 📄 Ліцензія

© 2025 RomanDev. Всі права захищені.