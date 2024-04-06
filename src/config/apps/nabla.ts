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

// TODO: Torsten
const swapPools = 3 as 3 | 5 | 6;

const foucoco3 = {
  router: '6h5xgcRE7wsRzr8ekpNud52A1n3rLXdoEcZvor6gpwobY4SM',
  oracle: '6kuQBzpjpAbkb88Er45dpsm9L5Cxkm1nGGCYGWheJ4cD8yE4',
};

const foucoco5 = {
  router: '6ktcNuyJAEorkhYvDhMr8Xwx52wiVTMgtSF4mGXEHHrJTg15',
  oracle: '6he7uQ7o79yJnjnWxRa4ekP6zuZm6pNd75pdJQkj88sRYce5',
};

const foucoco6 = {
  router: '6iLPDFGXze6bGCc2Wp6VG74dQ6duA752H6iaRcoQkvLdBubz',
  oracle: '6kn1seDUnJMWTqn316eQe6QCYTJFoy8MUdpiXfy4kuc42HTu',
};

const foucoco = swapPools === 3 ? foucoco3 : swapPools === 5 ? foucoco5 : foucoco6;

export const nablaConfig: NablaConfig = {
  tenants: [TenantName.Foucoco],
  environment: ['staging', 'development'],
  foucoco: {
    indexerUrl: 'https://squid.subsquid.io/foucoco-squid/v/v17/graphql',
    ...foucoco,
  },
};
