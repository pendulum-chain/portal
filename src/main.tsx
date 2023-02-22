import { h, render } from "preact";
import { GlobalStateContext, GlobalStateProvider } from "./GlobalStateProvider";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "react-daisyui";
import "./index.css";
import { NodeInfoProvider } from "./NodeInfoProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
