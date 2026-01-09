export const dateLocaleOptions: {
  locale: string;
  options: { dateStyle: 'medium' | 'full' | 'long' | 'short' | undefined };
} = {
  locale: 'de-DE',
  options: { dateStyle: 'medium' },
};

export function useFormatDate(date: Date | undefined) {
  return date?.toLocaleString(dateLocaleOptions.locale, dateLocaleOptions.options);
}
