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
    router: '6ijJtaZuwpZCiaVo6pSHRJbd8qejgywYsejnjfo2AVanN14E',
    oracle: '6jscuYjvoPesdnzdnUNYEntLmGY3R6F5hJoTum1oaV7VVcxE',
  },
};
