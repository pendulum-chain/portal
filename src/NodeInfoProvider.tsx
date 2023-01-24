import { h, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { ApiPromise, WsProvider } from "@polkadot/api";
// import { AugmentedQuery } from "@polkadot/api/types";
import { options } from "@pendulum-chain/api";
// import { AccountId } from "@pendulum-chain/types/interfaces";
// import {__SubmittableExtrinsic} from "@pendulum-chain/types/argument/api-tx"
// import {} from "@pendulum-chain/types/metadata"
import { rpc, typesBundle } from "@pendulum-chain/types";

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
  value = {},
}: {
  children: any;
  value?: Partial<NodeInfoProviderInterface>;
}) => {
  const [state, setState] = useState(value);

  // let endpoint = "wss://rpc-amplitude.pendulumchain.tech";
  let endpoint = "ws://localhost:9944";
  const provider = new WsProvider([endpoint]);

  const apiPromise = new ApiPromise(
    options({
      provider,
      rpc,
      typesBundle: typesBundle
    })
  );

  useEffect(() => {
    (async () => {
      apiPromise.on("connected", async () => {
        try {
          apiPromise.isReady.then((api) => {
            console.log("api is ready", api);
            (async () => {
              const bestNumberFinalize = await api.derive.chain.bestNumber();
              const chainProperties = await api.registry.getChainProperties();
              const ss58Format = chainProperties?.get("ss58Format").toString();
              const tokenDecimals = Number(
                chainProperties
                  ?.get("tokenDecimals")
                  .toString()
                  .replace(/[\[\]]/g, "")
              );
              const tokenSymbol = chainProperties
                ?.get("tokenSymbol")
                .toString()
                .replace(/[\[\]]/g, "");

              setState((prevState) => ({
                ...prevState,
                ...{
                  bestNumberFinalize: Number(bestNumberFinalize),
                  ss58Format: Number(ss58Format),
                  tokenDecimals,
                  tokenSymbol,
                  api,
                },
              }));
            })();
          });

          const [chain, nodeName, nodeVersion] = await Promise.all([
            apiPromise.rpc.system.chain(),
            apiPromise.rpc.system.name(),
            apiPromise.rpc.system.version(),
          ]);

          setState((prevState) => ({
            ...prevState,
            ...{
              chain: chain.toString(),
              nodeName: nodeName.toString(),
              nodeVersion: nodeVersion.toString(),
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
