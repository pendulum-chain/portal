import { UseQueryResult } from '@tanstack/react-query';
import ModalProvider from '../../../services/modal';
import Table from '../../Table';
import { columns, SwapPoolColumn } from './columns';
import PoolsModals from './Modals';

export type SwapPoolsProps = Pick<
  UseQueryResult<SwapPoolColumn[]>,
  'data' | 'isLoading'
>;

const SwapPools = ({ data, isLoading }: SwapPoolsProps): JSX.Element | null => {
  return (
    <ModalProvider>
      <PoolsModals />
      <Table data={data} isLoading={isLoading} columns={columns} search />
    </ModalProvider>
  );
};

export default SwapPools;
