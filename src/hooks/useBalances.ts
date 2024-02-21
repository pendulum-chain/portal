import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { getAddressForFormat } from '../helpers/addressFormatter';
import { addSuffix, currencyToString } from '../helpers/spacewalk';
import { useNodeInfoState } from '../NodeInfoProvider';
import { PortfolioAsset } from '../pages/dashboard/PortfolioColumns';
import { nativeToDecimal } from '../shared/parseNumbers';
import { useVaultRegistryPallet } from './spacewalk/useVaultRegistryPallet';
import { usePriceFetcher } from './usePriceFetcher';

function useBalances() {
  const { walletAccount, tenantName, tenantRPC } = useGlobalState();
  const {
    state: { api, ss58Format, tokenSymbol },
  } = useNodeInfoState();
  const { getVaults } = useVaultRegistryPallet();

  const [accountTotalBalance, setAccountTotalBalance] = useState<number>(0);

  const [balances, setBalances] = useState<PortfolioAsset[] | undefined>();
  const { pricesCache } = usePriceFetcher();

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

    function getPortfolioAssetsFromSpacewalk(): Promise<PortfolioAsset | undefined>[] {
      if (!walletAccount || !spacewalkCurrencies) return [];

      return spacewalkCurrencies.map(async (currencyId) => {
        let token = currencyToString(currencyId, tenantName)?.split(':')[0];
        if (!token) return;

        token = currencyId.isStellar ? addSuffix(token) : token;

        const walletAddress = ss58Format
          ? getAddressForFormat(walletAccount.address, ss58Format)
          : walletAccount.address;

        const balance = await fetchBridgedTokens(walletAddress, currencyId);
        const amount = nativeToDecimal(balance?.free || '0').toNumber();
        const price: number = (await pricesCache)[token];
        const usdValue = price * amount;

        return {
          token,
          price,
          amount,
          usdValue,
        };
      });
    }

    async function getPortfolioAssetsNative() {
      if (!walletAccount?.address || !tenantRPC) {
        return;
      }
      const balance = (await api?.query.system.account(walletAccount.address))?.data;

      if (!tokenSymbol || !balance) return;

      const price: number = (await pricesCache)[tokenSymbol];
      const usdValue = price * nativeToDecimal(balance.free).toNumber();

      return {
        token: tokenSymbol,
        price,
        amount: nativeToDecimal(balance.free).toNumber(),
        usdValue,
      };
    }

    const allPortfolioAssets: Promise<PortfolioAsset | undefined>[] = getPortfolioAssetsFromSpacewalk().concat([
      getPortfolioAssetsNative(),
    ]);

    Promise.all(allPortfolioAssets).then((data) => {
      setBalances(data.filter((e) => e !== undefined) as PortfolioAsset[]);
    });
  }, [spacewalkCurrencies, walletAccount, api, ss58Format, tenantName, tenantRPC, tokenSymbol, pricesCache]);

  useEffect(() => {
    if (!balances) return;
    setAccountTotalBalance(balances.map(({ usdValue }) => usdValue || 0).reduce((acc, val) => acc + val, 0));
  }, [balances]);

  return {
    accountTotalBalance,
    balances,
  };
}

export default useBalances;
