import { JSX } from 'preact';
import { Modal } from 'react-daisyui';
import ModalCloseButton from '../../../Button/ModalClose';
import TransactionProgress, { TransactionProgressProps } from '../../../Transaction/Progress';

export type SwapProgressProps = {
  open: boolean;
  children?: JSX.Element | null;
  onClose: () => void;
  mutation?: TransactionProgressProps['mutation'];
};

const SwapProgress = ({ mutation, children, ...rest }: SwapProgressProps): JSX.Element | null => {
  return (
    <Modal className="modal-top bg-[--bg-modal]" {...rest}>
      <Modal.Header className="mb-0">
        <ModalCloseButton onClick={rest.onClose} />
      </Modal.Header>
      <Modal.Body>
        {!!mutation && (
          <TransactionProgress mutation={mutation} onClose={rest.onClose}>
            {children}
          </TransactionProgress>
        )}
      </Modal.Body>
    </Modal>
  );
};
export default SwapProgress;
