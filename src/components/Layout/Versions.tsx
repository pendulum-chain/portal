/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, memo } from 'preact/compat';
import { TenantName } from '../../models/Tenant';
import { useNodeInfoState } from '../../NodeInfoProvider';

interface Props {
  tenantName: TenantName | undefined;
}

const Versions: FC<Props> = memo(({ tenantName }: Props) => {
  const { state } = useNodeInfoState();
  let indicator = '';

  switch (tenantName) {
    case 'amplitude': {
      indicator = 'alpha';
      break;
    }
    case 'pendulum': {
      indicator = '';
      break;
    }
    case 'foucoco': {
      indicator = 'Foucoco';
      break;
    }
  }

  return (
    <div className="pendulum-versions">
      {/* <span className="absolute right-14 top-2 text-green-300 hover:text-green-500 cursor-default rotate-6">
      {indicator}
    </span> */}
      <p>DApp: {state.nodeName} </p>
      <p>Runtime: {(state.nodeVersion && state.nodeVersion.toString()) || '0.0.0-00000000000'}</p>
    </div>
  );
});

export default Versions;
