import { h } from "preact";
import { useNodeInfoState } from "../../NodeInfoProvider";

const NetworkId = () => {
  const { state } = useNodeInfoState();

  return (
    <div class="pendulum-network-id">
      <p>Network</p>
      <ul>
        <li>
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="5" />
          </svg>
          <a
            href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpencol-kus-01.pendulumchain.tech#/explorer"
            target="_blank"
            rel="nofollow"
          >
            {state.bestNumberFinalize || "000000"}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NetworkId;
