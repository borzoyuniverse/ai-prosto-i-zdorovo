import { initReactI18next } from 'react-i18next';

import { format } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '@/assets/locales/en/translations.json';
import translationRU from '@/assets/locales/ru/translations.json';

export const resources = {
  en: {
    translations: translationEN,
  },
  ru: {
    translations: translationRU,
  },
};

const locales = {
  en: enGB,
  ru: ru,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'translations',
    ns: ['translations'],
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

i18n.services.formatter?.add('fullDate', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'd MMMM yyyy', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('dayOfMonth', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'd MMM', { locale: locales[language] }).replace('.', '');
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('dayOfFullMonth', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'd MMMM', { locale: locales[language] }).replace('.', '');
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('dayOfMonthWithWeekday', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'd MMMM, EEEEEE', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('dayOfMonthWithTime', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'd MMMM, HH:mm', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('time', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'HH:mm', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('dayNumber', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'd', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('weekday', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'EEEEEE', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('datetimeWithTimezone', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'dd.MM.yyyy, HH:mm (OOOO)', {
      locale: locales[language],
    }).replace('GMT', 'UTC');
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('yearOnly', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'yyyy', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('dayWithWeekdayAndTime', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    const weekday = format(value, 'EEEEEE', { locale: locales[language] }); // Вт
    const dayMonth = format(value, 'd MMMM', { locale: locales[language] }); // 25 октября
    const time = format(value, 'HH:mm', { locale: locales[language] }); // 13:00
    return `${weekday}, ${dayMonth} в ${time}`;
  }
  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('weekdayDateYear', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';

    const raw = format(value, 'EEEEEE, d MMMM yyyy', {
      locale: locales[language],
    });

    // делаем "вт" → "Вт"
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  return `Provided value is not a date: ${value}`;
});

i18n.services.formatter?.add('shortDate', (value, lng) => {
  if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
    const language = (lng as keyof typeof locales) || 'ru';
    return format(value, 'dd.MM.yyyy', { locale: locales[language] });
  }
  return `Provided value is not a date: ${value}`;
});

export { default as i18n } from 'i18next';
