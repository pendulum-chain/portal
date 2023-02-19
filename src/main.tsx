import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "preact";
import { Theme } from "react-daisyui";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { GlobalStateContext, GlobalStateProvider } from "./GlobalStateProvider";
import "./index.css";
import { NodeInfoProvider } from "./NodeInfoProvider";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
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
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("app") as HTMLElement
);
