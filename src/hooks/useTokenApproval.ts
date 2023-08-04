/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { mockERC20 } from '../contracts/nabla/MockERC20';
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

const maxInt = decimalToNative(Number.MAX_SAFE_INTEGER).toString();

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
  const amountBI = decimalToNative(amount || 0);
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
        ? async ({ contract, api, walletAccount: { signer } }) => {
            setPending(true);
            return contract.tx
              .approve(createOptions(api), spender, approveMax ? maxInt : amountBI.toString())
              .signAndSend(spender, { signer }, (response: any) => {
                console.log(response);
                refetch();
                if (onSuccess) onSuccess(''); // TODO
                setPending(false);
              });
          }
        : undefined,
    onError: (err) => {
      if (onError) onError(err);
      setPending(false);
    },
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
