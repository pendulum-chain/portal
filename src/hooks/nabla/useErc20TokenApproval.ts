/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'preact/compat';
import { erc20WrapperAbi } from '../../contracts/nabla/ERC20Wrapper';
import { getMessageCallValue } from '../../shared/helpers';
import { decimalToRaw, rawToDecimal } from '../../shared/parseNumbers/metric';
import { useSharedState } from '../../shared/Provider';
import { useErc20TokenAllowance } from './useErc20TokenAllowance';
import { UseContractWriteProps, useContractWrite } from './useContractWrite';

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
  onSuccess?: UseContractWriteProps<Dict>['mutateOptions']['onSuccess'];
}

export function useErc20TokenApproval({
  token,
  decimalAmount,
  spender,
  enabled = true,
  decimals,
  onError,
  onSuccess,
}: UseTokenApprovalParams) {
  const { address } = useSharedState();
  const [pending, setPending] = useState(false);
  const nativeAmount = decimalToRaw(decimalAmount, decimals);
  const isEnabled = Boolean(spender && address && enabled);

  const {
    data: allowanceData,
    isLoading: isAllowanceLoading,
    refetch,
  } = useErc20TokenAllowance(
    {
      token,
      owner: address,
      spender,
    },
    isEnabled,
  );

  const mutation = useContractWrite({
    abi: erc20WrapperAbi,
    address: token,
    method: 'approve',
    args: [spender, nativeAmount.toString()],
    mutateOptions: {
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
}
