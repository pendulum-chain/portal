import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as utils from "@polkadot/util";
import Tabs from "../../components/Tabs";
import TickerChangeTable from "../../components/TickerChangeTable";
import { useNodeInfoState } from "../../NodeInfoProvider";
import "./styles.css";
import { toUnit } from "../../helpers/parseNumbers";

interface AccountBalance {
  free: BigInt;
  reserved: BigInt;
  miscFrozen: BigInt;
  feeFrozen: BigInt;
}

export function Dashboard() {
  const { state } = useNodeInfoState();
  const { api, mainAddress } = state;

  const [accountBalance, setAccountBalance] = useState<AccountBalance>({
    free: BigInt(0),
    reserved: BigInt(0),
    miscFrozen: BigInt(0),
    feeFrozen: BigInt(0),
  });

  const { feeFrozen, miscFrozen, free } = accountBalance;

  if (free) {
    console.log("Free proc: ", toUnit(free) / 1000);
  }

  // @ts-ignore
  console.log("Free", free > 0 ? utils.formatDecimal(free.toString()) : null);

  useEffect(() => {
    console.log(mainAddress);
    api?.query.system
      .account(mainAddress)
      .then((data) => {
        // @ts-ignore
        setAccountBalance(JSON.parse(data.data.toString()));
        console.log(data.toString());
      })
      .catch((e) => console.error(e));
  }, [api, mainAddress]);

  const maxBalance = () => {
    if (Number(miscFrozen) > 0 || Number(feeFrozen) > 0) {
      return utils.nMax(miscFrozen.valueOf(), feeFrozen.valueOf());
    }

    return 0;
  };

  return (
    <div class="mt-10">
      <div className="dashboard portfolio">
        <h1>Portfolio</h1>
        <div className="portfolio">
          <h4>Total balance</h4>
          <h2>${maxBalance()}</h2>
          <ul className="hidden">
            <li className="up">+$106.076</li>
            <li className="up">+36,22%</li>
          </ul>
        </div>
        <span class="hidden">
          <Tabs />
          <TickerChangeTable />
        </span>
      </div>
      <div className="dashboard graph hidden">
        <h1>Total Value Locked</h1>
        <h2>$63.231,98</h2>
        <svg viewBox="0 0 200 200" className="chart">
          <defs>
            <linearGradient
              id="grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientTransform="rotate(65)"
            >
              <stop
                offset="0%"
                style="stop-color:rgb(89, 196, 226);stop-opacity:1"
              />
              <stop
                offset="100%"
                style="stop-color:rgb(255,255,255);stop-opacity:1"
              />
            </linearGradient>
          </defs>
          <polyline
            fill="url(#grad)"
            stroke="#59c4e2"
            strokeWidth="1"
            points="0,120
                  20,60
                  40,80
                  60,20
                  80,25
                  100,40
                  120,70
                  140,50
                  160,50
                  180,40
                  200,40
                  220,120"
          />
        </svg>
        <div className="graph-stats">
          <div className="token">
            vsToken
            <br />
            <span>$62M</span>
          </div>
          <div className="token">
            vKSM
            <br />
            <span>$62M</span>
          </div>
          <div className="token">
            vETH
            <br />
            <span>$32M</span>
          </div>
          <div className="token">
            DEX
            <br />
            <span>$7M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
