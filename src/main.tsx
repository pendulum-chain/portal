import { h, render } from "preact";
import { GlobalStateContext, GlobalStateProvider } from "./GlobalStateProvider";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "react-daisyui";
import "./index.css";
import { NodeInfoProvider } from "./NodeInfoProvider";

render(
  <BrowserRouter>
    <GlobalStateProvider>
      <GlobalStateContext.Consumer>
        {({ state, getThemeName }) =>
          state.tenantRPC && (
            <NodeInfoProvider tenantRPC={state.tenantRPC}>
              <Theme dataTheme={getThemeName()}>
                <App />
              </Theme>
            </NodeInfoProvider>
          )
        }
      </GlobalStateContext.Consumer>
    </GlobalStateProvider>
  </BrowserRouter>,
  document.getElementById("app") as HTMLElement
);
