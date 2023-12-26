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
        curve: string;
        assets: string[];
        swapPools: string[];
        backstopPools: string[];
      }
    >
  >;

export const nablaConfig: NablaConfig = {
  tenants: [TenantName.Foucoco],
  environment: ['staging', 'development'],
  foucoco: {
    indexerUrl: 'https://squid.subsquid.io/foucoco-squid/graphql',

    // TODO: if these addresses change we will need to fetch them from the indexer
    router: '6mZ1nPRz2YhBH9GpmowSMdcLA28ZCPjRY3RJdGTj6z4hXLez',
    curve: '6mwEn6oJpMLfkBB3PwDWvdvv8XystGsnHwE2Jm6JUmTtbfmW',
    oracle: '6mRAW3J7FhfW9cK4pQN2gLUohBvejvXagTMaG57mm79MMukh',
    assets: [
      '6iFkBQJ1C5rKeAc3Np6xAZBM9WfNuukLyjJffELK9HGkDjoa',
      '6h4VmXd5MHBTyJbem7f68xsi7otXvqLUiKf8SdRH9n2nuYaP',
      '6nbACDpR3WCCy7qcTBb5MQZjpZZJCLzQ3g9sBH3RqXgWx4T4',
    ],
    swapPools: [
      '6knNBRZ6L6KDdS9JxBUN92ffUdNGHnA4MiFFNbVfbYkKZSUv',
      '6hCd2N5PVhHEoRwg5Db1Ja11sdwNKEmsRd24i76CV2NmdH46',
      '6nSUPH1Zubuipt1Knit352hkNEMKdSobaYGsZyo271mFd6fp',
    ],
    backstopPools: ['6m6SUHd1XRpboq3GMsL73RigXCfz9iKZGWjoAzMnJJ9dJNgs'],
  },
};
