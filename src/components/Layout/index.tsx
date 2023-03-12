import { VNode } from 'preact';
import { memo } from 'preact/compat';
import { useState } from 'preact/hooks';
import { Outlet } from 'react-router-dom';
import AmplitudeLogo from '../../assets/amplitud-logo.svg';
import PendulumLogo from '../../assets/pendulum-logo.png';
import { useGlobalState } from '../../GlobalStateProvider';
import { TenantName } from '../../models/Tenant';
import OpenWallet from '../OpenWallet';
import Nav from './Nav';
import NetworkId from './NetworkId';
import SocialAndTermLinks from './SocialAndTermLinks';
import './styles.sass';
import Versions from './Versions';

export default function Layout(): VNode | null {
  const [visible, setVisible] = useState(false);
  const { state } = useGlobalState();
  const isPendulum = state.tenantName === TenantName.Pendulum;
  const sideBarLogo = isPendulum ? PendulumLogo : AmplitudeLogo;
  const chevronColor = isPendulum ? 'white' : 'grey ';
  const bgColor = isPendulum ? 'bg-white' : 'bg-black';

  const FooterLink = memo(() => {
    return isPendulum ? (
      <span onClick={() => (window.location.href = '/amplitude')}>
        Amplitude
      </span>
    ) : (
      <span
        onClick={() => (window.location.href = '/pendulum')}
        className="hidden"
      >
        Pendulum
      </span>
    );
  });

  return (
    <div id="main-wrapper" className="flex">
      <div id="sidebar-wrapper" className="flex flex-wrap z-50">
        <div
          style={{
            ...(isPendulum ? null : { backgroundColor: '#1c1c1c' }),
            ...{ boxShadow: '7px 0 10px rgba(0,0,0,0.1)' },
          }}
          id="sidebar"
          className={`flex self-start text-center bottom-0 top-0 h-160 pt-8 h-screen transition-all lg:left-0 lg:relative absolute ${bgColor} ${
            visible ? 'open left-0' : 'closed -left-full'
          }`}
        >
          <img
            className="pendulum-logo"
            src={sideBarLogo}
            alt=""
            style={
              isPendulum
                ? {}
                : { marginTop: 20, marginBottom: 30, marginLeft: 30 }
            }
          />
          <Nav />
          <div className="sidebar-footer">
            <Versions tenantName={state.tenantName} />
            <NetworkId />
            <SocialAndTermLinks />
          </div>
        </div>
      </div>
      <section>
        <header>
          <div className="flex items-center flex-row-reverse h-15 gap-2">
            <div className="mobile-menu">
              <button
                className="menu"
                onClick={() => setVisible((prev) => !prev)}
              />
            </div>
            <OpenWallet networkName={isPendulum ? 'Pendulum' : 'Amplitude'} />
            <div className="dropdown dropdown-end mr-2 hidden">
              <button className="flex space-x-2 items-center px-4 py-2 btn no-animation">
                <span className={`${isPendulum ? 'text-white' : ''}  text-md`}>
                  {isPendulum ? 'Pendulum' : 'Amplitude'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 10,
                    maxWidth: 15,
                  }}
                  viewBox="0 0 448 512"
                >
                  <path
                    fill={chevronColor}
                    d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <FooterLink />
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="flex-wrap">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
