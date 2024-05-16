import Big from 'big.js';
import { NablaInstanceSwapPool } from '../hooks/nabla/useNablaInstance';

export type Percent = number;

/** Calculate share percentage */
export function calcSharePercentage(total: Big, share: Big): string {
  return calcSharePercentageNumber(total, share).toFixed(2);
}

export function calcSharePercentageNumber(total: Big, share: Big): number {
  if (total.eq(0)) return 0;
  const percentage = share.div(total).mul(new Big(100)).toNumber();
  return Math.max(Math.min(percentage, 100), 0);
}

/** Calculate share percentage */
export function subtractBigDecimalPercentage(total: Big, percent: number) {
  return total.mul(new Big(1 - percent / 100));
}

/** Calculate pool surplus from reserves and liabilities */
export function getPoolSurplusNativeAmount(pool: NablaInstanceSwapPool) {
  const surplus = BigInt(pool.reserve) - BigInt(pool.totalLiabilities);
  return surplus > 0n ? surplus : 0n;
}
