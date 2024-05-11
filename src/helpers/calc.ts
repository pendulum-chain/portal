import Big from 'big.js';
import { rawToDecimal, roundNumber } from '../shared/parseNumbers/metric';
import { NablaInstanceSwapPool } from '../hooks/nabla/useNablaInstance';

export type Percent = number;

// TODO Torsten
// check src/helpers/calc.ts
// - what is needed
// - what is correct

const PRECISION = 10000;
/** Calculate fiat value price impact */
export function calcFiatValuePriceImpact(
  fiatInput: number | undefined | null,
  fiatOutput: number | undefined | null,
): number | undefined {
  if (!fiatOutput || !fiatInput) return undefined;
  const ratio = 1 - fiatOutput / fiatInput;
  return Math.floor(ratio * PRECISION);
}

// TODO Torsten: abolish
/** Calculate percentage */
export const subtractPercentage = (value = 0, percent = 0, round = 2) =>
  roundNumber(value * (1 - percent / 100), round);

/** Calculate share percentage */
export function calcSharePercentage(total: Big, share: Big) {
  const percentage = share.div(total).mul(new Big(100)).toNumber();
  const clampedPercentage = Math.max(Math.min(percentage, 100), 0);
  return clampedPercentage.toFixed(2);
}

/** Calculate share percentage */
export function subtractBigDecimalPercentage(total: Big, percent: number) {
  return total.mul(new Big(1 - percent / 100));
}

/** Calculate pool APR (daily fee * 365 / TVL)  */
export const calcAPR = (dailyFees: number, tvl: number, round = 2) =>
  roundNumber(((dailyFees * 365) / tvl) * 100, round);

/** Calculate pool surplus from reserves and liabilities */
export function getPoolSurplusNativeAmount(pool: NablaInstanceSwapPool) {
  const surplus = BigInt(pool.reserve) - BigInt(pool.totalLiabilities);
  return surplus > 0n ? surplus : 0n;
}
