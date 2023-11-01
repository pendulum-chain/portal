import { Navigate, Outlet } from 'react-router-dom';
import { config, Environment } from '../../config';
import { Apps, appsConfigs } from '../../config/apps';
import { useGlobalState } from '../../GlobalStateProvider';
import { TenantName } from '../../models/Tenant';
import Unsupported from './Unsupported';

export type AppsProviderProps = {
  app: Apps;
  environment?: Environment;
};

const AppsProvider = ({ app, environment }: AppsProviderProps): JSX.Element | null => {
  const tenant = useGlobalState().tenantName;
  const supportedTenants = appsConfigs[app].tenants;
  if (environment && config.env !== environment) return <Navigate to={config.defaultPage} replace />;
  if (!(supportedTenants as TenantName[]).includes(tenant)) {
    return <Unsupported app={app} tenant={tenant} supportedTenants={supportedTenants} />;
  }
  return <Outlet />;
};

AppsProvider.displayName = 'AppsProvider';

export default AppsProvider;
