import {
  OrmlTokensAccountData,
  PalletBalancesAccountData,
  SpacewalkPrimitivesCurrencyId,
} from '@polkadot/types/lookup';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import Table, { SortingOrder } from '../../components/Table';
import { getAddressForFormat } from '../../helpers/addressFormatter';
import { currencyToStellarAssetCode } from '../../helpers/spacewalk';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { nativeToDecimal, prettyNumbers } from '../../shared/parseNumbers';
import { PortfolioAsset, amountColumn, priceColumn, tokenColumn, usdValueColumn } from './PortfolioColumns';

type Props = {};

const mockData = [
  { token: 'USDC', price: 1, amount: 1100 },
  { token: 'BRL', price: 0.45, amount: 500 },
  { token: 'USDT', price: 1, amount: 100 },
  { token: 'XLM', price: 1.15, amount: 30 },
  { token: 'DOT', price: 2.2, amount: 100 },
  { token: 'PEN', price: 0.05, amount: 12000 },
];

interface TokenBalances {
  [tokenId: string]: OrmlTokensAccountData;
}

function Portfolio(props: Props) {
  const { walletAccount, tenantName, tenantRPC } = useGlobalState();
  const {
    state: { api, ss58Format },
  } = useNodeInfoState();
  const { getVaults } = useVaultRegistryPallet();

  const [accountBalance, setAccountBalance] = useState<PalletBalancesAccountData | undefined>(undefined);
  const [data, setData] = useState<PortfolioAsset[] | undefined>();
  const { pricesCache } = usePriceFetcher();

  useEffect(() => {
    if (!walletAccount?.address || !tenantRPC) {
      setAccountBalance(undefined);
      return;
    }
    api?.query.system
      .account(walletAccount.address)
      .then((data) => {
        setAccountBalance(data.data);
      })
      .catch((e) => console.error(e));
  }, [api, walletAccount, tenantRPC]);

  const cachedBalance = useMemo(() => {
    if (!accountBalance) return undefined;
    return prettyNumbers(nativeToDecimal(accountBalance.free.toString()).toNumber());
  }, [accountBalance]);

  const vaults = getVaults();

  const spacewalkCurrencies = useMemo(() => {
    const currencies: SpacewalkPrimitivesCurrencyId[] = [];
    vaults.forEach((vault) => {
      currencies.push(vault.id.currencies.wrapped);
      currencies.push(vault.id.currencies.collateral);
    });

    // Deduplicate assets
    return _.uniqBy(currencies, (currencyId: SpacewalkPrimitivesCurrencyId) => currencyId.toHex());
  }, [vaults]);

  useEffect(() => {
    if (!walletAccount || !spacewalkCurrencies) return;

    async function fetchBridgedTokens(address: string, asset: SpacewalkPrimitivesCurrencyId) {
      if (!api) return;
      return api.query.tokens.accounts(address, asset);
    }

    function getPorfolioAssetsForSpacewalk() {
      if (!walletAccount || !spacewalkCurrencies) return [];

      return spacewalkCurrencies.map(async (currencyId) => {
        const walletAddress = ss58Format
          ? getAddressForFormat(walletAccount.address, ss58Format)
          : walletAccount.address;

        console.log(currencyId);
        const balance = await fetchBridgedTokens(walletAddress, currencyId);
        const token = currencyToStellarAssetCode(currencyId);
        const amount = nativeToDecimal(balance?.free || '0').toNumber();
        const price: number = ((await pricesCache) as any)[token];
        return {
          token,
          price,
          amount,
          usdValue: price * amount,
        };
      });
    }

    Promise.all(getPorfolioAssetsForSpacewalk()).then((data) => setData(data));
  }, [spacewalkCurrencies, walletAccount, api, ss58Format, tenantName]);

  const accountTotalBalance = '$ 345,23';

  const columns = useMemo(() => {
    return [tokenColumn, priceColumn, amountColumn, usdValueColumn];
  }, []);

  return (
    <div className="card portfolio rounded-md bg-base-200 mr-20">
      <div className="p-4 flex flex-row justify-between">
        <div className="font-bold text-xl">Wallet</div>
        <div className="text-xl">{walletAccount && accountTotalBalance}</div>
      </div>
      {walletAccount && (
        <Table
          className="bg-base-100 text-lg"
          data={data}
          columns={columns}
          isLoading={!cachedBalance}
          sortBy={{ token: SortingOrder.ASC }}
          search={false}
          pageSize={5}
          oddRowsClassname="bg-table-row"
        />
      )}
      {!walletAccount && <div className="p-5"> You need to connect a wallet in order to see your Portfolio. </div>}
    </div>
  );
}

export default Portfolio;
