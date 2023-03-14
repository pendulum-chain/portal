import ModalProvider from '../../../services/modal';
import Table from '../../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

export type PoolsProps = {
  data?: SwapPoolColumn[];
};

const mockData: SwapPoolColumn[] = [
  {
    asset: {
      address: '1',
      name: 'USDC',
      symbol: 'USDC',
      decimals: 2,
    },
    apr: 20,
    coverage: 5,
    liabilities: 10,
    balance: 100,
    wallet: 20,
    myAmount: 100,
  },
  {
    asset: {
      address: '2',
      name: 'ETH',
      symbol: 'Ethereum',
      decimals: 2,
    },
    apr: 17,
    coverage: 2,
    liabilities: 5,
    balance: 100,
    wallet: 10,
    myAmount: 0,
  },
];

const Pools = ({ data = mockData }: PoolsProps): JSX.Element | null => {
  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} columns={columns} search />
    </ModalProvider>
  );
};

export default Pools;
