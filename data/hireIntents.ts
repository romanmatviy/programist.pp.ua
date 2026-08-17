export type HireIntentKey = 'programmer-hour' | 'hire-programmer' | 'hire-prestashop' | 'hire-opencart' | 'hire-wordpress' | 'hire-laravel' | 'hire-yii' | 'hire-cakephp';

export const hireIntents: Array<{
  key: HireIntentKey;
  label: { ua: string; ru: string };
  slug: { ua: string; ru: string };
  description: { ua: string; ru: string };
}> = [
  {
    key: 'programmer-hour',
    label: { ua: 'Програміст на годину', ru: 'Программист на час' },
    slug: { ua: 'programist-na-godynu', ru: 'programmist-na-chas' },
    description: {
      ua: 'Оперативна допомога розробника погодинно: правки, консультації, інтеграції. Вартість від $17/год.',
      ru: 'Оперативная помощь разработчика почасово: правки, консультации, интеграции. Стоимость от $17/час.'
    }
  },
  {
    key: 'hire-programmer',
    label: { ua: 'Найняти програміста', ru: 'Нанять программиста' },
    slug: { ua: 'nainiaty-programista', ru: 'naniat-programmista' },
    description: {
      ua: 'Візьміть розробника під проект або на довгострокову співпрацю.',
      ru: 'Возьмите разработчика под проект или на долгосрочное сотрудничество.'
    }
  },
  {
    key: 'hire-prestashop',
    label: { ua: 'Найняти PrestaShop розробника (програміста)', ru: 'Нанять PrestaShop разработчика (программиста)' },
    slug: { ua: 'nainiaty-prestashop-rozrobnyka', ru: 'naniat-prestashop-razrabotchika' },
    description: {
      ua: 'Експертна розробка, підтримка та оптимізація інтернет-магазинів на PrestaShop.',
      ru: 'Экспертная разработка, поддержка и оптимизация интернет-магазинов на PrestaShop.'
    }
  },
  {
    key: 'hire-opencart',
    label: { ua: 'Найняти OpenCart розробника (програміста)', ru: 'Нанять OpenCart разработчика (программиста)' },
    slug: { ua: 'nainiaty-opencart-rozrobnyka', ru: 'naniat-opencart-razrabotchika' },
    description: {
      ua: 'Професійна розробка модулів, шаблонів та комплексних магазинів на OpenCart.',
      ru: 'Профессиональная разработка модулей, шаблонов и комплексных магазинов на OpenCart.'
    }
  },
  {
    key: 'hire-wordpress',
    label: { ua: 'Найняти WordPress розробника (програміста)', ru: 'Нанять WordPress разработчика (программиста)' },
    slug: { ua: 'nainiaty-wordpress-rozrobnyka', ru: 'naniat-wordpress-razrabotchika' },
    description: {
      ua: 'Розробка кастомних тем, плагінів та інтернет-магазинів WooCommerce.',
      ru: 'Разработка кастомных тем, плагинов и интернет-магазинов WooCommerce.'
    }
  },
  {
    key: 'hire-laravel',
    label: { ua: 'Найняти Laravel розробника (програміста)', ru: 'Нанять Laravel разработчика (программиста)' },
    slug: { ua: 'nainiaty-laravel-rozrobnyka', ru: 'naniat-laravel-razrabotchika' },
    description: {
      ua: 'Створення складних веб-додатків, CRM систем та RESTful API на фреймворку Laravel.',
      ru: 'Создание сложных веб-приложений, CRM систем и RESTful API на фреймворке Laravel.'
    }
  },
  {
    key: 'hire-yii',
    label: { ua: 'Найняти Yii розробника (програміста)', ru: 'Нанять Yii разработчика (программиста)' },
    slug: { ua: 'nainiaty-yii-rozrobnyka', ru: 'naniat-yii-razrabotchika' },
    description: {
      ua: 'Підтримка legacy проектів на Yii 1.1 та Yii2, рефакторинг та оптимізація.',
      ru: 'Поддержка legacy проектов на Yii 1.1 и Yii2, рефакторинг и оптимизация.'
    }
  },
  {
    key: 'hire-cakephp',
    label: { ua: 'Найняти CakePHP розробника (програміста)', ru: 'Нанять CakePHP разработчика (программиста)' },
    slug: { ua: 'nainiaty-cakephp-rozrobnyka', ru: 'naniat-cakephp-razrabotchika' },
    description: {
      ua: 'Оновлення застарілих CakePHP проектів, міграція та розробка нового функціоналу.',
      ru: 'Обновление устаревших CakePHP проектов, миграция и разработка нового функционала.'
    }
  }
];

export function getHireIntentSlug(key: HireIntentKey, lang: 'ua' | 'ru') {
  const item = hireIntents.find(i => i.key === key)!;
  return item.slug[lang];
}

export function resolveHireIntentBySlug(slug: string, lang: 'ua' | 'ru') {
  return hireIntents.find(i => i.slug[lang] === slug);
}
