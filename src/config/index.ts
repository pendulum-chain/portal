import { TenantName } from '../models/Tenant';
import { ThemeName } from '../models/Theme';

type Tenants = Record<
  TenantName,
  {
    name: string;
    rpc: string;
    theme: ThemeName;
  }
>;

export const config = {
  tenants: {
    [TenantName.Amplitude]: {
      name: 'Amplitude',
      rpc: 'wss://rpc-amplitude.pendulumchain.tech',
      theme: ThemeName.Amplitude,
    },
    [TenantName.Pendulum]: {
      name: 'Pendulum',
      rpc: 'wss://rpc-pendulum.prd.pendulumchain.tech',
      theme: ThemeName.Pendulum,
    },
    [TenantName.Foucoco]: {
      name: 'Foucoco',
      rpc: 'wss://rpc-foucoco.pendulumchain.tech',
      theme: ThemeName.Amplitude,
    },
    [TenantName.Local]: {
      name: 'Local',
      rpc: 'ws://localhost:9944',
      theme: ThemeName.Amplitude,
    },
  } as Tenants,
  swap: {
    defaults: {
      // ! TODO: update to address
      from: 'ETH',
      to: 'USDC',
    },
  },
};
