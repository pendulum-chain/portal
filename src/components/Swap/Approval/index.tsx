import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import { nablaConfig } from '../../../config/apps/nabla';
import { useGetTenantData } from '../../../hooks/useGetTenantData';
import TokenApproval from '../../Asset/Approval';
import { SwapFormValues } from '../types';

export interface ApprovalProps {
  token: string;
}

const ApprovalSubmit = ({ token }: ApprovalProps): JSX.Element | null => {
  const { router } = useGetTenantData(nablaConfig) || {};
  const { control } = useFormContext<SwapFormValues>();
  const amount = Number(
    useWatch({
      control,
      name: 'fromAmount',
      defaultValue: 0,
    }),
  );
  return (
    <TokenApproval token={token} spender={router} amount={amount}>
      <Button color="primary" className="w-full text-base" type="submit" disabled={!amount}>
        Swap
      </Button>
    </TokenApproval>
  );
};
export default ApprovalSubmit;
