import { h, render } from "preact";
import { GlobalStateContext, GlobalStateProvider } from "./GlobalStateProvider";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "react-daisyui";
import "@talisman-connect/components/talisman-connect-components.esm.css";
import "@talisman-connect/ui/talisman-connect-ui.esm.css";
import "./index.css";
import { NodeInfoProvider } from "./NodeInfoProvider";

render(
  <BrowserRouter>
    <GlobalStateProvider>
      <GlobalStateContext.Consumer>
        {({ state }) =>
          state.tenantRPC && (
            <NodeInfoProvider tenantRPC={state.tenantRPC}>
              <Theme dataTheme={state.tenantNane}>
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
