import { TenantName } from '../../models/Tenant';
import { AppConfig } from './types';
export type NablaConfig = AppConfig &
  Partial<
    Record<
      TenantName,
      {
        indexerUrl: string;
        router: string;
        oracle: string;
        curve: string;
      }
    >
  >;

export const nablaConfig: NablaConfig = {
  tenants: [TenantName.Foucoco],
  foucoco: {
    indexerUrl: 'https://squid.subsquid.io/foucoco-squid/graphql',

    // TODO: if these addresses change we will need to fetch them from the indexer
    router: '6nHNN8GfwaUcSvp7QhRJZtXY5yQLBeVz3J2RCx395ma9MbeV',
    oracle: '6guy27fyEZpKyBwWfysB6X2N3RDgrVertCaZ4ont8FPqdD9C',
    curve: '6mxUgPWk76RzqnUnEryZkFNZ3tqqdtwyrXmaWwMJ2n311cZE',
  },
};
