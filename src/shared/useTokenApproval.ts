/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { mockERC20 } from '../contracts/nabla/MockERC20';
import { gasDefaults } from './helpers';
import { decimalToNative, nativeToDecimal } from './parseNumbers';
import { useSharedState } from './Provider';
import { useContractWrite, UseContractWriteProps } from './useContractWrite';
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
  const { address } = useSharedState();
  const [pending, setPending] = useState(false);
  const amountBI = decimalToNative(amount);
  const isEnabled = Boolean(token && spender && address && enabled);
  const {
    data: allowanceData,
    isLoading: isAllowanceLoading,
    refetch,
  } = useTokenAllowance(
    {
      token,
      owner: address,
      spender,
    },
    { enabled: isEnabled },
  );

  const mutation = useContractWrite({
    abi: mockERC20,
    address: token,
    method: 'approve',
    args: [spender, approveMax ? maxInt : amountBI.toString()],
    options: (api) => ({
      gasLimit: api.createType('WeightV2', gasDefaults),
      storageDepositLimit: null,
    }),
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

  const allowance = useMemo(() => nativeToDecimal(parseFloat(allowanceData || '0')).toNumber(), [allowanceData]);

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
