import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UseMutationResult } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'react-daisyui';
import Spinner from '../../../assets/spinner';
import { SwapTransaction } from '../../../models/Swap';

export type ProgressProps = {
  transaction?: SwapTransaction;
  status?: UseMutationResult['status'];
  onClose: () => void;
} & ModalProps;

const Progress = ({ transaction, status, onClose, ...rest }: ProgressProps): JSX.Element | null => {
  let ui = null;
  if (transaction) {
    if (status === 'idle' || status === 'loading') {
      const isLoading = status === 'loading';
      ui = (
        <>
          <div className="center py-6">
            <Spinner size={100} color="#ddd" />
          </div>
          <div className="text-center mt-6">
            <h4 className="text-2xl font-bold text-bold">
              {!isLoading && (
                <>
                  Waiting for confirmation <br />
                </>
              )}
              Swapping {transaction.fromAmount} {transaction.from} for {transaction.toAmount} {transaction.to}
            </h4>
            {!isLoading && <p className="text-gray-400 mt-4">Confirm this transaction in your wallet</p>}
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
