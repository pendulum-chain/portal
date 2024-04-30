import Big from 'big.js';
import { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { nativeToDecimal, nativeToFormatMetric } from '../../../shared/parseNumbers/metric';
import { DelegationMode } from './ExecuteDelegationDialogs';
import { Dialog } from './Dialog';

interface ConfirmDelegateDialogProps {
  availableBalance?: string;
  delegationAmountDecimal?: string;
  submissionPending?: boolean;
  tokenSymbol?: string;
  transactionFee?: Big;
  visible: boolean;
  mode: DelegationMode;
  onCancel?: () => void;
  onClose: () => void;
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
  const transactionFeeDecimal = nativeToDecimal(transactionFee.toFixed(2));
  const [collapseVisibility, setCollapseVisibility] = useState('');

  const resultingBalance =
    mode === 'unstaking'
      ? Big(balanceDecimal).plus(delegationAmountDecimal).minus(transactionFeeDecimal).toFixed(2)
      : Big(balanceDecimal).minus(delegationAmountDecimal).minus(transactionFeeDecimal).toFixed(2);

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

  const titleAction = useMemo(() => (mode === 'unstaking' ? 'Unstake' : 'Stake'), [mode]);

  const content = useMemo(
    () => (
      <>
        <div className="flex flex-col items-center justify-between">
          <div className="text-md text-neutral-content">{mode === 'unstaking' ? 'Unstake' : 'Delegate'}</div>
          <div className="text-xl mt-2">
            {delegationAmountDecimal} {tokenSymbol}
          </div>
        </div>
        <div className="flex justify-between px-4 mt-3">
          <span className="text-neutral-content">Available balance</span>
          <span>
            {nativeToDecimal(availableBalance).toFixed(2)} {tokenSymbol}
          </span>
        </div>
        <div
          tabIndex={0}
          onClick={toggle}
          className={`collapse cursor-pointer collapse-arrow bg-base-300 rounded-lg my-1 ${collapseVisibility}`}
        >
          <div className="collapse-title">
            <div className="flex justify-between">
              <span className="text-neutral-content">Resulting balance</span>
              <span>
                {resultingBalance} {tokenSymbol}
              </span>
            </div>
          </div>
          <div className="collapse-content">
            <div className="flex justify-between mt-4">
              <span className="text-neutral-content">Fees</span>
              <span>{nativeToFormatMetric(transactionFee, tokenSymbol)}</span>
            </div>
          </div>
        </div>
      </>
    ),
    [
      availableBalance,
      collapseVisibility,
      delegationAmountDecimal,
      mode,
      resultingBalance,
      toggle,
      tokenSymbol,
      transactionFee,
    ],
  );

  const actions = useMemo(
    () => (
      <div className="flex-col align-center w-full">
        <Button className="px-6 w-full mb-2" color="primary" loading={submissionPending} onClick={onConfirm}>
          {titleAction}
        </Button>
        <Button className="px-6 w-full mr-0 ml-0" color="primary" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    ),
    [onCancel, onConfirm, submissionPending, titleAction],
  );

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      headerText="Settlement Confirmation"
      content={content}
      actions={actions}
    />
  );
}

export default ConfirmDelegateDialog;
