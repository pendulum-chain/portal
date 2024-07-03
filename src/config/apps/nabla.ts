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
  tenants: [TenantName.Foucoco, TenantName.Pendulum],
  environment: ['staging', 'development', 'production'],
  foucoco: {
    indexerUrl: 'https://pendulum.squids.live/foucoco-squid/graphql',
    router: '6h54SUQjbXjYbYT7p7vDcXSVGAQNgu78jkhErLJoW7EXo3ry',
    oracle: '6nT6THovpSsTtCCi9Lae1NoAAviLbzULaEo41Yg5eYJrCZXu',
  },
  pendulum: {
    indexerUrl: 'https://pendulum.squids.live/pendulum-squid/graphql',
    router: '6dQQoUKQ9LNDCrGMjoZjeHBXsuihSgQiQEgD9Z7VtHR82wfG',
    oracle: '6eFMEXfr5cebufroDDPnJrawkuoDeqYwxtwn3vKaKLNjM31W',
  },
};
