import { createContext, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { useTheme } from "react-daisyui";
import { WalletAccount } from "@talismn/connect-wallets";

export interface Toast {
  message: string;
  type: "success" | "error";
}

export enum TenantName {
  Amplitude = "amplitude",
  Pendulum = "pendulum",
  Foucoco = "foucoco",
}

export interface GlobalStateInterface {
  userAddress: string; // keyring.accounts
  accountSecret: string;
  walletAccount?: WalletAccount;
  accountName: string;
  infoMessage?: string;
  tenantNane: TenantName;
  tenantRPC: string;
  toast?: Toast;
}

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
  children,
  value = {
    tenantRPC: "",
  } as GlobalStateInterface,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);

  const navigate = useNavigate();
  const { location } = window;
  const { setTheme } = useTheme();
  const splittedUrl = location.pathname.split("/");

  useEffect(() => {
    const chain = splittedUrl[1] || "amplitude";
    const path = splittedUrl.slice(2).join("/") || "dashboard";
    const isPendulum = chain === "pendulum";
    const isFoucoco = chain === "foucoco";
    const isLocal = chain === "local";

    let tenantNane: TenantName;
    let tenantRPC: string;

    switch (true) {
      case isPendulum:
        tenantNane = TenantName.Pendulum;
        tenantRPC = "wss://rpc-pendulum.pendulumchain.tech";
        setTheme("light");
        navigate("/pendulum/" + path);
        break;

      case isFoucoco:
        tenantNane = TenantName.Foucoco;
        tenantRPC = "wss://rpc-foucoco.pendulumchain.tech";
        setTheme("black");
        navigate("/foucoco/" + path);
        break;

      case isLocal:
        tenantNane = TenantName.Foucoco;
        tenantRPC = "ws://localhost:5173/";
        setTheme("pendulum");
        navigate("/local/" + path);
        break;

      default:
        tenantNane = TenantName.Amplitude;
        tenantRPC = "ws://localhost:9944/";
        setTheme("black");
        navigate("/amplitude/" + path);
        break;
    }

    setState({ tenantNane, tenantRPC });
  }, [navigate, setTheme, splittedUrl]);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
