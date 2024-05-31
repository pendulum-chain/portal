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
    indexerUrl: 'https://pendulum.squids.live/foucoco-squid/graphql',
    router: '6h54SUQjbXjYbYT7p7vDcXSVGAQNgu78jkhErLJoW7EXo3ry',
    oracle: '6nT6THovpSsTtCCi9Lae1NoAAviLbzULaEo41Yg5eYJrCZXu',
  },
};
