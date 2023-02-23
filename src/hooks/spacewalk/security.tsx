import { useMemo } from 'preact/hooks';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { UnsubscribePromise } from '@polkadot/api-base/types';

export function useSecurityPallet() {
  const { api } = useNodeInfoState().state;

  return useMemo(() => {
    return {
      async getActiveBlockNumber() {
        if (!api) return Promise.resolve(0);

        return await api.query.security.activeBlockCount();
      },
      async subscribeActiveBlockNumber(
        callback: (activeBlockNumber: number) => void,
      ) {
        let unsubscribe: UnsubscribePromise = new Promise(() => undefined);
        if (api) {
          unsubscribe = api.query.security.activeBlockCount((blockNumber) => {
            callback(blockNumber.toNumber());
          });
        }
        return unsubscribe;
      },
    };
  }, [api]);
}
