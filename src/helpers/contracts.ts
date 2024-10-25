import { INumber } from '@polkadot/types-codec/types';
import Big from 'big.js';
import { multiplyByPowerOfTen, stringifyBigWithSignificantDecimals } from '../shared/parseNumbers/metric';

export interface ContractBalance {
  rawBalance: bigint;
  decimals: number;
  preciseBigDecimal: Big;
  preciseString: string;
  approximateStrings: {
    atLeast2Decimals: string;
    atLeast4Decimals: string;
  };
  approximateNumber: number;
}

export function parseContractBalanceResponse(decimals: number, balanceResponse: INumber): ContractBalance;
export function parseContractBalanceResponse(decimals?: number, balanceResponse?: INumber): ContractBalance;

export function parseContractBalanceResponse(
  decimals?: number,
  balanceResponse?: INumber,
): ContractBalance | undefined {
  const rawBalanceBigInt = balanceResponse?.toBigInt();
  if (rawBalanceBigInt === undefined || decimals === undefined) return undefined;

  const rawBalanceString = rawBalanceBigInt.toString();
  const preciseBigDecimal = multiplyByPowerOfTen(new Big(rawBalanceString), -decimals);

  const atLeast2Decimals = stringifyBigWithSignificantDecimals(preciseBigDecimal, 2);
  const atLeast4Decimals = stringifyBigWithSignificantDecimals(preciseBigDecimal, 4);

  return {
    rawBalance: rawBalanceBigInt,
    decimals,
    preciseBigDecimal,
    preciseString: preciseBigDecimal.toFixed(),
    approximateStrings: {
      atLeast2Decimals,
      atLeast4Decimals,
    },
    approximateNumber: preciseBigDecimal.toNumber(),
  };
}
