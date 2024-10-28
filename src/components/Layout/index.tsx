import { Bars3Icon } from '@heroicons/react/20/solid';
import { memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useGlobalState } from '../../GlobalStateProvider';
import AmplitudeLogo from '../../assets/amplitude-logo.svg';
import PendulumLogo from '../../assets/pendulum-logo.png';
import { TenantName } from '../../models/Tenant';
import ChainSelector from '../ChainSelector';
import OpenWallet from '../Wallet';
import { GetToken } from '../GetToken';
import Nav from './Nav';
import NetworkId from './NetworkId';
import SocialAndTermLinks from './SocialAndTermLinks';
import './styles.css';

export default function Layout(): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const { tenantName } = useGlobalState();
  const isPendulum = tenantName === TenantName.Pendulum;
  const isTestnet = tenantName === TenantName.Foucoco;
  const sideBarLogo = isPendulum ? PendulumLogo : AmplitudeLogo;
  const chevronColor = isPendulum ? 'white' : 'grey ';
  const bgColor = isPendulum ? 'bg-white' : 'bg-base-200';

  const FooterLink = memo(() => {
    return isPendulum ? (
      <span onClick={() => (window.location.href = '/amplitude')}>Amplitude</span>
    ) : (
      <span onClick={() => (window.location.href = '/pendulum')} className="hidden">
        Pendulum
      </span>
    );
  });

  return (
    <div id="main-wrapper" className="flex">
      <div id="sidebar-wrapper" className="z-50 flex flex-wrap">
        <aside
          id="sidebar"
          className={`scroll-thin h-160 absolute bottom-0 top-0 flex h-screen self-start pt-8 text-center transition-all lg:relative lg:left-0 ${bgColor} ${
            visible ? 'open left-0' : 'closed -left-full'
          }`}
        >
          <div
            style={
              isPendulum ? { marginLeft: 20, marginBottom: 20 } : { marginTop: 20, marginBottom: 30, marginLeft: 30 }
            }
          >
            <a
              href={`https://pendulumchain.org/${isPendulum ? '' : 'amplitude'}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="logo" src={sideBarLogo} alt="" />
              {isTestnet && <div className="foucoco-tag">Foucoco testnet</div>}
            </a>
          </div>
          <Nav onClick={() => setVisible(false)} />
          <footer className="sidebar-footer mx-auto">
            <NetworkId />
            <SocialAndTermLinks />
          </footer>
        </aside>
      </div>
      <section className={visible && isMobile ? 'opacity-25' : ''}>
        <header>
          <div className="h-15 flex items-center justify-end gap-2">
            <GetToken />
            <ChainSelector />
            <div className="dropdown dropdown-end mr-2 hidden">
              <button className="btn no-animation flex items-center space-x-2 py-2">
                <span className={`${isPendulum ? 'text-white' : ''} text-md`}>
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
              <ul tabIndex={0} className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
                <li>
                  <FooterLink />
                </li>
              </ul>
            </div>
            <OpenWallet isHeader />
            <div className="mobile-menu">
              <button type="button" onClick={() => setVisible((prev) => !prev)}>
                <Bars3Icon className="w-7" />
              </button>
            </div>
          </div>
        </header>
        <main
          className="w-full flex-grow flex-wrap px-4 py-4"
          onClick={() => {
            if (visible && isMobile) {
              setVisible(false);
            }
          }}
        >
          <Outlet />
        </main>
      </section>
    </div>
  );
}
