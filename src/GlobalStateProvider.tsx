import { createContext, h } from "preact";
import { useContext, useState } from "preact/hooks";
import { WalletAccount } from "@talismn/connect-wallets";

export interface Toast {
  message: string;
  type: "success" | "error";
}

export interface GlobalStateInterface {
  userAddress: string; // keyring.accounts
  accountSecret: string;
  walletAccount?: WalletAccount;
  accountName: string;
  infoMessage?: string;
  toast?: Toast;
}

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface,
}: {
  children: ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

export { GlobalStateProvider, useGlobalState };
