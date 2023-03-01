/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Button } from "react-daisyui";
import { useEffect, useMemo, useState } from "preact/hooks";
import { h } from "preact";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { format, nativeToDecimal, nativeToFormat } from "../../helpers/parseNumbers";
import { useSortBy, useTable } from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGlobalState } from "../../GlobalStateProvider";
import StakedIcon from "../../assets/collators-staked-icon";
import RewardsIcon from "../../assets/collators-rewards-icon";

import {
  ParachainStakingCandidate,
  ParachainStakingInflationInflationInfo,
  useStakingPallet,
} from "../../hooks/staking/staking";
import { getAddressForFormat } from "../../helpers/addressFormatter";
import UnlinkIcon from "../../assets/UnlinkIcon";
import ExecuteDelegationDialogs from "./dialogs/ExecuteDelegationDialogs";
import ClaimRewardsDialog from "./dialogs/ClaimRewardsDialog";

interface UserStaking {
  candidateId: string;
  amount: string;
}

export function Collators() {
  const { api, tokenSymbol, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const { candidates, inflationInfo, estimatedRewards } = useStakingPallet();

  // Holds the candidate for which the delegation modal is to be shown
  const [selectedCandidateForDelegation, setSelectedCandidateForDelegation] =
    useState<ParachainStakingCandidate | undefined>(undefined);

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>("0.00");
  const [userStaking, setUserStaking] = useState<UserStaking>();
  const [claimDialogOpen, setClaimDialogOpen] = useState<boolean>(false);

  const userAccountAddress = useMemo(() => {
    return walletAccount && ss58Format
      ? getAddressForFormat(walletAccount?.address, ss58Format)
      : "";
  }, [walletAccount, ss58Format]);

  useMemo(() => {
    return candidates.forEach((candidate) => {
      const isDelegator = candidate.delegators.find(
        (delegator) => delegator.owner === userAccountAddress
      );
      if (isDelegator) {
        setUserStaking({ candidateId: candidate.id, amount: isDelegator.amount });
      }
    });
  }, [candidates, userAccountAddress, setUserStaking])

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

  const data = useMemo(
    () =>
      candidates.map((candidate) => {
        const totalStaked = nativeToDecimal(candidate.total);
        const rowItem = {
          candidate: candidate,
          collator: candidate.id,
          totalStaked: format(totalStaked, tokenSymbol),
          delegators: candidate.delegators.length,
          apy: inflationInfo?.collator.rewardRate.annual || "0.00%",
        };
        return rowItem;
      }),
    [candidates, inflationInfo?.collator.rewardRate.annual, tokenSymbol]
  );

  const columns = useMemo(
    () => {
      const getAmountDelegated = (candidate: ParachainStakingCandidate) =>
        candidate.delegators.find(({ owner }) => owner === userAccountAddress)?.amount;
      return [
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
            const amountDelegated = getAmountDelegated(row.original.candidate);
            return <div>
              {amountDelegated ? nativeToFormat(amountDelegated, tokenSymbol) : ""}
            </div>
          },
        },
        {
          Header: "",
          accessor: "actions",
          Cell: ({ row }) => {
            const showUnbond = Boolean(getAmountDelegated(row.original.candidate));
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
      ]
    },
    [tokenSymbol, userAccountAddress]
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="overflow-x-auto collators-list-container mt-10">
      <div className="flex mb-8 justify-between">
        <div className="card gap-0 rounded-lg text-primary-content bg-base-100 w-1/2 mr-4 collators-box">
          <div className="card-body">
            <h2 className="card-title">Collators</h2>
            <div className="flex flex-row">
              <div className="flex-initial pr-5">
                <StakedIcon />
              </div>
              <div className="flex-auto">
                <h3>{nativeToDecimal(userStaking?.amount || "0.00")} {tokenSymbol}</h3>
                <p>My Staking</p>
              </div>
              <div className="flex-auto">
                <h3>{nativeToDecimal(userAvailableBalance).toFixed(2)} {tokenSymbol}</h3>
                <p>Free balance</p>
              </div>
              <div className="flex flex-auto place-content-end">
                <button className="btn btn-secondary w-full" disabled>0 {tokenSymbol} Unboarding</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card rounded-lg text-primary-content bg-base-100 w-1/2 ml-4 collators-box">
          <div className="card-body">
            <h2 className="card-title">Staking Rewards</h2>
            <div className="flex flex-row">
              <div className="flex-initial pt-1 pr-5 pb-0">
                <RewardsIcon />
              </div>
              <div className="flex-auto">
                <h4>
                  {nativeToFormat(estimatedRewards, tokenSymbol)}</h4>
                <p>Estimated reward</p>
              </div>
              <div className="flex flex-auto place-content-end">
                <button onClick={() => setClaimDialogOpen(true)} className="btn btn-primary w-1/3" disabled={Boolean(!walletAccount)}>Claim</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExecuteDelegationDialogs
        userAvailableBalance={userAvailableBalance}
        selectedCandidateForDelegation={selectedCandidateForDelegation}
        isDelegatingMore={userStaking?.candidateId === selectedCandidateForDelegation?.id}
        onClose={() => setSelectedCandidateForDelegation(undefined)}
      />
      <ClaimRewardsDialog
        userRewardsBalance={estimatedRewards}
        tokenSymbol={tokenSymbol}
        visible={claimDialogOpen}
        onClose={() => setClaimDialogOpen(false)}
      />
      <table className="table w-full collators-list-table bg-base-100" {...getTableProps()}>
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

const estimateReward = (inflationInfo: ParachainStakingInflationInflationInfo | undefined, userStaking: UserStaking | undefined) =>
  inflationInfo && userStaking ? parseFloat(inflationInfo.collator.rewardRate.annual) * parseFloat(userStaking.amount) / 100 : 0
