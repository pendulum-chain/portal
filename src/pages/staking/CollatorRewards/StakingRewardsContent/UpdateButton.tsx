import { FC } from 'preact/compat';
import { Button } from 'react-daisyui';

export interface UpdateButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const UpdateButton: FC<UpdateButtonProps> = ({ loading, disabled, onClick }) => (
  <Button
    loading={loading}
    onClick={onClick}
    className="btn btn-primary mb-2 max-h-10 min-h-fit w-full rounded-md p-0 leading-3 xs:mr-2 xs:w-1/2"
    disabled={disabled || loading}
  >
    {loading ? '' : 'Update'}
  </Button>
);
