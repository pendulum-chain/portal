import Big from "big.js";
import { nativeToDecimal } from "../../../helpers/parseNumbers";
import { Button, Modal } from "react-daisyui";
import { h } from "preact";

interface ConfirmDelegateDialogProps {
  availableBalance?: string;
  delegationAmountDecimal?: string;
  submissionPending?: boolean;
  tokenSymbol: string;
  transactionFee?: Big;
  visible: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
}

function ConfirmDelegateDialog(props: ConfirmDelegateDialogProps) {
  const {
    availableBalance = "0",
    delegationAmountDecimal = "0",
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

  const resultingBalance = Big(balanceDecimal)
    .minus(delegationAmountDecimal)
    .minus(transactionFeeDecimal)
    .toString();

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
          <div className="text-md text-neutral-content">Delegate</div>
          <div className="text-xl mt-2">
            {delegationAmountDecimal} {tokenSymbol}
          </div>
        </div>

        <div className="px-4 bg-base-100 mt-8">
          <div className="flex justify-between">
            <span className="text-neutral-content">Available Balance</span>
            <span>
              {nativeToDecimal(availableBalance)} {tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-neutral-content">Fees</span>
            <span>
              {nativeToDecimal(transactionFee)} {tokenSymbol}
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-4 px-4">
          <span className="text-neutral-content">Resulting Balance</span>
          <span>
            {resultingBalance} {tokenSymbol}
          </span>
        </div>
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button className="px-6" color="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="px-6"
          color="primary"
          loading={submissionPending}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ConfirmDelegateDialog;
