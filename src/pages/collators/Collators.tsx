import { Button, Table } from "react-daisyui";
import { useState } from "preact/hooks";
import { h } from "preact";
import dummy_collator from "../../../collator";
import { useNodeInfoState } from "../../NodeInfoProvider";

export function Collators() {
  enum filters {
    collators,
    bounded,
    delegations,
    apr,
  }

  const { state } = useNodeInfoState();
  const { api } = state;

  api &&
    api.query.collatorSelection.invulnerables().then((data) =>
      // @ts-ignore
      data.map((item) => console.log(item.toString()))
    );

  // @ts-ignore
  const sortData = (sortable: filters, asc = false) => {
    let a;
    if (sortable === filters.collators) {
      // @ts-ignore | not final data
      a = dummy_collator.sort((a, b) => {
        if (asc) {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        } else {
          return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
        }
      });
    }
    if (sortable === filters.bounded) {
      // @ts-ignore | not final data
      a = dummy_collator.sort((a, b) =>
        asc ? a.bonded > b.bonded : a.bonded < b.bonded
      );
    }
    // @ts-ignore
    setData(a);
  };

  const renderIcon = (type: filters, asc = false) => {
    if (type === filters.collators) {
      return asc ? "↑" : "↓";
    } else if (type === filters.bounded) {
      return asc ? "↑" : "↓";
    } else if (type === filters.delegations) {
      return asc ? "↑" : "↓";
    } else if (type === filters.apr) {
      return asc ? "↑" : "↓";
    } else {
      return "↕";
    }
  };

  const [data, setData] = useState(dummy_collator);
  const [asc, setAsc] = useState(false);

  return (
    <div className="overflow-y-scroll h-screen pt-40 -mt-32">
      <Table className="w-full" compact>
        <Table.Head className="cursor-pointer">
          <span
            class="block w-1/5"
            onClick={() => {
              sortData(filters.collators, asc);
              setAsc(!asc);
            }}
          >
            collator {renderIcon(filters.collators, asc)}
          </span>
          <span
            class="block w-1/5"
            onClick={() => {
              sortData(filters.bounded, asc);
              setAsc(!asc);
            }}
          >
            total bounded {renderIcon(filters.bounded, asc)}
          </span>
          <span class="block w-1/5">delegations</span>
          <span class="block w-1/5">APR</span>
          <span class="block w-1/5">my staked</span>
        </Table.Head>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={`collator_table_${index}`}>
              <span>{item.name}</span>
              <span>
                {item.bonded} {item.symbol}
              </span>
              <span>{item.apr}</span>
              <span>{item.delegations}</span>
              <span>
                <Button size="sm" animation={false}>
                  Delegate
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
