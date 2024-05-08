import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import { useGetAppDataByTenant } from '../../../hooks/useGetAppDataByTenant';
import { SwapFormValues } from './schema';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import { TokenApproval } from '../common/TokenApproval';
import Big from 'big.js';

export interface ApprovalProps {
  token: NablaInstanceToken | undefined;
  disabled: boolean;
}

const ApprovalSubmit = ({ token, disabled }: ApprovalProps): JSX.Element | null => {
  const { router } = useGetAppDataByTenant('nabla').data || {};
  const { control } = useFormContext<SwapFormValues>();
  const decimalAmount = new Big(
    useWatch({
      control,
      name: 'fromAmount',
      defaultValue: 0,
    }),
  );

  if (!router || !token) return null;

  return (
    <TokenApproval
      token={token.id}
      decimals={token.decimals}
      spender={router}
      decimalAmount={decimalAmount}
      disabled={disabled}
    >
      <Button color="primary" className="w-full text-base" type="submit" disabled={!decimalAmount || disabled}>
        Swap
      </Button>
    </TokenApproval>
  );
};
export default ApprovalSubmit;
