import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "preact/hooks";
import { h } from "preact";
import dummy_collator from "../../../collator";
import { useNodeInfoState } from "../../NodeInfoProvider";
import AddressFormatter from "../../components/AddressFormatter";

export function Collators() {
  enum filters {
    collators,
    bounded,
    delegations,
    apr,
  }

  const { state } = useNodeInfoState();
  const { api } = state;

  const [invulnerables, setInvulnerables] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [lastBlocks, setLastBlocks] = useState({});

  useEffect(() => {
    (async () => {
      const lastAuthoredBlocks =
        api && api.query.collatorSelection.lastAuthoredBlock?.multi;
      const proc = invulnerables.reduce(
        // @ts-ignore
        (map, accountId, index) => ({
          ...map,
          // @ts-ignore
          [accountId]: lastAuthoredBlocks[index],
        }),
        {}
      );

      setLastBlocks(proc);
    })();
  }, [api]);

  useEffect(() => {
    (async () => {
      const rawCandidates =
        api && (await api.query.collatorSelection.candidates());
      // @ts-ignore
      const proc = rawCandidates.map((candidates) => {
        return Array.isArray(candidates)
          ? candidates.map(({ deposit, who }) => ({
              accountId: who.toString(),
              deposit,
              isInvulnerable: false,
            }))
          : candidates.strings.map((accountId: any) => ({
              accountId,
              isInvulnerable: false,
            }));
      });

      setCandidates(proc);
    })();
  }, [api]);

  useEffect(() => {
    api &&
      api.query.collatorSelection
        .invulnerables()
        .then((data) => {
          // @ts-ignore
          const proc = data.map((item) => {
            return {
              accountId: item.toString(),
              isInvulnerable: true,
            };
          });
          setInvulnerables(proc);
        })
        .catch((e) => console.error(e));
  }, [api]);

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
    <div className="overflow-y-scroll h-screen w-3/4 mx-auto">
      <div className="pt-40 -mt-32 mb-48 mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div
            class="flex flex-col space-y-6 rounded-xl shadow6_18_3 px-4 py-3 md:px-8 md:py-6 bg-white-opacity100"
            style={{ backgroundColor: "#0d0d0d" }}
          >
            <div class="flex items-center flex-row space-x-1.5">
              <div class="font-bold text-lg leading-7 text-grey-darkest">
                Collator
              </div>
            </div>
            <div class="flex flex-row items-center h-16">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-14 w-14 fill-green-500"
                  style={{ fill: "#5defa7" }}
                >
                  {/* Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                  <path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z" />
                </svg>
              </div>
              <div class="flex flex-col items-start space-y-1 mr-auto md:mr-16">
                <div class="font-bold text-sm md:text-base text-grey-dark">
                  0.0000 AMPE
                </div>
                <div class="font-medium text-sm text-grey-normal">
                  My Staking
                </div>
              </div>
              <div class="flex flex-col items-start space-y-1">
                <div class="font-bold text-sm md:text-base text-grey-normal">
                  0.0000 AMPE
                </div>
                <div class="font-medium text-sm text-grey-normal">
                  FreeBalance
                </div>
              </div>
            </div>
            <div class="px-3 flex flex-row justify-between py-1.5 bg-grey-default rounded-lg h-8 items-center">
              <div class="flex flex-row space-x-2 items-center text-grey-normal font-medium text-xs">
                0 AMPE Unbonding
              </div>
            </div>
          </div>

          <div
            class="flex flex-col space-y-6 rounded-xl shadow6_18_3 px-4 md:px-8 py-3 md:py-6 bg-white-opacity100"
            style={{ backgroundColor: "#0d0d0d" }}
          >
            <div class="flex items-center flex-row space-x-1.5">
              <div class="font-bold text-lg leading-7 text-grey-darkest">
                Staking rewards
              </div>
            </div>
            <div class="flex flex-row items-center h-16">
              <div class="flex flex-col justify-start space-y-1 mr-16">
                <div class="flex flex-row">
                  <div class="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="h-14 w-14 fill-green-500"
                      style={{ fill: "#5defa7" }}
                    >
                      {/* Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                      <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z" />
                    </svg>
                  </div>
                  <div class="flex flex-col items-start space-y-1 mr-auto">
                    <div class="font-bold text-sm md:text-base text-grey-dark">
                      0.00000000 AMPE / Day
                    </div>
                    <div class="font-medium text-sm text-grey-normal">
                      Estimated reward
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Table className="mt-10 w-full">
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
            {/*
              FIXME: Hide for first release
              https://github.com/pendulum-chain/portal/issues/15
            */}
            <span class="block w-1/5 hidden">my staked</span>
          </Table.Head>

          <Table.Body>
            {invulnerables &&
              invulnerables.map((item, index) => (
                <Table.Row key={`collator_table_${index}`}>
                  <span>
                    {/* @ts-ignore */}
                    <AddressFormatter address={item.accountId} />
                  </span>
                  <span>0 AMPE</span>
                  <span>11.22%</span>
                  <span>20</span>
                  <span className="hidden">
                    {/*
                      FIXME: Hide for first release
                      https://github.com/pendulum-chain/portal/issues/15
                    */}
                    <Button size="sm" animation={false}>
                      Delegate
                    </Button>
                  </span>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
