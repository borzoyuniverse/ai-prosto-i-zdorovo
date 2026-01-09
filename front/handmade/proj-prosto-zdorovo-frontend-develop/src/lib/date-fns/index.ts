import { format as dateFnsFormat } from 'date-fns';
import { ru } from 'date-fns/locale';

const locales = { ru };

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
const format = (date: Date, formatStr = 'PP') =>
  dateFnsFormat(date, formatStr, {
    locale: locales[globalThis.navigator.language as keyof typeof locales] ?? ru,
  });

export { format };
