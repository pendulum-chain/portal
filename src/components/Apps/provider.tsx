import { Navigate, Outlet } from 'react-router-dom';
import { config } from '../../config';
import { Apps, appsConfigs } from '../../config/apps';
import { useGlobalState } from '../../GlobalStateProvider';
import { TenantName } from '../../models/Tenant';
import Unsupported from './Unsupported';

export type AppsProviderProps = {
  app: Apps;
};

const AppsProvider = ({ app }: AppsProviderProps): JSX.Element | null => {
  const tenant = useGlobalState().tenantName;
  const { tenants: supportedTenants, environment } = appsConfigs[app];
  if (environment && !environment.includes(config.env)) return <Navigate to={config.defaultPage} replace />;
  if (!(supportedTenants as TenantName[]).includes(tenant)) {
    return <Unsupported app={app} tenant={tenant} supportedTenants={supportedTenants} />;
  }
  return <Outlet />;
};

AppsProvider.displayName = 'AppsProvider';

export default AppsProvider;
