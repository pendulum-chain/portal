import { useEffect, useState } from "preact/hooks";
import { memo, FC } from "preact/compat";
import { h } from "preact";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "react-daisyui";

import PendulumLogo from "../../assets/pendulum-logo.png";
import AmplitudeLogo from "../../assets/amplitud-logo.svg";
import OpenWallet from "../OpenWallet";
import Nav from "./Nav";
import NetworkId from "./NetwordId";
import SocialAndTermLinks from "./SocialAndTermLinks";
import { useNodeInfoState } from "../../NodeInfoProvider";

export default function Layout(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const strings = location.pathname.split("/");
  const [isPendulum, setIsPendulum] = useState<boolean>(false);
  const { setTheme } = useTheme();
  const { state } = useNodeInfoState();

  const sideBarLogo = isPendulum ? PendulumLogo : AmplitudeLogo;
  const chevronColor = isPendulum ? "white" : "grey ";
  const bgColor = isPendulum ? "bg-white" : "bg-black";

  useEffect(() => {
    if (strings[1] && strings[1] === "pendulum" && !strings[2]) {
      setTheme("light");
      setIsPendulum(true);
      // FIXME: hiding pendulum code
      // https://github.com/pendulum-chain/portal/issues/15
      // navigate("/pendulum/dashboard");
    }

    if (strings[1] && strings[1] === "amplitude" && !strings[2]) {
      setTheme("black");
      setIsPendulum(false);
      navigate("/amplitude/dashboard");
    }

    if (strings[1] && strings[1].match("amplitude|pendulum") == null) {
      navigate("/amplitude/dashboard");
    }
  }, []);

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

  return (
    <div class={`flex md:flex-row-reverse flex-wrap ${bgColor}`}>
      <div class="w-full md:w-4/5">
        <div class="container pt-16 px-6 h-full">
          <div className="flex flex-row-reverse h-15">
            <OpenWallet networkName={isPendulum ? "Pendulum" : "Amplitude"} />
            <div className="dropdown dropdown-end mr-2 hidden">
              <button className="flex space-x-2 items-center px-4 py-2 btn no-animation">
                <span class={`${isPendulum ? "text-white" : ""}  text-md`}>
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
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
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

      <div
        style={{
          ...(isPendulum ? null : { backgroundColor: "#1c1c1c" }),
          ...{ boxShadow: "7px 0 10px rgba(0,0,0,0.1)" },
        }}
        class="w-full md:w-1/5 text-center bottom-0 md:pt-8 md:top-0 md:left-0 h-160 md:h-screen sidebar"
      >
        <div class="pendulum-versions relative">
          <span class="absolute right-14 top-2 text-green-300 hover:text-green-500 cursor-default rotate-6">
            beta
          </span>
          <img
            class="pendulum-logo"
            src={sideBarLogo}
            alt=""
            style={
              isPendulum
                ? {}
                : { marginTop: 20, marginBottom: 30, marginLeft: 30 }
            }
          />
          <p>
            Runtime:{" "}
            {(state.nodeVersion && state.nodeVersion.toString()) ||
              "0.0.0-00000000000"}
          </p>
          <p>DApp: COMMIT_HASH</p>
        </div>
        <Nav />
        <div className="sidebar-footer">
          <NetworkId />
          <SocialAndTermLinks Link={FooterLink} />
        </div>
      </div>
    </div>
  );
}
