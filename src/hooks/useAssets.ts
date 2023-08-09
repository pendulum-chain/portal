import { useQuery } from '@tanstack/react-query';
import { appsConfigs } from '../config/apps';
import { cacheKeys, inactiveOptions } from '../constants/cache';
import { Asset } from '../models/Asset';

// ! TODO: fetch correct tokens
export const useAssets = () => {
  return useQuery<Asset[]>([cacheKeys.assets], () => appsConfigs.nabla.foucoco.assets, inactiveOptions['15m']);
};
