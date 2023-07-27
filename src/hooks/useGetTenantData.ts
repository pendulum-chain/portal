import { useGlobalState } from '../GlobalStateProvider';
import { TenantName } from '../models/Tenant';

export const useGetTenantData = <T>(data: Partial<Record<TenantName, T>>): T | undefined => {
  const tenant = useGlobalState().tenantName;
  return data[tenant] as T;
};
