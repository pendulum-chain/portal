import { NavLink } from "react-router-dom";
import { h } from "preact";

import BridgeIcon from "../../assets/bridge";
import DashboardIcon from "../../assets/dashboard";
import GovernanceIcon from "../../assets/governance";
import SwapIcon from "../../assets/swap";
import StakingIcon from "../../assets/staking";
import { memo } from "react";

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
      {/*
      // FIXME: hiding pendulum code
      // https://github.com/pendulum-chain/portal/issues/15
      */}
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
          navData.isActive ? "active" : "hidden"
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
      </a>
    </nav>
  );
});

export default Nav;
