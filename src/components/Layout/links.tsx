import { ComponentChildren } from 'preact';
import { NavLinkProps } from 'react-router-dom';
import { Options } from 'react-lottie';

import { ExternalIcon } from '../../assets/ExternalIcon';
import DashboardIcon from '../../assets/dashboard';
import GovernanceIcon from '../../assets/governance';
import NablaIcon from '../../assets/nabla';
import StakingIcon from '../../assets/staking';
import SwapIcon from '../../assets/swap';
import { WalletIcon } from '../../assets/wallet';

import { config } from '../../config';
import { nablaConfig } from '../../config/apps/nabla';
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

/// Returns the links for the navigation bar. The first element of the tuple is the default/preloaded links array,
/// the second element is a promise that resolves to the links array once all links are properly loaded.
export function createLinks(tenantName: TenantName): LinkItem[] {
  const dashboardLinkItem: LinkItem = {
    link: `./${PAGES_PATHS.DASHBOARD}`,
    title: 'Dashboard',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    prefix: <DashboardIcon />,
  };

  const zenlinkAmmLinkItem: LinkItem = {
    link: 'https://app.zenlink.pro/',
    title: 'Zenlink AMM',
    hidden: tenantName === TenantName.Foucoco,
    props: {
      target: '_blank',
      rel: 'nofollow noreferrer',
    },
    prefix: <SwapIcon className="p-1" />,
    suffix: <ExternalIcon className="ml-auto h-5 w-3" />,
  };

  const spacewalkLinkItem: LinkItem = {
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
  };

  const nablaLinkItem: LinkItem = {
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
  };

  const stakingLinkItem: LinkItem = {
    link: `./${PAGES_PATHS.STAKING}`,
    title: 'Staking',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    prefix: <StakingIcon />,
  };

  const governanceLinkItem: LinkItem = {
    link: `https://${tenantName}.polkassembly.io/`,
    title: 'Governance',
    props: {
      target: '_blank',
      rel: 'nofollow noreferrer',
    },
    prefix: <GovernanceIcon />,
    suffix: <ExternalIcon className="ml-auto h-5 w-3 fill-white" />,
  };

  const fundWalletItem: LinkItem = {
    link: tenantName === TenantName.Foucoco ? config.faucetPage : `./${PATHS.FUND_WALLET}`,
    title: 'Fund Wallet',
    prefix: <WalletIcon />,
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
  };

  return [
    dashboardLinkItem,
    zenlinkAmmLinkItem,
    spacewalkLinkItem,
    nablaLinkItem,
    stakingLinkItem,
    governanceLinkItem,
    fundWalletItem,
  ];
}
