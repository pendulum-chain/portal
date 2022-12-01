import { h, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { useTheme } from "react-daisyui";

export interface Toast {
  message: string;
  type: "success" | "error";
}

export enum TenantName {
  Amplitude = "amplitude",
  Pendulum = "pendulum",
  Fococo = "fococo",
}

export interface GlobalStateInterface {
  userAddress: string; // keyring.accounts
  accountSecret: string;
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
  const strings = location.pathname.split("/");

  useEffect(() => {
    const isPendulum = strings[1] && strings[1] === "pendulum" && !strings[2];
    const isFococo = strings[1] && strings[1] === "fococo" && !strings[2];
    let tenantNane: TenantName;
    let tenantRPC: string;

    switch (true) {
      case isPendulum:
        tenantNane = TenantName.Pendulum;
        tenantRPC = "wss://rpc-pendulum.pendulumchain.tech";
        setTheme("light");
        navigate("/pendulum/dashboard");
        break;

      case isFococo:
        tenantNane = TenantName.Fococo;
        tenantRPC = "wss://rpc-foucoco.pendulumchain.tech";
        setTheme("black");
        navigate("/fococo/dashboard");
        break;

      default:
        tenantNane = TenantName.Pendulum;
        tenantRPC = "wss://rpc-amplitude.pendulumchain.tech";
        setTheme("black");
        navigate("/amplitude/dashboard");
        break;
    }

    setState({ tenantNane, tenantRPC });
  }, [window]);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

export { GlobalStateProvider, useGlobalState };
