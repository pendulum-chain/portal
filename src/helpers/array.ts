import { Asset } from '../models/Asset';

export type MapFunction<T> = (item: T) => string | undefined;
/**
 * Join array of objects on key
 */
export const joinOn = <T extends object>(
  arr: T[] | undefined,
  mapKey: keyof T | MapFunction<T>,
  separator = ', ',
): string => {
  if (!arr) return '';
  const mapFunc = typeof mapKey === 'function' ? mapKey : (item: T) => (item[mapKey] ? String(item[mapKey]) : '');
  return arr.map(mapFunc).filter(Boolean).join(separator);
};

export const getAssets = (assets: Asset[], addresses: Record<string, boolean>) => {
  const result: Record<string, Asset> = {};
  for (let i = 0; i < assets.length; i++) {
    if (addresses[assets[i].address]) {
      result[assets[i].address] = assets[i];
    }
  }
  return result;
};
