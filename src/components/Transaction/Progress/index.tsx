import { UseMutationResult } from '@tanstack/react-query';
import pendulumIcon from '../../../assets/pendulum-icon.svg';
import Spinner from '../../../assets/spinner';
import { Asset } from '../../../models/Asset';

export interface TransactionProgressProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: UseMutationResult<any, any, any, any>;
  asset: Asset;
  children: JSX.Element;
}

const TransactionProgress = ({ mutation, asset, children }: TransactionProgressProps): JSX.Element | null => {
  if (!mutation.isLoading) return null;
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-4 mb-10">
        <Spinner size={100} color="#ddd" />
        <h4 className="text-2xl mt-10">Waiting for Confirmation</h4>
        <p className="text-neutral-500 mt-4">Please confirm this transaction in your wallet</p>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-neutral-100 dark:bg-neutral-700 p-4">
        <div className="flex items-center gap-2 text-lg">
          <div className="rounded-full bg-[rgba(0,0,0,0.15)] w-10 h-10 p-px">
            <img src={pendulumIcon} alt="Pendulum" className="h-full w-auto" />
          </div>
          <div>
            <strong>{asset.symbol}</strong>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
export default TransactionProgress;
