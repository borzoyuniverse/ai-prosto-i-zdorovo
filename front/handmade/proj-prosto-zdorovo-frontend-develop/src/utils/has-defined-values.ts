export const hasDefinedValues = (obj: Record<string, unknown>) => {
  return Object.values(obj).some((value) => value !== undefined);
};
