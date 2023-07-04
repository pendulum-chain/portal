import { useQuery } from '@tanstack/react-query';
import { cacheKeys } from '../../../constants/cache';
import ModalProvider from '../../../services/modal';
import Table from '../../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

const SwapPools = (): JSX.Element | null => {
  // ! TODO: get swap pools and user connected data (user liquidity for all pools)
  const { data, isLoading } = useQuery<SwapPoolColumn[] | undefined>([cacheKeys.swapPools], () => []);

  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} isLoading={isLoading} columns={columns} search />
    </ModalProvider>
  );
};

export default SwapPools;
