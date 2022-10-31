import { h } from "preact";
import { Button } from "react-daisyui";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { Dummy } from "./Bridge";

export function BridgeRedeem(): JSX.Element {
  return (
    <div
      className="flex items-center justify-center h-full space-walk grid place-items-center"
      style={{ minHeight: 600 }}
    >
      <div style={{ width: 500 }}>
        <div class="box">
          <div class="box-inner">
            <div className="flex justify-between px-10 py-5 mb-5">
              <NavLink className="hover:text-white" to="/amplitude/bridge">
                Swap
              </NavLink>
              <NavLink className="text-white" to="/amplitude/bridge/redeem">
                Redeem
              </NavLink>
              <NavLink
                className="hover:text-white"
                to="/amplitude/bridge/transfer"
              >
                Transfer
              </NavLink>
            </div>
            <span className="ml-5">From Amplitude</span>
            <div className="space-walk-wrapper">
              <Dummy sufix="s" />
              <span className="ml-5 pt-5 text-gray-300 block h-16">
                To Stellar <em>received amount</em>
              </span>
              <Dummy sufix="" />
              <div>
                <input
                  type="text"
                  className="w-5/6 mx-10 p-2 bg-transparent border-2 mb-10 border-accent"
                  placeholder="Enter stellar address"
                  value=""
                />
              </div>
            </div>
            <div className="parity">
              <Button color="success">preview swap</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
