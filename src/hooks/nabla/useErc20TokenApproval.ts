/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'preact/compat';
import { Big } from 'big.js';

import { erc20WrapperAbi } from '../../contracts/nabla/ERC20Wrapper';
import { getMessageCallValue } from '../../shared/helpers';
import { rawToDecimal } from '../../shared/parseNumbers/metric';
import { useSharedState } from '../../shared/Provider';
import { useErc20TokenAllowance } from './useErc20TokenAllowance';
import { UseContractWriteProps, UseContractWriteResult, useContractWrite } from './useContractWrite';

export enum ApprovalState {
  UNKNOWN,
  LOADING,
  PENDING,
  NOT_APPROVED,
  APPROVED,
  NO_ACCOUNT,
}

interface UseErc20TokenApprovalParams {
  spender: string;
  token: string;
  decimalAmount: Big | undefined;
  decimals: number;
  onError?: (err: any) => void;
  onSuccess?: UseContractWriteProps<Dict>['mutateOptions']['onSuccess'];
}

interface UseErc20TokenApprovalResult {
  state: ApprovalState;
  mutate: UseContractWriteResult['mutate'];
}

export function useErc20TokenApproval({
  token,
  decimalAmount,
  spender,
  decimals,
  onError,
  onSuccess,
}: UseErc20TokenApprovalParams): UseErc20TokenApprovalResult {
  const { address } = useSharedState();
  const [pending, setPending] = useState(false);

  const isEnabled = Boolean(spender && address);

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
    () => (allowanceValue !== undefined ? rawToDecimal(allowanceValue.toString(), decimals) : undefined),
    [allowanceValue, decimals],
  );

  return useMemo(() => {
    let state = ApprovalState.UNKNOWN;

    if (address === undefined) state = ApprovalState.NO_ACCOUNT;
    else if (isAllowanceLoading) state = ApprovalState.LOADING;
    else if (!mutation.isReady) state = ApprovalState.UNKNOWN;
    else if (
      allowanceDecimalAmount !== undefined &&
      decimalAmount !== undefined &&
      allowanceDecimalAmount.gte(decimalAmount)
    ) {
      state = ApprovalState.APPROVED;
    } else if (pending || mutation.isLoading) state = ApprovalState.PENDING;
    else if (
      allowanceDecimalAmount !== undefined &&
      decimalAmount !== undefined &&
      allowanceDecimalAmount.lt(decimalAmount)
    ) {
      state = ApprovalState.NOT_APPROVED;
    }

    return { state, mutate: mutation.mutate };
  }, [allowanceDecimalAmount, decimalAmount, mutation, isAllowanceLoading, pending, address]);
}
