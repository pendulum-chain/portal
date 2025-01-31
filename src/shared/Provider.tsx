import { ApiPromise } from '@polkadot/api';
import { useContext, useMemo, createContext } from 'react';

export interface State {
  api?: ApiPromise;
  signer?: unknown; // TODO: fix type
  address?: string;
}

const SharedStateContext = createContext<State | undefined>(undefined);

export const SharedStateProvider = ({ children, api, signer, address }: { children: JSX.Element } & State) => {
  const providerValue = useMemo<State>(
    () => ({
      api,
      signer,
      address,
    }),
    [api, signer, address],
  );
  return <SharedStateContext value={providerValue}>{children}</SharedStateContext>;
};

export const useSharedState = () => {
  const state = useContext(SharedStateContext);
  if (!state) throw 'SharedStateProvider not defined!';
  return state;
};
