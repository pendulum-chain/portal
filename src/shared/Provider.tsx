import { ApiPromise } from '@polkadot/api';
import { Signer } from '@polkadot/types/types';
import { ComponentChildren, createContext } from 'preact';
import { useContext, useMemo } from 'preact/compat';

export interface State {
  api?: ApiPromise;
  signer?: Signer;
}

const SharedStateContext = createContext<State | undefined>(undefined);

export const SharedStateProvider = ({ children, api, signer }: { children: ComponentChildren } & State) => {
  const providerValue = useMemo<State>(
    () => ({
      api,
      signer,
    }),
    [api, signer],
  );
  return <SharedStateContext.Provider value={providerValue}>{children}</SharedStateContext.Provider>;
};

export const useSharedState = () => {
  const state = useContext(SharedStateContext);
  if (!state) throw 'SharedStateProvider not defined!';
  return state;
};
