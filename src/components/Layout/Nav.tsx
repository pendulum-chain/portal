import { NavLink } from "react-router-dom";
import { h } from "preact";
import { memo } from "preact/compat";

import BridgeIcon from "../../assets/bridge";
import DashboardIcon from "../../assets/dashboard";
import GovernanceIcon from "../../assets/governance";
import SwapIcon from "../../assets/swap";
import StakingIcon from "../../assets/staking";

type LinkParameter = { isActive: boolean };

const Nav = memo(() => {
  return (
    <nav>
      <NavLink
        to="./dashboard"
        className={(navData: LinkParameter) =>
          navData.isActive ? "active" : ""
        }
      >
        <DashboardIcon />
        <span>Dashboard</span>
      </NavLink>
      {/* hiding pendulum code */}
      <NavLink
        to="./amm"
        className={(navData: LinkParameter) =>
          navData.isActive ? "active" : "hidden"
        }
      >
        <SwapIcon />
        <span>Amm</span>
      </NavLink>
      <NavLink
        to="./bridge"
        className={(navData: LinkParameter) =>
          navData.isActive ? "active" : ""
        }
      >
        <BridgeIcon />
        <span>Bridge</span>
      </NavLink>
      <NavLink
        to="./collators"
        className={(navData: LinkParameter) =>
          navData.isActive ? "active" : ""
        }
      >
        <StakingIcon />
        <span>Collators</span>
      </NavLink>
      <a
        href="https://amplitude.polkassembly.io/"
        target="_blank"
        rel="nofollow"
      >
        <GovernanceIcon />
        <span>Governance</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="external-link"
        >
          <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144V400c0 44.2 35.8 80 80 80H336c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
        </svg>
      </a>
    </nav>
  );
});

export default Nav;
