import { Button, ButtonProps } from 'react-daisyui';
import { toast } from 'react-toastify';
import { ApprovalState, useTokenApproval } from '../../../hooks/useTokenApproval';

export type TokenApprovalProps = ButtonProps & {
  token: string | undefined;
  amount: number;
  /** contract address (eg. router address) */
  spender: string;
  enabled?: boolean;
  children: ReactNode;
};

const TokenApproval = ({
  amount,
  token,
  spender,
  enabled = true,
  children,
  className = '',
  ...rest
}: TokenApprovalProps): JSX.Element | null => {
  const approval = useTokenApproval({
    amount,
    token,
    spender,
    approveMax: true,
    enabled,
    onError: (_err) => {
      toast('Please approve transaction.', { type: toast.TYPE.ERROR });
    },
  });

  if (approval[0] === ApprovalState.APPROVED || !enabled) return <>{children}</>;
  const isPending = approval[0] === ApprovalState.PENDING;
  const isLoading = approval[0] === ApprovalState.LOADING;
  return (
    <Button
      className={`w-full${isPending || isLoading ? ' loading' : ''} ${className}`}
      color="primary"
      {...rest}
      type="button"
      disabled={isPending}
      onClick={isPending ? undefined : () => approval[1].mutate()}
    >
      {isPending ? 'Approving' : isLoading ? 'Loading' : 'Approve'}
    </Button>
  );
};
export default TokenApproval;
