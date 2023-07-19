import type { Asset } from './Asset';

export interface SwapPool {
  address: string;
  asset: Asset;
  liabilities?: number;
  totalSupply?: number;
  balance?: number;
  apr?: number;
}
