export type HireIntentKey = 'programmer-hour' | 'hire-programmer';

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
  }
];

export function getHireIntentSlug(key: HireIntentKey, lang: 'ua' | 'ru') {
  const item = hireIntents.find(i => i.key === key)!;
  return item.slug[lang];
}

export function resolveHireIntentBySlug(slug: string, lang: 'ua' | 'ru') {
  return hireIntents.find(i => i.slug[lang] === slug);
}
