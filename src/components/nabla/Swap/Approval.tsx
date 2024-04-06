import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import { useGetAppDataByTenant } from '../../../hooks/useGetAppDataByTenant';
import TokenApproval from '../../Asset/Approval';
import { SwapFormValues } from './schema';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';

export interface ApprovalProps {
  token: NablaInstanceToken | undefined;
}

const ApprovalSubmit = ({ token }: ApprovalProps): JSX.Element | null => {
  const { router } = useGetAppDataByTenant('nabla').data || {};
  const { control } = useFormContext<SwapFormValues>();
  const decimalAmount = Number(
    useWatch({
      control,
      name: 'fromAmount',
      defaultValue: 0,
    }),
  );

  if (!router || !token) return null;

  return (
    <TokenApproval token={token.id} decimals={token.decimals} spender={router} decimalAmount={decimalAmount}>
      <Button color="primary" className="w-full text-base" type="submit" disabled={!decimalAmount}>
        Swap
      </Button>
    </TokenApproval>
  );
};
export default ApprovalSubmit;
