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
    router: '6h5xgcRE7wsRzr8ekpNud52A1n3rLXdoEcZvor6gpwobY4SM',
    oracle: '6kuQBzpjpAbkb88Er45dpsm9L5Cxkm1nGGCYGWheJ4cD8yE4',
  },
};
