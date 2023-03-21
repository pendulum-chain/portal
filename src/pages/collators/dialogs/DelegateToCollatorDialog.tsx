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
import { CloseButton } from "../../../components/CloseButton";
import { DelegationMode } from "./ExecuteDelegationDialogs";

interface DelegateToCollatorDialogProps {
  availableBalance?: string;
  collator?: ParachainStakingCandidate;
  inflationInfo?: ParachainStakingInflationInflationInfo;
  minDelegatorStake: string;
  tokenSymbol: string;
  visible: boolean;
  mode: DelegationMode;
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
    mode = 'joining',
  } = props;

  const [amount, setAmount] = useState<string>("");

  const CollatorInfo = useMemo(
    () =>
      collator ? (
        <div className="flex flex-row items-center rounded-lg bg-base-200 justify-between text-right p-5">
          <div className="flex flex-row items-center">
            <AmplitudeLogo className="w-8 h-8 mr-2 bg-base-200" />
            <PublicKey variant="shorter" publicKey={collator.id} />
          </div>
          <div>
            <div className="text-lg">
              APR {inflationInfo?.delegator.rewardRate.annual || "0.00%"}
            </div>
            <div
              className="text-sm text-neutral-content"
              hidden={mode === 'delegatingMore'}
            >
              Min Bond {nativeToDecimal(minDelegatorStake)} {tokenSymbol}
            </div>
          </div>
        </div>
      ) : (
        <div />
      ),
    [collator, inflationInfo, minDelegatorStake, tokenSymbol, isDelegatingMore]
  );

  const titleAction = useMemo(() => mode === 'undelegating' ? "Unbond" : "Delegate", [mode]);
  const available = nativeToDecimal(availableBalance).toFixed(4);

  return (
    <Modal open={visible}>
      <Modal.Header className="font-bold">{titleAction}</Modal.Header>
      <CloseButton onClick={() => {
        setAmount("");
        if (onClose) onClose();
      }} />
      <Modal.Body>
        {CollatorInfo}
        <div className="mt-4" />
        <LabelledInputField
          type="number"
          value={amount}
          onChange={setAmount}
          label="Amount"
          secondaryLabel={`Available: ${available} ${tokenSymbol}`}
          placeholder="Enter amount..."
          extraBtnText="Max"
          extraBtnAction={() => setAmount(available)}
        />
      </Modal.Body>
      <Modal.Actions className="justify-center">
        <Button
          className="px-6"
          color="primary"
          onClick={() => onSubmit && onSubmit(amount)}
        >
          {titleAction}
        </Button>
      </Modal.Actions>

    </Modal>
  );
}

export default DelegateToCollatorDialog;
