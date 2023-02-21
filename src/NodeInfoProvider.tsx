import { createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@pendulum-chain/api';
import { rpc } from '@pendulum-chain/types';

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
  const [currentTenantRPC, setCurrentTenantRPC] = useState(tenantRPC);
  const [pendingInitiationPromise, setPendingInitiationPromise] = useState<
    Promise<unknown>
  >(Promise.resolve());

  useEffect(() => {
    let disconnect: () => void = () => undefined;

    const connect = async () => {
      const provider = new WsProvider(tenantRPC);
      const api = await ApiPromise.create(
        options({
          provider,
          rpc,
        }),
      );

      const bestNumberFinalize = await api.derive.chain.bestNumber();
      const chainProperties = await api.registry.getChainProperties();
      const ss58Format = chainProperties?.get('ss58Format').toString();
      const tokenDecimals = Number(
        chainProperties
          ?.get('tokenDecimals')
          .toString()
          .replace(/[\\[\]]/g, ''),
      );
      const tokenSymbol = chainProperties
        ?.get('tokenSymbol')
        .toString()
        .replace(/[\\[\]]/g, '');

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

      const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version(),
      ]);

      setState((prevState) => ({
        ...prevState,
        ...{
          chain: chain.toString(),
          nodeName: nodeName.toString(),
          nodeVersion: nodeVersion.toString(),
        },
      }));

      disconnect = () => {
        api.disconnect();
      };
    };

    pendingInitiationPromise.then(() => {
      // We need this promise based approach to prevent race conditions when the user switches between tenants very quickly.
      // Otherwise, it might happen that the connection to the first endpoint takes longer and resolves later than
      // the connection to the second endpoint which would make us end up with a connection to the outdated endpoint.
      setPendingInitiationPromise(connect());
      setCurrentTenantRPC(tenantRPC);
    });

    return disconnect;
  }, [
    currentTenantRPC,
    tenantRPC,
    pendingInitiationPromise,
    setPendingInitiationPromise,
  ]);

  return (
    <NodeInfoContext.Provider value={{ state, setState }}>
      {children}
    </NodeInfoContext.Provider>
  );
};

const useNodeInfoState = () => useContext(NodeInfoContext);

export { NodeInfoProvider, useNodeInfoState };
