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

const env = process.env.NODE_ENV;

export const config = {
  env,
  isProd: env === 'production',
  isDev: env === 'development',
  defaultPage: '/pendulum/dashboard',
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
      slippage: 0.5,
      deadline: 30,
    },
  },
  walletConnect: {
    url: 'wss://relay.walletconnect.com',
    projectId: '299fda67fbf3b60a31ba8695524534cd',
  },
};
