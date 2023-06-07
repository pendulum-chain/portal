import { useMemo } from 'react';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { Balance } from '@polkadot/types/interfaces';
import { SpacewalkPrimitivesCurrencyId } from '@pendulum-chain/types/interfaces';

interface CurrencyId extends SpacewalkPrimitivesCurrencyId {}

export function useOraclePallet() {
  const { api } = useNodeInfoState().state;

  const memo = useMemo(() => {
    return {
      async currencyToUsd(amount: Balance, currency: CurrencyId) {
        if (!api) return;
        return await api.rpc.oracle.currencyToUsd(toString(), currency);
      },
      async usdToCurrency(amount: Balance, currency: CurrencyId) {
        if (!api) return;
        return await api.rpc.oracle.usdToCurrency(amount.toString(), currency);
      },
      async getExchangeRate(currency_a: CurrencyId, currency_b: CurrencyId): Promise<number> {
        if (!api) return 0;
        const currency_a_usd = await api.rpc.oracle.currencyToUsd('1', currency_a);
        const currency_b_usd = await api.rpc.oracle.currencyToUsd('1', currency_b);
        const rate = currency_a_usd.amount.div(currency_b_usd.amount);
        return rate.toNumber();
      },
    };
  }, [api]);

  return memo;
}
