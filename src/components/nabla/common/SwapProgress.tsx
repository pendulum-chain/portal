import { JSX } from 'preact';
import { Modal } from 'react-daisyui';
import ModalCloseButton from '../../Button/ModalClose';
import { TransactionProgress, TransactionProgressProps } from '../common/TransactionProgress';

export type SwapProgressProps = {
  open: boolean;
  children?: JSX.Element | null;
  onClose: () => void;
  mutation?: TransactionProgressProps['mutation'];
};

export function SwapProgress({ mutation, children, ...rest }: SwapProgressProps) {
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
}
