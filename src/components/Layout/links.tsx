import { ComponentChildren } from 'preact';
import { NavLinkProps } from 'react-router-dom';
import { Options } from 'react-lottie';

import DashboardIcon from '../../assets/dashboard';
import ExternalIcon from '../../assets/ExternalIcon';
import GovernanceIcon from '../../assets/governance';
import NablaIcon from '../../assets/nabla';
import OnrampIcon from '../../assets/onramp';
import StakingIcon from '../../assets/staking';
import SwapIcon from '../../assets/swap';
import { config } from '../../config';
import { nablaConfig } from '../../config/apps/nabla';
import { GlobalState } from '../../GlobalStateProvider';
import { TenantName } from '../../models/Tenant';
import { getSpacewalkInterpolation, getSpacewalkText } from './spacewalkAnimation';
import { PAGES_PATHS, PATHS } from '../../app';

export type LinkParameter = { isActive?: boolean };

export type LottieOptions = { lottieOptions: Options } & {
  componentOptions: { height?: number; width?: number; style?: Record<string, string | number> };
};

export function isLottieOptions(obj: unknown): obj is LottieOptions {
  if (typeof obj === 'object' && obj !== null) {
    const possibleLottieOptions = obj as { lottieOptions?: unknown };
    return (
      'lottieOptions' in possibleLottieOptions &&
      typeof possibleLottieOptions.lottieOptions === 'object' &&
      possibleLottieOptions.lottieOptions !== null &&
      'animationData' in possibleLottieOptions.lottieOptions
    );
  }
  return false;
}

export type TitleOptions = LottieOptions | ComponentChildren;
export type PrefixOptions = LottieOptions | ComponentChildren;

export type BaseLinkItem = {
  link: string;
  title: TitleOptions;
  props?: Omit<NavLinkProps, 'className'> & {
    className?: (params?: LinkParameter) => string;
  };
  prefix?: PrefixOptions;
  suffix?: ComponentChildren;
  hidden?: boolean;
  disabled?: boolean;
};
export type LinkItem = BaseLinkItem & {
  submenu?: BaseLinkItem[];
};
export type Links = (state: Partial<GlobalState>) => LinkItem[];

export const links: Links = ({ tenantName }) => [
  {
    link: `./${PAGES_PATHS.DASHBOARD}`,
    title: 'Dashboard',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    prefix: <DashboardIcon />,
  },
  {
    link: 'https://app.zenlink.pro/',
    title: 'Zenlink AMM',
    hidden: tenantName == TenantName.Foucoco,
    props: {
      target: '_blank',
      rel: 'nofollow noreferrer',
    },
    prefix: <SwapIcon className="p-1" />,
    suffix: <ExternalIcon />,
  },
  {
    link: `/${PATHS.SPACEWALK}`,
    title: getSpacewalkText(tenantName),
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : tenantName === TenantName.Pendulum ? 'active' : ''),
    },
    prefix: getSpacewalkInterpolation(tenantName),
    submenu: [
      {
        link: `./${PAGES_PATHS.BRIDGE}`,
        title: 'Bridge',
      },
      {
        link: `./${PAGES_PATHS.TRANSACTIONS}`,
        title: 'Transactions',
      },
    ],
  },
  {
    link: `/${PATHS.NABLA}`,
    title: 'Forex AMM',
    hidden:
      (nablaConfig.environment && !nablaConfig.environment.includes(config.env)) ||
      (tenantName && !nablaConfig.tenants.includes(tenantName)),
    prefix: <NablaIcon />,
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    submenu: [
      {
        link: `./${PAGES_PATHS.NABLA_SWAP}`,
        title: 'Swap',
      },
      {
        link: `./${PAGES_PATHS.NABLA_SWAP_POOLS}`,
        title: 'Swap Pools',
      },
      {
        link: `./${PAGES_PATHS.NABLA_BACKSTOP_POOLS}`,
        title: 'Backstop Pool',
      },
    ],
  },
  {
    link: `./${PAGES_PATHS.STAKING}`,
    title: 'Staking',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    prefix: <StakingIcon />,
  },
  {
    link: `https://${tenantName}.polkassembly.io/`,
    title: 'Governance',
    props: {
      target: '_blank',
      rel: 'nofollow noreferrer',
    },
    prefix: <GovernanceIcon />,
    suffix: <ExternalIcon />,
  },

  {
    link: config.alchemyPay.encodeUrlWithRedirection(config.alchemyPay.prodUrl, window.location.href),
    title: 'Buy PEN',
    prefix: <OnrampIcon />,
    suffix: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-3 ml-auto">
        <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144V400c0 44.2 35.8 80 80 80H336c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
      </svg>
    ),
    props: {
      style: {
        visibility: tenantName === TenantName.Pendulum ? 'visible' : 'hidden',
      },
      target: '_blank',
      rel: 'nofollow noreferrer',
    },
  },
];
