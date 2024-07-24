import { FC } from 'preact/compat';
import { Button } from 'react-daisyui';
import SuccessDialogIcon from '../../assets/dialog-status-success';
import { Dialog } from '../../components/Dialog';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  token: string;
}

export const GasSuccessDialog: FC<DialogProps> = ({ visible, onClose, token }) => {
  const content = (
    <div className="flex flex-col items-center justify-between">
      <SuccessDialogIcon />
      <h2 className="mt-6 text-xl">You have successfully purchased {token}!</h2>
      <p className="mx-4 mt-2 text-sm text-center dark:text-neutral-400 text-neutral-500 sm:mx-16"></p>
    </div>
  );

  const actions = (
    <Button className="px-6 text-neutral" color="primary" onClick={onClose} fullWidth={true}>
      OK
    </Button>
  );

  return <Dialog visible={visible} onClose={onClose} content={content} actions={actions} />;
};
