import { Button, ButtonProps } from 'react-daisyui';
import { useCallback } from 'preact/hooks';
import { Big } from 'big.js';

import { ApprovalState, useErc20TokenApproval } from '../../../hooks/nabla/useErc20TokenApproval';
import { multiplyByPowerOfTen } from '../../../shared/parseNumbers/metric';

export type TokenApprovalProps = ButtonProps & {
  token: string;
  decimalAmount: Big | undefined;
  /** contract address (eg. router address) */
  spender: string;
  enabled?: boolean;
  children: ReactNode;
  decimals: number;
  disabled?: boolean;
};

export function TokenApproval({
  decimalAmount,
  token,
  spender,
  decimals,
  enabled = true,
  children,
  className = '',
  disabled,
  ...rest
}: TokenApprovalProps): JSX.Element | null {
  const { state, mutate } = useErc20TokenApproval({
    decimalAmount,
    token,
    spender,
    decimals,
  });

  const isApprovalPending = state === ApprovalState.PENDING;
  const isNoAccount = state === ApprovalState.NO_ACCOUNT;
  const isLoading = state === ApprovalState.LOADING;
  const isApproved = state === ApprovalState.APPROVED;

  const onClick = useCallback(() => {
    if (isApprovalPending || !decimalAmount) return;

    const nativeAmount = multiplyByPowerOfTen(decimalAmount, decimals);
    mutate([spender, nativeAmount.round(0, 0).toFixed()]);
  }, [isApprovalPending, mutate, decimalAmount, decimals, spender]);

  if (isApproved || !enabled) return children;

  const isDisabled = isNoAccount || isApprovalPending || disabled || !decimalAmount;

  const buttonText = isNoAccount
    ? 'Please connect your wallet'
    : isApprovalPending
      ? 'Approving'
      : isLoading
        ? 'Loading'
        : 'Approve';

  return (
    <Button
      className={`w-full ${className}`}
      color="primary"
      {...rest}
      type="button"
      loading={isApprovalPending || isLoading}
      disabled={isDisabled}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}
