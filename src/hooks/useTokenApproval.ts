import { useCallback, useMemo, useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { inactiveOptions } from '../constants/cache';
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
  onError?: (err: Error) => void;
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
  const amountBI = parseEther(`${amount || 0}`);
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

  const { config } = usePrepareContractWrite({
    ...inactiveOptions['1m'],
    abi: erc20ABI,
    address: token,
    functionName: 'approve',
    args: [spender, approveMax ? MaxUint256.toBigInt() : amountBI],
    enabled: isEnabled && allowance !== undefined && !isAllowanceLoading,
  });

  const onSettledFn = useCallback(
    (data: SendTransactionResult | undefined, e: Error | null) => {
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
    async (data: WriteContractResult) => {
      setPending(true);
      const trx = data?.hash ? await waitForTransaction({ hash: data.hash }) : undefined;
      if (trx) await refetch();
      setPending(false);
    },
    [refetch],
  );

  const execute = useContractWrite({
    ...config,
    onError,
    onSettled: onSettledFn,
    onSuccess: onSuccessFn,
  });

  return useMemo(() => {
    let state = ApprovalState.UNKNOWN;
    // if (amount?.currency.isNative) state = ApprovalState.APPROVED;
    if (!execute.write) state = ApprovalState.UNKNOWN;
    else if (allowance !== undefined && amountBI !== undefined && allowance >= amountBI) {
      state = ApprovalState.APPROVED;
    } else if (pending || execute.isLoading) state = ApprovalState.PENDING;
    else if (isAllowanceLoading) state = ApprovalState.LOADING;
    else if (allowance !== undefined && amountBI !== undefined && allowance < amountBI) {
      state = ApprovalState.NOT_APPROVED;
    }
    return [state, execute];
  }, [allowance, amountBI, execute, isAllowanceLoading, pending]);
};
