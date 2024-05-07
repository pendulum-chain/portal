import _ from 'lodash';
import { useCallback, useEffect, useState } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { getAddressForFormat } from '../helpers/addressFormatter';
import { useNodeInfoState } from '../NodeInfoProvider';
import { PortfolioAsset } from '../pages/dashboard/PortfolioColumns';
import { nativeToDecimal } from '../shared/parseNumbers/metric';
import { usePriceFetcher } from './usePriceFetcher';
import { useAssetRegistryMetadata } from './useAssetRegistryMetadata';
import { SpacewalkPrimitivesCurrencyId } from '@polkadot/types/lookup';
import { OrmlTraitsAssetRegistryAssetMetadata } from './useBuyout/types';

function useBalances() {
  const { walletAccount } = useGlobalState();
  const {
    state: { api, ss58Format },
  } = useNodeInfoState();

  const [accountTotalBalance, setAccountTotalBalance] = useState<number>(0);
  const [balances, setBalances] = useState<PortfolioAsset[] | undefined>();

  const { getTokenPriceForKeys } = usePriceFetcher();
  const { getAllAssetsMetadata } = useAssetRegistryMetadata();

  const fetchTokenBalance = useCallback(
    async (address: string, currencyId: SpacewalkPrimitivesCurrencyId) => {
      if (!api) return;
      const isNativeToken = typeof currencyId === 'string' && currencyId === 'Native';
      if (isNativeToken) {
        return api.query.system.account(address);
      }
      return api.query.tokens.accounts(address, currencyId);
    },
    [api],
  );

  useEffect(() => {
    const getTokensBalances = async () => {
      if (!walletAccount) return [];

      const assets = getAllAssetsMetadata();
      const walletAddress = ss58Format ? getAddressForFormat(walletAccount.address, ss58Format) : walletAccount.address;

      const getFree = (tokenBalanceRaw: unknown, asset: OrmlTraitsAssetRegistryAssetMetadata) => {
        const isNativeToken = typeof asset.currencyId === 'string' && asset.currencyId === 'Native';
        if (isNativeToken) {
          return (tokenBalanceRaw as { data: { free: Big } }).data.free;
        }
        return (tokenBalanceRaw as { free: Big }).free;
      };

      const tokensBalances = await Promise.all(
        assets.map(async (asset: OrmlTraitsAssetRegistryAssetMetadata) => {
          const tokenBalanceRaw = await fetchTokenBalance(walletAddress, asset.currencyId);
          const token = asset.metadata.symbol;
          const price = await getTokenPriceForKeys(asset.metadata.additional.diaKeys);
          const free = getFree(tokenBalanceRaw, asset);

          const amount = nativeToDecimal(free || '0', asset.metadata.decimals).toNumber();
          const usdValue = price * amount;

          return {
            token,
            price,
            amount,
            usdValue,
          };
        }),
      );

      return setBalances(tokensBalances);
    };

    getTokensBalances().catch(console.error);
  }, [walletAccount, getAllAssetsMetadata, ss58Format, fetchTokenBalance, getTokenPriceForKeys]);

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
