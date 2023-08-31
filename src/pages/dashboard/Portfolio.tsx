import { PalletBalancesAccountData, SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useGlobalState } from '../../GlobalStateProvider';
import { useNodeInfoState } from '../../NodeInfoProvider';
import Table, { SortingOrder } from '../../components/Table';
import { getAddressForFormat } from '../../helpers/addressFormatter';
import { addSuffix, currencyToString } from '../../helpers/spacewalk';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { usePriceFetcher } from '../../hooks/usePriceFetcher';
import { nativeToDecimal } from '../../shared/parseNumbers';
import { PortfolioAsset, amountColumn, priceColumn, tokenColumn, usdValueColumn } from './PortfolioColumns';

function Portfolio() {
  const { walletAccount, tenantName, tenantRPC } = useGlobalState();
  const {
    state: { api, ss58Format, tokenSymbol },
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

    function getPorfolioAssetsFromSpacewalk(): Promise<PortfolioAsset | undefined>[] {
      if (!walletAccount || !spacewalkCurrencies) return [];

      return spacewalkCurrencies.map(async (currencyId) => {
        let token = currencyToString(currencyId)?.split(':')[0];

        if (!token) return undefined;

        token = currencyId.isStellar ? addSuffix(token) : token;

        const walletAddress = ss58Format
          ? getAddressForFormat(walletAccount.address, ss58Format)
          : walletAccount.address;

        const balance = await fetchBridgedTokens(walletAddress, currencyId);
        const amount = nativeToDecimal(balance?.free || '0').toNumber();
        const price: number = (await pricesCache)[token];

        return {
          token,
          price,
          amount,
          usdValue: price * amount,
        };
      });
    }

    async function getPorfolioAssetsNative() {
      if (!tokenSymbol || !accountBalance) return Promise.resolve(undefined);

      const price: number = (await pricesCache)[tokenSymbol];

      return Promise.resolve({
        token: tokenSymbol,
        price,
        amount: nativeToDecimal(accountBalance.free).toNumber(),
        usdValue: price * nativeToDecimal(accountBalance.free).toNumber(),
      });
    }

    const allPortfolioAssets: Promise<PortfolioAsset | undefined>[] = getPorfolioAssetsFromSpacewalk().concat([
      getPorfolioAssetsNative(),
    ]);

    Promise.all(allPortfolioAssets).then((data) => {
      setData(data.filter((e) => e !== undefined) as PortfolioAsset[]);
    });
  }, [spacewalkCurrencies, walletAccount, api, ss58Format, tenantName, accountBalance, tokenSymbol, pricesCache]);

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
          isLoading={!data}
          sortBy={{ amount: SortingOrder.DESC, token: SortingOrder.ASC }}
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
