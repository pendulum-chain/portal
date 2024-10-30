import { HTMLAttributes } from 'preact/compat';
import { useGlobalState } from '../GlobalStateProvider';
import { TenantName } from '../models/Tenant';
import { AmplitudeLogo } from './AmplitudeLogo';
import { PendulumLogo } from './PendulumLogo';

interface Props extends HTMLAttributes<SVGSVGElement> {
  className?: string;
}

export const ChainLogo = (props: Props) => {
  const { tenantName } = useGlobalState();
  if (tenantName === TenantName.Pendulum) {
    return <PendulumLogo {...props} />;
  } else {
    return <AmplitudeLogo {...props} />;
  }
};
