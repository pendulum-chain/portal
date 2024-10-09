import { ComponentChildren, createContext } from 'react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WalletAccount } from '@talismn/connect-wallets';
import { config } from '../config';
import { storageKeys } from '../constants/localStorage';
import { LocalStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import { TenantName } from '../models/Tenant';
import { ThemeName } from '../models/Theme';
import { storageService } from '../services/storage/local';
import { handleWalletConnectDisconnect, initSelectedWallet } from './helpers';

const SECONDS_IN_A_DAY = 86400;
const EXPIRATION_PERIOD = 2 * SECONDS_IN_A_DAY; // 2 days

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

const GlobalStateProvider = ({ children }: { children: ComponentChildren }) => {
  const tenantRef = useRef<string>();
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

  // Get currently selected wallet account from local storage
  const {
    state: storageAddress,
    set,
    clear,
  } = useLocalStorage<string | undefined>({
    key: `${storageKeys.ACCOUNT}-${tenantName}`,
    expire: EXPIRATION_PERIOD,
  });

  const clearLocalStorageWallets = () => {
    storageService.remove(LocalStorageKeys.SELECTED_WALLET_NAME);
  };

  const removeWalletAccount = useCallback(async () => {
    await handleWalletConnectDisconnect(walletAccount);
    clear();
    clearLocalStorageWallets();
    setWallet(undefined);
  }, [clear, walletAccount]);

  const setWalletAccount = useCallback(
    (newWalletAccount: WalletAccount | undefined) => {
      set(newWalletAccount?.address);
      setWallet(newWalletAccount);
    },
    [set],
  );

  const accountAddress = walletAccount?.address;
  useEffect(() => {
    const run = async () => {
      if (!storageAddress) {
        removeWalletAccount();
        return;
      }
      // skip if tenant already initialized
      if (tenantRef.current === tenantName || accountAddress) return;
      tenantRef.current = tenantName;
      const selectedWallet = await initSelectedWallet(dAppName, tenantName, storageAddress);
      if (selectedWallet) setWallet(selectedWallet);
    };
    run();
  }, [storageAddress, removeWalletAccount, dAppName, tenantName, accountAddress]);

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
