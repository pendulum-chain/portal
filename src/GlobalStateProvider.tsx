import { WalletAccount } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { StateUpdater, useCallback, useContext, useMemo, useState } from 'preact/compat';
import { useLocation } from 'react-router-dom';
import { config } from './config';
import { storageKeys } from './constants/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TenantName } from './models/Tenant';
import { ThemeName } from './models/Theme';

export interface TenantStateValues {
  tenantName: TenantName;
  tenantRPC: string;
}
export interface GlobalState {
  state: Partial<TenantStateValues>;
  setState: StateUpdater<Partial<TenantStateValues>>;
  walletAccount: WalletAccount | undefined;
  setWalletAccount: (data: WalletAccount) => void;
  removeWalletAccount: () => void;
  getThemeName: () => ThemeName;
}

export const defaultState: TenantStateValues = {
  tenantName: TenantName.Amplitude,
  tenantRPC: config.tenants.amplitude.rpc,
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const GlobalStateProvider = ({
  children,
  value = defaultState,
}: {
  children: ReactNode;
  value?: Partial<TenantStateValues>;
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

  const {
    state: walletAccount,
    set: setWalletAccount,
    clear: removeWalletAccount,
  } = useLocalStorage<WalletAccount | undefined>({
    key: `${storageKeys.GLOBAL}-${state.tenantName}`,
    parse: true,
  });

  const getThemeName = useCallback(
    () => (state.tenantName ? config.tenants[state.tenantName]?.theme || ThemeName.Amplitude : ThemeName.Amplitude),
    [state?.tenantName],
  );

  const providerValue = useMemo(
    () => ({
      state,
      setState,
      walletAccount,
      setWalletAccount,
      removeWalletAccount,
      getThemeName,
    }),
    [getThemeName, removeWalletAccount, setWalletAccount, state, walletAccount],
  );

  return <GlobalStateContext.Provider value={providerValue}>{children}</GlobalStateContext.Provider>;
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw 'GlobalStateProvider not defined!';
  return state;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
