import { h, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { ApiPromise, WsProvider } from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { useGlobalState } from "./GlobalStateProvider";

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
  const { state: globalState } = useGlobalState();
  const [state, setState] = useState(value);

  const { tenantRPC } = globalState;
  console.log(tenantRPC);
  const provider = new WsProvider([tenantRPC]);

  const apiPromise = new ApiPromise({
    provider,
    ...jsonrpc,
  });

  useEffect(() => {
    (async () => {
      apiPromise.on("connected", async () => {
        try {
          apiPromise.isReady.then((api) => {
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
