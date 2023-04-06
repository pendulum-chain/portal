import { WalletAccount, getWalletBySource } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { StateUpdater, useCallback, useContext, useEffect, useMemo, useState } from 'preact/compat';
import { storageKeys } from './constants/localStorage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { storageService } from './services/storage/local';

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
  tenantName?: TenantName;
  tenantRPC?: TenantRPC;
  dAppName?: string;
  wallet?: WalletAccount;
}

export interface GlobalState {
  state: Partial<GlobalStateValues>;
  setState: StateUpdater<Partial<GlobalStateValues>>;
  walletAccount: WalletAccount | undefined;
  setWalletAccount: (data: WalletAccount) => void;
  removeWalletAccount: () => void;
  getThemeName: () => ThemeName;
}

const enum ThemeName {
  Amplitude = 'amplitude',
  Pendulum = 'pendulum',
}

export const defaultState: GlobalStateValues = {};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

const GlobalStateProvider = ({
  children,
  value = defaultState,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateValues>;
}) => {
  const [state, setState] = useState(value);

  const getThemeName = useCallback(() => {
    switch (state.tenantName) {
      case TenantName.Pendulum:
        return ThemeName.Pendulum;
      default:
        return ThemeName.Amplitude;
    }
  }, [state?.tenantName]);

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
      // TODO: optimize this
      await wallet.enable(state.tenantName === 'pendulum' ? 'Pendulum' : 'Amplitude');
      const selectedWallet = (await wallet.getAccounts()).find((a) => a.address === account);
      if (!selectedWallet) return;
      setState((prev) => ({ ...prev, wallet: selectedWallet }));
    };
    run();
  }, [account, state.tenantName]);

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
    }),
    [clear, getThemeName, set, state],
  );

  return <GlobalStateContext.Provider value={providerValue}>{children}</GlobalStateContext.Provider>;
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw 'GlobalStateProvider not defined!';
  return state;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
