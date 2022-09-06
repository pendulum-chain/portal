import React, { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { ApiPromise, WsProvider } from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";

export interface NodeInfoProviderInterface {
  bestNumberFinalize: number;
  chain: string;
  nodeName: string;
  nodeVersion: string;
}

const NodeInfoContext = createContext({
  state: {} as Partial<NodeInfoProviderInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<NodeInfoProviderInterface>>>,
});

const NodeInfoProvider = ({
  children,
  value = {},
}: {
  children: any;
  value?: Partial<NodeInfoProviderInterface>;
}) => {
  const [state, setState] = useState(value);

  const provider = new WsProvider("wss://pencol-kus-01.pendulumchain.tech");

  const apiPromise = new ApiPromise({
    provider,
    ...jsonrpc,
  });

  useEffect(() => {
    (async () => {
      apiPromise.on("connected", async () => {
        try {
          apiPromise.isReady.then((api) => {
            api.derive.chain
              .bestNumberFinalized()
              .then((bestNumberFinalize) => {
                setState((prevState) => ({
                  ...prevState,
                  ...{ bestNumberFinalize: Number(bestNumberFinalize) },
                }));
              });
          });

          const [chain, nodeName, nodeVersion] = await Promise.all([
            apiPromise.rpc.system.chain(),
            apiPromise.rpc.system.name(),
            apiPromise.rpc.system.version(),
          ]);

          // @ts-ignore
          setState((prevState) => ({
            ...prevState,
            ...{
              chain,
              nodeName,
              nodeVersion,
            },
          }));
        } catch (e) {
          console.error(e);
        }
      });
    })();
  }, []);

  return (
    <NodeInfoContext.Provider value={{ state, setState }}>
      {children}
    </NodeInfoContext.Provider>
  );
};

const useNodeInfoState = () => useContext(NodeInfoContext);

export { NodeInfoProvider, useNodeInfoState };
