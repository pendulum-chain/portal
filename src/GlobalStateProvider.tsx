import { WalletAccount } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import {
  StateUpdater,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'preact/compat';
import { storageKeys } from './constants/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';

export enum TenantName {
  Amplitude = 'amplitude',
  Pendulum = 'pendulum',
  Foucoco = 'foucoco',
  Local = 'local',
}

export enum TenantRPC {
  Amplitude = 'wss://rpc-amplitude.pendulumchain.tech',
  Pendulum = 'wss://rpc-pendulum.prd.pendulumchain.tech',
  Foucoco = 'wss://rpc-foucoco.pendulumchain.tech',
  Local = 'ws://localhost:9944',
}

export interface TenantStateValues {
  tenantName: TenantName;
  tenantRPC: TenantRPC;
}
export interface GlobalState {
  state: Partial<TenantStateValues>;
  setState: StateUpdater<Partial<TenantStateValues>>;
  walletAccount: WalletAccount | undefined;
  setWalletAccount: (data: WalletAccount) => void;
  removeWalletAccount: () => void;
  getThemeName: () => ThemeName;
}

const enum ThemeName {
  Amplitude = 'amplitude',
  Pendulum = 'pendulum',
}

export const defaultState: TenantStateValues = {
  tenantName: TenantName.Amplitude,
  tenantRPC: TenantRPC.Amplitude,
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const GlobalStateProvider = ({
  children,
  value = defaultState,
}: {
  children: ReactNode;
  value?: Partial<TenantStateValues>;
}) => {
  const [state, setState] = useState(value);
  const {
    state: walletAccount,
    set: setWalletAccount,
    clear: removeWalletAccount,
  } = useLocalStorage<WalletAccount | undefined>({
    key: `${storageKeys.GLOBAL}-${state.tenantName}`,
    parse: true,
  });

  const getThemeName = useCallback(() => {
    switch (state.tenantName) {
      case TenantName.Pendulum:
        return ThemeName.Pendulum;
      default:
        return ThemeName.Amplitude;
    }
  }, [state?.tenantName]);

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

  return (
    <GlobalStateContext.Provider value={providerValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw 'GlobalStateProvider not defined!';
  return state;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
