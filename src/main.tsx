import "preact/debug";

import { h, render } from 'preact';
import { App } from './app';
import { BrowserRouter } from "react-router-dom";
import './index.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app') as HTMLElement
)
