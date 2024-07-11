import { FC } from 'preact/compat';
import { Button } from 'react-daisyui';

export interface ClaimButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const ClaimButton: FC<ClaimButtonProps> = ({ onClick, disabled }) => (
  <Button
    onClick={onClick}
    className="btn btn-primary btn-outline rounded-md w-full xs:w-1/2 leading-3 p-0 min-h-fit max-h-10"
    disabled={disabled}
  >
    Claim
  </Button>
);
