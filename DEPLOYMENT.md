# 🚀 Інструкція з деплою RomanDev Website

## 📦 Що включено

Повнофункціональний багатомовний сайт для веб-розробки з:
- ✅ Next.js 14 з TypeScript
- ✅ Багатомовність (Українська/Російська)
- ✅ 18 сторінок послуг з детальними описами
- ✅ 10 гео-сторінок для міст України
- ✅ 20 сторінок технологій
- ✅ SEO-оптимізація (Schema.org, OpenGraph, Twitter Cards)
- ✅ Адаптивний дизайн з Tailwind CSS
- ✅ Контактна форма з валідацією
- ✅ Автоматична генерація sitemap.xml та robots.txt

## 🛠️ Локальний запуск

### 1. Встановлення залежностей

```bash
cd romandev-website
npm install
```

### 2. Запуск dev сервера

```bash
npm run dev
```

Сайт буде доступний за адресою: http://localhost:3000

### 3. Білд для продакшену

```bash
npm run build
```

Це створить статичні файли в папці `out/`

## 🌐 Деплой

### Варіант 1: Vercel (Рекомендовано)

1. Встановіть Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
vercel
```

3. Слідуйте інструкціям в терміналі

### Варіант 2: Netlify

1. Встановіть Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Деплой:
```bash
netlify deploy --prod
```

### Варіант 3: Статичний хостинг (GitHub Pages, S3, etc.)

1. Зберіть проект:
```bash
npm run build
```

2. Завантажте вміст папки `out/` на ваш хостинг

## ⚙️ Налаштування

### Додавання більше міст

Відредагуйте файл `data/cities.ts` та додайте нові міста:

```typescript
{ name: "Ваше місто", slug: "vashe-misto", region: "Область" },
```

### Додавання послуг

Відредагуйте файл `data/services.ts` та додайте нові послуги з описами українською та російською мовами.

### Налаштування контактної форми

Для інтеграції з реальним backend:

1. Створіть API endpoint в `app/api/contact/route.ts`
2. Налаштуйте SMTP або інтеграцію з Telegram Bot
3. Додайте reCAPTCHA ключі в `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Зміна контактів

Відредагуйте контакти в:
- `components/Footer.tsx`
- `app/[lang]/contact/page.tsx`
- `lib/seo.ts` (для Schema.org)

## 📊 SEO Оптимізація

### Перевірка SEO

1. Google Search Console: https://search.google.com/search-console
2. Bing Webmaster Tools: https://www.bing.com/webmasters
3. PageSpeed Insights: https://pagespeed.web.dev/

### Sitemap

Sitemap автоматично генерується за адресою: `/sitemap.xml`

### Robots.txt

Robots.txt доступний за адресою: `/robots.txt`

## 🎨 Кастомізація дизайну

### Зміна кольорів

Відредагуйте `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Ваші кольори
  },
}
```

### Зміна шрифтів

Додайте Google Fonts в `app/layout.tsx`

## 📱 Мобільна версія

Сайт повністю адаптивний та оптимізований для:
- 📱 Мобільних телефонів
- 📱 Планшетів
- 💻 Десктопів
- 🖥️ Великих екранів

## 🔒 Безпека

- ✅ HTTPS обов'язковий
- ✅ CSP headers рекомендовані
- ✅ Rate limiting для форм
- ✅ reCAPTCHA для захисту від спаму

## 📈 Аналітика

Додайте Google Analytics в `app/layout.tsx`:

```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

## 🐛 Troubleshooting

### Помилка білду

Якщо білд падає через обмеження пам'яті, зменшіть кількість міст в `data/cities.ts`

### Повільна швидкість

1. Оптимізуйте зображення
2. Увімкніть CDN
3. Використайте кешування

## 📞 Підтримка

- Email: info@programist.pp.ua
- Телефон: +38 (093) 880-08-22
- Telegram: @romandev

## 📄 Ліцензія

© 2025 RomanDev. Всі права захищені.