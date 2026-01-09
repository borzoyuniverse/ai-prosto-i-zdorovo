export const clamp = ({ min, max, value }: { min: number; max: number; value: number }) =>
  Math.min(Math.max(value, min), max);
