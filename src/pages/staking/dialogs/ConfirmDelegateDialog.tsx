import Big from 'big.js';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { Button } from 'react-daisyui';

import { nativeToDecimal, nativeToFormatMetric } from '../../../shared/parseNumbers/metric';
import { Dialog } from '../../../components/Dialog';
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
          <div className="mt-2 text-xl">
            {delegationAmountDecimal} {tokenSymbol}
          </div>
        </div>
        <div className="mt-3 flex justify-between px-4">
          <span className="text-neutral-content">Available balance</span>
          <span>
            {nativeToDecimal(availableBalance).toFixed(2)} {tokenSymbol}
          </span>
        </div>
        <div
          tabIndex={0}
          onClick={toggle}
          className={`collapse collapse-arrow my-1 cursor-pointer rounded-lg bg-base-300 ${collapseVisibility}`}
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
            <div className="mt-4 flex justify-between">
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
      <div className="align-center w-full flex-col">
        <Button
          className="mb-2 w-full px-6"
          color="primary"
          loading={submissionPending}
          onClick={onConfirm}
          disabled={submissionPending}
        >
          {titleAction}
        </Button>
        <Button className="ml-0 mr-0 w-full px-6" color="primary" variant="outline" onClick={onCancel}>
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
