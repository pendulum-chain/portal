import { useNablaInstance } from '../../../../hooks/nabla/useNablaInstance';
import ModalProvider from '../../../../services/modal';
import Table from '../../../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

const SwapPools = (): JSX.Element | null => {
  const { nabla, isLoading } = useNablaInstance();

  const swapPools = nabla?.swapPools;

  if (swapPools == undefined) return null;
  const columnData = swapPools.map((pool) => ({ ...pool, backstopPool: nabla!.backstopPool }));

  return (
    <ModalProvider>
      <PoolsModals />
      <Table<SwapPoolColumn> data={columnData} isLoading={isLoading} columns={columns} fontSize="text-base" search />
    </ModalProvider>
  );
};

export default SwapPools;
