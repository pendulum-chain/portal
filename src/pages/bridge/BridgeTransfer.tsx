import { h } from "preact";
import { NavLink } from "react-router-dom";
import { Table } from "react-daisyui";
import "./styles.css";

export function BridgeTransfer(): JSX.Element {
  return (
    <div
      className="flex items-center justify-center h-full space-walk grid place-items-center"
      style={{ minHeight: 700 }}
    >
      <div class="box">
        <div class="box-inner">
          <div className="flex justify-between px-10 py-5 mb-5">
            <NavLink className="hover:text-white" to="/amplitude/bridge">
              Swap
            </NavLink>
            <NavLink className="hover:text-white" to="/amplitude/bridge/redeem">
              Redeem
            </NavLink>
            <NavLink className="text-white" to="/amplitude/bridge/transfer">
              Transfer
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <span>Time</span>
                <span>Amount</span>
                <span>Transaction ID</span>
                <span>Type</span>
                <span>Status</span>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <span>30 Oct 2022 18:18:17</span>
                  <span>10 USDC</span>
                  <span title="6jes12cy3bkU1EttA7ZqP9CLw2p8miaiJezaNx7Ra7TR6Xem">
                    6jes12...x76Xem
                  </span>
                  <span>Redeem</span>
                  <span>Pending</span>
                </Table.Row>
                <Table.Row>
                  <span>30 Oct 2022 10:18:17</span>
                  <span>100 USDC</span>
                  <span title="6jes12cy3bkU1EttA7ZqP9CLw2p8miaiJezaNx7Ra7TR6Xem">
                    6jes12...x76Xem
                  </span>
                  <span>Issue</span>
                  <span>Completed</span>
                </Table.Row>
                <Table.Row>
                  <span>25 Oct 2022 05:10:27</span>
                  <span>10 USDC</span>
                  <span title="6jes12cy3bkU1EttA7ZqP9CLw2p8miaiJezaNx7Ra7TR6Xem">
                    6jes12...x76Xem
                  </span>
                  <span>Issue</span>
                  <span>Completed</span>
                </Table.Row>
                <Table.Row>
                  <span>30 Oct 2022 10:18:17</span>
                  <span>100 USDC</span>
                  <span title="6jes12cy3bkU1EttA7ZqP9CLw2p8miaiJezaNx7Ra7TR6Xem">
                    6jes12...x76Xem
                  </span>
                  <span>Issue</span>
                  <span>Completed</span>
                </Table.Row>
                <Table.Row>
                  <span>25 Oct 2022 05:10:27</span>
                  <span>10 USDC</span>
                  <span title="6jes12cy3bkU1EttA7ZqP9CLw2p8miaiJezaNx7Ra7TR6Xem">
                    6jes12...x76Xem
                  </span>
                  <span>Issue</span>
                  <span>Completed</span>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
