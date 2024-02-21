/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'preact/compat';
import { erc20WrapperAbi } from '../contracts/nabla/ERC20Wrapper';
import { getMessageCallValue } from './helpers';
import { decimalToRaw, rawToDecimal } from './parseNumbers';
import { useSharedState } from './Provider';
import { useContractWrite, UseContractWriteProps } from './useContractWrite';
import { useTokenAllowance } from './useTokenAllowance';

export enum ApprovalState {
  UNKNOWN,
  LOADING,
  PENDING,
  NOT_APPROVED,
  APPROVED,
  NO_ACCOUNT,
}

interface UseTokenApprovalParams {
  spender: string;
  token: string;
  decimalAmount: number;
  enabled?: boolean;
  decimals: number;
  onError?: (err: any) => void;
  onSuccess?: UseContractWriteProps<Dict>['onSuccess'];
}

export const useTokenApproval = ({
  token,
  decimalAmount,
  spender,
  enabled = true,
  decimals,
  onError,
  onSuccess,
}: UseTokenApprovalParams) => {
  const { address } = useSharedState();
  const [pending, setPending] = useState(false);
  const nativeAmount = decimalToRaw(decimalAmount, decimals);
  const isEnabled = Boolean(spender && address && enabled);

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
    args: [spender, nativeAmount.toString()],
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
      }, 2000); // delay refetch as sometimes the allowance takes some time to reflect
    },
  });

  const allowanceValue = getMessageCallValue(allowanceData);
  const allowanceDecimalAmount = useMemo(
    () => (allowanceValue !== undefined ? rawToDecimal(allowanceValue.toString(), decimals).toNumber() : undefined),
    [allowanceValue, decimals],
  );

  return useMemo<[ApprovalState, typeof mutation]>(() => {
    let state = ApprovalState.UNKNOWN;

    if (address === undefined) state = ApprovalState.NO_ACCOUNT;
    else if (isAllowanceLoading) state = ApprovalState.LOADING;
    else if (!mutation.isReady) state = ApprovalState.UNKNOWN;
    else if (
      allowanceDecimalAmount !== undefined &&
      decimalAmount !== undefined &&
      allowanceDecimalAmount >= decimalAmount
    ) {
      state = ApprovalState.APPROVED;
    } else if (pending || mutation.isLoading) state = ApprovalState.PENDING;
    else if (
      allowanceDecimalAmount !== undefined &&
      decimalAmount !== undefined &&
      allowanceDecimalAmount < decimalAmount
    ) {
      state = ApprovalState.NOT_APPROVED;
    }

    return [state, mutation];
  }, [allowanceDecimalAmount, decimalAmount, mutation, isAllowanceLoading, pending, address]);
};
