import { Button } from 'react-daisyui';
import { useFormContext, useWatch } from 'react-hook-form';
import { addresses } from '../../../contracts/NablaAddresses';
import TokenApproval from '../../Asset/Approval';
import { SwapFormValues } from '../types';

export interface ApprovalProps {
  token: string;
}

const ApprovalSubmit = ({ token }: ApprovalProps): JSX.Element | null => {
  const { control } = useFormContext<SwapFormValues>();
  const amount = Number(
    useWatch({
      control,
      name: 'fromAmount',
    }),
  );
  return (
    <TokenApproval token={token} spender={addresses.foucoco.router} amount={amount}>
      <Button color="primary" className="w-full text-base" type="submit" disabled={!amount}>
        Swap
      </Button>
    </TokenApproval>
  );
};
export default ApprovalSubmit;
