import { h, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

export interface Toast {
  message: string;
  type: "success" | "error";
}
export interface GlobalStateInterface {
  userAddress: string; // keyring.accounts
  accountSecret: string;
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
