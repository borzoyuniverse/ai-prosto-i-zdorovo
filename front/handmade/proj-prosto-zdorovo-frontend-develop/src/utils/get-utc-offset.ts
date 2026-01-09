export function getUtcOffset(timeZone: string): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'shortOffset',
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find((p) => p.type === 'timeZoneName');

  if (offsetPart) {
    const offsetValue = offsetPart.value.replaceAll(/UTC|GMT/gi, '').trim();
    return `UTC${offsetValue}`;
  }

  return 'UTC';
}
