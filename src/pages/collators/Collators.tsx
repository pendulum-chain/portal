import { Button } from "react-daisyui";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { h } from "preact";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { decimalToNative, nativeToDecimal } from "../../helpers/parseNumbers";
import { useSortBy, useTable } from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGlobalState } from "../../GlobalStateProvider";
import {
  ParachainStakingCandidate,
  useStakingPallet,
} from "../../hooks/staking/staking";
import { getErrors } from "../../helpers/substrate";
import { toast } from "react-toastify";
import DelegateToCollatorDialog from "./dialogs/DelegateToCollatorDialog";
import ConfirmDelegateDialog from "./dialogs/ConfirmDelegateDialog";
import DelegationSuccessfulDialog from "./dialogs/DelegationSuccessfulDialog";
import { encodeAddress } from "@polkadot/keyring";
import { getAddressForFormat } from "../../helpers/addressFormatter";
import UnlinkIcon from "../../assets/UnlinkIcon";

export function Collators() {
  const { api, tokenSymbol, chain, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const {
    candidates,
    minDelegatorStake,
    inflationInfo,
    joinDelegatorsTransactionFee,
    createJoinDelegatorsExtrinsic,
  } = useStakingPallet();

  console.log("candidates", candidates);
  console.log("api.query.parachainStaking", api?.query.parachainStaking);

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
        Header: "My Staked",
        accessor: "myStaked",
        Cell: ({ row }) => {
          const ss58Address =
            walletAccount && ss58Format
              ? getAddressForFormat(walletAccount?.address, ss58Format)
              : "";

          const isDelegator = row.original.candidate.delegators.find(
            (delegator) => delegator.owner === ss58Address
          );
          return isDelegator ? (
            <div>
              {nativeToDecimal(isDelegator.amount)} {tokenSymbol}
            </div>
          ) : (
            <div />
          );
        },
      },
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row }) => {
          const ss58Address =
            walletAccount && ss58Format
              ? getAddressForFormat(walletAccount?.address, ss58Format)
              : "";

          const isDelegator = row.original.candidate.delegators.find(
            (delegator) => delegator.owner === ss58Address
          );

          const showUnbond = Boolean(isDelegator);

          return (
            <div className="flex flex-row justify-center">
              <Button
                className="mr-2 text-primary"
                size="sm"
                color="ghost"
                onClick={() => undefined}
                startIcon={<UnlinkIcon className="w-4 h-4" />}
                style={{ visibility: showUnbond ? "visible" : "hidden" }}
              >
                Unbond
              </Button>
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
    [ss58Format, tokenSymbol, walletAccount]
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
      <DelegationSuccessfulDialog
        visible={confirmationDialogVisible}
        onClose={() => setConfirmationDialogVisible(false)}
        onConfirm={() => setConfirmationDialogVisible(false)}
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
