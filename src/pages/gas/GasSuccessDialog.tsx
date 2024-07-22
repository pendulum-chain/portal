import { Button } from 'react-daisyui';
import { FC } from 'preact/compat';
import SuccessDialogIcon from '../../assets/dialog-status-success';
import { Dialog } from '../staking/dialogs/Dialog';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  token: string;
}

export const GasSuccessDialog: FC<DialogProps> = ({ visible, onClose, token }) => {
  const content = (
    <div className="flex flex-col items-center justify-between">
      <SuccessDialogIcon />
      <h2 className="text-xl mt-6">You have successfully purchased {token}!</h2>
      <p className="text-sm dark:text-neutral-400 text-neutral-500 mt-2 mx-4 sm:mx-16 text-center"></p>
    </div>
  );

  const actions = (
    <Button className="px-6 text-neutral" color="primary" onClick={onClose} fullWidth={true}>
      OK
    </Button>
  );

  return <Dialog visible={visible} onClose={onClose} content={content} actions={actions} />;
};
