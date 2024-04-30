import { Modal } from 'react-daisyui';
import { CloseButton } from '../../../components/CloseButton';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  headerText?: string;
  content: JSX.Element;
  actions: JSX.Element;
  id?: string;
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { visible, onClose, headerText, content, actions, id } = props;

  return (
    <Modal className="bg-base-200 border border-[--modal-border]" open={visible} id={id}>
      <Modal.Header className={`text-2xl claim-title flex mb-5 ${headerText ? 'justify-between' : 'justify-end'}`}>
        {headerText} <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Actions className="justify-center mt-4">{actions}</Modal.Actions>
    </Modal>
  );
};
