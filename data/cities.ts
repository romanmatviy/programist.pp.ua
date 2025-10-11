export const ukrainianCities = [
  // Обласні центри (топ-10 для оптимізації білду)
  { name: "Київ", slug: "kyiv", region: "Київська область" },
  { name: "Харків", slug: "kharkiv", region: "Харківська область" },
  { name: "Одеса", slug: "odesa", region: "Одеська область" },
  { name: "Дніпро", slug: "dnipro", region: "Дніпропетровська область" },
  { name: "Львів", slug: "lviv", region: "Львівська область" },
  { name: "Запоріжжя", slug: "zaporizhzhia", region: "Запорізька область" },
  { name: "Вінниця", slug: "vinnytsia", region: "Вінницька область" },
  { name: "Полтава", slug: "poltava", region: "Полтавська область" },
  { name: "Чернігів", slug: "chernihiv", region: "Чернігівська область" },
  { name: "Черкаси", slug: "cherkasy", region: "Черкаська область" },
];

export type City = typeof ukrainianCities[number];