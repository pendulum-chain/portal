import { render } from 'preact';
import { App } from './app';
import { BrowserRouter } from "react-router-dom";
import './app.css';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);
