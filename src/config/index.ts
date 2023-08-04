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
      // ! TODO: update to address
      from: 'ETH',
      to: 'USDC',
      slippage: 0.5,
      deadline: 30,
    },
  },
  walletConnect: {
    url: 'wss://relay.walletconnect.com',
    projectId: '299fda67fbf3b60a31ba8695524534cd',
  },
  aclhemyPay: {
    prodUrl: `https://ramp.alchemypay.org/?appId=wNxCyQNce01WLqyL&network=PEN&crypto=PENDULUM&showTable=buy&type=buy`,
    testUrl: `https://ramptest.alchemypay.org/?appId=f83Is2y7L425rxl8&network=PEN&crypto=PENDULUM&showTable=buy&type=buy`,
  }
};
