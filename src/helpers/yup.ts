export const transformNumber = (value: unknown, originalValue: unknown) => {
  if (!originalValue) return 0;
  if (typeof originalValue === 'string' && originalValue !== '') value = Number(originalValue) ?? 0;
  return value;
};
