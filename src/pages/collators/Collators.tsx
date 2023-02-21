/* eslint-disable react/jsx-key */
import { Button } from "react-daisyui";
import { useEffect, useMemo, useState } from "preact/hooks";
import { h } from "preact";
import { useNodeInfoState } from "../../NodeInfoProvider";
import { nativeToDecimal } from "../../helpers/parseNumbers";
import { useSortBy, useTable } from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useGlobalState } from "../../GlobalStateProvider";
import {
  ParachainStakingCandidate,
  useStakingPallet,
} from "../../hooks/staking/staking";
import { getAddressForFormat } from "../../helpers/addressFormatter";
import UnlinkIcon from "../../assets/UnlinkIcon";
import ExecuteDelegationDialogs from "./dialogs/ExecuteDelegationDialogs";

export function Collators() {
  const { api, tokenSymbol, chain, ss58Format } = useNodeInfoState().state;
  const { walletAccount } = useGlobalState().state;

  const { candidates, inflationInfo } = useStakingPallet();

  // Holds the candidate for which the delegation modal is to be shown
  const [selectedCandidateForDelegation, setSelectedCandidateForDelegation] =
    useState<ParachainStakingCandidate | undefined>(undefined);

  const [userAvailableBalance, setUserAvailableBalance] = useState<string>("0");

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
    <div className="overflow-x-auto collators-list-container mt-10">
      <div className="flex mb-8 justify-between">
        <div className="card rounded-lg text-primary-content bg-base-100 w-1/2 mr-4 collators-box">
          <div className="card-body">
            <h2 className="card-title">Collators</h2>
            <p>placeholder</p>
            <div className="card-actions justify-end">
              <button className="btn">Unbound</button>
            </div>
          </div>
        </div>
        <div className="card rounded-lg text-primary-content bg-base-100 w-1/2 ml-4 collators-box">
          <div className="card-body">
            <h2 className="card-title">Staking Rewards</h2>
            <p>placeholder</p>
            <div className="card-actions justify-end">
              <button className="btn">Claim</button>
            </div>
          </div>
        </div>
      </div>
      <ExecuteDelegationDialogs
        userAvailableBalance={userAvailableBalance}
        selectedCandidateForDelegation={selectedCandidateForDelegation}
        onClose={() => setSelectedCandidateForDelegation(undefined)}
      />
      <table className="table w-full collators-list-table bg-base-100" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span ssyle={{ float: "right" }}>
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
