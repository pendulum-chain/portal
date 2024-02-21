import { TenantName } from '../../models/Tenant';
import { AppConfigBase } from './types';
export type NablaConfig = AppConfigBase &
  Partial<
    Record<
      TenantName,
      {
        indexerUrl: string;
        router: string;
        oracle: string;
      }
    >
  >;

export const nablaConfig: NablaConfig = {
  tenants: [TenantName.Foucoco],
  environment: ['staging', 'development'],
  foucoco: {
    indexerUrl: 'https://squid.subsquid.io/foucoco-squid/graphql',
    router: '6mS8roUTrZe7fFDYLa2NgWbMrG1YGK6roC6WtDo82dqd7TP6',
    oracle: '6jrZjQgfbmW6yD3BkQhKfhT1xV4EoRpCve3RRvGiAdfff5T9',
  },
};
