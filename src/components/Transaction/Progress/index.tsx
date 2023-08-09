import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UseMutationResult } from '@tanstack/react-query';
import { ComponentChildren } from 'preact';
import { Button } from 'react-daisyui';
import Spinner from '../../../assets/spinner';
import { TransactionsStatus } from '../../../shared/useContractWrite';

export interface TransactionProgressProps {
  mutation: Pick<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UseMutationResult<TransactionsStatus, any, any, any>,
    'isIdle' | 'isLoading' | 'isSuccess' | 'isError' | 'data'
  >;
  children?: ComponentChildren;
  onClose: () => void;
}

const TransactionProgress = ({ mutation, children, onClose }: TransactionProgressProps): JSX.Element | null => {
  if (mutation.isIdle) return null;
  if (mutation.isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center text-center mt-4">
          <Spinner size={100} color="#ddd" />
          <h4 className="text-2xl mt-10">Waiting for confirmation</h4>
          <p className="text-neutral-500 mt-4">Please confirm this transaction in your wallet</p>
        </div>
        {children}
      </>
    );
  }
  return (
    <>
      <div className="center mt-6">
        {mutation.isSuccess ? (
          <CheckCircleIcon className="w-32 h-32 text-green-400" />
        ) : (
          <ExclamationCircleIcon className="w-32 h-32 text-red-400" />
        )}
      </div>
      <div className="text-center mt-6">
        <h4 className="text-2xl font-bold text-bold">
          {mutation.isSuccess ? 'Transaction successfull' : 'Transaction failed'}
        </h4>
      </div>
      {children}
      {!!onClose && (
        <Button color="primary" className="w-full mt-6" onClick={onClose}>
          Close
        </Button>
      )}
      <Button
        tag="a"
        href={mutation.data?.hex} // ! TODO: build url to transaction details on polkadot explorer
        rel="noopener noreferrer"
        onClick={onClose}
        color="secondary"
        className="w-full mt-2"
      >
        Transaction details
      </Button>
    </>
  );
};
export default TransactionProgress;
