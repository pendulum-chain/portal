import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ComponentChildren } from 'react';
import { Button } from 'react-daisyui';
import { ExecuteMessageResult } from '@pendulum-chain/api-solang';

import Spinner from '../../../assets/spinner';
import { UseContractWriteResponse } from '../../../hooks/nabla/useContractWrite';
import { TenantName } from '../../../models/Tenant';
import { useGlobalState } from '../../../GlobalStateProvider';

export interface TransactionProgressProps {
  mutation: UseContractWriteResponse;
  children?: ComponentChildren;
  onClose: () => void;
}

const getErrorMessage = (data?: ExecuteMessageResult['result']) => {
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

function getExplorerUrl(tenant: TenantName, data?: ExecuteMessageResult['execution']) {
  if (tenant === TenantName.Pendulum && data?.type === 'extrinsic') {
    return `https://pendulum.subscan.io/extrinsic/${data.txHash.toHex()}`;
  }
}

export function TransactionProgress({ mutation, children, onClose }: TransactionProgressProps) {
  const { tenantName } = useGlobalState();
  const errorMsg = getErrorMessage(mutation.data?.result);

  const explorerUrl = getExplorerUrl(tenantName, mutation.data?.execution);

  if (mutation.isIdle) return null;

  if (mutation.isLoading) {
    const isPending = false; // TODO: currently there is not status for this (waiting confirmation in wallet)
    return (
      <>
        <div className="mt-4 flex flex-col items-center justify-center text-center">
          <Spinner size={100} color="#ddd" />
          <h4 className="mt-12 text-2xl text-[--text]">
            {isPending ? 'Waiting for confirmation' : 'Executing transaction'}
          </h4>
          {children}
          <p className="my-5 text-neutral-500">
            {isPending ? 'Confirm this transaction in your wallet' : 'Proceed in your wallet'}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="center mt-6">
        {mutation.isSuccess ? (
          <CheckCircleIcon className="h-36 w-36 text-green-400" strokeWidth={1} />
        ) : (
          <ExclamationCircleIcon className="h-36 w-36 text-red-400" strokeWidth={1} />
        )}
      </div>
      <div className="mt-4 text-center">
        <h4 className="text-2xl text-[--text]">
          {mutation.isSuccess ? 'Transaction successful' : 'Transaction failed'}
        </h4>
      </div>
      {!mutation.isSuccess && !!errorMsg && <p className="mt-1 text-center">{errorMsg}</p>}
      <div className="mt-6"></div>
      {explorerUrl && (
        <a href={explorerUrl} target="_blank" rel="noreferrer" className="btn btn-secondary w-full">
          View on Explorer
        </a>
      )}
      {!!onClose && (
        <Button color="primary" className="mt-2 w-full" onClick={onClose}>
          Close
        </Button>
      )}
    </>
  );
}
