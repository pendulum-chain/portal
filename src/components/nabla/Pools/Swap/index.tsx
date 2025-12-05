import { useNablaInstance } from '../../../../hooks/nabla/useNablaInstance';
import ModalProvider from '../../../../services/modal';
import { useSharedState } from '../../../../shared/Provider';
import Table, { SortingOrder } from '../../../Table';
import { NablaFootnote } from '../../common/NablaFootnote';
import { SwapPoolModals } from './SwapPoolModals';
import { columnsWithMyAmount, columnsWithoutMyAmount, SwapPoolColumn } from './columns';

const SwapPools = (): JSX.Element | null => {
  const { nabla, isLoading } = useNablaInstance();
  const { address: walletAddress } = useSharedState();

  if (nabla == undefined) return null;
  const swapPools = nabla.swapPools;
  const columnData = swapPools.map((pool) => ({ ...pool, backstopPool: nabla.backstopPool }));

  return (
    <ModalProvider>
      <SwapPoolModals />
      <Table<SwapPoolColumn>
        data={columnData}
        isLoading={isLoading}
        columns={walletAddress === undefined ? columnsWithoutMyAmount : columnsWithMyAmount}
        fontSize="text-base"
        search
        sortBy={{ name: SortingOrder.ASC }}
        oddRowsClassname="odd-rows bg-table-row"
        evenRowsClassname="even-rows bg-base-200"
      />
      <NablaFootnote />
    </ModalProvider>
  );
};

export default SwapPools;
