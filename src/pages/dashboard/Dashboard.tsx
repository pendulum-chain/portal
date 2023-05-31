import {
  OrmlTokensAccountData,
  PalletBalancesAccountData,
  SpacewalkPrimitivesCurrencyId,
} from '@polkadot/types/lookup';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Banner from '../../assets/banner-spacewalk-4x.png';
import { useGlobalState } from '../../GlobalStateProvider';
import { nativeToDecimal, prettyNumbers } from '../../helpers/parseNumbers';
import { currencyToString } from '../../helpers/spacewalk';
import { useVaultRegistryPallet } from '../../hooks/spacewalk/vaultRegistry';
import { useNodeInfoState } from '../../NodeInfoProvider';
import './styles.css';
import { getAddressForFormat } from '../../helpers/addressFormatter';

interface TokenBalances {
  [tokenId: string]: OrmlTokensAccountData;
}

function Dashboard() {
  const {
    walletAccount,
    state: { tenantName, tenantRPC },
  } = useGlobalState();
  const {
    state: { api, tokenSymbol, ss58Format },
  } = useNodeInfoState();
  const { getVaults } = useVaultRegistryPallet();

  const [accountBalance, setAccountBalance] = useState<PalletBalancesAccountData | undefined>(undefined);
  const [accountTokenBalances, setAccountTokenBalances] = useState<TokenBalances>({});

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
    if (!walletAccount || !availableCurrencies) return;

    async function fetchBridgedTokens(address: string, asset: SpacewalkPrimitivesCurrencyId) {
      if (!api) return;
      return api.query.tokens.accounts(address, asset);
    }

    availableCurrencies.forEach((currencyId) => {
      const walletAddress = ss58Format ? getAddressForFormat(walletAccount.address, ss58Format) : walletAccount.address;
      fetchBridgedTokens(walletAddress, currencyId).then((balance) => {
        const tokenId = currencyToString(currencyId, tenantName);
        const balances = accountTokenBalances;
        if (tokenId && balance) {
          balances[tokenId] = balance;
          setAccountTokenBalances(Object.assign({}, accountTokenBalances, balances));
        }
      });
    });
  }, [availableCurrencies, walletAccount, api, ss58Format, tenantName]);

  return (
    <div className="mt-10">
      <div className="card card-compact w-2/3 banner rounded-md mb-6 bg-base-200">
        <a target="blank" href="https://pendulumchain.org/spacewalk">
          <div className="card-body">
            <div className="card-title block">
              <h2 className={'float-left'}>Promo</h2>
              <h2 className={'float-right'}>Join now</h2>
            </div>
            <figure>
              <img src={Banner} />
            </figure>
          </div>
        </a>
      </div>
      <div className="card w-1/3 portfolio rounded-md bg-base-200">
        <div className="card-body">
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
        </div>
      </div>
      <div className="graph hidden">
        <h1>Total Value Locked</h1>
        <h2>$63.231,98</h2>
        <svg viewBox="0 0 200 200" className="chart">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(65)">
              <stop offset="0%" style="stop-color:rgb(89, 196, 226);stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
            </linearGradient>
          </defs>
          <polyline
            fill="url(#grad)"
            stroke="#59c4e2"
            strokeWidth="1"
            points="0,120
                  20,60
                  40,80
                  60,20
                  80,25
                  100,40
                  120,70
                  140,50
                  160,50
                  180,40
                  200,40
                  220,120"
          />
        </svg>
        <div className="graph-stats">
          <div className="token">
            vsToken
            <br />
            <span>$62M</span>
          </div>
          <div className="token">
            vKSM
            <br />
            <span>$62M</span>
          </div>
          <div className="token">
            vETH
            <br />
            <span>$32M</span>
          </div>
          <div className="token">
            DEX
            <br />
            <span>$7M</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
