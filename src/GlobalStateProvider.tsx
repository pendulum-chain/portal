import { WalletAccount } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { config } from './config';
import { TenantName } from './models/Tenant';
import { ThemeName } from './models/Theme';

export interface GlobalStateInterface {
  walletAccount?: WalletAccount;
  tenantName: TenantName;
  tenantRPC: string;
}

const DefaultGlobalState: GlobalStateInterface = {
  tenantName: TenantName.Amplitude,
  tenantRPC: config.tenants[TenantName.Amplitude].rpc,
};

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
  getThemeName: (): ThemeName => ThemeName.Pendulum,
});

const GlobalStateProvider = ({
  children,
  value = DefaultGlobalState,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);
  const getThemeName = () =>
    state.tenantName
      ? config.tenants[state.tenantName]?.theme || ThemeName.Amplitude
      : ThemeName.Amplitude;

  return (
    <GlobalStateContext.Provider value={{ state, setState, getThemeName }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
