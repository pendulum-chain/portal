import { Button, ButtonProps } from 'react-daisyui';
import { Big } from 'big.js';

import { ApprovalState, useErc20TokenApproval } from '../../../hooks/nabla/useErc20TokenApproval';
import { useCallback } from 'preact/hooks';
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

  const onClick = useCallback(() => {
    if (state === ApprovalState.PENDING || decimalAmount === undefined) return;

    const nativeAmount = multiplyByPowerOfTen(decimalAmount, decimals);
    mutate([spender, nativeAmount.toFixed()]);
  }, [state, mutate, decimalAmount, decimals, spender]);

  if (state === ApprovalState.APPROVED || !enabled) return <>{children}</>;

  const noAccount = state === ApprovalState.NO_ACCOUNT;
  const isPending = state === ApprovalState.PENDING;
  const isLoading = state === ApprovalState.LOADING;

  return (
    <Button
      className={`w-full${isPending || isLoading ? ' loading' : ''} ${className}`}
      color="primary"
      {...rest}
      type="button"
      disabled={noAccount || isPending || disabled || decimalAmount === undefined}
      onClick={onClick}
    >
      {noAccount ? 'Please connect your wallet' : isPending ? 'Approving' : isLoading ? 'Loading' : 'Approve'}
    </Button>
  );
}
