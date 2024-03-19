import { Button } from 'react-daisyui';
import SuccessDialogIcon from '../../../assets/dialog-status-success';
import { Dialog } from './Dialog';

interface DelegationSuccessfulDialogProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

function DelegationSuccessfulDialog(props: DelegationSuccessfulDialogProps) {
  const { visible, message, onClose, onConfirm } = props;

  const content = (
    <div className="flex flex-col items-center justify-between">
      <SuccessDialogIcon />
      <div className="mt-4" />
      <div className="text-md text-neutral-content">{message}</div>
    </div>
  );

  const actions = (
    <Button className="px-6" color="primary" onClick={onConfirm} fullWidth={true}>
      OK
    </Button>
  );

  return <Dialog visible={visible} onClose={onClose} content={content} actions={actions} />;
}

export default DelegationSuccessfulDialog;
