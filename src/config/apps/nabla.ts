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
    router: '6mYwT4yRrrMK978NszqBvxkvXjYnsmKfs2BkYGJGiR4XY9Sc',
    oracle: '6kqj1tnYUGY3L93YFArXKF2E4tpQ2tUJ4DARwkAjZEyDoof6',
  },
  pendulum: {
    indexerUrl: 'https://pendulum.squids.live/pendulum-squid/graphql',
    router: '6fEJAs1ycfTNDZY7ZoAtkBhuhHnRVNscdALMBLdjDV12K4uE',
    oracle: '6fxpVAp3W5mJsXqnBiQresTd8HZDkNMRFCafbXC9X2AAjFHY',
  },
};
