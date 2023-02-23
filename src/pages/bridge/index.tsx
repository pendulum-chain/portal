import { h } from 'preact';
import { Card, Tabs } from 'react-daisyui';
import { useMemo, useState } from 'preact/hooks';
import Redeem from './Redeem';
import Issue from './Issue';

function Bridge(): JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  // TODO - get the network from somewhere
  const parachainNetwork = 'Amplitude';
  const nativeCurrency = parachainNetwork === "Amplitude" ? "AMPE" : "PEN";
  const wrappedCurrencyPrefix = parachainNetwork === "Amplitude" ? "a" : "p";

  const Content = useMemo(() => {
    switch (tabValue) {
      case 0:
        return (
          <Issue
            network={parachainNetwork}
            nativeCurrency={nativeCurrency}
            wrappedCurrencyPrefix={wrappedCurrencyPrefix}
          />
        );
      case 1:
        return (
          <Redeem
            network={parachainNetwork}
            nativeCurrency={nativeCurrency}
            wrappedCurrencyPrefix={wrappedCurrencyPrefix}
          />
        );
    }
  }, [nativeCurrency, tabValue, wrappedCurrencyPrefix]);

  return (
    <div className="h-full flex items-center justify-center grid place-items-center mt-4">
      <Card className="bg-base-200 min-h-500 min-w-535 w-fit">
        <div className="flex justify-between px-10 mt-5">
          <Tabs
            className="flex flex-grow"
            boxed
            value={tabValue}
            onChange={setTabValue}
          >
            <Tabs.Tab className="w-2/4 h-fit p-2" value={0}>
              To {parachainNetwork}
            </Tabs.Tab>
            <Tabs.Tab className="w-2/4 h-fit p-2" value={1}>
              Back To Stellar
            </Tabs.Tab>
          </Tabs>
        </div>
        {Content}
      </Card>
    </div>
  );
}

export default Bridge;
