import { createContext, h } from "preact";
import { useContext, useState } from "preact/hooks";
import { WalletAccount } from "@talismn/connect-wallets";

export enum TenantName {
  Amplitude = "amplitude",
  Pendulum = "pendulum",
  Foucoco = "foucoco",
  Local = "local",
}

export enum TenantRPC {
  Amplitude = "wss://rpc-amplitude.pendulumchain.tech",
  Pendulum = "wss://rpc-pendulum.pendulumchain.tech",
  Foucoco = "wss://rpc-foucoco.pendulumchain.tech",
  Local = "ws://localhost:9944",
}

export interface GlobalStateInterface {
  walletAccount?: WalletAccount;
  tenantName: TenantName;
  tenantRPC: TenantRPC;
}

const enum ThemeName {
  Amplitude = "amplitude",
  Pendulum = "pendulum",
}

const DefaultGlobalState: GlobalStateInterface = {
  tenantName: TenantName.Amplitude,
  tenantRPC: TenantRPC.Amplitude,
};

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
  getThemeName: () => ThemeName.Pendulum as ThemeName,
});

const GlobalStateProvider = ({
  children,
  value = DefaultGlobalState,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);

  console.log("GlobalStateProvider", state);

  const getThemeName = () => {
    switch (state.tenantName) {
      case TenantName.Pendulum:
        return ThemeName.Pendulum;
      case TenantName.Amplitude:
      case TenantName.Foucoco:
      case TenantName.Local:
      default:
        return ThemeName.Amplitude;
    }
  };

  return (
    <GlobalStateContext.Provider value={{ state, setState, getThemeName }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
