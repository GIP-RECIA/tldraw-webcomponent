const availablesLanguages: Array<string> = [
  'ar',
  'da',
  'de',
  'en',
  'es',
  'fa',
  'fr',
  'gl',
  'he',
  'it',
  'ja',
  'ko_kr',
  'ku',
  'my',
  'nb_no',
  'ne',
  'nn_no',
  'pl',
  'pt_br',
  'pt_pt',
  'ru',
  'sv',
  'te',
  'th',
  'tr',
  'uk',
  'zh_cn',
  'zh_tw',
];

const findLanguage = (fallback: string, availables: Array<string> = availablesLanguages): string => {
  const isLanuage: boolean = availables.includes(window.navigator.language);
  if (isLanuage) return window.navigator.language;
  const matchLanguages = window.navigator.languages.filter((lang) => availables.find((available) => lang == available));
  if (matchLanguages.length > 0) return matchLanguages[0];
  return fallback;
};

export { findLanguage };
