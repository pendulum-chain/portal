/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'preact/compat';
import { erc20WrapperAbi } from '../contracts/nabla/ERC20Wrapper';
import { getMessageCallValue } from './helpers';
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
  decimals?: number;
  onError?: (err: any) => void;
  onSuccess?: UseContractWriteProps<Dict>['onSuccess'];
}

export const useTokenApproval = ({
  token,
  amount = 0,
  spender,
  enabled = true,
  approveMax,
  decimals,
  onError,
  onSuccess,
}: UseTokenApprovalParams) => {
  const { address } = useSharedState();
  const [pending, setPending] = useState(false);
  const amountBI = decimalToNative(amount, decimals);
  const isEnabled = Boolean(token && spender && address && enabled);
  const maxInt = useMemo(() => decimalToNative(Number.MAX_SAFE_INTEGER, decimals).toString(), [decimals]);
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
    abi: erc20WrapperAbi,
    address: token,
    method: 'approve',
    args: [spender, approveMax ? maxInt : amountBI.toString()],
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

  const allowanceValue = getMessageCallValue(allowanceData);
  const allowance = useMemo(
    () => nativeToDecimal(parseFloat(allowanceValue || '0'), decimals).toNumber(),
    [allowanceValue, decimals],
  );

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
