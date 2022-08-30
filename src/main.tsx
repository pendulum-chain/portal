import { h, render } from "preact";
import { GlobalStateProvider } from "./GlobalStateProvider";
import { App } from "./app";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "react-daisyui";
import "./index.css";

const theme = localStorage.getItem("theme") || "black";

render(
  <GlobalStateProvider>
    <Theme dataTheme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Theme>
  </GlobalStateProvider>,
  document.getElementById("app") as HTMLElement
);
