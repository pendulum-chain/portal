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
          <span>{state.bestNumberFinalize || "000000"}</span>
        </li>
      </ul>
    </div>
  );
};

export default NetworkId;
