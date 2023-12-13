import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UseMutationResult } from '@tanstack/react-query';
import { ComponentChildren } from 'preact';
import { Button } from 'react-daisyui';
import Spinner from '../../../assets/spinner';
import { useGetTenantConfig } from '../../../hooks/useGetTenantConfig';
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
  const { explorer } = useGetTenantConfig();
  if (mutation.isIdle) return null;
  if (mutation.isLoading) {
    const status = mutation.data?.status;
    const isPending = !status || status === 'Pending';
    return (
      <>
        <div className="flex flex-col items-center justify-center text-center mt-4">
          <Spinner size={100} color="#ddd" />
          <h4 className="text-2xl mt-12 text-[--text]">
            {isPending ? 'Waiting for confirmation' : 'Executing transaction'}
          </h4>
          {children}
          <p className="text-neutral-500 my-5">
            {isPending ? 'Confirm this transaction in your wallet' : 'Waiting for transaction to complete'}
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="center mt-6">
        {mutation.isSuccess ? (
          <CheckCircleIcon className="w-36 h-36 text-green-400" stroke-width={1} />
        ) : (
          <ExclamationCircleIcon className="w-36 h-36 text-red-400" stroke-width={1} />
        )}
      </div>
      <div className="text-center mt-4">
        <h4 className="text-2xl text-[--text]">
          {mutation.isSuccess ? 'Transaction successful' : 'Transaction failed'}
        </h4>
      </div>
      {!!onClose && (
        <Button color="primary" className="w-full mt-6" onClick={onClose}>
          Close
        </Button>
      )}
      {!!mutation.data?.hex && (
        <a
          className="btn btn-secondary w-full mt-2"
          href={`${explorer}/${mutation.data.hex}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Transaction details
        </a>
      )}
    </>
  );
};
export default TransactionProgress;
