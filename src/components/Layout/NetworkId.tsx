import { h } from 'preact';
import { memo, FC } from 'preact/compat';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { useGlobalState } from '../../GlobalStateProvider';

const NetworkId: FC = memo(() => {
  const lastBlockNumber = useNodeInfoState().state.bestNumberFinalize;
  const tenantRPC = useGlobalState().state.tenantRPC;
  const encodedRPC = tenantRPC ? encodeURI(tenantRPC) : '';

  return (
    <div className="pendulum-network-id">
      <span>Network: </span>
      <svg height="5" width="5">
        <circle cx="2.5" cy="2.5" r="2.5" />
      </svg>
      <a
        href={`https://polkadot.js.org/apps/?rpc=${encodedRPC}#/explorer`}
        target="_blank"
        rel="noreferrer"
        title="Last block number"
      >
        {lastBlockNumber || '000000'}
      </a>
    </div>
  );
});

export default NetworkId;
