import { useGlobalState } from '../GlobalStateProvider';
import { TenantName } from '../models/Tenant';

export type UseGetTenantDataResponse<T> = [T | undefined, TenantName];
export const useGetTenantData = <T>(data: Partial<Record<TenantName, T>>): UseGetTenantDataResponse<T> => {
  const tenantName = useGlobalState().tenantName;
  return [data[tenantName], tenantName];
};
