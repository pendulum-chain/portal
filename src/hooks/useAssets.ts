import { useQuery } from '@tanstack/react-query';
import { cacheKeys, inactiveOptions } from '../constants/cache';
import { Asset } from '../models/Asset';

// ! TODO
export const useAssets = () => {
  return useQuery<Asset[]>([cacheKeys.assets], () => [], inactiveOptions['15m']);
};
