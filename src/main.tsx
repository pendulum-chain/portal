import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { render } from 'preact';
import { Theme } from 'react-daisyui';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { GlobalState, GlobalStateContext, GlobalStateProvider } from './GlobalStateProvider';
import { emptyFn } from './helpers/general';
import './index.css';
import { tenantTheme, ThemeName } from './models/Theme';
import { NodeInfoProvider } from './NodeInfoProvider';
import SharedProvider from './SharedProvider';

const queryClient = new QueryClient();

/* const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
}); */

render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStateProvider>
        <GlobalStateContext.Consumer>
          {(globalState) => {
            const { tenantRPC, getThemeName = emptyFn } = globalState as GlobalState;
            return (
              <NodeInfoProvider tenantRPC={tenantRPC}>
                <SharedProvider>
                  <Theme dataTheme={`${getThemeName()}`} className={tenantTheme[getThemeName() || ThemeName.Pendulum]}>
                    <App />
                  </Theme>
                </SharedProvider>
              </NodeInfoProvider>
            );
          }}
        </GlobalStateContext.Consumer>
      </GlobalStateProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>,
  document.getElementById('app') as HTMLElement,
);
