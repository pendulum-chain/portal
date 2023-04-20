import type { Asset } from './Asset';

export interface SwapPool {
  asset: Asset;
  liabilities: number;
  balance: number;
  apr: number;
}
