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
    router: '6buMJsFCbXpHRyacKTjBn3Jss241b2aA7CZf9tKzKHMJWpcJ',
    oracle: '6f9uHwN2r5w82Bjrywc4wmZYb6TN64bZH5Ev87qmJ675uFvq',
  },
};
