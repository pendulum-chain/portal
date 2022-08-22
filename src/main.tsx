import "preact/debug";

import { h, render } from 'preact';
import { GlobalStateProvider } from "./GlobalStateProvider";
import { App } from './app';
import { BrowserRouter } from "react-router-dom";
import './index.css';

render(
  <GlobalStateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalStateProvider>
  ,
  document.getElementById('app') as HTMLElement
)
