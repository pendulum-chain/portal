import { useMemo } from 'react';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { Balance } from '@polkadot/types/interfaces';
import { SpacewalkPrimitivesCurrencyId } from '@pendulum-chain/types/interfaces';

interface CurrencyId extends SpacewalkPrimitivesCurrencyId {}

export function useOraclePallet() {
  const { api } = useNodeInfoState().state;

  const memo = useMemo(() => {
    return {
      async currencyToUsd(amount: Balance, currency: CurrencyId) {},
      async usdToCurrency(amount: Balance, currency: CurrencyId) {},
      async getExchangeRate(currency_a: CurrencyId, currency_b: CurrencyId) {
        // const currency_a_usd = await api?.rpc.oracle.currency_to_usd(1, currency_a);
        // const currency_b_usd = await api?.rpc.oracle.currency_to_usd(1, currency_b);
        // const rate = currency_a_usd / currency_b_usd;

        // TODO unharcode once RPC calls are available
        return 0.9;
      },
    };
  }, [api]);

  return memo;
}
