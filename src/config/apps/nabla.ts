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
    router: '6h3UHXZonhJthkrchJYiwgBc8CPeNuZYscWUVPFzTAeDGKt9',
    oracle: '6hGZBCyk3adNg1kVs2cdB9bKC4L1e4WersuWextDGbKWLngE',
  },
  pendulum: {
    indexerUrl: 'https://pendulum.squids.live/pendulum-squid/graphql',
    router: '6fEJAs1ycfTNDZY7ZoAtkBhuhHnRVNscdALMBLdjDV12K4uE',
    oracle: '6fxpVAp3W5mJsXqnBiQresTd8HZDkNMRFCafbXC9X2AAjFHY',
  },
};
