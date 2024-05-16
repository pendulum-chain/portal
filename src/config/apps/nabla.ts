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
    router: '6ijJtaZuwpZCiaVo6pSHRJbd8qejgywYsejnjfo2AVanN14E',
    oracle: '6jscuYjvoPesdnzdnUNYEntLmGY3R6F5hJoTum1oaV7VVcxE',
  },
  pendulum: {
    indexerUrl: 'https://pendulum.squids.live/pendulum-squid/graphql',
    router: '6buMJsFCbXpHRyacKTjBn3Jss241b2aA7CZf9tKzKHMJWpcJ',
    oracle: '6d3R7qJNDUMFRDrbkhPe3UZpPwzE4y4PjqXxgK3uJD6PT91S',
  },
};
