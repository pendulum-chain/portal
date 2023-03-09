import Big from "big.js";
import { nativeToDecimal } from "../../../helpers/parseNumbers";
import { Button, Modal } from "react-daisyui";
import { h } from "preact";
import { CloseButton } from "../../../components/CloseButton";

interface ConfirmDelegateDialogProps {
  availableBalance?: string;
  delegationAmountDecimal?: string;
  submissionPending?: boolean;
  tokenSymbol?: string;
  isDelegatingMore: boolean;
  isDelegatingLess: boolean;
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
    isDelegatingMore,
    isDelegatingLess,
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

  const resultingBalance = isDelegatingLess ?
    Big(balanceDecimal)
      .plus(delegationAmountDecimal)
      .minus(transactionFeeDecimal)
      .toString() :
    Big(balanceDecimal)
      .minus(delegationAmountDecimal)
      .minus(transactionFeeDecimal)
      .toString();

  return (
    <Modal open={visible}>
      <Modal.Header className="text-2xl">Settlement Confirmation</Modal.Header>
      <CloseButton onClick={onClose} />
      <Modal.Body>
        <div className="flex flex-col items-center justify-between">
          <div className="text-md text-neutral-content">Delegate</div>
          <div className="text-xl mt-2">
            {delegationAmountDecimal} {tokenSymbol}
          </div>
        </div>

        <div className="rounded-md px-4 py-4 mt-8 bg-slate-50 bg-opacity-5">
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
        <p className="text-slate-400 mt-6 mb-4 mx-auto w-fit"> This transaction might take a while to complete. </p>
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
