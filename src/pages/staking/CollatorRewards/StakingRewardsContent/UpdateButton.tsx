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
    className="btn btn-primary w-full xs:w-1/2 xs:mr-2 mb-2 rounded-md p-0 leading-3 min-h-fit max-h-10"
    disabled={disabled || loading}
  >
    {loading ? '' : 'Update'}
  </Button>
);
