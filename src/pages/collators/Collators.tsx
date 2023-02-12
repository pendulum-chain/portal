import { Button, Modal } from "react-daisyui";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { h } from "preact";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { decimalToNative, nativeToDecimal } from "../../helpers/parseNumbers";
import { useSortBy, useTable } from "react-table";
import { Option } from "@polkadot/types-codec";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { PublicKey } from "../../components/PublicKey";
import LabelledInputField from "../../components/LabelledInputField";
import AmplitudeLogo from "../../assets/AmplitudeLogo";
import Big from "big.js";
import { useGlobalState } from "../../GlobalStateProvider";
import {
  ParachainStakingCandidate,
  ParachainStakingInflationInflationInfo,
  useStakingPallet,
} from "../../hooks/staking/staking";
import { getErrors, getEventBySectionAndMethod } from "../../helpers/substrate";
import { toast } from "react-toastify";

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

export function Collators() {
  const { api, tokenSymbol, chain } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const {
    candidates,
    minDelegatorStake,
    inflationInfo,
    joinDelegatorsTransactionFee,
    createJoinDelegatorsExtrinsic,
  } = useStakingPallet();

  // Holds the candidate for which the delegation modal is to be shown
  const [selectedCandidateForDelegation, setSelectedCandidateForDelegation] =
    useState<ParachainStakingCandidate | undefined>(undefined);
  // Holds the amount that is to be delegated to the candidate
  const [delegationAmount, setDelegationAmount] = useState<string | undefined>(
    undefined
  );

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>("0");
  const [submissionPending, setSubmissionPending] = useState<boolean>(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchAvailableBalance = async () => {
      if (!api || !walletAccount) {
        return "0";
      }

      const { data: balance } = await api.query.system.account(
        walletAccount?.address
      );
      return balance.free.toHuman() as string;
    };

    fetchAvailableBalance().then((balance) => setUserAvailableBalance(balance));
  }, [api, walletAccount]);

  const submitJoinDelegatorsExtrinsic = useCallback(() => {
    if (
      !walletAccount ||
      !api ||
      !delegationAmount ||
      !selectedCandidateForDelegation
    ) {
      return;
    }

    const amount = decimalToNative(delegationAmount);
    const joinDelegatorsExtrinsic = createJoinDelegatorsExtrinsic(
      selectedCandidateForDelegation.id,
      amount.toString()
    );

    setSubmissionPending(true);

    joinDelegatorsExtrinsic
      ?.signAndSend(
        walletAccount.address,
        { signer: walletAccount.signer as any },
        (result) => {
          const { status, events } = result;

          const errors = getErrors(events, api);
          if (status.isInBlock) {
            if (errors.length > 0) {
              const errorMessage = `Transaction failed with errors: ${errors.join(
                "\n"
              )}`;
              console.error(errorMessage);
              toast(errorMessage, { type: "error" });
            }
          } else if (status.isFinalized) {
            setSubmissionPending(false);

            if (errors.length === 0) {
              setConfirmationDialogVisible(true);
              setSelectedCandidateForDelegation(undefined);
              setDelegationAmount(undefined);
            }
          }
        }
      )
      .catch((error) => {
        console.error("Transaction submission failed", error);
        toast("Transaction submission failed", { type: "error" });
        setSubmissionPending(false);
      });
  }, [
    api,
    createJoinDelegatorsExtrinsic,
    delegationAmount,
    selectedCandidateForDelegation,
    walletAccount,
  ]);

  const data = useMemo(
    () =>
      candidates.map((candidate) => {
        const totalStaked = nativeToDecimal(candidate.total);

        const rowItem = {
          candidate: candidate,
          collator: candidate.id,
          totalStaked: totalStaked.toFixed(2) + ` ${tokenSymbol}`,
          delegators: candidate.delegators.length,
          apy: inflationInfo?.collator.rewardRate.annual || "0.00%",
        };
        return rowItem;
      }),
    [candidates, inflationInfo?.collator.rewardRate.annual, tokenSymbol]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Collator",
        accessor: "collator",
      },
      {
        Header: "Total Staked",
        accessor: "totalStaked",
      },
      {
        Header: "Delegators",
        accessor: "delegators",
      },
      {
        Header: "APY",
        accessor: "apy",
      },
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row }) => {
          const showUnbond = false;

          return (
            <div className="flex flex-row justify-center">
              {showUnbond && (
                <Button
                  className="mr-2"
                  size="sm"
                  color="primary"
                  onClick={() => undefined}
                >
                  Unbond
                </Button>
              )}
              <Button
                size="sm"
                color="primary"
                variant="outline"
                onClick={() => {
                  // eslint-disable-next-line react/prop-types
                  setSelectedCandidateForDelegation(row.original.candidate);
                }}
              >
                Delegate
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="overflow-x-auto">
      <DelegateToCollatorDialog
        availableBalance={userAvailableBalance}
        collator={selectedCandidateForDelegation}
        inflationInfo={inflationInfo}
        minDelegatorStake={minDelegatorStake}
        tokenSymbol={tokenSymbol || ""}
        visible={Boolean(selectedCandidateForDelegation && !delegationAmount)}
        onClose={() => setSelectedCandidateForDelegation(undefined)}
        onSubmit={(amount) => setDelegationAmount(amount)}
      />
      <ConfirmDelegateDialog
        delegationAmountDecimal={delegationAmount}
        availableBalance={userAvailableBalance}
        transactionFee={joinDelegatorsTransactionFee}
        submissionPending={submissionPending}
        onConfirm={submitJoinDelegatorsExtrinsic}
        onCancel={() => setDelegationAmount(undefined)}
        onClose={() => {
          // Reset both values to close both modals
          setSelectedCandidateForDelegation(undefined);
          setDelegationAmount(undefined);
        }}
        tokenSymbol={tokenSymbol || ""}
        visible={Boolean(selectedCandidateForDelegation && delegationAmount)}
      />
      <table className="table table-compact w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span style={{ float: "right" }}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon className="w-4 h-4" />
                      ) : (
                        <ChevronUpIcon className="w-4 h-4" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
