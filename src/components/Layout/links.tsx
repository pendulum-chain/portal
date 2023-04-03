import { ComponentChildren } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { TenantStateValues } from '../../GlobalStateProvider';
import BackstopPoolIcon from '../../assets/backstop-pool';
import BridgeIcon from '../../assets/bridge';
import CollatorsIcon from '../../assets/collators';
import DashboardIcon from '../../assets/dashboard';
import GovernanceIcon from '../../assets/governance';
import ArrowIcon from '../../assets/nav-arrow';
import SwapIcon from '../../assets/swap';
import SwapPoolsIcon from '../../assets/swap-pools';

export type LinkParameter = { isActive?: boolean };
export type LinkItem = {
  link: string;
  title: ComponentChildren;
  props?: Omit<HTMLAttributes<HTMLAnchorElement>, 'className'> & {
    className?: (params?: LinkParameter) => string;
  };
  prefix?: ComponentChildren;
  suffix?: ComponentChildren;
};
export type Links = (state: Partial<TenantStateValues>) => LinkItem[];

const arrow = (
  <div className="nav-arrow-container">
    <ArrowIcon />
  </div>
);

const defaultLinks: Links = ({ tenantName }) => [
  {
    link: './dashboard',
    title: 'Dashboard',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    prefix: <DashboardIcon />,
    suffix: arrow,
  },
  {
    link: './amm',
    title: 'Amm',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : 'hidden'),
    },
    prefix: <SwapIcon />,
    suffix: arrow,
  },
  {
    link: './bridge',
    title: 'Bridge',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : 'hidden'),
    },
    prefix: <BridgeIcon />,
    suffix: arrow,
  },
  {
    link: './collators',
    title: 'Collators',
    props: {
      className: ({ isActive } = {}) => (isActive ? 'active' : ''),
    },
    prefix: <CollatorsIcon />,
    suffix: arrow,
  },
  {
    link: `https://${tenantName}.polkassembly.io/`,
    title: 'Governance',
    props: {
      target: '_blank',
      rel: 'nofollow noreferrer',
    },
    prefix: <GovernanceIcon />,
    suffix: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="external-link">
        <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144V400c0 44.2 35.8 80 80 80H336c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
      </svg>
    ),
  },
];

const amberLinks: Links = () => [
  {
    link: './amber/swap',
    title: 'Swap',
    prefix: <SwapIcon />,
    suffix: arrow,
  },
  {
    link: './amber/swap-pools',
    title: 'Swap Pools',
    prefix: <SwapPoolsIcon />,
    suffix: arrow,
  },
  {
    link: './amber/backstop-pools',
    title: 'Backstop Pool',
    prefix: <BackstopPoolIcon />,
    suffix: arrow,
  },
];

export const links = {
  default: defaultLinks,
  amber: amberLinks,
};
