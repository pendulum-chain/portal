import { Button, ButtonProps } from 'react-daisyui';
import { ApprovalState, useErc20TokenApproval } from '../../../hooks/nabla/useErc20TokenApproval';

export type TokenApprovalProps = ButtonProps & {
  token: string;
  decimalAmount: number;
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
  const approval = useErc20TokenApproval({
    decimalAmount,
    token,
    spender,
    enabled,
    decimals,
  });

  if (approval[0] === ApprovalState.APPROVED || !enabled) return <>{children}</>;

  const noAccount = approval[0] === ApprovalState.NO_ACCOUNT;
  const isPending = approval[0] === ApprovalState.PENDING;
  const isLoading = approval[0] === ApprovalState.LOADING;

  return (
    <Button
      className={`w-full${isPending || isLoading ? ' loading' : ''} ${className}`}
      color="primary"
      {...rest}
      type="button"
      disabled={noAccount || isPending || disabled}
      onClick={isPending ? undefined : () => approval[1].mutate()}
    >
      {noAccount ? 'Please connect your wallet' : isPending ? 'Approving' : isLoading ? 'Loading' : 'Approve'}
    </Button>
  );
}
