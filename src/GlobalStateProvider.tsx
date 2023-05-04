import { WalletAccount, getWalletBySource } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { StateUpdater, useCallback, useContext, useEffect, useMemo, useState } from 'preact/compat';
import { useLocation } from 'react-router-dom';
import { config } from './config';
import { storageKeys } from './constants/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TenantName } from './models/Tenant';
import { ThemeName } from './models/Theme';
import { storageService } from './services/storage/local';

export interface GlobalStateValues {
  tenantName: TenantName;
  tenantRPC: string;
  wallet?: WalletAccount;
}
export interface GlobalState {
  state: Partial<GlobalStateValues>;
  setState: StateUpdater<Partial<GlobalStateValues>>;
  walletAccount: WalletAccount | undefined;
  setWalletAccount: (data: WalletAccount) => void;
  removeWalletAccount: () => void;
  getThemeName: () => ThemeName;
  dAppName: string;
}

export const defaultState: GlobalStateValues = {
  tenantName: TenantName.Amplitude,
  tenantRPC: config.tenants.amplitude.rpc,
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const GlobalStateProvider = ({
  children,
  value = defaultState,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateValues>;
}) => {
  const { pathname } = useLocation();
  const [state, setState] = useState(() => {
    if (value) return value;
    if (pathname) {
      const [network] = pathname.split('/').filter(Boolean);
      const tenantName = Object.values<string>(TenantName).includes(network)
        ? (network as TenantName)
        : TenantName.Pendulum;
      if (tenantName) {
        return {
          tenantName,
          tenantRPC: config.tenants[tenantName].rpc,
        };
      }
    }
    return defaultState;
  });
  const dAppName = state.tenantName || TenantName.Amplitude;

  const getThemeName = useCallback(
    () => (state.tenantName ? config.tenants[state.tenantName]?.theme || ThemeName.Amplitude : ThemeName.Amplitude),
    [state?.tenantName],
  );

  const {
    state: account,
    set,
    clear,
  } = useLocalStorage<string | undefined>({
    key: `${storageKeys.ACCOUNT}-${state.tenantName}`,
  });

  useEffect(() => {
    const run = async () => {
      if (!account) return;
      const name = storageService.get('@talisman-connect/selected-wallet-name');
      if (!name) return;
      const wallet = getWalletBySource(name);
      if (!wallet) return;
      // TODO: optimize this - make reusable as it's used in multiple places
      await wallet.enable(dAppName || TenantName.Amplitude);
      const selectedWallet = (await wallet.getAccounts()).find((a) => a.address === account);
      if (!selectedWallet) return;
      setState((prev) => ({ ...prev, wallet: selectedWallet }));
    };
    run();
  }, [account, dAppName, state.tenantName]);

  const providerValue = useMemo(
    () => ({
      state,
      setState,
      walletAccount: state.wallet,
      setWalletAccount: (wallet: WalletAccount | undefined) => {
        set(wallet?.address);
        setState((prev) => ({ ...prev, wallet }));
      },
      removeWalletAccount: () => {
        clear();
        setState((prev) => ({ ...prev, wallet: undefined }));
      },
      getThemeName,
      dAppName,
    }),
    [clear, dAppName, getThemeName, set, state],
  );

  return <GlobalStateContext.Provider value={providerValue}>{children}</GlobalStateContext.Provider>;
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw 'GlobalStateProvider not defined!';
  return state;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
