import { memo } from 'preact/compat';
import { NavLink } from 'react-router-dom';

import BridgeIcon from '../../assets/bridge';
import CollatorsIcon from '../../assets/collators';
import DashboardIcon from '../../assets/dashboard';
import ExternalIcon from '../../assets/ExternalIcon';
import GovernanceIcon from '../../assets/governance';
import ArrowIcon from '../../assets/nav-arrow';
import SwapIcon from '../../assets/swap';
import { TenantName, useGlobalState } from '../../GlobalStateProvider';

type LinkParameter = { isActive: boolean };

const Nav = memo(() => {
  const {
    state: { tenantName = TenantName.Amplitude },
  } = useGlobalState();
  return (
    <nav>
      <NavLink to="./dashboard" className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}>
        <DashboardIcon />
        <span>Dashboard</span>
        <div className={'nav-arrow-container'}>
          <ArrowIcon />
        </div>
      </NavLink>
      <NavLink to="./amm" className={(navData: LinkParameter) => (navData.isActive ? 'active' : 'hidden')}>
        <SwapIcon />
        <span>Amm</span>
        <div className="nav-arrow-container">
          <ArrowIcon />
        </div>
      </NavLink>
      <NavLink to="./bridge" className={(navData: LinkParameter) => (navData.isActive ? 'active' : 'hidden')}>
        <BridgeIcon />
        <span>Bridge</span>
        <div className="nav-arrow-container">
          <ArrowIcon />
        </div>
      </NavLink>
      <NavLink to="./collators" className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}>
        <CollatorsIcon />
        <span>Collators</span>
        <div className="nav-arrow-container">
          <ArrowIcon />
        </div>
      </NavLink>
      <a href={`https://${tenantName}.polkassembly.io/`} target="_blank" rel="nofollow noreferrer">
        <GovernanceIcon />
        <span>Governance</span>
        <ExternalIcon />
      </a>
    </nav>
  );
});

export default Nav;
