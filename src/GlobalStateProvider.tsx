import { WalletAccount } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { useCallback, useContext, useMemo } from 'preact/compat';
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

export interface GlobalStateValues {
  walletAccount?: WalletAccount;
  tenantName: TenantName;
  tenantRPC: TenantRPC;
}

export interface GlobalState {
  state: GlobalStateValues;
  set: (data: GlobalStateValues) => void;
  merge: (
    data:
      | Partial<GlobalStateValues>
      | ((data: GlobalStateValues) => GlobalStateValues),
  ) => void;
  clear: () => void;
  getThemeName: () => ThemeName;
}

const enum ThemeName {
  Amplitude = 'amplitude',
  Pendulum = 'pendulum',
}

const DefaultGlobalState: GlobalStateValues = {
  tenantName: TenantName.Amplitude,
  tenantRPC: TenantRPC.Amplitude,
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const GlobalStateProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateValues>;
}) => {
  const defaultValue = useMemo(
    () => ({ ...DefaultGlobalState, ...value }),
    [value],
  );
  const {
    state = defaultValue,
    set,
    merge,
    clear,
  } = useLocalStorage<GlobalStateValues>({
    key: storageKeys.GLOBAL,
    parse: true,
    defaultValue,
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
    () => ({ state, set, merge, clear, getThemeName }),
    [clear, getThemeName, merge, set, state],
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
