import { Button } from 'react-daisyui';
import Big from 'big.js';

import { useGetAppDataByTenant } from '../../../hooks/useGetAppDataByTenant';
import { NablaInstanceToken } from '../../../hooks/nabla/useNablaInstance';
import { TokenApproval } from '../common/TokenApproval';

export interface ApprovalProps {
  token: NablaInstanceToken | undefined;
  disabled: boolean;
  fromAmount: Big | undefined;
}

const ApprovalSubmit = ({ token, disabled, fromAmount }: ApprovalProps): JSX.Element | null => {
  const { router } = useGetAppDataByTenant('nabla').data || {};

  if (!router || !token) return null;

  const amountPositive = fromAmount?.gt(new Big(0));

  return (
    <TokenApproval
      token={token.id}
      decimals={token.decimals}
      spender={router}
      decimalAmount={fromAmount}
      disabled={disabled}
    >
      <Button color="primary" className="w-full text-base" type="submit" disabled={!amountPositive || disabled}>
        Swap
      </Button>
    </TokenApproval>
  );
};
export default ApprovalSubmit;
