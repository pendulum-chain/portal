/* eslint-disable @typescript-eslint/no-explicit-any */
export const transformNumber = (value: any, originalValue: any) => {
  if (!originalValue) return 0;
  if (typeof originalValue === 'string' && originalValue !== '') value = Number(originalValue) ?? 0;
  return value;
};
