import Big from 'big.js';
import { defaultDecimals } from '../../config/apps/nabla';
import { decimalToNative } from '../../shared/parseNumbers';
import * as helpers from '../calc';

const native1000 = decimalToNative(1000, defaultDecimals).toString();

describe('calc', () => {
  it('should return correct withdraw amount from calcAvailablePoolWithdraw', () => {
    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: undefined,
          reserves: native1000,
        },
        shares: BigInt(native1000),
        deposit: BigInt(native1000),
        bpPrice: BigInt(decimalToNative(1, defaultDecimals).toString()),
        spPrice: BigInt(decimalToNative(2, defaultDecimals).toString()),
        decimals: defaultDecimals,
      }),
    ).toBe(undefined);

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: native1000,
          reserves: native1000,
        },
        shares: BigInt(native1000),
        deposit: BigInt(native1000),
        bpPrice: BigInt(decimalToNative(1, defaultDecimals).toString()),
        spPrice: BigInt(decimalToNative(2, defaultDecimals).toString()),
        decimals: defaultDecimals,
      }),
    ).toEqual(Big(0));

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: native1000,
          reserves: decimalToNative(1200, defaultDecimals).toString(),
        },
        shares: BigInt(native1000),
        deposit: BigInt(native1000),
        bpPrice: BigInt(decimalToNative(1.1, defaultDecimals).toString()),
        spPrice: BigInt(decimalToNative(2.2, defaultDecimals).toString()),
        decimals: defaultDecimals,
      }),
    ).toEqual(decimalToNative(400, defaultDecimals));

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: native1000,
          reserves: decimalToNative(5200, defaultDecimals).toString(),
        },
        shares: BigInt(native1000),
        deposit: BigInt(native1000),
        bpPrice: BigInt(decimalToNative(1.1, defaultDecimals).toString()),
        spPrice: BigInt(decimalToNative(2.2, defaultDecimals).toString()),
        decimals: defaultDecimals,
      }),
    ).toEqual(decimalToNative(1000, defaultDecimals));
  });
});
