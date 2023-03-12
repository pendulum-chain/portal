import { VNode } from 'preact';
import ModalProvider from '../../services/modal';
import Table from '../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

export type PoolsProps = {
  data?: SwapPoolColumn[];
};

const mockData = [
  {
    address: 1,
    name: 'TEST',
    apr: 20,
    coverage: 5,
  },
  {
    address: 2,
    name: 'TEST 2',
    apr: 17,
  },
];

const Pools = ({ data = mockData }: PoolsProps): VNode | null => {
  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} columns={columns} search />
    </ModalProvider>
  );
};

export default Pools;
