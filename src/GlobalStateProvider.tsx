import { WalletAccount, getWalletBySource } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { useCallback, useContext, useEffect, useMemo } from 'preact/compat';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from './config';
import { storageKeys } from './constants/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TenantName } from './models/Tenant';
import { ThemeName } from './models/Theme';
import { storageService } from './services/storage/local';
import { walletConnectService } from './services/walletConnect';
import { chainIds } from './config/walletConnect';

export interface GlobalState {
  dAppName: string;
  tenantName: TenantName;
  tenantRPC?: string;
  walletAccount?: WalletAccount;
  setWalletAccount: (data: WalletAccount) => void;
  removeWalletAccount: () => void;
  getThemeName: () => ThemeName;
}

export const defaultTenant = TenantName.Pendulum;
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const initTalisman = async (dAppName: string, selected?: string) => {
  const name = storageService.get('@talisman-connect/selected-wallet-name');
  if (!name?.length) return;
  const wallet = getWalletBySource(name);
  if (!wallet) return;
  await wallet.enable(dAppName);
  const accounts = await wallet.getAccounts();
  const selectedWallet = accounts.find((a) => a.address === selected) || accounts[0];
  return selectedWallet;
}
const initWalletConnect = async (chainId: string) => {
  const provider = await walletConnectService.getProvider();
  //const pairings = provider.client.pairing.getAll({ active: true });
  if (!provider?.session) return;
  return await walletConnectService.init(provider?.session, chainId);
}

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [walletAccount, setWallet] = useState<WalletAccount | undefined>(undefined);
  const { pathname } = useLocation();
  const network = pathname.split('/').filter(Boolean)[0]?.toLowerCase();

  const tenantName = useMemo(() => {
    return network && Object.values<string>(TenantName).includes(network) ? (network as TenantName) : defaultTenant;
  }, [network]);

  const dAppName = tenantName;

  const getThemeName = useCallback(
    () => (tenantName ? config.tenants[tenantName]?.theme || ThemeName.Amplitude : ThemeName.Amplitude),
    [tenantName],
  );

  const {
    state: account,
    set,
    clear,
  } = useLocalStorage<string | undefined>({
    key: `${storageKeys.ACCOUNT}-${tenantName}`,
  });

  const removeWalletAccount = useCallback(() => {
    clear();
    setWallet(undefined);
  }, [clear]);

  const setWalletAccount = useCallback(
    (wallet: WalletAccount | undefined) => {
      set(wallet?.address);
      setWallet(wallet);
    },
    [set],
  );

  useEffect(() => {
    const run = async () => {
      storageService.removeExpired();
      if (!account) removeWalletAccount();
      const appName = dAppName || TenantName.Amplitude;
      const selectedWallet = await initTalisman(appName, account) || await initWalletConnect(chainIds[tenantName])
      if (selectedWallet) setWallet(selectedWallet);
    };
    run();
  }, [account, removeWalletAccount, dAppName, tenantName]);

  const providerValue = useMemo<GlobalState>(
    () => ({
      walletAccount,
      tenantName: tenantName,
      tenantRPC: config.tenants[tenantName].rpc,
      setWalletAccount,
      removeWalletAccount,
      getThemeName,
      dAppName,
    }),
    [dAppName, getThemeName, removeWalletAccount, setWalletAccount, tenantName, walletAccount],
  );

  return <GlobalStateContext.Provider value={providerValue}>{children}</GlobalStateContext.Provider>;
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw 'GlobalStateProvider not defined!';
  return state;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
