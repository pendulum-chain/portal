import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useNodeInfoState } from "../../NodeInfoProvider";
import "./styles.css";
import { prettyNumbers, nativeToDecimal } from "../../helpers/parseNumbers";
import { useGlobalState } from "../../GlobalStateProvider";
import { PalletBalancesAccountData } from "@polkadot/types/lookup";
import Banner from "../../assets/banner-spacewalk-4x.png";
import Swap from "../../components/Swap";

export function Dashboard() {
  const { state: GlobalState } = useGlobalState();
  const { walletAccount } = GlobalState;
  const { state } = useNodeInfoState();
  const { api } = state;
  const { tokenSymbol } = state;

  const [accountBalance, setAccountBalance] = useState<
    PalletBalancesAccountData | undefined
  >(undefined);

  useEffect(() => {
    if (!walletAccount?.address) return;

    api?.query.system
      .account(walletAccount.address)
      .then((data) => {
        console.log("setting balance");
        setAccountBalance(data.data);
      })
      .catch((e) => console.error(e));
  }, [api, walletAccount]);

  const cachedBalance = useMemo(() => {
    if (!accountBalance) return undefined;
    return prettyNumbers(nativeToDecimal(accountBalance.free.toString()));
  }, [accountBalance]);

  return (
    <div className="mt-10">
      <Swap />
      <div className="card card-compact w-2/3 banner rounded mb-6">
        <a target="blank" href="https://pendulumchain.org/">
          <div className="card-body">
            <div className="card-title block">
              <h2 className={"float-left"}>Promo</h2>
              <h2 className={"float-right"}>Join now</h2>
            </div>
            <figure>
              {" "}
              <img src={Banner} />
            </figure>
          </div>
        </a>
      </div>
      <div className="card w-1/3 portfolio rounded">
        <div className="card-body">
          <h2 className="card-title float-left">Portfolio</h2>
          <div className="balance">
            {cachedBalance && (
              <div className="self-center">
                <h2 className="flex justify-center">Total balance</h2>
                <h1 className="flex justify-center">
                  {cachedBalance} {tokenSymbol}
                </h1>
              </div>
            )}
            {!cachedBalance && (
              <>
                <p>
                  You have to connect a wallet to see your available balance.{" "}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="graph hidden">
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
