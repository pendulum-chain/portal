import { Button, Modal } from 'react-daisyui';
import SuccessDialogIcon from '../../assets/dialog-status-success';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
}

export const GasSuccessDialog: React.FC<DialogProps> = (props) => {
  const { visible, onClose } = props;

  const content = (
    <div className="flex flex-col items-center justify-between">
      <SuccessDialogIcon />
      <h2 className="text-xl mt-6">You have successfully got AMPE!</h2>
      <p className="text-sm dark:text-neutral-400 text-neutral-500 mt-2 mx-4 sm:mx-16 text-center"></p>
    </div>
  );

  const actions = (
    <Button className="px-6 text-black" color="primary" onClick={onClose} fullWidth={true}>
      OK
    </Button>
  );

  return (
    <Modal className="bg-base-200" open={visible}>
      <Modal.Header className={`text-2xl claim-title flex mb-5 justify-end`}>
        <button onClick={onClose} className="btn btn-ghost">
          x
        </button>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Actions className="justify-center mt-4">{actions}</Modal.Actions>
    </Modal>
  );
};
