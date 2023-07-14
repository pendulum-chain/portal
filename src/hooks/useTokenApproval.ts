/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { mockERC20 } from '../contracts/MockERC20';
import { decimalToNative } from '../helpers/parseNumbers';
import { useContractWrite } from './useContractWrite';
import { useTokenAllowance } from './useTokenAllowance';

export enum ApprovalState {
  UNKNOWN,
  LOADING,
  PENDING,
  NOT_APPROVED,
  APPROVED,
}

interface UseTokenApprovalParams {
  spender?: string;
  token?: string;
  amount?: number;
  approveMax?: boolean;
  enabled?: boolean;
  onError?: (err: any) => void;
  onSuccess?: (data: any) => void;
}

export const useTokenApproval = ({
  token,
  amount,
  spender,
  enabled = true,
  approveMax = true,
  onError,
  onSuccess,
}: UseTokenApprovalParams) => {
  const { address } = useGlobalState().walletAccount || {};
  const [pending, setPending] = useState(false);
  const amountBI = decimalToNative(approveMax ? Number.MAX_SAFE_INTEGER : amount || 0);
  const isEnabled = Boolean(token && spender && address && enabled);
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    /* refetch, */
  } = useTokenAllowance({
    token,
    owner: address,
    spender,
    enabled: isEnabled,
  });

  const onSettledFn = useCallback(
    (data: any | undefined, e: any | null) => {
      if (e instanceof Error) {
        setPending(false);
        if (onError) onError(e);
      } else if (data) {
        if (onSuccess) onSuccess(data);
      }
    },
    [onError, onSuccess],
  );
  const onSuccessFn = useCallback(
    async (data: any) => {
      setPending(true);
      console.log(data);
      //const trx = data?.hash ? await waitForTransaction({ hash: data.hash }) : undefined;
      //if (trx) await refetch();
      setPending(false);
    },
    [
      /* refetch */
    ],
  );

  // https://github.com/wagmi-dev/wagmi/blob/9d3310e417eedde6bf481f5959af73745b9c27b4/packages/react/src/hooks/contracts/useContractWrite.ts
  const mutation = useContractWrite({
    abi: mockERC20,
    address: token,
    fn:
      isEnabled && allowance !== undefined && !isAllowanceLoading
        ? (contract: any) => contract.tx.approve(spender, amountBI)
        : undefined,
    onError,
    onSettled: onSettledFn,
    onSuccess: onSuccessFn,
  });

  return useMemo<[ApprovalState, typeof mutation]>(() => {
    let state = ApprovalState.UNKNOWN;
    // if (amount?.currency.isNative) state = ApprovalState.APPROVED;
    if (!mutation.isReady) state = ApprovalState.UNKNOWN;
    else if (allowance !== undefined && amountBI !== undefined && allowance >= amountBI) {
      state = ApprovalState.APPROVED;
    } else if (pending || mutation.isLoading) state = ApprovalState.PENDING;
    else if (isAllowanceLoading) state = ApprovalState.LOADING;
    else if (allowance !== undefined && amountBI !== undefined && allowance < amountBI) {
      state = ApprovalState.NOT_APPROVED;
    }
    return [state, mutation];
  }, [allowance, amountBI, mutation, isAllowanceLoading, pending]);
};
