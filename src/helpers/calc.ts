import Big from 'big.js';
import { rawToDecimal, roundNumber } from '../shared/parseNumbers';
import { NablaInstanceSwapPool } from '../hooks/nabla/useNablaInstance';

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
export function getPoolSurplusNativeAmount(pool: NablaInstanceSwapPool) {
  const surplus = BigInt(pool.reserve) - BigInt(pool.totalLiabilities);
  return surplus > 0n ? surplus : 0n;
}

/** Calculate max withdraw value based on deposit and pool surplus */
type CAPWProps = {
  selectedSwapPool: NablaInstanceSwapPool;
  backstopLpDecimalAmount: number;
  sharesWorthNativeAmount: bigint;
  bpPrice: bigint | undefined;
  spPrice: bigint | undefined;
  backstopPoolTokenDecimals: number;
  swapPoolTokenDecimals: number;
};

// TODO (Torsten) I don't understand whether this calculation really makes sense
export const calcAvailablePoolWithdraw = ({
  selectedSwapPool,
  backstopLpDecimalAmount,
  sharesWorthNativeAmount,
  bpPrice,
  spPrice,
  backstopPoolTokenDecimals,
  swapPoolTokenDecimals,
}: CAPWProps) => {
  const surplusNativeAmount = getPoolSurplusNativeAmount(selectedSwapPool);
  if (!bpPrice || !spPrice || !sharesWorthNativeAmount || !backstopLpDecimalAmount) {
    return undefined;
  }
  const surplusDecimalAmount = Big(rawToDecimal(surplusNativeAmount.toString(), swapPoolTokenDecimals).toString());
  if (surplusDecimalAmount.lte(0)) return Big(0);

  const sharesValueDecimalAmount = Big(rawToDecimal(sharesWorthNativeAmount.toString(), backstopPoolTokenDecimals));
  const spPriceVal = new Big(spPrice.toString());
  const bpPriceVal = new Big(bpPrice.toString());

  const spMax = surplusDecimalAmount.mul(spPriceVal);
  const bpMax = sharesValueDecimalAmount.mul(bpPriceVal);

  const maxValue = bpMax.gt(spMax) ? spMax : bpMax;
  const maxBackstopPoolTokensDecimalAmount = maxValue.div(bpPriceVal);

  const depositedBackstopLpTokenDecimalAmount = Big(backstopLpDecimalAmount);
  const redeemableBackstopLpTokensDecimalAmount = maxBackstopPoolTokensDecimalAmount.gt(
    depositedBackstopLpTokenDecimalAmount,
  )
    ? depositedBackstopLpTokenDecimalAmount
    : maxBackstopPoolTokensDecimalAmount;

  return redeemableBackstopLpTokensDecimalAmount;
};
