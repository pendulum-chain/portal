import { Button, Modal } from "react-daisyui";
import { h } from "preact";

interface DelegationSuccessfulDialogProps {
  visible: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

function DelegationSuccessfulDialog(props: DelegationSuccessfulDialogProps) {
  const { visible, onClose, onConfirm } = props;

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Settlement Confirmation</Modal.Header>
      <Button
        color="ghost"
        size="md"
        shape="circle"
        className="absolute right-4 top-4"
        onClick={onClose}
      >
        ✕
      </Button>
      <Modal.Body>
        <div className="flex flex-col items-center justify-between">
          <div className="text-md text-neutral-content">
            Successfully delegated
          </div>
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button className="px-6" color="primary" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default DelegationSuccessfulDialog;
