import { translations, Language } from '@/data/translations';

export function getTranslation(lang: Language, key: string): any {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value;
}

export function t(lang: Language, key: string, replacements?: Record<string, string>): string {
  let translation = getTranslation(lang, key);
  
  if (typeof translation !== 'string') {
    return key;
  }
  
  if (replacements) {
    Object.keys(replacements).forEach(replaceKey => {
      translation = translation.replace(`{${replaceKey}}`, replacements[replaceKey]);
    });
  }
  
  return translation;
}