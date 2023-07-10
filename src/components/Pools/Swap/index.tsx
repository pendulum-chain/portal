import { useQuery } from '@tanstack/react-query';
import { cacheKeys } from '../../../constants/cache';
import { addresses } from '../../../contracts/NablaAddresses';
import { useGlobalState } from '../../../GlobalStateProvider';
import ModalProvider from '../../../services/modal';
import Table from '../../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

const SwapPools = (): JSX.Element | null => {
  const { tenantName } = useGlobalState();
  // ! TODO: get swap pools and user connected data (user liquidity for all pools)
  const { data, isLoading } = useQuery<SwapPoolColumn[] | undefined>([cacheKeys.swapPools, tenantName, 1], () => {
    const pools = addresses[tenantName as 'foucoco']?.swapPoolsWithMeta;
    if (!pools) return [];
    return pools.map<SwapPoolColumn>((pool) => ({
      address: pool.address,
      asset: {
        address: pool.asset,
        symbol: 'USDC',
        decimals: 18,
        name: 'USDC',
      },
      coverage: 0,
      liabilities: 19,
      myAmount: 10,
    }));
  });

  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} isLoading={isLoading} columns={columns} search />
    </ModalProvider>
  );
};

export default SwapPools;
