import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from 'preact';
import { Theme } from 'react-daisyui';
import { BrowserRouter } from 'react-router-dom';
import { GlobalState, GlobalStateContext, GlobalStateProvider, defaultState } from './GlobalStateProvider';
import { NodeInfoProvider } from './NodeInfoProvider';
import { App } from './app';
import './index.css';

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStateProvider>
        <GlobalStateContext.Consumer>
          {(globalState) => {
            const { state = defaultState, getThemeName = () => undefined } = globalState as GlobalState;
            return (
              <NodeInfoProvider tenantRPC={state.tenantRPC}>
                <Theme dataTheme={getThemeName()}>
                  <App />
                </Theme>
              </NodeInfoProvider>
            );
          }}
        </GlobalStateContext.Consumer>
      </GlobalStateProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('app') as HTMLElement,
);
