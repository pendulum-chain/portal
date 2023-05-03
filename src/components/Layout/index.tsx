import { memo, useEffect, useMemo, useState } from 'preact/compat';
import { Outlet, useParams } from 'react-router-dom';
import { useGlobalState } from '../../GlobalStateProvider';
import AmplitudeLogo from '../../assets/amplitud-logo.svg';
import PendulumLogo from '../../assets/pendulum-logo.png';
import { config } from '../../config';
import { TenantName } from '../../models/Tenant';
import OpenWallet from '../OpenWallet';
import Nav from './Nav';
import NetworkId from './NetworkId';
import SocialAndTermLinks from './SocialAndTermLinks';
import Versions from './Versions';
import './styles.sass';

export default function Layout(): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const params = useParams();
  const { state, setState, dAppName } = useGlobalState();
  const isPendulum = state.tenantName === TenantName.Pendulum;
  const isTestnet = state.tenantName === TenantName.Foucoco;
  const sideBarLogo = isPendulum ? PendulumLogo : AmplitudeLogo;
  const chevronColor = isPendulum ? 'white' : 'grey ';
  const bgColor = isPendulum ? 'bg-white' : 'bg-black';

  const network: TenantName = useMemo(() => {
    return params.network && Object.values<string>(TenantName).includes(params.network)
      ? (params.network as TenantName)
      : TenantName.Pendulum;
  }, [params.network]);

  useEffect(() => {
    // Only change state if network is different
    const n =
      network && Object.values<string>(TenantName).includes(network) ? (network as TenantName) : TenantName.Pendulum;
    setState((prevState) => ({
      ...prevState,
      tenantName: n,
      tenantRPC: config.tenants[n].rpc,
    }));
  }, [network, setState]);

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
      <div id="sidebar-wrapper" className="flex flex-wrap z-50">
        <div
          style={{
            ...(isPendulum ? null : { backgroundColor: '#1c1c1c' }),
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
            style={isPendulum ? {} : { marginTop: 20, marginBottom: 30, marginLeft: 30 }}
          />
          {isTestnet && <div className="foucoco-tag">Foucoco testnet</div>}
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
              <button className="menu" onClick={() => setVisible((prev) => !prev)} />
            </div>
            <OpenWallet dAppName={dAppName} />
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
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <FooterLink />
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="w-full flex-wrap px-4 sm:px-8 py-4 flex-grow">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
