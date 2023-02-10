import { Button, Table } from "react-daisyui";
import { useEffect, useMemo, useState } from "preact/hooks";
import { h } from "preact";
import dummy_collator from "../../../collator";
import { useNodeInfoState } from "../../NodeInfoProvider";
import addressFormatter from "../../helpers/addressFormatter";
import { prettyNumbers, nativeToDecimal } from "../../helpers/parseNumbers";
import { useTable } from "react-table";

enum filters {
  collators,
  bounded,
  delegations,
  apr,
}

type Candidate = {
  owner: string;
  amount: number;
  delegators?: number;
};

type CandidateProps = {
  owner: string;
  delegators: number;
};

type DelegatorData = {
  owner: string[];
  delegators: string[];
  id: string;
  status: string;
  total: string;
};

export function Collators() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatePool, setCandidatePool] = useState<CandidateProps[]>([]);
  const [combined, setCombined] = useState<Candidate[]>([]);
  const [apy, setApy] = useState<string>("");
  const { state } = useNodeInfoState();
  const { api } = state;

  console.log("api.query.parachainStaking", api?.query.parachainStaking);

  useEffect(() => {
    (async () => {
      if (api) {
        const candidates = await api.query.parachainStaking.topCandidates();
        const state: Candidate[] = [];

        candidates &&
          // @ts-ignore
          candidates.forEach((candidate: Map[Candidate]) => {
            state.push({
              amount: nativeToDecimal(candidate.get("amount")),
              owner: candidate.get("owner").toString(),
            });
          });

        setCandidates(state);
      }
    })();
  }, [api]);

  useEffect(() => {
    (async () => {
      if (api) {
        const state: CandidateProps[] = [];

        const entries =
          await api.query.parachainStaking.candidatePool.entries();

        entries &&
          entries.forEach((item) => {
            const identity = item[0].toHuman() as string;
            const delegatorData = item[1].toHuman() as DelegatorData;

            // const stackedValue = delegatorData.stake.replaceAll(",", "");
            // const stacked = prettyNumbers(toUnit(BigInt(stackedValue)));

            state.push({
              owner: identity[0],
              delegators: delegatorData.delegators.length,
            });
          });

        setCandidatePool(state);
      }
    })();
  }, [api]);

  useEffect(() => {
    (async () => {
      if (api) {
        const apy = await api.query.parachainStaking.inflationConfig();
        const { annual } = apy.toHuman().collator.rewardRate;

        setApy(annual);
      }
    })();
  });

  useEffect(() => {
    const candidatesCombined: Candidate[] = [];
    candidatePool &&
      candidatePool.forEach((candidate) => {
        const o: Candidate = {
          ...candidate,
          amount:
            candidates.find((c) => candidate.owner === c.owner)?.amount || 0,
        };

        candidatesCombined.push(o);
      });
    setCombined(candidatesCombined);
  }, [candidatePool, candidates]);

  console.log("candidates", candidates);
  console.log("candidatePool", candidatePool);
  console.log("candidatesCombined", combined);
  console.log("apy", apy);

  const data = useMemo(
    () => [
      {
        collator: "XYZ",
        total_staked: "10.000 AMPI",
        delegators: "30",
        apy: "10%",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Collator",
        accessor: "collator",
      },
      {
        Header: "Total Staked",
        accessor: "total_staked",
      },
      {
        Header: "Delegators",
        accessor: "delegators",
      },
      {
        Header: "APY",
        accessor: "apy",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
