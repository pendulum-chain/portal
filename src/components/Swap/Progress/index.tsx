import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UseMutationResult } from '@tanstack/react-query';
import { ComponentChildren, JSX } from 'preact';
import { Button, Modal, ModalProps } from 'react-daisyui';
import Spinner from '../../../assets/spinner';

export type ProgressProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress?: UseMutationResult<any, any, any, any>;
  status?: UseMutationResult['status'];
  onClose: () => void;
  children?: ComponentChildren;
} & ModalProps;

const Progress = ({ data, status, onClose, children, ...rest }: ProgressProps): JSX.Element | null => {
  let ui = null;
  if (data) {
    if (status === 'idle' || status === 'loading') {
      ui = (
        <>
          <div className="center py-6">
            <Spinner size={100} color="#ddd" />
          </div>
          <div className="text-center mt-6">
            <h4 className="text-2xl font-bold text-bold">Waiting for confirmation</h4>
            <p className="text-neutral-400 my-4">Confirm this transaction in your wallet</p>
            {children}
          </div>
        </>
      );
    } else {
      const isSuccess = status === 'success';
      ui = (
        <>
          <div className="center mt-6">
            {isSuccess ? (
              <CheckCircleIcon className="w-32 h-32 text-green-400" />
            ) : (
              <ExclamationCircleIcon className="w-32 h-32 text-red-400" />
            )}
          </div>
          <div className="text-center mt-6">
            <h4 className="text-2xl font-bold text-bold">
              {status ? 'Transaction successfull' : 'Transaction failed'}
            </h4>
          </div>
          {children}
          <Button color="primary" className="w-full mt-6" onClick={onClose}>
            Close
          </Button>
          <Button
            tag="a"
            href="#! TODO"
            rel="noopener noreferrer"
            onClick={onClose}
            color="secondary"
            className="w-full mt-2"
          >
            Transaction details
          </Button>
        </>
      );
    }
  }

  return (
    <Modal {...rest}>
      <Modal.Header className="mb-0">
        <Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={onClose} type="button">
          ✕
        </Button>
      </Modal.Header>
      <Modal.Body>{ui}</Modal.Body>
    </Modal>
  );
};
export default Progress;
