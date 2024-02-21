import Big from 'big.js';
import { decimalToNative } from '../../shared/parseNumbers';
import * as helpers from '../calc';
import { NablaInstanceSwapPool } from '../../hooks/nabla/useNablaInstance';

const DEFAULT_DECIMALS = 12;
const native1000 = decimalToNative(1000).toString();

describe('calc', () => {
  it('should return correct withdraw amount from calcAvailablePoolWithdraw', () => {
    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedSwapPool: {
          totalLiabilities: undefined,
          reserve: native1000,
        } as unknown as NablaInstanceSwapPool,
        sharesWorthNativeAmount: BigInt(native1000),
        backstopLpDecimalAmount: 1000,
        bpPrice: BigInt(decimalToNative(1).toString()),
        spPrice: BigInt(decimalToNative(2).toString()),
        backstopPoolTokenDecimals: DEFAULT_DECIMALS,
        swapPoolTokenDecimals: DEFAULT_DECIMALS,
      }),
    ).toBe(undefined);

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedSwapPool: {
          totalLiabilities: native1000,
          reserve: native1000,
        } as unknown as NablaInstanceSwapPool,
        sharesWorthNativeAmount: BigInt(native1000),
        backstopLpDecimalAmount: 1000,
        bpPrice: BigInt(decimalToNative(1).toString()),
        spPrice: BigInt(decimalToNative(2).toString()),
        backstopPoolTokenDecimals: DEFAULT_DECIMALS,
        swapPoolTokenDecimals: DEFAULT_DECIMALS,
      }),
    ).toEqual(Big(0));

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedSwapPool: {
          totalLiabilities: native1000,
          reserve: decimalToNative(1200).toString(),
        } as unknown as NablaInstanceSwapPool,
        sharesWorthNativeAmount: BigInt(native1000),
        backstopLpDecimalAmount: 1000,
        bpPrice: BigInt(decimalToNative(1.1).toString()),
        spPrice: BigInt(decimalToNative(2.2).toString()),
        backstopPoolTokenDecimals: DEFAULT_DECIMALS,
        swapPoolTokenDecimals: DEFAULT_DECIMALS,
      }),
    ).toEqual(decimalToNative(400));

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedSwapPool: {
          totalLiabilities: native1000,
          reserve: decimalToNative(5200).toString(),
        } as unknown as NablaInstanceSwapPool,
        sharesWorthNativeAmount: BigInt(native1000),
        backstopLpDecimalAmount: 1000,
        bpPrice: BigInt(decimalToNative(1.1).toString()),
        spPrice: BigInt(decimalToNative(2.2).toString()),
        backstopPoolTokenDecimals: DEFAULT_DECIMALS,
        swapPoolTokenDecimals: DEFAULT_DECIMALS,
      }),
    ).toEqual(decimalToNative(1000));
  });
});
