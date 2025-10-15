import { cityRuByUa, regionRuByUa } from './geoTranslations';
import { ukrainianCities } from './cities';
import { ukrainianRegions } from './regions';

export type Lang = 'ua' | 'ru';

const translitMap: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'i', й: 'i',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch',
  ш: 'sh', щ: 'shch', ь: '', ю: 'iu', я: 'ia', ъ: '', ы: 'y', э: 'e', ё: 'e', йо: 'io',
  А: 'a', Б: 'b', В: 'v', Г: 'h', Ґ: 'g', Д: 'd', Е: 'e', Є: 'ie', Ж: 'zh', З: 'z', И: 'y', І: 'i', Ї: 'i', Й: 'i',
  К: 'k', Л: 'l', М: 'm', Н: 'n', О: 'o', П: 'p', Р: 'r', С: 's', Т: 't', У: 'u', Ф: 'f', Х: 'kh', Ц: 'ts', Ч: 'ch',
  Ш: 'sh', Щ: 'shch', Ь: '', Ю: 'iu', Я: 'ia', Ы: 'y', Э: 'e', Ё: 'e'
};

export function slugifyCyrillic(input: string): string {
  const replaced = input.replace(/\s+/g, '-').replace(/'+/g, '');
  let out = '';
  for (const ch of replaced) {
    out += translitMap[ch] ?? ch;
  }
  return out
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getCitySlug(nameUa: string, lang: Lang): string {
  if (lang === 'ua') {
    const city = ukrainianCities.find(c => c.name === nameUa);
    return city ? city.slug : slugifyCyrillic(nameUa);
  }
  const ru = cityRuByUa[nameUa] ?? nameUa;
  return slugifyCyrillic(ru);
}

export function resolveCityBySlug(slug: string, lang: Lang) {
  if (lang === 'ua') {
    return ukrainianCities.find(c => c.slug === slug);
  }
  // RU: compute RU slug for each city and match
  return ukrainianCities.find(c => getCitySlug(c.name, 'ru') === slug);
}

export function getRegionSlug(regionUa: string, lang: Lang): string {
  if (lang === 'ua') {
    return slugifyCyrillic(regionUa);
  }
  const ru = regionRuByUa[regionUa] ?? regionUa;
  return slugifyCyrillic(ru);
}

export function resolveRegionUaBySlug(slug: string, lang: Lang): string | undefined {
  for (const regionUa of ukrainianRegions) {
    if (getRegionSlug(regionUa, lang) === slug) return regionUa;
  }
  return undefined;
}
