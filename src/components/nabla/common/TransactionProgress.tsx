import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { MessageCallResult } from '@pendulum-chain/api-solang';
import { ComponentChildren } from 'preact';
import { Button } from 'react-daisyui';
import Spinner from '../../../assets/spinner';
import { useGetTenantConfig } from '../../../hooks/useGetTenantConfig';
import { UseContractWriteResponse } from '../../../hooks/nabla/useContractWrite';

export interface TransactionProgressProps {
  mutation: Pick<
    UseContractWriteResponse,
    'isIdle' | 'isLoading' | 'isSuccess' | 'isError' | 'data' | 'status' | 'transaction'
  >;
  children?: ComponentChildren;
  onClose: () => void;
}

const getErrorMessage = (data?: MessageCallResult['result']) => {
  if (!data) return undefined;
  switch (data.type) {
    case 'error':
      return data.error;
    case 'panic':
      return data.explanation;
    case 'reverted':
      return data.description;
    default:
      return undefined;
  }
};

export function TransactionProgress({ mutation, children, onClose }: TransactionProgressProps): JSX.Element | null {
  const { explorer } = useGetTenantConfig();
  if (mutation.isIdle) return null;
  const status = mutation.data?.result?.type;
  const isSuccess = status === 'success';
  const errorMsg = getErrorMessage(mutation.data?.result);
  if (mutation.isLoading) {
    const isPending = false; // TODO: currently there is not status for this (waiting confirmation in wallet)
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
        {isSuccess ? (
          <CheckCircleIcon className="w-36 h-36 text-green-400" stroke-width={1} />
        ) : (
          <ExclamationCircleIcon className="w-36 h-36 text-red-400" stroke-width={1} />
        )}
      </div>
      <div className="text-center mt-4">
        <h4 className="text-2xl text-[--text]">{isSuccess ? 'Transaction successful' : 'Transaction failed'}</h4>
      </div>
      {!isSuccess && !!errorMsg && <p className="text-center mt-1">{errorMsg}</p>}
      {!!onClose && (
        <Button color="primary" className="w-full mt-6" onClick={onClose}>
          Close
        </Button>
      )}
      {!!mutation.transaction?.hex && (
        <a
          className="btn btn-secondary w-full mt-2"
          href={`${explorer}/${mutation.transaction.hex}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Transaction details
        </a>
      )}
    </>
  );
}