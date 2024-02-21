import { Button, ButtonProps } from 'react-daisyui';
import { ApprovalState, useTokenApproval } from '../../../shared/useTokenApproval';

export type TokenApprovalProps = ButtonProps & {
  token: string;
  decimalAmount: number;
  /** contract address (eg. router address) */
  spender: string;
  enabled?: boolean;
  children: ReactNode;
  decimals: number;
};

const TokenApproval = ({
  decimalAmount,
  token,
  spender,
  decimals,
  enabled = true,
  children,
  className = '',
  ...rest
}: TokenApprovalProps): JSX.Element | null => {
  const approval = useTokenApproval({
    decimalAmount,
    token,
    spender,
    enabled,
    decimals,
  });
  console.log('Approval button', approval[0], ApprovalState);

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
      disabled={noAccount || isPending}
      onClick={isPending ? undefined : () => approval[1].mutate()}
    >
      {noAccount ? 'Please connect your wallet' : isPending ? 'Approving' : isLoading ? 'Loading' : 'Approve'}
    </Button>
  );
};
export default TokenApproval;
