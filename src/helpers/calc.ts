import Big from 'big.js';
import { decimalToNative, nativeToDecimal, roundNumber } from '../shared/parseNumbers/metric';

export type Percent = number;

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

/** Calculate percentage */
export const subtractPercentage = (value = 0, percent = 0, round = 2) =>
  roundNumber(value * (1 - percent / 100), round);

/** Calculate share percentage */
export const calcSharePercentage = (total = 0, share = 0, round = 2) => roundNumber((share / total) * 100, round) || 0;

export const min = (val: number, minNumber = 0) => Math.max(val, minNumber);
export const max = (val: number, maxNumber = 100) => Math.min(val, maxNumber);
export const minMax = (val: number, minNumber = 0, maxNumber = 100) => max(min(val, minNumber), maxNumber);

/** Calculate pool APY (daily fee * 365 / TVL)  */
export const calcAPR = (dailyFees: number, tvl: number, round = 2) =>
  roundNumber(((dailyFees * 365) / tvl) * 100, round);

/** Calculate pool surplus from reserves and liabilities */
export const calcPoolSurplus = (reserves = '0', liabilities = '0', min0 = true) => {
  const surplus = BigInt(reserves) - BigInt(liabilities);
  return !min0 || surplus > 0 ? surplus : BigInt(0);
};

/** Calculate pool surplus from reserves and liabilities */
export const getPoolSurplus = (pool: { reserves?: string; liabilities?: string }, min0 = true) =>
  pool.reserves && pool.liabilities ? calcPoolSurplus(pool.reserves, pool.liabilities, min0) : undefined;

/** Calculate max withdraw value based on deposit and pool surplus */
type CAPWProps = {
  selectedPool: { reserves?: string; liabilities?: string };
  shares: bigint | undefined;
  deposit: bigint | undefined;
  bpPrice: bigint | undefined;
  spPrice: bigint | undefined;
  decimals: number;
};
export const calcAvailablePoolWithdraw = ({ selectedPool, shares, deposit, bpPrice, spPrice, decimals }: CAPWProps) => {
  const surplus = getPoolSurplus(selectedPool);
  if (surplus === undefined || !bpPrice || !spPrice || !shares || !deposit) {
    return undefined;
  }
  const surplusVal = Big(nativeToDecimal(surplus.toString(), decimals).toString());
  if (surplusVal.lte(0)) return Big(0);
  const depositVal = Big(nativeToDecimal(deposit.toString(), decimals));
  const sharesVal = Big(nativeToDecimal(shares.toString(), decimals));
  const spPriceVal = Big(nativeToDecimal(spPrice.toString(), decimals));
  const bpPriceVal = Big(nativeToDecimal(bpPrice.toString(), decimals));
  const spMax = surplusVal.mul(spPriceVal);
  const bpMax = sharesVal.mul(bpPriceVal);
  const maxValue = bpMax.gt(spMax) ? spMax : bpMax;
  const maxLP = maxValue.div(bpPriceVal);
  const final = maxLP.gt(depositVal) ? depositVal : maxLP;
  return decimalToNative(final.toString(), decimals);
};
