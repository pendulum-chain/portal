import { Modal } from 'react-daisyui';
import { CloseButton } from '../../../components/CloseButton';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  headerText: string;
  content: JSX.Element;
  actions: JSX.Element;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { visible, onClose, headerText, content, actions } = props;

  return (
    <Modal className="bg-base-200" open={visible}>
      <Modal.Header className="text-2xl claim-title flex justify-between mb-5">
        {headerText} <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Actions className="justify-center mt-4">{actions}</Modal.Actions>
    </Modal>
  );
};
