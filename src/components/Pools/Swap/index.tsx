import { useQuery } from '@tanstack/react-query';
import { cacheKeys } from '../../../constants/cache';
import { assetsApi } from '../../../services/api/assets';
import ModalProvider from '../../../services/modal';
import { useGlobalState } from '../../../GlobalStateProvider';
import { useNodeInfoState } from '../../../NodeInfoProvider';
import { isApiConnected } from '../../../services/api/helpers';
import Table from '../../Table';
import { columns } from './columns';
import PoolsModals from './Modals';

const SwapPools = (): JSX.Element | null => {
  // ! TODO: get swap pools and user connected data (user liquidity for all pools)
  const { walletAccount } = useGlobalState();
  const { api } = useNodeInfoState().state;

  const isConnected = isApiConnected(api);

  const enabled = !!api && !!walletAccount;
  const { data, isLoading } = useQuery(
    [cacheKeys.swapPools],
    isConnected ? () => assetsApi.getSwapPools(api, 'foucoco', walletAccount!.address) : () => [],
    {
      enabled,
    },
  );

  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} isLoading={isLoading} columns={columns} search />
    </ModalProvider>
  );
};

export default SwapPools;
