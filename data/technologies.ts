export interface Technology {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: {
    ua: string;
    ru: string;
  };
  icon: string;
  relatedTechnologies: string[];
}

export const technologies: Technology[] = [
  {
    id: "1",
    name: "Laravel",
    slug: "laravel",
    category: "Backend",
    description: {
      ua: "Найпопулярніший PHP фреймворк для створення веб-додатків. Елегантний синтаксис, потужні інструменти, велика спільнота.",
      ru: "Самый популярный PHP фреймворк для создания веб-приложений. Элегантный синтаксис, мощные инструменты, большое сообщество."
    },
    icon: "🔴",
    relatedTechnologies: ["PHP", "MySQL", "Redis", "Vue", "Livewire"]
  },
  {
    id: "2",
    name: "Filament",
    slug: "filament",
    category: "Admin Panel",
    description: {
      ua: "Сучасна адмін-панель для Laravel. Швидка розробка, красивий інтерфейс, багато готових компонентів.",
      ru: "Современная админ-панель для Laravel. Быстрая разработка, красивый интерфейс, много готовых компонентов."
    },
    icon: "💎",
    relatedTechnologies: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "PHP"]
  },
  {
    id: "3",
    name: "PHP",
    slug: "php",
    category: "Backend",
    description: {
      ua: "Серверна мова програмування для веб-розробки. Використовується в 77% всіх сайтів.",
      ru: "Серверный язык программирования для веб-разработки. Используется в 77% всех сайтов."
    },
    icon: "🐘",
    relatedTechnologies: ["Laravel", "Symfony", "WordPress", "MySQL", "Composer"]
  },
  {
    id: "4",
    name: "Next.js",
    slug: "nextjs",
    category: "Frontend",
    description: {
      ua: "React фреймворк для створення швидких веб-додатків з SSR та SSG. Ідеальний для SEO.",
      ru: "React фреймворк для создания быстрых веб-приложений с SSR и SSG. Идеальный для SEO."
    },
    icon: "⚫",
    relatedTechnologies: ["React", "TypeScript", "Tailwind CSS", "Vercel", "Node.js"]
  },
  {
    id: "5",
    name: "Nuxt",
    slug: "nuxt",
    category: "Frontend",
    description: {
      ua: "Vue.js фреймворк для створення універсальних додатків. SSR, SSG, SPA в одному.",
      ru: "Vue.js фреймворк для создания универсальных приложений. SSR, SSG, SPA в одном."
    },
    icon: "💚",
    relatedTechnologies: ["Vue", "TypeScript", "Tailwind CSS", "Pinia", "Vite"]
  },
  {
    id: "6",
    name: "React",
    slug: "react",
    category: "Frontend",
    description: {
      ua: "Найпопулярніша JavaScript бібліотека для створення інтерфейсів. Компонентний підхід.",
      ru: "Самая популярная JavaScript библиотека для создания интерфейсов. Компонентный подход."
    },
    icon: "⚛️",
    relatedTechnologies: ["Next.js", "TypeScript", "Redux", "React Query", "Vite"]
  },
  {
    id: "7",
    name: "Vue",
    slug: "vue",
    category: "Frontend",
    description: {
      ua: "Прогресивний JavaScript фреймворк для створення UI. Простий у вивченні, потужний у використанні.",
      ru: "Прогрессивный JavaScript фреймворк для создания UI. Простой в изучении, мощный в использовании."
    },
    icon: "💚",
    relatedTechnologies: ["Nuxt", "TypeScript", "Pinia", "Vite", "Tailwind CSS"]
  },
  {
    id: "8",
    name: "PrestaShop",
    slug: "prestashop",
    category: "E-Commerce",
    description: {
      ua: "Безкоштовна платформа для створення інтернет-магазинів. Понад 300 000 магазинів по всьому світу.",
      ru: "Бесплатная платформа для создания интернет-магазинов. Более 300 000 магазинов по всему миру."
    },
    icon: "🛒",
    relatedTechnologies: ["PHP", "MySQL", "Smarty", "JavaScript", "Bootstrap"]
  },
  {
    id: "9",
    name: "WordPress",
    slug: "wordpress",
    category: "CMS",
    description: {
      ua: "Найпопулярніша CMS у світі. 43% всіх сайтів працюють на WordPress.",
      ru: "Самая популярная CMS в мире. 43% всех сайтов работают на WordPress."
    },
    icon: "📝",
    relatedTechnologies: ["PHP", "MySQL", "WooCommerce", "Elementor", "ACF"]
  },
  {
    id: "10",
    name: "SQL",
    slug: "sql",
    category: "Database",
    description: {
      ua: "Мова запитів до реляційних баз даних. MySQL, PostgreSQL, SQLite.",
      ru: "Язык запросов к реляционным базам данных. MySQL, PostgreSQL, SQLite."
    },
    icon: "🗄️",
    relatedTechnologies: ["MySQL", "PostgreSQL", "SQLite", "Redis", "MongoDB"]
  },
  {
    id: "11",
    name: "TypeScript",
    slug: "typescript",
    category: "Language",
    description: {
      ua: "Типізований JavaScript. Покращує якість коду та зменшує кількість помилок.",
      ru: "Типизированный JavaScript. Улучшает качество кода и уменьшает количество ошибок."
    },
    icon: "🔷",
    relatedTechnologies: ["JavaScript", "Next.js", "React", "Node.js", "Vue"]
  },
  {
    id: "12",
    name: "Tailwind CSS",
    slug: "tailwind",
    category: "CSS Framework",
    description: {
      ua: "Utility-first CSS фреймворк. Швидка розробка, малий розмір, повна кастомізація.",
      ru: "Utility-first CSS фреймворк. Быстрая разработка, малый размер, полная кастомизация."
    },
    icon: "🎨",
    relatedTechnologies: ["CSS", "PostCSS", "Next.js", "React", "Vue"]
  },
  {
    id: "13",
    name: "Node.js",
    slug: "nodejs",
    category: "Backend",
    description: {
      ua: "JavaScript runtime для серверної розробки. Швидкий, масштабований, асинхронний.",
      ru: "JavaScript runtime для серверной разработки. Быстрый, масштабируемый, асинхронный."
    },
    icon: "🟢",
    relatedTechnologies: ["JavaScript", "Express", "NestJS", "MongoDB", "PostgreSQL"]
  },
  {
    id: "14",
    name: "MySQL",
    slug: "mysql",
    category: "Database",
    description: {
      ua: "Найпопулярніша реляційна база даних. Швидка, надійна, безкоштовна.",
      ru: "Самая популярная реляционная база данных. Быстрая, надежная, бесплатная."
    },
    icon: "🐬",
    relatedTechnologies: ["SQL", "PHP", "Laravel", "WordPress", "PostgreSQL"]
  },
  {
    id: "15",
    name: "PostgreSQL",
    slug: "postgresql",
    category: "Database",
    description: {
      ua: "Потужна об'єктно-реляційна база даних. Підтримка JSON, повнотекстовий пошук.",
      ru: "Мощная объектно-реляционная база данных. Поддержка JSON, полнотекстовый поиск."
    },
    icon: "🐘",
    relatedTechnologies: ["SQL", "Node.js", "Laravel", "Django", "Redis"]
  },
  {
    id: "16",
    name: "Redis",
    slug: "redis",
    category: "Cache",
    description: {
      ua: "In-memory база даних для кешування та черг. Надзвичайно швидка.",
      ru: "In-memory база данных для кеширования и очередей. Чрезвычайно быстрая."
    },
    icon: "🔴",
    relatedTechnologies: ["Laravel", "Node.js", "PHP", "Python", "Docker"]
  },
  {
    id: "17",
    name: "Docker",
    slug: "docker",
    category: "DevOps",
    description: {
      ua: "Платформа для контейнеризації додатків. Однакове середовище на всіх серверах.",
      ru: "Платформа для контейнеризации приложений. Одинаковая среда на всех серверах."
    },
    icon: "🐳",
    relatedTechnologies: ["Kubernetes", "Linux", "Nginx", "CI/CD", "AWS"]
  },
  {
    id: "18",
    name: "Git",
    slug: "git",
    category: "Version Control",
    description: {
      ua: "Система контролю версій. GitHub, GitLab, Bitbucket.",
      ru: "Система контроля версий. GitHub, GitLab, Bitbucket."
    },
    icon: "📦",
    relatedTechnologies: ["GitHub", "GitLab", "CI/CD", "Docker", "Linux"]
  },
  {
    id: "19",
    name: "Symfony",
    slug: "symfony",
    category: "Backend",
    description: {
      ua: "PHP фреймворк для корпоративних додатків. Модульна архітектура, висока продуктивність.",
      ru: "PHP фреймворк для корпоративных приложений. Модульная архитектура, высокая производительность."
    },
    icon: "⚫",
    relatedTechnologies: ["PHP", "Doctrine", "Twig", "MySQL", "Composer"]
  },
  {
    id: "20",
    name: "MongoDB",
    slug: "mongodb",
    category: "Database",
    description: {
      ua: "NoSQL документо-орієнтована база даних. Гнучка схема, горизонтальне масштабування.",
      ru: "NoSQL документо-ориентированная база данных. Гибкая схема, горизонтальное масштабирование."
    },
    icon: "🍃",
    relatedTechnologies: ["Node.js", "Express", "Mongoose", "JavaScript", "Docker"]
  },
  {
    id: "21",
    name: "JavaScript",
    slug: "javascript",
    category: "Language",
    description: {
      ua: "Головна мова програмування для створення інтерактивних та динамічних інтерфейсів веб-сайтів.",
      ru: "Основной язык программирования для создания интерактивных и динамических интерфейсов веб-сайтов."
    },
    icon: "🟨",
    relatedTechnologies: ["TypeScript", "React", "Vue", "Next.js", "Node.js"]
  }
];

export const getTechnologyBySlug = (slug: string): Technology | undefined => {
  return technologies.find(tech => tech.slug === slug);
};

export const getRandomTechnologies = (count: number, excludeSlug?: string): Technology[] => {
  const filtered = excludeSlug 
    ? technologies.filter(t => t.slug !== excludeSlug)
    : technologies;
  
  return filtered
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const getTechnologiesByCategory = (category: string): Technology[] => {
  return technologies.filter(tech => tech.category === category);
};