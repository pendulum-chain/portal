/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, memo } from 'preact/compat';
import { useNodeInfoState } from '../../NodeInfoProvider';
import { TenantName } from '../../models/Tenant';

interface Props {
  tenantName: TenantName | undefined;
}

const Versions: FC<Props> = memo(({ tenantName }: Props) => {
  const { state } = useNodeInfoState();
  return (
    <div className="pendulum-versions">
      <p>Runtime: {(state.nodeVersion && state.nodeVersion.toString()) || '0.0.0-00000000000'}</p>
    </div>
  );
});

export default Versions;
