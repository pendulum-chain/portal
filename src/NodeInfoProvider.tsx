import { options } from '@pendulum-chain/api';
import { rpc } from '@pendulum-chain/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ToastMessage, showToast } from './shared/showToast';

async function createApiPromise(provider: WsProvider) {
  return ApiPromise.create(
    options({
      provider,
      rpc,
      throwOnConnect: true,
      throwOnUnknown: true,
    }),
  );
}

export interface NodeInfoProviderInterface {
  bestNumberFinalize?: number;
  chain?: string;
  nodeName?: string;
  nodeVersion?: string;
  ss58Format?: number;
  tokenDecimals?: number;
  tokenSymbol?: string;
  api?: ApiPromise;
}

const NodeInfoContext = createContext({
  state: {} as Partial<NodeInfoProviderInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<NodeInfoProviderInterface>>>,
});

const NodeInfoProvider = ({ children, tenantRPC }: { children: ReactNode; tenantRPC?: string }) => {
  const [state, setState] = useState({} as Partial<NodeInfoProviderInterface>);
  const [currentTenantRPC, setCurrentTenantRPC] = useState<string | undefined>(undefined);
  const [pendingInitiationPromise, setPendingInitiationPromise] = useState<Promise<unknown> | undefined>(undefined);

  async function updateStateWithChainProperties(api: ApiPromise) {
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
      bestNumberFinalize: Number(bestNumberFinalize),
      ss58Format: Number(ss58Format),
      tokenDecimals,
      tokenSymbol,
      // TODO: same as for the api we could create a common interface for fetching data from indexer (swap assets, pools, other info)
      // and pass the instance based on tenant to this context to be used in Swap, Pools components...
      api,
    }));
  }

  async function updateStateWithSystemInfo(api: ApiPromise) {
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    setState((prevState) => ({
      ...prevState,
      chain: chain.toString(),
      nodeName: nodeName.toString(),
      nodeVersion: nodeVersion.toString(),
    }));
  }

  async function handleConnectionError(error: Error) {
    console.error('Error while connecting to the node:', error);
    showToast(ToastMessage.NODE_CONNECTION_ERROR);
  }

  useEffect(() => {
    let disconnect: () => void = () => undefined;

    // If the tenantRPC is the same as the currentTenantRPC, we don't need to do anything.
    if (!tenantRPC || (currentTenantRPC && currentTenantRPC === tenantRPC)) {
      return disconnect;
    }

    const connect = async () => {
      const provider = new WsProvider(tenantRPC, false);
      await provider.connect();

      const api = await createApiPromise(provider);
      await updateStateWithChainProperties(api);
      await updateStateWithSystemInfo(api);

      disconnect = () => {
        api.disconnect();
      };
    };

    if (!pendingInitiationPromise) {
      // We need this promise based approach to prevent race conditions when the user switches between tenants very quickly.
      // Otherwise, it might happen that the connection to the first endpoint takes longer and resolves later than
      // the connection to the second endpoint which would make us end up with a connection to the outdated endpoint.
      const promise = connect().catch(handleConnectionError);
      setPendingInitiationPromise(promise);
    } else {
      pendingInitiationPromise.then(() => {
        setCurrentTenantRPC(tenantRPC);
      });
      return disconnect;
    }
  }, [currentTenantRPC, tenantRPC, pendingInitiationPromise, setPendingInitiationPromise]);

  return <NodeInfoContext.Provider value={{ state, setState }}>{children}</NodeInfoContext.Provider>;
};

const useNodeInfoState = () => useContext(NodeInfoContext);

export { NodeInfoProvider, useNodeInfoState };
