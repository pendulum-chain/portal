/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { useNodeInfoState } from '../NodeInfoProvider';
import { mockERC20 } from '../contracts/MockERC20';
import { decimalToNative } from '../helpers/parseNumbers';
import { createOptions } from '../services/api/helpers';
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
  const {
    state: { api },
  } = useNodeInfoState();
  const { address, signer } = useGlobalState().walletAccount || {};
  const [pending, setPending] = useState(false);
  const amountBI = decimalToNative(amount || 0);
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

  const mutation = useContractWrite({
    abi: mockERC20,
    address: token,
    fn:
      isEnabled && allowance !== undefined && !isAllowanceLoading
        ? async (contract: any) => {
            const tx = await contract.tx
              .approve(
                api ? createOptions(api) : {},
                spender,
                approveMax ? decimalToNative(Number.MAX_SAFE_INTEGER).toString() : amountBI.toString(),
              )
              .signAndSend(spender, { signer });
            console.log(tx);
            return tx;
          }
        : undefined,
    onError,
    onSettled: onSettledFn,
    onSuccess: onSuccessFn,
  });

  return useMemo<[ApprovalState, typeof mutation]>(() => {
    let state = ApprovalState.UNKNOWN;
    // if (amount?.currency.isNative) state = ApprovalState.APPROVED;
    if (isAllowanceLoading) state = ApprovalState.LOADING;
    else if (!mutation.isReady) state = ApprovalState.UNKNOWN;
    else if (allowance !== undefined && amountBI !== undefined && allowance >= amountBI) {
      state = ApprovalState.APPROVED;
    } else if (pending || mutation.isLoading) state = ApprovalState.PENDING;
    else if (allowance !== undefined && amountBI !== undefined && allowance < amountBI) {
      state = ApprovalState.NOT_APPROVED;
    }
    return [state, mutation];
  }, [allowance, amountBI, mutation, isAllowanceLoading, pending]);
};
