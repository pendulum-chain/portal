import * as React from 'preact';
import { useEffect } from 'preact/hooks';
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

import BridgeIcon from '../assets/bridge';
import DashboardIcon from "../assets/dashboard";
import GovernanceIcon from "../assets/governance";
import SwapIcon from "../assets/swap";
import StakingIcon from "../assets/staking";
import PendulumLogo from '../assets/pendulum-logo.png';
import MediumLogo from '../assets/medium-logo.png';

type LinkParameter = { isActive: boolean; };

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const spllited = location.pathname.split('/');

  console.log(spllited);

  useEffect(() => {
    if (spllited[1] && spllited[1] === 'pendulum' && !spllited[2]) {
      navigate('/pendulum/dashboard');
    }

    if (spllited[1] && spllited[1] === 'amplitud' && !spllited[2]) {
      navigate('/amplitud/dashboard');
    }

    if (spllited[1] && spllited[1].match('amplitud|pendulum') == null) {
      navigate('/amplitud/dashboard');
    }
  }, []);

  return (
    <div class="flex md:flex-row-reverse flex-wrap bg-white">
      <div class="w-full md:w-4/5">
        <div class="container pt-16 px-6 h-full">
          <div style={{ backgroundColor: '#919191', height: 90, width: '100%' }} />
          <Outlet />
        </div>
      </div>

      <div style={{ boxShadow: '7px 0 10px rgba(0,0,0,0.1)' }} class="w-full md:w-1/5 text-center bottom-0 md:pt-8 md:top-0 md:left-0 h-160 md:h-screen sidebar">
        <div class="pendulum-versions">
          <img class="pendulum-logo" src={PendulumLogo} alt="" />
          <p>Runtime: 2083</p>
          <p>DApp: P11.02</p>
        </div>
        <nav>
          <NavLink
            to="./dashboard"
            className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}
          >
            <DashboardIcon /><span>Dashboard</span>
          </NavLink>
          <NavLink
            to="./amm"
            className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}
          >
            <SwapIcon /><span>Amm</span>
          </NavLink>
          <NavLink
            to="./collators"
            className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}
          >
            <StakingIcon /><span>Collators</span>
          </NavLink>
          <NavLink
            to="./bridge"
            className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}
          >
            <BridgeIcon /><span>Bridge</span>
          </NavLink>
          <NavLink
            to="./governance"
            className={(navData: LinkParameter) => (navData.isActive ? 'active' : '')}
          >
            <GovernanceIcon /><span>Governance</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div class="pendulum-network-id">
            <p>Network</p>
            <ul>
              <li>• 134335322</li>
            </ul>
          </div>
          <div className="pendulum-social-and-terms">
            <div className="social">
              <ul>
                <li><a href="https://discord.gg/wJ2fQh776B" target="_blank" rel="nofollow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2267 10.3901C9.66836 10.3901 9.22754 10.8901 9.22754 11.5001C9.22754 12.1101 9.67815 12.6101 10.2267 12.6101C10.7851 12.6101 11.2259 12.1101 11.2259 11.5001C11.2357 10.8901 10.7851 10.3901 10.2267 10.3901ZM13.8022 10.3901C13.2439 10.3901 12.803 10.8901 12.803 11.5001C12.803 12.1101 13.2537 12.6101 13.8022 12.6101C14.3606 12.6101 14.8014 12.1101 14.8014 11.5001C14.8014 10.8901 14.3606 10.3901 13.8022 10.3901Z" fill="#2C3131" />
                    <path d="M18.5634 2H5.43687C4.32994 2 3.42871 2.92 3.42871 4.06V17.58C3.42871 18.72 4.32994 19.64 5.43687 19.64H16.5454L16.0263 17.79L17.2801 18.98L18.4654 20.1L20.5716 22V4.06C20.5716 2.92 19.6703 2 18.5634 2ZM14.7822 15.06C14.7822 15.06 14.4295 14.63 14.1356 14.25C15.4189 13.88 15.9087 13.06 15.9087 13.06C15.5071 13.33 15.125 13.52 14.7822 13.65C14.2924 13.86 13.8222 14 13.3618 14.08C12.4214 14.26 11.5593 14.21 10.8246 14.07C10.2663 13.96 9.78626 13.8 9.38463 13.64C9.15932 13.55 8.91443 13.44 8.66953 13.3C8.64014 13.28 8.61075 13.27 8.58136 13.25C8.56177 13.24 8.55198 13.23 8.54218 13.22C8.36585 13.12 8.26789 13.05 8.26789 13.05C8.26789 13.05 8.7381 13.85 9.98218 14.23C9.6883 14.61 9.32585 15.06 9.32585 15.06C7.16096 14.99 6.3381 13.54 6.3381 13.54C6.3381 10.32 7.74871 7.71 7.74871 7.71C9.15932 6.63 10.5014 6.66 10.5014 6.66L10.5993 6.78C8.83606 7.3 8.023 8.09 8.023 8.09C8.023 8.09 8.23851 7.97 8.60096 7.8C9.64912 7.33 10.4818 7.2 10.8246 7.17C10.8834 7.16 10.9324 7.15 10.9912 7.15C11.5887 7.07 12.2646 7.05 12.9699 7.13C13.9005 7.24 14.8997 7.52 15.9185 8.09C15.9185 8.09 15.1446 7.34 13.4793 6.82L13.6165 6.66C13.6165 6.66 14.9585 6.63 16.3691 7.71C16.3691 7.71 17.7797 10.32 17.7797 13.54C17.7797 13.54 16.9471 14.99 14.7822 15.06Z" fill="#2C3131" />
                  </svg>
                </a></li>
                <li><a href="https://twitter.com/pendulum_chain" target="_blank" rel="nofollow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28004 9.09 5.11004 7.38 3.00004 4.79C2.63004 5.42 2.42004 6.16 2.42004 6.94C2.42004 8.43 3.17004 9.75 4.33004 10.5C3.62004 10.5 2.96004 10.3 2.38004 10C2.38004 10 2.38004 10 2.38004 10.03C2.38004 12.11 3.86004 13.85 5.82004 14.24C5.46004 14.34 5.08004 14.39 4.69004 14.39C4.42004 14.39 4.15004 14.36 3.89004 14.31C4.43004 16 6.00004 17.26 7.89004 17.29C6.43004 18.45 4.58004 19.13 2.56004 19.13C2.22004 19.13 1.88004 19.11 1.54004 19.07C3.44004 20.29 5.70004 21 8.12004 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="#2C3131" />
                  </svg>
                </a></li>
                <li><a href="https://t.me/pendulum_chain" target="_blank" rel="nofollow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.49262 19.7209L9.8103 14.9218L18.5237 7.07064C18.9094 6.71892 18.4443 6.54874 17.9337 6.85507L7.17813 13.6511L2.52645 12.1761C1.52805 11.8925 1.5167 11.2004 2.75337 10.7012L20.8722 3.71235C21.7004 3.33795 22.4946 3.91657 22.1769 5.18727L19.091 19.7209C18.8754 20.7534 18.2514 21.003 17.3891 20.5265L12.6921 17.0547L10.4343 19.2444C10.1734 19.5054 9.95779 19.7209 9.49262 19.7209Z" fill="#2C3131" />
                  </svg>
                </a></li>
                <li><a href="https://github.com/pendulum-chain/pendulum-prototype" target="_blank" rel="nofollow">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1024 1024" style="enable-background:new 0 0 1024 1024;">
                    <path fillRule="evenodd" clipRule="evenodd" fill="#232323" d="M512,0C229.1,0,0,229.1,0,512c0,226.6,146.6,417.9,350.1,485.8c25.6,4.5,35.2-10.9,35.2-24.3c0-12.2-0.6-52.5-0.6-95.4c-128.6,23.7-161.9-31.4-172.2-60.2c-5.8-14.7-30.7-60.2-52.5-72.3c-17.9-9.6-43.5-33.3-0.6-33.9c40.3-0.6,69.1,37.1,78.7,52.5c46.1,77.4,119.7,55.7,149.1,42.2c4.5-33.3,17.9-55.7,32.6-68.5c-113.9-12.8-233-57-233-252.8c0-55.7,19.8-101.8,52.5-137.6c-5.1-12.8-23-65.3,5.1-135.7c0,0,42.9-13.4,140.8,52.5c41-11.5,84.5-17.3,128-17.3c43.5,0,87,5.8,128,17.3c97.9-66.6,140.8-52.5,140.8-52.5c28.2,70.4,10.2,122.9,5.1,135.7c32.6,35.8,52.5,81.3,52.5,137.6c0,196.5-119.7,240-233.6,252.8c18.6,16,34.6,46.7,34.6,94.7c0,68.5-0.6,123.5-0.6,140.8c0,13.4,9.6,29.4,35.2,24.3C877.4,929.9,1024,737.9,1024,512C1024,229.1,794.9,0,512,0z" />
                  </svg>
                </a></li>
                <li><a href="https://pendulum-chain.medium.com/" target="_blank" rel="nofollow">
                  <img src={MediumLogo} alt="" />
                </a></li>
                <li><a href="https://www.reddit.com/r/Pendulum_Chain/" target="_blank" rel="nofollow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z" /></svg>
                </a></li>
                <li><a href="https://www.linkedin.com/company/pendulum-chain/" target="_blank" rel="nofollow">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM16.9605 19.8778H11.5216V36.2196H16.9605V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM36.5754 26.8497C36.5754 21.8303 33.8922 19.4941 30.3131 19.4941C27.4254 19.4941 26.1326 21.0802 25.4107 22.1929V19.8783H19.9711C20.0428 21.4117 19.9711 36.22 19.9711 36.22H25.4107V27.0934C25.4107 26.605 25.446 26.1178 25.5898 25.7681C25.9829 24.7924 26.8779 23.7822 28.3805 23.7822C30.3494 23.7822 31.1365 25.2807 31.1365 27.4767V36.2196H36.5752L36.5754 26.8497Z" fill="black" />
                  </svg>
                </a></li>
              </ul>
            </div>
            <div className="terms">
              <ul>
                <li><a href="#">Terms</a></li>
                <li><a href="#">User Manual</a></li>
                <li><a href="#">Stats</a></li>
                <li><a href="#">Wiki</a></li>
                <li><a href="#">Pendulum</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
