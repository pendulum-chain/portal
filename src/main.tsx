import { h, render } from "preact";
import { GlobalStateProvider } from "./GlobalStateProvider";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "react-daisyui";
import "@talisman-connect/components/talisman-connect-components.esm.css";
import "@talisman-connect/ui/talisman-connect-ui.esm.css";
import "./index.css";
import { NodeInfoProvider } from "./NodeInfoProvider";

const theme = localStorage.getItem("theme") || "black";

render(
  <BrowserRouter>
    <GlobalStateProvider>
      <Theme dataTheme={theme}>
        <NodeInfoProvider>
          <App />
        </NodeInfoProvider>
      </Theme>
    </GlobalStateProvider>
  </BrowserRouter>,
  document.getElementById("app") as HTMLElement
);
