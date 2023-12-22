import Big from 'big.js';
import { useCallback, useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { CloseButton } from '../../../components/CloseButton';
import { nativeToDecimal } from '../../../shared/parseNumbers';
import { DelegationMode } from './ExecuteDelegationDialogs';

interface ConfirmDelegateDialogProps {
  availableBalance?: string;
  delegationAmountDecimal?: string;
  submissionPending?: boolean;
  tokenSymbol?: string;
  transactionFee?: Big;
  visible: boolean;
  mode: DelegationMode;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
}

function ConfirmDelegateDialog(props: ConfirmDelegateDialogProps) {
  const {
    availableBalance = '0',
    delegationAmountDecimal = '0',
    mode,
    tokenSymbol,
    visible,
    transactionFee = Big(0),
    submissionPending = false,
    onCancel,
    onClose,
    onConfirm,
  } = props;

  const balanceDecimal = nativeToDecimal(availableBalance);
  const transactionFeeDecimal = nativeToDecimal(transactionFee.toString());
  const [collapseVisibility, setCollapseVisibility] = useState('');

  const resultingBalance =
    mode === 'unstaking'
      ? Big(balanceDecimal).plus(delegationAmountDecimal).minus(transactionFeeDecimal).toString()
      : Big(balanceDecimal).minus(delegationAmountDecimal).minus(transactionFeeDecimal).toString();

  const toggle = useCallback(() => {
    if (collapseVisibility === '') {
      setCollapseVisibility('collapse-open');
    } else {
      setCollapseVisibility('');
      const elem = document.activeElement;
      if (elem && elem instanceof HTMLElement) {
        elem.blur();
      }
    }
  }, [collapseVisibility, setCollapseVisibility]);

  return (
    <Modal open={visible} className="bg-base-200 rounded-md">
      <Modal.Header className="text-2xl">Settlement Confirmation</Modal.Header>
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-between">
          <div className="text-md text-neutral-content">{mode === 'unstaking' ? 'Unstake' : 'Delegate'}</div>
          <div className="text-xl mt-2">
            {delegationAmountDecimal} {tokenSymbol}
          </div>
        </div>
        <div className="flex justify-between px-2 mt-3">
          <span className="text-neutral-content">Available Balance</span>
          <span>
            {nativeToDecimal(availableBalance).toString()} {tokenSymbol}
          </span>
        </div>
        <div
          tabIndex={0}
          onClick={toggle}
          className={`collapse cursor-pointer collapse-arrow bg-base-300 rounded-lg my-1 ${collapseVisibility}`}
        >
          <div className="collapse-title">
            <div className="flex justify-between">
              <span className="text-neutral-content">Balance</span>
              <span>
                {resultingBalance} {tokenSymbol}
              </span>
            </div>
          </div>
          <div className="collapse-content">
            <div className="flex justify-between mt-4">
              <span className="text-neutral-content">Fees</span>
              <span>
                {nativeToDecimal(transactionFee).toString()} {tokenSymbol}
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Actions className="flex-col align-center">
        <Button className="px-6 w-full mb-2" color="primary" loading={submissionPending} onClick={onConfirm}>
          Stake
        </Button>
        <Button className="px-6 w-full mr-0 ml-0" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmDelegateDialog;
