import { decimalToNative, FixedU128Decimals } from '../../shared/parseNumbers';
import * as helpers from '../calc';

describe('calc', () => {
  it('should return correct withdraw amount from calcAvailablePoolWithdraw', () => {
    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: '1000000000000000000000', // 1000
          reserves: '1000000000000000000000', // 1000
        },
        shares: BigInt('1000000000000000000000'), // 1000
        deposit: BigInt('1000000000000000000000'), // 1000
        bpPrice: BigInt('100000000'), // 1
        spPrice: BigInt('200000000'), // 2
        decimals: FixedU128Decimals,
      }),
    ).toBe(undefined);

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: '1000000000000000000000',
          reserves: '1200000000000000000000', // 1200
        },
        shares: BigInt('1000000000000000000000'), // 1000
        deposit: BigInt('1000000000000000000000'), // 1000
        bpPrice: BigInt('110000000'), // 1.1
        spPrice: BigInt('220000000'), // 2.2
        decimals: FixedU128Decimals,
      }),
    ).toBe(decimalToNative('400'));

    expect(
      helpers.calcAvailablePoolWithdraw({
        selectedPool: {
          liabilities: '1000000000000000000000',
          reserves: '5200000000000000000000', // 5200
        },
        shares: BigInt('1000000000000000000000'), // 1000
        deposit: BigInt('1000000000000000000000'), // 1000
        bpPrice: BigInt('110000000'), // 1.1
        spPrice: BigInt('220000000'), // 2.2
        decimals: FixedU128Decimals,
      }),
    ).toBe(decimalToNative('1000'));
  });
});
