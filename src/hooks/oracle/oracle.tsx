import { useMemo } from 'react';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { Balance } from '@polkadot/types/interfaces';
import { BalanceWrapper, SpacewalkPrimitivesCurrencyId } from '@pendulum-chain/types/interfaces';
import { AbstractInt, U128, UInt, u128 } from '@polkadot/types-codec';
import { decimalToNative } from '../../helpers/parseNumbers';
import { BN } from '@polkadot/util';

interface CurrencyId extends SpacewalkPrimitivesCurrencyId {}

export function useOraclePallet() {
  const { api } = useNodeInfoState().state;

  const memo = useMemo(() => {
    return {
      async currencyToUsd(amount: Balance, currency: CurrencyId) {
        if (!api) return;
        return await api.rpc.oracle.currencyToUsd(amount.toString(), currency);
      },
      async usdToCurrency(amount: Balance, currency: CurrencyId) {
        if (!api) return;
        return await api.rpc.oracle.usdToCurrency(amount.toString(), currency);
      },
      async getExchangeRate(currency_a: CurrencyId, currency_b: CurrencyId): Promise<number> {
        if (!api) return 0;
        const balance: Balance = new UInt(api.registry, '100000');
        try {
          const currency_a_usd = await api.rpc.oracle.currencyToUsd({ amount: balance } as BalanceWrapper, currency_a);
          const currency_b_usd = await api.rpc.oracle.currencyToUsd({ amount: balance } as BalanceWrapper, currency_b);
          const rate = currency_a_usd.amount.div(currency_b_usd.amount);
          return rate.toNumber();
        } catch (e) {
          console.log(e);
          return 0;
        }
      },
    };
  }, [api]);

  return memo;
}
