import { WalletAccount } from '@talismn/connect-wallets';
import { createContext } from 'preact';
import { useContext, useEffect, useMemo, useState } from 'preact/compat';
import { useParams } from 'react-router-dom';
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

const GlobalStateProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: GlobalStateInterface;
}) => {
  const params = useParams();
  // ? TODO: should redirect in case of wrong network
  const network = useMemo(() => {
    return params.network &&
      Object.values<string>(TenantName).includes(params.network)
      ? (params.network as TenantName)
      : TenantName.Pendulum;
  }, [params.network]);

  const [state, setState] = useState(() => {
    if (value) return value;
    if (network) {
      return {
        tenantName: network,
        tenantRPC: config.tenants[network].rpc,
      };
    }
    return DefaultGlobalState;
  });

  useEffect(() => {
    if (network !== state.tenantName)
      setState((prev) => ({
        ...prev,
        tenantName: network,
        tenantRPC: config.tenants[network].rpc,
      }));
  }, [network, state.tenantName]);

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
