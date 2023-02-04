import { useEffect, useMemo, useState } from "preact/hooks";
import { FC, memo, useRef } from "preact/compat";
import { h } from "preact";
import { Outlet, useParams } from "react-router-dom";
import PendulumLogo from "../../assets/pendulum-logo.png";
import AmplitudeLogo from "../../assets/amplitud-logo.svg";
import OpenWallet from "../OpenWallet";
import Nav from "./Nav";
import NetworkId from "./NetwordId";
import SocialAndTermLinks from "./SocialAndTermLinks";
import "./styles.sass";
import Versions from "./Versions";
import {
  TenantName,
  TenantRPC,
  useGlobalState,
} from "../../GlobalStateProvider";
import { useTheme } from "react-daisyui";

export default function Layout(): React.JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const params = useParams();
  const { setTheme } = useTheme();
  const { state, setState } = useGlobalState();

  const network: TenantName = useMemo(() => {
    return params.network &&
      Object.values<string>(TenantName).includes(params.network)
      ? (params.network as TenantName)
      : TenantName.Pendulum;
  }, [params.network]);

  useEffect(() => {
    // Only change state if network is different
    if (state.tenantName !== network) {
      let newTenantRPC: TenantRPC;
      switch (network) {
        case "pendulum":
          newTenantRPC = TenantRPC.Pendulum;
          setTheme("light");
          break;
        case "foucoco":
          newTenantRPC = TenantRPC.Foucoco;
          setTheme("black");
          break;
        case "local":
          newTenantRPC = TenantRPC.Local;
          setTheme("amplitude");
          break;
        case "amplitude":
        default:
          newTenantRPC = TenantRPC.Amplitude;
          setTheme("black");
          break;
      }

      setState((prevState) => ({
        ...prevState,
        tenantName: network,
        tenantRPC: newTenantRPC,
      }));
    }
  }, [network, setState, setTheme, state.tenantName]);

  const isPendulum = network === "pendulum";

  const sideBarLogo = isPendulum ? PendulumLogo : AmplitudeLogo;
  const chevronColor = isPendulum ? "white" : "grey ";
  const bgColor = isPendulum ? "bg-white" : "bg-black";

  const sidebar = useRef<HTMLDivElement>(null);

  const FooterLink: FC = memo(() => {
    return isPendulum ? (
      <span onClick={() => (window.location.href = "/amplitude")}>
        Amplitude
      </span>
    ) : (
      <span
        onClick={() => (window.location.href = "/pendulum")}
        className="hidden"
      >
        Pendulum
      </span>
    );
  });

  const toggleMenu = () => {
    const theSidebar = sidebar.current;
    if (!theSidebar) return;

    if (visible) {
      theSidebar.style.display = "none";
      theSidebar.style.position = "relative";
      theSidebar.style.top = "0";
    } else {
      theSidebar.style.display = "flex";
      theSidebar.style.position = "absolute";
      theSidebar.style.top = "0";
    }
    setVisible(!visible);
  };

  return (
    <div className="flex">
      <div id="sidebar-wrapper" className={`flex flex-wrap ${bgColor}`}>
        <div
          style={{
            ...(isPendulum ? null : { backgroundColor: "#1c1c1c" }),
            ...{ boxShadow: "7px 0 10px rgba(0,0,0,0.1)" },
          }}
          className="self-start text-center bottom-0 md:pt-8 md:top-0 md:left-0 h-160 md:h-screen"
          id="sidebar"
          ref={sidebar}
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
            <Versions tenantName={network} />
            <NetworkId />
            <SocialAndTermLinks Link={FooterLink} />
          </div>
        </div>

        <div className="mobile-menu">
          <button className="menu" onClick={() => toggleMenu()} />
        </div>
      </div>
      <div id="main" className="flex-wrap">
        <div className="container flex-wrap">
          <div className="flex flex-row-reverse h-15">
            <OpenWallet networkName={isPendulum ? "Pendulum" : "Amplitude"} />
            <div className="dropdown dropdown-end mr-2 hidden">
              <button className="flex space-x-2 items-center px-4 py-2 btn no-animation">
                <span className={`${isPendulum ? "text-white" : ""}  text-md`}>
                  {isPendulum ? "Pendulum" : "Amplitude"}
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}


