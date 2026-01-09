export const stringToIntOrDefaultNonNegative = (
  value: string,
  defaultValue?: number | undefined,
) => (Number.isNaN(Number.parseInt(value)) ? defaultValue : Math.max(+value, 0));
