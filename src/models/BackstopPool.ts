import type { Asset } from './Asset';

export interface BackstopPool {
  address: string;
  asset: Asset;
  liabilities: number;
  totalSupply: number;
}
