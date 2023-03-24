import { WalletAccount } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { useContext, useState } from 'preact/compat';
import { useLocation } from 'react-router-dom';
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
  state: {} as GlobalStateInterface,
  setState: {} as Dispatch<SetStateAction<GlobalStateInterface>>,
  getThemeName: (): ThemeName => ThemeName.Pendulum,
});

const GlobalStateProvider = ({ children, value }: { children: ReactNode; value?: GlobalStateInterface }) => {
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
    return DefaultGlobalState;
  });

  const getThemeName = () =>
    state.tenantName ? config.tenants[state.tenantName]?.theme || ThemeName.Amplitude : ThemeName.Amplitude;

  return (
    <GlobalStateContext.Provider value={{ state, setState, getThemeName }}>{children}</GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
