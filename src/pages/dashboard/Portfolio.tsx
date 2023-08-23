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
import { currencyToString } from '../../helpers/spacewalk';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { nativeToDecimal, prettyNumbers } from '../../shared/parseNumbers';
import { TAsset, amountColumn, priceColumn, tokenColumn, usdValueColumn } from './PortfolioColumns';

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
    state: { api, tokenSymbol, ss58Format },
  } = useNodeInfoState();
  const { getVaults } = useVaultRegistryPallet();

  const [accountBalance, setAccountBalance] = useState<PalletBalancesAccountData | undefined>(undefined);
  const [accountTokenBalances, setAccountTokenBalances] = useState<TokenBalances>({});
  const [data, setData] = useState<TAsset[] | undefined>();

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

  const availableCurrencies = useMemo(() => {
    const currencies: SpacewalkPrimitivesCurrencyId[] = [];
    vaults.forEach((vault) => {
      currencies.push(vault.id.currencies.wrapped);
      currencies.push(vault.id.currencies.collateral);
    });

    // Deduplicate assets
    return _.uniqBy(currencies, (currencyId: SpacewalkPrimitivesCurrencyId) => currencyId.toHex());
  }, [vaults]);

  useEffect(() => {
    setData(mockData);

    if (!walletAccount || !availableCurrencies) return;

    async function fetchBridgedTokens(address: string, asset: SpacewalkPrimitivesCurrencyId) {
      if (!api) return;
      return api.query.tokens.accounts(address, asset);
    }

    availableCurrencies.forEach((currencyId) => {
      const walletAddress = ss58Format ? getAddressForFormat(walletAccount.address, ss58Format) : walletAccount.address;
      fetchBridgedTokens(walletAddress, currencyId).then((balance) => {
        const tokenId = currencyToString(currencyId, tenantName);
        setAccountTokenBalances((balances) => {
          let newBalances = balances;
          if (tokenId && balance) {
            newBalances[tokenId] = balance;
            newBalances = Object.assign({}, balances);
          }

          return newBalances;
        });
      });
    });
  }, [availableCurrencies, walletAccount, api, ss58Format, tenantName]);

  const columns = useMemo(() => {
    return [tokenColumn, priceColumn, amountColumn, usdValueColumn];
  }, []);

  return (
    <div className="card portfolio rounded-md bg-base-200 mr-20">
      <div className="p-4 flex flex-row justify-between">
        <div className="font-bold text-xl">Wallet</div>
        <div className="text-xl">345,23 USD</div>
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

/* <div className="card-body">
        <h2 className="card-title float-left">Portfolio</h2>
        <div className="balance">
          {cachedBalance && (
            <div className="self-center">
              <h2 className="flex">
                {cachedBalance} {tokenSymbol}
              </h2>
            </div>
          )}
          <ul>
            <li />
            {Object.entries(accountTokenBalances).map(([tokenId, balance]) => {
              if (!balance.free.isZero()) {
                // If it's a Stellar asset we are interested in the code which is the first part of the stringified token id
                const assetCode = tokenId.split(':')[0];
                return (
                  <li key={tokenId} title={tokenId}>
                    <h2 className="flex">
                      {nativeToDecimal(balance.free.toString()).toFixed()} {assetCode}
                    </h2>
                  </li>
                );
              }
            })}
          </ul>
          {!cachedBalance && (
            <>
              <p>You have to connect a wallet to see your available balance. </p>
            </>
          )}
        </div>
      </div> */
export default Portfolio;
