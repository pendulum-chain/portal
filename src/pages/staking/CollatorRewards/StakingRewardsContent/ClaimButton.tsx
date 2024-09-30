import { FC } from 'preact/compat';
import { Button } from 'react-daisyui';

export interface ClaimButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const ClaimButton: FC<ClaimButtonProps> = ({ onClick, disabled }) => (
  <Button
    onClick={onClick}
    className="btn btn-outline btn-primary max-h-10 min-h-fit w-full rounded-md p-0 leading-3 xs:w-1/2"
    disabled={disabled}
  >
    Claim
  </Button>
);
