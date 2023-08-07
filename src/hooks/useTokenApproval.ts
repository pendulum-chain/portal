/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { mockERC20 } from '../contracts/nabla/MockERC20';
import { decimalToNative } from '../helpers/parseNumbers';
import { createOptions } from '../services/api/helpers';
import { UseContractWriteProps, useContractWrite } from './useContractWrite';
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
  onSuccess?: UseContractWriteProps['onSuccess'];
}

const maxInt = decimalToNative(Number.MAX_SAFE_INTEGER).toString();

export const useTokenApproval = ({
  token,
  amount = 0,
  spender,
  enabled = true,
  approveMax,
  onError,
  onSuccess,
}: UseTokenApprovalParams) => {
  const { address } = useGlobalState().walletAccount || {};
  const [pending, setPending] = useState(false);
  const amountBI = decimalToNative(amount);
  const isEnabled = Boolean(token && spender && address && enabled);
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch,
  } = useTokenAllowance({
    token,
    owner: address,
    spender,
    enabled: isEnabled,
  });

  const mutation = useContractWrite({
    abi: mockERC20,
    address: token,
    fn:
      isEnabled && allowance !== undefined && !isAllowanceLoading
        ? ({ contract, api }) =>
            contract.tx.approve(createOptions(api, false), spender, approveMax ? maxInt : amountBI.toString())
        : undefined,
    onError: (err) => {
      setPending(false);
      if (onError) onError(err);
    },
    onSuccess: (...args) => {
      setPending(true);
      if (onSuccess) onSuccess(...args);
      setTimeout(() => {
        refetch();
        setPending(false);
      }, 2000);
    },
  });

  return useMemo<[ApprovalState, typeof mutation]>(() => {
    let state = ApprovalState.UNKNOWN;
    // if (amount?.currency.isNative) state = ApprovalState.APPROVED;
    if (isAllowanceLoading) state = ApprovalState.LOADING;
    else if (!mutation.isReady) state = ApprovalState.UNKNOWN;
    else if (allowance !== undefined && amount !== undefined && allowance >= amount) {
      state = ApprovalState.APPROVED;
    } else if (pending || mutation.isLoading) state = ApprovalState.PENDING;
    else if (allowance !== undefined && amount !== undefined && allowance < amount) {
      state = ApprovalState.NOT_APPROVED;
    }
    return [state, mutation];
  }, [allowance, amount, mutation, isAllowanceLoading, pending]);
};
