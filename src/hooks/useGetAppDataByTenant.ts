import { Apps, appsConfigs } from '../config/apps';
import { useGlobalState } from '../GlobalStateProvider';

export const useGetAppDataByTenant = <T extends Apps>(app: T) => {
  const tenantName = useGlobalState().tenantName;
  return { data: appsConfigs[app]?.[tenantName], tenantName };
};
