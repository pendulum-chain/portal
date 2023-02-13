import {
  ParachainStakingCandidate,
  ParachainStakingInflationInflationInfo,
} from "../../../hooks/staking/staking";
import { useMemo, useState } from "preact/hooks";
import AmplitudeLogo from "../../../assets/AmplitudeLogo";
import { PublicKey } from "../../../components/PublicKey";
import { nativeToDecimal } from "../../../helpers/parseNumbers";
import { Button, Modal } from "react-daisyui";
import LabelledInputField from "../../../components/LabelledInputField";
import { h } from "preact";

interface DelegateToCollatorDialogProps {
  availableBalance?: string;
  collator?: ParachainStakingCandidate;
  inflationInfo?: ParachainStakingInflationInflationInfo;
  minDelegatorStake: string;
  tokenSymbol: string;
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (amount: string) => void;
}

function DelegateToCollatorDialog(props: DelegateToCollatorDialogProps) {
  const {
    availableBalance = "0",
    collator,
    inflationInfo,
    minDelegatorStake,
    tokenSymbol,
    visible,
    onClose,
    onSubmit,
  } = props;

  const [amount, setAmount] = useState<string>("");

  const CollatorInfo = useMemo(
    () =>
      collator ? (
        <div className="flex flex-row items-center bg-base-100 justify-between text-right px-2">
          <div className="flex flex-row items-center">
            <AmplitudeLogo className="w-8 h-8 mr-2" />
            <PublicKey variant="shorter" publicKey={collator.id} />
          </div>
          <div>
            <div className="text-lg">
              APR {inflationInfo?.delegator.rewardRate.annual || "0.00%"}
            </div>
            <div className="text-sm text-neutral-content">
              Min Bond {nativeToDecimal(minDelegatorStake)} {tokenSymbol}
            </div>
          </div>
        </div>
      ) : (
        <div />
      ),
    [collator, inflationInfo, minDelegatorStake, tokenSymbol]
  );

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">Delegate</Modal.Header>
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
        {CollatorInfo}
        <div className="mt-4" />
        <LabelledInputField
          type="number"
          value={amount}
          onChange={setAmount}
          label="Amount"
          secondaryLabel={`Available: ${nativeToDecimal(
            availableBalance
          ).toFixed(4)} ${tokenSymbol}`}
          placeholder="Enter amount..."
        />
      </Modal.Body>

      <Modal.Actions className="justify-center">
        <Button
          className="px-6"
          color="primary"
          onClick={() => onSubmit && onSubmit(amount)}
        >
          Delegate
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default DelegateToCollatorDialog;
