import { createContext, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { options } from "@pendulum-chain/api";
import { rpc } from "@pendulum-chain/types";

export interface NodeInfoProviderInterface {
  bestNumberFinalize: number;
  chain: string;
  nodeName: string;
  nodeVersion: string;
  ss58Format?: number;
  tokenDecimals: number;
  tokenSymbol: string;
  api: ApiPromise;
}

const NodeInfoContext = createContext({
  state: {} as Partial<NodeInfoProviderInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<NodeInfoProviderInterface>>>,
});

const NodeInfoProvider = ({
  children,
  tenantRPC,
  value = {},
}: {
  children: any;
  tenantRPC: string;
  value?: Partial<NodeInfoProviderInterface>;
}) => {
  const [state, setState] = useState(value);

  console.log("tenantRPC", tenantRPC, state.api);

  console.log("NodeInfoProvider", state);

  useEffect(() => {
    let disconnect: () => void = () => undefined;

    const connect = async () => {
      const provider = new WsProvider(tenantRPC);
      const api = await ApiPromise.create(
        options({
          provider,
          rpc,
        })
      );

      setState((prevState) => {
        return {
          ...prevState,
          api,
        };
      });

      disconnect = () => {
        api.disconnect();
      };
    };

    connect();

    return disconnect;
  }, [tenantRPC]);

  return (
    <NodeInfoContext.Provider value={{ state, setState }}>
      {children}
    </NodeInfoContext.Provider>
  );
};

const useNodeInfoState = () => useContext(NodeInfoContext);

export { NodeInfoProvider, useNodeInfoState };
