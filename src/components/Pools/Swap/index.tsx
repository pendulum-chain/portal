import ModalProvider from '../../../services/modal';
import Table from '../../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

export type SwapPoolsProps = {
  data?: SwapPoolColumn[];
};

const SwapPools = ({ data }: SwapPoolsProps): JSX.Element | null => {
  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} columns={columns} search />
    </ModalProvider>
  );
};

export default SwapPools;
